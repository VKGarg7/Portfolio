import "./KpiDashboard.css";
import { AnimatedCountUp } from "./AnimatedCountUp";

type Metric = { value: number; suffix: string; label: string; accent: "red" | "ice" | "orange" | "purple" };
const metrics: Metric[] = [
  { value: 63, suffix: "", label: "APIs", accent: "red" },
  { value: 192, suffix: "", label: "Tests", accent: "ice" },
  { value: 130, suffix: "K", label: "Records", accent: "purple" },
  { value: 35, suffix: "K", label: "Applications", accent: "orange" },
  { value: 44, suffix: "K", label: "Interviews", accent: "red" },
];

export function KpiDashboard() {
  return <section className="kpi-dashboard glass-card" aria-label="CareerFlow platform metrics">
    <div className="kpi-heading"><div><span className="mono-label">CAREERFLOW / LIVE PRODUCT TELEMETRY</span><h3>PERFORMANCE <em>DASHBOARD</em></h3></div><span className="kpi-live"><i /> Live system data</span></div>
    <div className="kpi-metrics">{metrics.map((metric) => <div className={`kpi-metric metric-${metric.accent}`} key={metric.label}><strong><AnimatedCountUp value={metric.value} suffix={metric.suffix} duration={1350} /></strong><span>{metric.label}</span><i /></div>)}</div>
    <div className="kpi-visuals"><div className="kpi-chart"><div className="kpi-visual-heading"><span>APPLICATION FLOW</span><b>+28.4%</b></div><svg viewBox="0 0 600 160" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="kpi-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#4fd8ff" stopOpacity=".34" /><stop offset="1" stopColor="#4fd8ff" stopOpacity="0" /></linearGradient></defs><path className="kpi-chart-fill" d="M0,136 C40,123 59,133 92,104 S142,115 174,76 S222,101 258,67 S303,84 337,43 S385,69 421,34 S474,51 510,18 S560,38 600,7 L600,160 L0,160Z" fill="url(#kpi-fill)" /><path className="kpi-chart-line" d="M0,136 C40,123 59,133 92,104 S142,115 174,76 S222,101 258,67 S303,84 337,43 S385,69 421,34 S474,51 510,18 S560,38 600,7" /></svg></div>
      <div className="kpi-gauge"><div className="kpi-visual-heading"><span>PLATFORM HEALTH</span><b>96%</b></div><div className="gauge-ring"><span>96<small>%</small></span></div><p>All core services operating nominally</p></div>
      <div className="kpi-heatmap"><div className="kpi-visual-heading"><span>ACTIVITY HEATMAP</span><b>7 DAYS</b></div><div className="heat-grid">{Array.from({ length: 35 }, (_, index) => <i key={index} style={{ "--heat": (index * 7 + index % 5 * 12) % 100 } as React.CSSProperties} />)}</div><div className="heat-labels"><span>MON</span><span>WED</span><span>FRI</span><span>SUN</span></div></div>
      <div className="kpi-rings"><div className="progress-ring ring-red"><span>98<small>%</small><b>API</b></span></div><div className="progress-ring ring-ice"><span>92<small>%</small><b>TEST</b></span></div></div>
    </div>
  </section>;
}