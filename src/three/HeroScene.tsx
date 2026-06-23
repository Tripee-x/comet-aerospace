import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Interceptor } from "./Interceptor";
import { ParticleField } from "./ParticleField";
import { OrbitSystem } from "./OrbitSystem";
import { SceneRig } from "./SceneRig";
import { isLowPower } from "../lib/webgl";

/**
 * The WebGL hero. Mounted once and pinned behind the scrolling hero overlays.
 * All scroll reactivity is read from the heroProgress singleton inside the
 * children's useFrame loops, so this component never re-renders per frame.
 */
export function HeroScene({ reduced = false }: { reduced?: boolean }) {
  const low = isLowPower();
  const particles = low ? 600 : 1500;

  return (
    <Canvas
      className="hero__canvas"
      dpr={[1, low ? 1.4 : 2]}
      gl={{
        antialias: !low,
        powerPreference: "high-performance",
        alpha: false,
      }}
      camera={{ position: [0.5, 1.2, 18], fov: 38, near: 0.1, far: 120 }}
      frameloop={reduced ? "demand" : "always"}
    >
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#05060a", 16, 46]} />

      <Suspense fallback={null}>
        <SceneRig />
        <Interceptor />
        <OrbitSystem />
        <ParticleField count={particles} />

        {!low && (
          <EffectComposer>
            <Bloom
              intensity={0.7}
              luminanceThreshold={0.38}
              luminanceSmoothing={0.85}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.3} darkness={0.92} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
