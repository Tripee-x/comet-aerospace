import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { heroProgress } from "../lib/heroProgress";

/**
 * Drifting starfield / dust. Colors biased toward the brand palette
 * (pearl, magenta, cyan). Count scales with the `count` prop for perf.
 */
export function ParticleField({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#f4f6fb"),
      new THREE.Color("#4da6ff"),
      new THREE.Color("#41d4dd"),
      new THREE.Color("#9fb4d6"),
    ];
    for (let i = 0; i < count; i++) {
      // Spread within a large sphere shell.
      const r = 8 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const c = palette[Math.floor(Math.random() * (Math.random() < 0.7 ? 1 : palette.length))];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.012;
    // Field gently expands as the hero progresses, deepening parallax.
    const s = 1 + heroProgress.value * 0.18;
    ref.current.scale.setScalar(s);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
