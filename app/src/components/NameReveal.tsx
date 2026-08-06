import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useBootStore } from "../hooks/useBootSequence";
import "./NameReveal.css";

/**
 * Cinematic name card that fades/rises in partway through the garage reveal
 * — a DOM overlay layered above the WebGL canvas, timed with the door-open
 * + vehicle-fade choreography in GarageReveal/CameraRig rather than driving
 * its own independent clock.
 */
export function NameReveal({ reducedMotion }: { reducedMotion: boolean }) {
  const phase = useBootStore((s) => s.phase);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== "reveal" || !ref.current) return;
    const duration = reducedMotion ? 0.01 : 1;
    gsap.fromTo(
      ref.current,
      { autoAlpha: 0, y: 24, letterSpacing: "0.4em" },
      { autoAlpha: 1, y: 0, letterSpacing: "0.02em", duration, ease: "power3.out", delay: reducedMotion ? 0 : 1.6 }
    );
  }, [phase, reducedMotion]);

  if (phase !== "reveal") return null;

  return (
    <div className="name-reveal">
      <div ref={ref} className="name-reveal-inner">
        <p className="name-reveal-eyebrow">SYSTEM ONLINE</p>
        <h1 className="name-reveal-title">Vansh Kumar Garg</h1>
      </div>
    </div>
  );
}
