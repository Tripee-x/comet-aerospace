import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { heroProgress } from "../lib/heroProgress";

/**
 * Procedural interceptor silhouette built entirely from Three.js primitives:
 *   - LatheGeometry fuselage (chrome / graphite)
 *   - extruded delta fins
 *   - emissive plasma trim + engine bloom source
 * Nothing here is operational; it is an abstract aerospace form study.
 */
export function Interceptor() {
  const group = useRef<THREE.Group>(null);
  const engine = useRef<THREE.Mesh>(null);
  const trim = useRef<THREE.MeshStandardMaterial>(null);

  // Fuselage profile, revolved around Y. (radius, height)
  const fuselage = useMemo(() => {
    const pts: THREE.Vector2[] = [
      [0.0, -3.0],
      [0.5, -3.0],
      [0.58, -2.4],
      [0.62, -1.2],
      [0.6, 0.4],
      [0.5, 1.5],
      [0.36, 2.3],
      [0.18, 2.9],
      [0.04, 3.2],
      [0.0, 3.32],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 72);
  }, []);

  // One swept delta fin shape, instanced 4x around the base.
  const finGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(1.5, -0.2);
    s.lineTo(1.4, -1.25);
    s.lineTo(0.06, -1.0);
    s.lineTo(0, 0);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 1,
    });
    g.center();
    return g;
  }, []);

  // Dispose the manually-created geometries on unmount (R3F does not auto-
  // dispose geometries passed via the `geometry` prop).
  useEffect(() => {
    return () => {
      fuselage.dispose();
      finGeo.dispose();
    };
  }, [fuselage, finGeo]);

  useFrame((state, delta) => {
    const p = heroProgress.value;
    if (group.current) {
      // Scroll-driven heading plus a slow idle drift.
      const target = p * Math.PI * 1.7 + state.clock.elapsedTime * 0.05;
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        target,
        3,
        delta
      );
      // Subtle list so the silhouette never reads flat.
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
    }
    // Plasma signature intensifies after the profile reveal (phase 2+).
    const glow = THREE.MathUtils.smoothstep(p, 0.22, 0.45);
    if (trim.current) trim.current.emissiveIntensity = 0.4 + glow * 3.2;
    if (engine.current) {
      const mat = engine.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.25 + glow * 0.6;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.06;
      engine.current.scale.set(pulse, 1 + glow * 0.8, pulse);
    }
  });

  const fins = [0, 1, 2, 3];

  return (
    <group ref={group} rotation={[0.12, 0.6, 0]}>
      {/* fuselage — brushed titanium */}
      <mesh geometry={fuselage} castShadow>
        <meshStandardMaterial
          color="#cdd3df"
          metalness={1}
          roughness={0.32}
          envMapIntensity={1.9}
        />
      </mesh>

      {/* graphite collar */}
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.64, 0.64, 0.32, 72]} />
        <meshStandardMaterial color="#171b26" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* primary emissive trim ring (ice blue) */}
      <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.61, 0.025, 16, 96]} />
        <meshStandardMaterial
          ref={trim}
          color="#4da6ff"
          emissive="#4da6ff"
          emissiveIntensity={1.6}
          metalness={0.4}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* cyan micro-light ring */}
      <mesh position={[0, 1.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.012, 12, 80]} />
        <meshStandardMaterial
          color="#41d4dd"
          emissive="#41d4dd"
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>

      {/* tactical amber status ring (sparse warm accent) */}
      <mesh position={[0, -0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.01, 10, 80]} />
        <meshStandardMaterial
          color="#f5a623"
          emissive="#f5a623"
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>

      {/* fins */}
      {fins.map((i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
          <mesh
            geometry={finGeo}
            position={[0.95, -2.0, 0]}
            rotation={[Math.PI / 2, 0, -0.2]}
            castShadow
          >
            <meshStandardMaterial
              color="#9aa3b5"
              metalness={1}
              roughness={0.3}
              envMapIntensity={1.2}
            />
          </mesh>
        </group>
      ))}

      {/* engine bloom source — hot ion-blue exhaust */}
      <mesh ref={engine} position={[0, -3.5, 0]}>
        <coneGeometry args={[0.5, 1.6, 32, 1, true]} />
        <meshBasicMaterial
          color="#7fb8ff"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {/* white-hot core */}
      <mesh position={[0, -3.15, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#eaf4ff" toneMapped={false} />
      </mesh>
      <pointLight position={[0, -3.4, 0]} color="#5b9dff" intensity={7} distance={10} />
    </group>
  );
}
