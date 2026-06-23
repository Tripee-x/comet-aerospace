import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { heroProgress } from "../lib/heroProgress";

/**
 * Radar rings + orbital comet trails surrounding the vehicle. Rings tilt and
 * brighten through the survey phase; comets sweep along inclined orbits.
 */
export function OrbitSystem() {
  const rings = useRef<THREE.Group>(null);
  const comets = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const p = heroProgress.value;
    const survey = THREE.MathUtils.smoothstep(p, 0.3, 0.55);

    if (rings.current) {
      rings.current.rotation.z += delta * 0.05;
      rings.current.rotation.x = -0.9 + survey * 0.5;
      rings.current.scale.setScalar(1 + survey * 0.15);
    }
    if (comets.current) {
      comets.current.rotation.y += delta * 0.5;
      comets.current.rotation.x = 0.4 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const ringDefs = [
    { r: 4.2, color: "#2f6bff", op: 0.45 },
    { r: 5.4, color: "#4da6ff", op: 0.32 },
    { r: 6.8, color: "#41d4dd", op: 0.2 },
  ];

  const cometDefs = [
    { r: 5.0, color: "#4da6ff", off: 0 },
    { r: 5.0, color: "#41d4dd", off: Math.PI },
    { r: 6.2, color: "#f5a623", off: Math.PI / 2 },
  ];

  return (
    <group>
      <group ref={rings} rotation={[-0.9, 0, 0]}>
        {ringDefs.map((d, i) => (
          <mesh key={i}>
            <torusGeometry args={[d.r, 0.01, 8, 160]} />
            <meshBasicMaterial
              color={d.color}
              transparent
              opacity={d.op}
              toneMapped={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      <group ref={comets}>
        {cometDefs.map((d, i) => (
          <group key={i} rotation={[0, d.off, i * 0.6]}>
            <mesh position={[d.r, 0, 0]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshBasicMaterial color={d.color} toneMapped={false} />
            </mesh>
            {/* stretched trail */}
            <mesh position={[d.r - 0.6, 0, 0]} scale={[1.4, 0.4, 0.4]}>
              <sphereGeometry args={[0.12, 10, 10]} />
              <meshBasicMaterial
                color={d.color}
                transparent
                opacity={0.25}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
