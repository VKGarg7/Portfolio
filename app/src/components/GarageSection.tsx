import { useEffect, useRef, useState, type MouseEvent } from "react";
import { profileCards } from "../data/content";
import { makeParticles } from "../lib/particles";
import { asset } from "../lib/format";
import "./GarageSection.css";

const CARD_INTERVAL_MS = 3800;
const INDICATORS = [
  { label: "IDENTITY", value: "VERIFIED", angle: -35 },
  { label: "STATUS", value: "ONLINE", angle: 55 },
  { label: "SIGNAL", value: "STRONG", angle: 200 },
];
const PARTICLES = makeParticles(14);

export function GarageSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((i) => (i + 1) % profileCards.length), CARD_INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused]);

  function handleStageMove(event: MouseEvent<HTMLDivElement>) {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    setParallax({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  }

  return (
    <div className="scene" id="garage">
      <div className="blueprint-grid" aria-hidden="true" />

      <div className="scene-inner garage-grid">
        {/* Left: real profile photo inside a holographic scanner frame — the
            image itself is always the visual anchor; every ring, scan line,
            particle and orbiting indicator here is a decorative overlay on
            top of the photo, never a replacement for it. */}
        <div
          ref={stageRef}
          className="garage-avatar-stage"
          onMouseMove={handleStageMove}
          onMouseLeave={() => setParallax({ x: 0, y: 0 })}
          style={{ "--parallax-x": parallax.x, "--parallax-y": parallax.y } as React.CSSProperties}
        >
          <div className="avatar-hud" aria-hidden="true">
            <div className="avatar-glow avatar-glow-red" />
            <div className="avatar-glow avatar-glow-ice" />

            <div className="avatar-ring ring-outer" />
            <div className="avatar-ring ring-mid" />
            <div className="avatar-wireframe" />

            <div className="avatar-photo-wrap">
              <img src={asset("/images/profile.png")} alt="" className="avatar-photo" />
              <div className="avatar-scanline" />
              <div className="avatar-photo-vignette" />
            </div>

            {PARTICLES.map((p) => (
              <span
                key={p}
                className="avatar-particle"
                style={{ "--p": p, "--p-angle": `${(p * 137) % 360}deg`, "--p-radius": `${140 + (p % 4) * 18}px` } as React.CSSProperties}
              />
            ))}

            {INDICATORS.map((ind) => (
              <div key={ind.label} className="avatar-indicator" style={{ "--ind-angle": `${ind.angle}deg` } as React.CSSProperties}>
                <span className="avatar-indicator-dot" />
                <span className="avatar-indicator-text">
                  <b>{ind.label}</b>
                  {ind.value}
                </span>
              </div>
            ))}
          </div>
          <p className="avatar-stage-label mono-label">HOLOGRAPHIC PROFILE · LIVE SCAN</p>
        </div>

        {/* Right: one profile card at a time, auto-rotating with manual override */}
        <div className="garage-cards">
          <p className="eyebrow">CHAPTER 02 &middot; THE GARAGE</p>
          <h2 className="garage-title">Driver Profile</h2>

          <div
            className="card-stack"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {profileCards.map((card, i) => {
              const offset = i - active;
              const wrapped = ((offset + profileCards.length) % profileCards.length);
              const isActive = wrapped === 0;
              const isNext = wrapped === 1;
              const isPrev = wrapped === profileCards.length - 1;
              let stateClass = "hidden";
              if (isActive) stateClass = "active";
              else if (isNext) stateClass = "next";
              else if (isPrev) stateClass = "prev";

              return (
                <div key={card.id} className={`profile-card glass-card ${stateClass}`}>
                  <div className="profile-card-icon">
                    <i className={`fas fa-${card.icon}`} />
                  </div>
                  <p className="profile-card-label mono-label">{card.label}</p>
                  <div className="profile-card-lines">
                    {card.lines.map((line, li) => (
                      <div key={li} className="profile-card-line">
                        <span className="line-primary">{line.primary}</span>
                        {line.secondary && <span className="line-secondary">{line.secondary}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card-dots">
            {profileCards.map((card, i) => (
              <button
                key={card.id}
                className={`card-dot ${i === active ? "active" : ""}`}
                aria-label={`Show ${card.label}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
