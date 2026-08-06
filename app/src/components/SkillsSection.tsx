import { useMemo, useState } from "react";
import { SectionHeading } from "./SectionHeading";
import "./SkillsSection.css";

type Technology = { id: string; label: string; group: string; detail: string; position: { x: number; y: number }; color: "red" | "ice" | "orange" | "purple" };

const technologies: Technology[] = [
  { id: "react", label: "React", group: "Frontend", detail: "Component-driven interfaces, interactive state, and responsive product surfaces.", position: { x: 16, y: 53 }, color: "ice" },
  { id: "java", label: "Java", group: "Backend", detail: "Reliable, object-oriented services with a focus on maintainable production code.", position: { x: 35, y: 24 }, color: "orange" },
  { id: "spring", label: "Spring", group: "Backend", detail: "Spring Boot services, REST APIs, security layers, and scalable business workflows.", position: { x: 51, y: 39 }, color: "red" },
  { id: "fastapi", label: "FastAPI", group: "Backend", detail: "High-performance Python APIs with typed contracts and asynchronous processing.", position: { x: 52, y: 67 }, color: "ice" },
  { id: "postgresql", label: "PostgreSQL", group: "Data", detail: "Normalized data models, query design, migrations, indexing, and dependable persistence.", position: { x: 73, y: 49 }, color: "purple" },
  { id: "python", label: "Python", group: "Backend", detail: "Automation, API development, async workflows, and pragmatic server-side problem solving.", position: { x: 33, y: 77 }, color: "orange" },
  { id: "docker", label: "Docker", group: "Delivery", detail: "Containerized development and deployment workflows for repeatable environments.", position: { x: 84, y: 23 }, color: "ice" },
  { id: "jwt", label: "JWT", group: "Security", detail: "Stateless authentication, secure access tokens, and protected API boundaries.", position: { x: 69, y: 78 }, color: "red" },
  { id: "oauth", label: "OAuth", group: "Security", detail: "OAuth2 identity flows and third-party sign-in integrations.", position: { x: 20, y: 22 }, color: "purple" },
  { id: "redis", label: "Redis", group: "Data", detail: "Fast caching and transient state for responsive, resilient systems.", position: { x: 87, y: 68 }, color: "orange" },
];

const connections = [["react", "spring"], ["react", "fastapi"], ["java", "spring"], ["java", "postgresql"], ["spring", "postgresql"], ["spring", "jwt"], ["fastapi", "python"], ["fastapi", "postgresql"], ["fastapi", "jwt"], ["postgresql", "redis"], ["jwt", "oauth"], ["docker", "spring"], ["docker", "fastapi"]] as const;

export function SkillsSection() {
  const [selectedId, setSelectedId] = useState("spring");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const activeId = hoveredId ?? selectedId;
  const selected = technologies.find((technology) => technology.id === selectedId)!;
  const connectedIds = useMemo(() => new Set<string>(connections.filter(([from, to]) => from === activeId || to === activeId).flat()), [activeId]);

  return <div className="scene" id="skills"><div className="scene-inner neural-section">
    <SectionHeading chapter="CHAPTER 05 - SKILL NETWORK" title="AI Neural Network" />
    <p className="neural-intro">Explore the systems behind the build. Hover a node to trace its dependencies; select one to inspect its role.</p>
    <div className="neural-layout">
      <div className="neural-network glass-card"><div className="neural-toolbar"><span className="mono-label">LIVE DEPENDENCY MAP</span><div className="neural-zoom" aria-label="Network zoom controls"><button onClick={() => setZoom((value) => Math.max(0.8, value - 0.1))} aria-label="Zoom out">-</button><span>{Math.round(zoom * 100)}%</span><button onClick={() => setZoom((value) => Math.min(1.35, value + 0.1))} aria-label="Zoom in">+</button></div></div>
        <div className="neural-viewport"><div className="neural-canvas" style={{ transform: `scale(${zoom})` }}><svg className="neural-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{connections.map(([from, to]) => { const start = technologies.find((technology) => technology.id === from)!; const end = technologies.find((technology) => technology.id === to)!; const highlighted = from === activeId || to === activeId; return <line key={`${from}-${to}`} x1={start.position.x} y1={start.position.y} x2={end.position.x} y2={end.position.y} className={highlighted ? "is-highlighted" : ""} />; })}</svg>
          {technologies.map((technology) => { const active = technology.id === activeId; const connected = connectedIds.has(technology.id); return <button key={technology.id} className={`neural-node node-${technology.color} ${active ? "is-active" : ""} ${connected ? "is-connected" : ""}`} style={{ left: `${technology.position.x}%`, top: `${technology.position.y}%` }} onClick={() => setSelectedId(technology.id)} onMouseEnter={() => setHoveredId(technology.id)} onMouseLeave={() => setHoveredId(null)} aria-pressed={technology.id === selectedId}><span className="neural-pulse" /><span>{technology.label}</span></button>; })}
        </div></div></div>
      <aside className="neural-detail glass-card" aria-live="polite"><p className="mono-label">SELECTED SKILL</p><div className={`detail-signal node-${selected.color}`} /><h3>{selected.label}</h3><p className="neural-detail-group">{selected.group} system</p><p>{selected.detail}</p><div className="neural-detail-footer"><span>CONNECTED NODES</span><strong>{connections.filter(([from, to]) => from === selected.id || to === selected.id).length}</strong></div></aside>
    </div>
  </div></div>;
}