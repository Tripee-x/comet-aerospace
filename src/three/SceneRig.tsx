import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { heroProgress, PHASES } from "../lib/heroProgress";

/** Camera keyframes, one per phase boundary (position + look target).
 *  Tuned for a strong zoom-in / pull-back rhythm and varied orbital angles
 *  so the vehicle is never just sitting static in frame. */
const CAM: { pos: [number, number, number]; look: [number, number, number] }[] = [
  { pos: [1.5, 1.5, 23], look: [0, 0, 0] }, // boot — far establishing
  { pos: [0.4, 2.4, 6.5], look: [0, 1.4, 0] }, // approach — punch in toward the nose
  { pos: [11.5, 0.2, 3.2], look: [0, 0.2, 0] }, // fly-by — tight side pass
  { pos: [-7.5, -4.2, 7.5], look: [0, -0.6, 0] }, // survey — drop below + orbit
  { pos: [6.5, 3.2, 13.5], look: [0, 0.5, 0] }, // doctrine — swing wide 3/4
  { pos: [0.5, 1.8, 12.5], look: [0, 1.2, 0] }, // capability — frame vehicle above the cards
  { pos: [0.5, 2.5, 26], look: [0, 1.0, 0] }, // standby — pull way back, silhouette
  { pos: [3.0, 1.0, 11], look: [0, 0.5, 0] }, // release — settle into hero framing
  { pos: [0.0, 3.0, 30], look: [0, 1.2, 0] }, // end — drift out into the void
];

const smooth = (t: number) => t * t * (3 - 2 * t);

function sampleKeyframes(p: number) {
  // Locate the active segment between two phase boundaries.
  let i = 0;
  while (i < PHASES.length - 2 && p > PHASES[i + 1]) i++;
  const a = PHASES[i];
  const b = PHASES[i + 1];
  const local = smooth(b === a ? 0 : (p - a) / (b - a));

  const A = CAM[i];
  const B = CAM[i + 1];
  return {
    px: THREE.MathUtils.lerp(A.pos[0], B.pos[0], local),
    py: THREE.MathUtils.lerp(A.pos[1], B.pos[1], local),
    pz: THREE.MathUtils.lerp(A.pos[2], B.pos[2], local),
    lx: THREE.MathUtils.lerp(A.look[0], B.look[0], local),
    ly: THREE.MathUtils.lerp(A.look[1], B.look[1], local),
    lz: THREE.MathUtils.lerp(A.look[2], B.look[2], local),
  };
}

/** Drives the camera from hero scroll progress + studio lighting for chrome. */
export function SceneRig() {
  const { camera, pointer } = useThree();
  const look = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const p = heroProgress.value;
    const k = sampleKeyframes(p);

    // Tiny parallax from pointer for a hand-held, alive feel.
    const px = k.px + pointer.x * 0.6;
    const py = k.py + pointer.y * 0.4;

    const d = 1 - Math.pow(0.0009, delta); // frame-rate-independent damping
    camera.position.x += (px - camera.position.x) * d;
    camera.position.y += (py - camera.position.y) * d;
    camera.position.z += (k.pz - camera.position.z) * d;

    look.current.x += (k.lx - look.current.x) * d;
    look.current.y += (k.ly - look.current.y) * d;
    look.current.z += (k.lz - look.current.z) * d;
    camera.lookAt(look.current);
  });

  return (
    <>
      {/* Cinematic studio rig: a strong cool key, a tight rim to carve the
          silhouette, and restrained colored fills. Reads as machined metal. */}
      <ambientLight intensity={0.28} />
      <directionalLight position={[7, 11, 8]} intensity={2.6} color="#eef4ff" />
      <directionalLight position={[-9, 5, -7]} intensity={1.4} color="#7fb4ff" />
      <spotLight
        position={[0, 13, 7]}
        angle={0.55}
        penumbra={0.85}
        intensity={3.2}
        color="#ffffff"
      />
      <pointLight position={[-9, 1, 5]} intensity={42} color="#2f6bff" distance={46} />
      <pointLight position={[9, -2, 3]} intensity={34} color="#41d4dd" distance={42} />
      {/* sparse tactical warm rim from below/behind */}
      <pointLight position={[3, -4, -6]} intensity={16} color="#f5a623" distance={28} />

      {/* Procedural environment (no external HDR) so chrome reads as metal. */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#05070b"]} />
        <Lightformer intensity={3} color="#ffffff" position={[0, 7, 7]} scale={[14, 5, 1]} />
        <Lightformer intensity={2.4} color="#4da6ff" position={[-8, 1, 5]} scale={[3, 12, 1]} />
        <Lightformer intensity={2.4} color="#41d4dd" position={[8, -1, 5]} scale={[3, 12, 1]} />
        <Lightformer intensity={1} color="#f5a623" position={[2, -5, -6]} scale={[8, 3, 1]} />
        <Lightformer intensity={1.6} color="#9fb4d6" position={[0, -4, -7]} scale={[12, 7, 1]} />
      </Environment>
    </>
  );
}
