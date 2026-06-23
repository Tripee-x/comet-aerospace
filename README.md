# Comet Aerospace

A frontend-only, cinematic brand site for **Comet Aerospace** (founder: Abhishek Nand).
The homepage is a long, scroll-controlled "aerospace launch film": a pinned hero
where a procedural Three.js interceptor, camera, HUD, particles, and copy evolve
across eight phases over ~700vh of scroll.

No backend. No database. No auth. Everything is rendered in the browser, and the
3D scene is built from primitives (no external 3D model).

## Stack

- **React 18 + TypeScript + Vite**
- **React Three Fiber / Three.js** + **drei** + **@react-three/postprocessing** (bloom) — procedural hero
- **GSAP + ScrollTrigger** — pinned, scrubbed scroll choreography
- **Lenis** — smooth scroll (wired into GSAP's ticker; disabled under reduced motion)
- **React Router** — Home / Products / Services / Contact
- Plain CSS with a tokenized design system (no UI framework)

## Install & run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to /dist
npm run preview    # preview the production build
```

> If `npm install` fails with an `EACCES` cache error, your global npm cache has
> root-owned files. Either run `sudo chown -R $(id -u):$(id -g) ~/.npm` once, or
> install with a local cache: `npm install --cache ./.npmcache`.

## Project structure

```
src/
  main.tsx                # entry + Router (future flags on)
  App.tsx                 # preloader, nav, routes, footer, smooth scroll
  styles/
    tokens.css            # color / type / spacing / glow / motion / z tokens
    global.css            # reset, typography, buttons, panels, grain, utils
  lib/
    gsap.ts               # registers ScrollTrigger once
    SmoothScroll.tsx      # Lenis <-> GSAP ticker; route scroll reset
    useReducedMotion.ts   # live prefers-reduced-motion
    webgl.ts              # WebGL probe + low-power heuristic
    heroProgress.ts       # GSAP -> R3F scroll bridge (no re-renders)
  three/
    HeroScene.tsx         # Canvas + bloom + perf scaling + WebGL fallback
    SceneRig.tsx          # scroll-driven camera keyframes + lights + env
    Interceptor.tsx       # procedural vehicle (lathe body, fins, plasma)
    ParticleField.tsx     # drifting starfield
    OrbitSystem.tsx       # radar rings + comet trails
  components/             # Nav, Footer, Preloader, Reveal, ScrollProgress, etc.
  sections/               # Hero (the long pinned one) + home sections
  pages/                  # Home, Products, Services, Contact
  data/content.ts         # all copy in one place
```

## How the hero works

- `.hero` is **700vh** tall; `.hero__stage` is pinned by a single GSAP
  `ScrollTrigger` (`pin`, `scrub`, `pinSpacing: false`).
- On `onUpdate`, the scroll progress (0..1) is written to a plain singleton
  (`heroProgress`). The Three.js components read it inside `useFrame`, so the 3D
  reacts to scroll **without** triggering any React re-render.
- Camera position/target are interpolated from per-phase keyframes in
  `SceneRig.tsx`; DOM overlays (phase copy, HUD, capability cards, CTA) fade via
  a soft band envelope in `Hero.tsx`.
- Phase 8 blurs / fades / clips the stage out as the hero releases.

## Accessibility & performance

- **Reduced motion**: Lenis off, hero un-pinned and collapsed to a static pose,
  scroll reveals disabled. Gated on a live `prefers-reduced-motion` listener.
- **WebGL fallback**: if WebGL is unavailable, the hero swaps to a CSS radar /
  plasma background instead of the canvas.
- **Low-power devices**: fewer particles, lower DPR, bloom disabled.
- Animations use transform/opacity only; grain is a fixed, pointer-events-none
  layer; all GSAP contexts and ScrollTriggers are reverted on unmount.
- Heavy libs (three, r3f, gsap) are split into their own chunks.

## Content & safety

This is a **brand/concept site only**. All product copy is deliberately
high-level: no specifications, range, payload, propulsion, guidance, targeting,
manufacturing, or deployment detail. Contact details and the contact form are
demo-only; the form simulates success and sends nothing.

Founder: Abhishek Nand · contact@cometaerospace.example · +91 90000 00000 · Mumbai, India
(all placeholder).
