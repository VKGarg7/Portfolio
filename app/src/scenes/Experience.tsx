import { Canvas } from "@react-three/fiber";
import { World } from "./World";
import { CameraRig } from "./CameraRig";
import { GarageReveal } from "./GarageReveal";
import type { MutableRefObject } from "react";
import type { MouseParallax } from "../hooks/useMouseParallax";

interface ExperienceProps {
  mouse: MutableRefObject<MouseParallax>;
  mouseSmooth: MutableRefObject<MouseParallax>;
  reducedMotion: boolean;
}

export function Experience({ mouse, mouseSmooth, reducedMotion }: ExperienceProps) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 100 }}
      >
        <color attach="background" args={["#050505"]} />
        <World />
        <GarageReveal reducedMotion={reducedMotion} />
        <CameraRig mouse={mouse} mouseSmooth={mouseSmooth} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
