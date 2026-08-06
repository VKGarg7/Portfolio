import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera as PerspectiveCameraImpl, Vector3 } from "three";
import gsap from "gsap";
import { useChapterStore } from "../hooks/useChapterNav";
import { useBootStore } from "../hooks/useBootSequence";
import { chapters } from "../data/chapters";
import type { MouseParallax } from "../hooks/useMouseParallax";

interface CameraRigProps {
  mouse: React.MutableRefObject<MouseParallax>;
  mouseSmooth: React.MutableRefObject<MouseParallax>;
  reducedMotion: boolean;
}

const BOOT_START = { position: new Vector3(0, 1, 22), target: new Vector3(0, -0.5, 5), fov: 38 };
const BOOT_ORBIT_RADIUS = 12;

/**
 * Drives the camera through two eras: the boot cinematic (a scripted
 * pull-back + slow orbit around the garage reveal), then — once boot
 * finishes — the normal chapter "rooms" model, where every chapter-index
 * change GSAP-tweens position/target/fov to that chapter's waypoint. Mouse
 * parallax is layered on top as a small additive offset in both eras.
 */
export function CameraRig({ mouse, mouseSmooth, reducedMotion }: CameraRigProps) {
  const { camera } = useThree();
  const state = useRef({
    pos: BOOT_START.position.clone(),
    target: BOOT_START.target.clone(),
    fov: BOOT_START.fov,
  });
  const orbitAngle = useRef(0);
  const inOrbit = useRef(false);

  // ---- Boot cinematic camera: pull back once garage doors start opening ----
  useEffect(() => {
    let cancelled = false;
    const unsub = useBootStore.subscribe((s, prev) => {
      if (s.phase === prev.phase) return;
      if (s.phase === "reveal") {
        const duration = reducedMotion ? 0.01 : 2.6;
        gsap.to(state.current.pos, { x: 0, y: 0.5, z: 13, duration, ease: "power2.out" });
        gsap.to(state.current.target, { x: 0, y: -0.8, z: 4, duration, ease: "power2.out" });
        gsap.to(state.current, {
          fov: 46,
          duration,
          ease: "power2.out",
          onComplete: () => {
            if (!cancelled) inOrbit.current = true;
          },
        });
      } else if (s.phase === "done") {
        inOrbit.current = false;
      }
    });
    return () => {
      cancelled = true;
      unsub();
    };
  }, [reducedMotion]);

  // ---- Chapter camera: GSAP-tween to each chapter's waypoint on index change ----
  useEffect(
    () =>
      useChapterStore.subscribe((s, prev) => {
        if (useBootStore.getState().phase !== "done") return;
        if (s.index === prev.index) return;
        const wp = chapters[s.index];
        const duration = reducedMotion ? 0.01 : 1.15;
        const ease = "power3.inOut";

        gsap.to(state.current.pos, { x: wp.position[0], y: wp.position[1], z: wp.position[2], duration, ease });
        gsap.to(state.current.target, { x: wp.target[0], y: wp.target[1], z: wp.target[2], duration, ease });
        gsap.to(state.current, { fov: wp.fov, duration, ease });
      }),
    [reducedMotion]
  );

  // When boot finishes, hand off smoothly to chapter 0's resting shot.
  useEffect(
    () =>
      useBootStore.subscribe((s, prev) => {
        if (s.phase !== "done" || prev.phase === "done") return;
        const wp = chapters[useChapterStore.getState().index];
        const duration = reducedMotion ? 0.01 : 1.4;
        gsap.to(state.current.pos, { x: wp.position[0], y: wp.position[1], z: wp.position[2], duration, ease: "power2.inOut" });
        gsap.to(state.current.target, { x: wp.target[0], y: wp.target[1], z: wp.target[2], duration, ease: "power2.inOut" });
        gsap.to(state.current, { fov: wp.fov, duration, ease: "power2.inOut" });
      }),
    [reducedMotion]
  );

  useFrame((_, delta) => {
    // Slow orbit once the pull-back finishes, while still in the reveal phase.
    if (inOrbit.current && !reducedMotion) {
      orbitAngle.current += delta * 0.09;
      state.current.pos.x = Math.sin(orbitAngle.current) * BOOT_ORBIT_RADIUS * 0.35;
      state.current.pos.z = 13 + Math.cos(orbitAngle.current) * 0.6;
    }

    if (!reducedMotion) {
      mouseSmooth.current.x += (mouse.current.x - mouseSmooth.current.x) * Math.min(1, delta * 3);
      mouseSmooth.current.y += (mouse.current.y - mouseSmooth.current.y) * Math.min(1, delta * 3);
    }
    const parallaxX = reducedMotion ? 0 : mouseSmooth.current.x * 0.5;
    const parallaxY = reducedMotion ? 0 : -mouseSmooth.current.y * 0.3;

    camera.position.set(
      state.current.pos.x + parallaxX,
      state.current.pos.y + parallaxY,
      state.current.pos.z
    );
    camera.lookAt(
      state.current.target.x + parallaxX * 0.4,
      state.current.target.y + parallaxY * 0.4,
      state.current.target.z
    );

    if (camera instanceof PerspectiveCameraImpl && Math.abs(camera.fov - state.current.fov) > 0.01) {
      camera.fov = state.current.fov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
