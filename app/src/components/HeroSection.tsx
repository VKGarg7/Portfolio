import { motion } from "framer-motion";
import { MessageCircle, Rocket, ArrowRight } from "lucide-react";
import { useState, type MouseEvent, type WheelEvent } from "react";
import { hero } from "../data/content";
import { goToChapter } from "../hooks/useChapterNav";
import { makeParticles } from "../lib/particles";
import "./HeroSection.css";

const metrics = [
  { value: "15+", label: "APIs shipped", tone: "red" },
  { value: "800+", label: "problems solved", tone: "ice" },
  { value: "100%", label: "deployed live", tone: "orange" },
];
const particles = makeParticles(24);

export function HeroSection() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [scrollRotation, setScrollRotation] = useState(0);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({ x: ((event.clientX - rect.left) / rect.width - 0.5) * 2, y: ((event.clientY - rect.top) / rect.height - 0.5) * 2 });
  }
  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    setScrollRotation((current) => Math.max(-13, Math.min(13, current + event.deltaY * 0.012)));
  }

  return <div className="scene cinematic-hero" id="home" onMouseMove={handleMove} onMouseLeave={() => setPointer({ x: 0, y: 0 })} onWheel={handleWheel}>
    <div className="hero-ambient" aria-hidden="true"><span className="hero-spotlight spotlight-one" /><span className="hero-spotlight spotlight-two" />{particles.map((particle) => <i key={particle} className="hero-particle" style={{ "--particle": particle, "--particle-left": `${(particle * 37) % 100}%`, "--particle-top": `${25 + (particle * 13) % 75}%` } as React.CSSProperties} />)}</div>
    <div className="hero-ghost-title" aria-hidden="true">BUILD<br />SYSTEMS</div>
    <div className="scene-inner cinematic-grid">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}>
        <div className="hero-badge"><span className="dot" /> Available for New Projects</div>
        <p className="hero-kicker">SOFTWARE ENGINEER / 2026</p>
        <h1 className="hero-name">{hero.name}</h1>
        <p className="hero-role">{hero.role}</p>
        <p className="hero-tagline">{hero.tagline}</p>
        <div className="hero-buttons">
          <button className="cta-btn cta-btn-primary" onClick={() => goToChapter(2)}>
            <span className="cta-btn-edge" aria-hidden="true" />
            <span className="cta-btn-mask" aria-hidden="true"><span className="cta-btn-light" /></span>
            <span className="cta-btn-content">
              <Rocket size={16} className="cta-btn-icon" aria-hidden="true" />
              <span className="cta-btn-label">Explore Projects</span>
              <ArrowRight size={15} className="cta-btn-arrow" aria-hidden="true" />
            </span>
          </button>
          <button className="cta-btn cta-btn-secondary" onClick={() => goToChapter(6)}>
            <span className="cta-btn-edge" aria-hidden="true" />
            <span className="cta-btn-mask" aria-hidden="true"><span className="cta-btn-light" /></span>
            <span className="cta-btn-content">
              <MessageCircle size={16} className="cta-btn-icon" aria-hidden="true" />
              <span className="cta-btn-label">Hire Me</span>
              <ArrowRight size={15} className="cta-btn-arrow" aria-hidden="true" />
            </span>
          </button>
        </div>
      </motion.div>

      <div className="hero-machine-wrap" style={{ "--pointer-x": pointer.x, "--pointer-y": pointer.y, "--scroll-rotation": `${scrollRotation}deg` } as React.CSSProperties}>
        <div className="hero-floating-metric metric-a"><strong>{metrics[0].value}</strong><span>{metrics[0].label}</span></div>
        <div className="hero-floating-metric metric-b"><strong>{metrics[1].value}</strong><span>{metrics[1].label}</span></div>
        <div className="hero-floating-metric metric-c"><strong>{metrics[2].value}</strong><span>{metrics[2].label}</span></div>
        <div className="hero-feature feature-code"><i className="fas fa-code" /><span>BUILD</span></div><div className="hero-feature feature-db"><i className="fas fa-database" /><span>DATA</span></div><div className="hero-feature feature-shield"><i className="fas fa-shield-halved" /><span>SECURE</span></div>
        <motion.div className="hero-machine" initial={{ opacity: 0, scale: .8, rotateY: -18 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1.15, delay: .18, ease: [0.16, 1, 0.3, 1] }}>
          <div className="machine-topbar"><div className="machine-lights"><span /><span /><span /></div><span className="machine-label">VKG / PRODUCTION CONSOLE</span><span className="machine-status">LIVE <b /></span></div>
          <div className="machine-body"><aside className="machine-sidebar"><span className="side-logo">V</span><i className="fas fa-grid-2" /><i className="fas fa-chart-line active" /><i className="fas fa-code-branch" /><i className="fas fa-gear" /></aside><main className="machine-screen"><div className="screen-heading"><div><span className="mono-label">SYSTEM OVERVIEW</span><h2>ENGINEERING <em>TELEMETRY</em></h2></div><span className="screen-date">Q1 / 2026</span></div><div className="screen-stats">{metrics.map((metric) => <div key={metric.label} className={`screen-stat stat-${metric.tone}`}><strong>{metric.value}</strong><span>{metric.label}</span><i /></div>)}</div><div className="screen-chart"><div className="chart-header"><span>DELIVERY VELOCITY</span><span>+42.8%</span></div><svg viewBox="0 0 500 160" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#ff3b56" stopOpacity=".38" /><stop offset="1" stopColor="#ff3b56" stopOpacity="0" /></linearGradient></defs><path d="M0,134 C35,110 45,125 78,95 S122,112 154,75 S199,102 236,57 S282,75 315,42 S360,61 395,25 S445,47 500,9 L500,160 L0,160Z" fill="url(#chart-fill)" /><path d="M0,134 C35,110 45,125 78,95 S122,112 154,75 S199,102 236,57 S282,75 315,42 S360,61 395,25 S445,47 500,9" fill="none" stroke="#ff3b56" strokeWidth="3" /></svg></div><div className="screen-stack"><span className="mono-label">CORE STACK</span>{hero.stack.slice(0, 5).map((skill) => <span key={skill}>{skill}</span>)}</div></main></div>
          <div className="machine-reflection" />
        </motion.div>
      </div>
    </div>
  </div>;
}