import { motion } from "framer-motion";
import { useMemo, useState, type CSSProperties, type MouseEvent } from "react";
import { SectionHeading } from "./SectionHeading";
import "./ArchitectureSection.css";

type SystemNode = { id: string; label: string; icon: string; description: string; x: number; y: number; tone: "red" | "ice" | "orange" | "purple" };
const nodes: SystemNode[] = [
  { id: "client", label: "CLIENT", icon: "display", description: "React interface routes user actions into the platform through responsive, stateful views.", x: 13, y: 52, tone: "ice" },
  { id: "api", label: "API GATEWAY", icon: "code-branch", description: "Authenticated REST boundary validating requests and directing traffic to the right service.", x: 37, y: 35, tone: "red" },
  { id: "servers", label: "SERVERS", icon: "server", description: "Spring Boot and FastAPI services own business rules, workflows, and integrations.", x: 48, y: 62, tone: "orange" },
  { id: "database", label: "DATABASE", icon: "database", description: "PostgreSQL provides durable, normalized state with fast indexed queries.", x: 75, y: 39, tone: "purple" },
  { id: "ai", label: "AI ENGINE", icon: "brain", description: "AI-assisted reasoning stays isolated from deterministic workflows and financial calculations.", x: 77, y: 72, tone: "ice" },
  { id: "docker", label: "DOCKER", icon: "cube", description: "Containerized services make every local, test, and deployment environment repeatable.", x: 31, y: 82, tone: "red" },
  { id: "queue", label: "QUEUE", icon: "layer-group", description: "Asynchronous jobs absorb heavy work and keep user-facing requests responsive.", x: 58, y: 17, tone: "orange" },
];
const beams = [["client", "api"], ["api", "servers"], ["api", "queue"], ["servers", "database"], ["servers", "ai"], ["servers", "docker"], ["queue", "database"], ["queue", "ai"]] as const;

export function ArchitectureSection() {
  const [activeId, setActiveId] = useState("api");
  const [zoom, setZoom] = useState(1);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const active = nodes.find((node) => node.id === activeId)!;
  const connected = useMemo(() => new Set<string>(beams.filter(([from, to]) => from === activeId || to === activeId).flat()), [activeId]);
  function handleMove(event: MouseEvent<HTMLDivElement>) { const rect = event.currentTarget.getBoundingClientRect(); setCursor({ x: ((event.clientX - rect.left) / rect.width - .5) * 2, y: ((event.clientY - rect.top) / rect.height - .5) * 2 }); }
  const mapStyle = { "--map-x": `${cursor.x * 8}deg`, "--map-y": `${cursor.y * -8}deg`, "--map-zoom": zoom } as CSSProperties;

  return <div className="scene" id="architecture"><div className="scene-inner system-section"><SectionHeading chapter="CHAPTER 04 - SYSTEM ARCHITECTURE" title="Connected By Design" /><p className="system-intro">Hover over any node to reveal its role in the system. Follow the animated beams as data moves through the platform.</p>
    <div className="system-layout"><div className="system-map-shell glass-card"><div className="system-toolbar"><span className="mono-label">LIVE SERVICE TOPOLOGY</span><div className="system-zoom"><button onClick={() => setZoom((value) => Math.max(.78, value - .1))} aria-label="Zoom out">−</button><span>{Math.round(zoom * 100)}%</span><button onClick={() => setZoom((value) => Math.min(1.3, value + .1))} aria-label="Zoom in">+</button></div></div>
      <div className="system-viewport" onMouseMove={handleMove} onMouseLeave={() => setCursor({ x: 0, y: 0 })}><div className="system-map" style={mapStyle}><svg className="system-beams" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{beams.map(([from, to], index) => { const start = nodes.find((node) => node.id === from)!; const end = nodes.find((node) => node.id === to)!; const lit = from === activeId || to === activeId; return <g key={`${from}-${to}`}><line x1={start.x} y1={start.y} x2={end.x} y2={end.y} className={lit ? "is-lit" : ""} /><motion.circle className={`system-packet ${lit ? "is-lit" : ""}`} r="1.25" animate={{ cx: [start.x, end.x, start.x], cy: [start.y, end.y, start.y] }} transition={{ duration: 2.6 + index * .18, repeat: Infinity, ease: "linear", delay: index * -.38 }} /></g>; })}</svg>{nodes.map((node) => <button key={node.id} className={`system-node node-${node.tone} ${node.id === activeId ? "is-active" : ""} ${connected.has(node.id) ? "is-connected" : ""}`} style={{ left: `${node.x}%`, top: `${node.y}%` }} onMouseEnter={() => setActiveId(node.id)} onFocus={() => setActiveId(node.id)} onClick={() => setActiveId(node.id)} aria-pressed={node.id === activeId}><i className={`fas fa-${node.icon}`} /><span>{node.label}</span><b /></button>)}</div></div></div>
      <aside className={`system-detail glass-card detail-${active.tone}`} aria-live="polite"><span className="mono-label">ACTIVE NODE</span><div className="system-detail-icon"><i className={`fas fa-${active.icon}`} /></div><h3>{active.label}</h3><p>{active.description}</p><div className="system-detail-meta"><span>ACTIVE BEAMS</span><strong>{beams.filter(([from, to]) => from === active.id || to === active.id).length}</strong></div></aside>
    </div></div></div>;
}