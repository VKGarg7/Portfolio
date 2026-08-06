import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useBootStore } from "../hooks/useBootSequence";
import "./BootScreen.css";

const CHECKLIST = [
  "BOOTING SYSTEM",
  "LOADING MODULES",
  "INITIALIZING APIS",
  "CHECKING SERVICES",
  "DEPLOYING PORTFOLIO",
];

const LINE_INTERVAL_MS = 480;

interface BootScreenProps {
  reducedMotion: boolean;
}

/**
 * The first phase of the boot cinematic: darkness, a glowing scanning
 * circle, and a system-check line-by-line readout. Purely a DOM/CSS+SVG
 * overlay (no WebGL needed for this phase) so it paints instantly before
 * the Three.js canvas has even initialized.
 */
export function BootScreen({ reducedMotion }: BootScreenProps) {
  const { setPhase, skip } = useBootStore();
  const [lineIndex, setLineIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      // Skip the multi-second checklist crawl entirely; jump straight to
      // the reveal phase after a brief, motion-free pause.
      const t = setTimeout(() => setPhase("reveal"), 300);
      return () => clearTimeout(t);
    }

    let cancelled = false;
    let i = 0;
    function tick() {
      if (cancelled) return;
      setLineIndex(i);
      i += 1;
      if (i < CHECKLIST.length) {
        setTimeout(tick, LINE_INTERVAL_MS);
      } else {
        setTimeout(() => {
          if (!cancelled) {
            gsap.to(rootRef.current, {
              autoAlpha: 0,
              duration: 0.6,
              ease: "power2.inOut",
              onComplete: () => setPhase("reveal"),
            });
          }
        }, LINE_INTERVAL_MS + 300);
      }
    }
    const start = setTimeout(tick, 500);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [reducedMotion, setPhase]);

  return (
    <div ref={rootRef} className="boot-screen">
      <button className="boot-skip" onClick={skip} type="button">
        Skip Intro
      </button>

      <div className="boot-scan">
        <svg viewBox="0 0 200 200" className="boot-scan-svg">
          <circle cx="100" cy="100" r="70" className="boot-ring boot-ring-outer" />
          <circle cx="100" cy="100" r="52" className="boot-ring boot-ring-mid" />
          <circle cx="100" cy="100" r="34" className="boot-ring boot-ring-inner" />
          <line x1="100" y1="100" x2="100" y2="30" className="boot-sweep" />
        </svg>
        <div className="boot-scan-glow" />
      </div>

      <div className="boot-checklist">
        {CHECKLIST.map((line, i) => (
          <div key={line} className={`boot-line ${i <= lineIndex ? "visible" : ""}`}>
            <span className="boot-line-text">{line}</span>
            <span className="boot-line-status">{i < lineIndex ? "OK" : i === lineIndex ? "..." : ""}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
