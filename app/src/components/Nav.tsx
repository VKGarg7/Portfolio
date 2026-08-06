import { useMemo, useState } from "react";
import { chapters } from "../data/chapters";
import { useChapterStore, goToChapter } from "../hooks/useChapterNav";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import "./Nav.css";

const AI_STATES = [
  "Scanning hero systems",
  "Reviewing driver profile",
  "Indexing build records",
  "Mapping system architecture",
  "Cross-referencing skill matrix",
  "Replaying mission log",
  "Standing by for transmission",
];

/** Small ambient lights drifting inside the glass capsule — purely decorative. */
function FloatingLights() {
  const lights = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        left: `${8 + i * 20 + Math.random() * 6}%`,
        delay: `${i * 0.9}s`,
        duration: `${5 + Math.random() * 3}s`,
      })),
    []
  );
  return (
    <div className="nav-lights" aria-hidden="true">
      {lights.map((l, i) => (
        <span
          key={i}
          className="nav-light"
          style={{ left: l.left, animationDelay: l.delay, animationDuration: l.duration }}
        />
      ))}
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const activeIndex = useChapterStore((s) => s.index);
  const transitioning = useChapterStore((s) => s.transitioning);
  // "Compressed" once the visitor has moved past the very first chapter —
  // stands in for the usual scroll-distance threshold since navigation here
  // is chapter-snapped rather than continuously scrolled.
  const compressed = activeIndex > 0;

  useBodyScrollLock(open);

  function jump(i: number) {
    goToChapter(i);
    setOpen(false);
  }

  const progressPct = (activeIndex / (chapters.length - 1)) * 100;

  return (
    <>
      <nav className={`nav ${compressed ? "compressed" : ""}`}>
        <div className={`nav-capsule ${transitioning ? "is-transitioning" : ""}`}>
          <FloatingLights />

          <div className="nav-progress-track" aria-hidden="true">
            <div className="nav-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>

          <button className="nav-logo" onClick={() => jump(0)}>
            <span className="nav-logo-mark">&#9670;</span>
            <span className="nav-logo-text">
              VANSH <span className="nav-logo-accent">GARG</span>
            </span>
          </button>

          <div className="nav-links">
            {chapters.map((c, i) => (
              <button
                key={c.id}
                className={`nav-link ${i === activeIndex ? "active" : ""}`}
                onClick={() => jump(i)}
                aria-current={i === activeIndex}
              >
                <i className={`fas fa-${c.icon} nav-link-icon`} aria-hidden="true" />
                <span className="nav-link-label">{c.label}</span>
                {i === activeIndex && <span className="nav-link-glow" aria-hidden="true" />}
              </button>
            ))}
          </div>

          <div className="nav-ai" title="AI assistant status">
            <span className="nav-ai-dot" />
            <span className="nav-ai-text">{AI_STATES[activeIndex]}</span>
          </div>

          <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      {open && (
        <div className="nav-mobile">
          {chapters.map((c, i) => (
            <button key={c.id} className={`nav-mobile-link ${i === activeIndex ? "active" : ""}`} onClick={() => jump(i)}>
              <i className={`fas fa-${c.icon}`} aria-hidden="true" />
              {c.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
