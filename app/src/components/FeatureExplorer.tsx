import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { asset, pad2 } from "../lib/format";

export type Feature = {
  title: string;
  icon: string;
  image: string;
  tech: string[];
  description: string;
  snippet: string;
};

export const featureSets: Record<string, Feature[]> = {
  CareerFlow: [
    { title: "Application Command Center", icon: "table-columns", image: asset("/images/careerflow/applications-1.png"), tech: ["React", "Spring Boot", "PostgreSQL"], description: "A high-volume workflow for searching, filtering, and managing application records without losing context.", snippet: "GET /api/applications?cursor=...\n→ paginated application feed" },
    { title: "Interview Tracker", icon: "calendar-check", image: asset("/images/careerflow/interview-tracker.png"), tech: ["React", "REST API", "JWT"], description: "A focused scheduling surface that keeps interview stages, status, and follow-ups visible to the team.", snippet: "PATCH /interviews/{id}\n→ update stage + audit event" },
    { title: "API Contract Hub", icon: "file-code", image: asset("/images/careerflow/swagger.png"), tech: ["Swagger", "Spring Security", "Docker"], description: "Documented API contracts make the platform easier to integrate, test, and evolve safely.", snippet: "@Operation(summary = \"Create application\")\n@PostMapping(\"/applications\")" },
    { title: "Admin Console", icon: "user-shield", image: asset("/images/careerflow/admin.png"), tech: ["React", "RBAC", "Spring Security"], description: "Role-scoped admin views for managing users and platform-wide data without exposing raw DB access.", snippet: "GET /api/admin/users\n→ role-filtered user list" },
    { title: "Automated Test Suite", icon: "flask-vial", image: asset("/images/careerflow/test-run.png"), tech: ["JUnit", "Spring Boot Test", "CI"], description: "192 backend tests covering auth, data integrity, and API contracts, run on every push.", snippet: "mvn test\n→ 192 passed, 0 failed" },
  ],
  "FinPilot AI": [
    { title: "Financial Home", icon: "chart-pie", image: asset("/images/finpilot/home.png"), tech: ["Next.js", "Spring Boot", "PostgreSQL"], description: "A consolidated snapshot of financial accounts, decisions, and system health.", snippet: "GET /api/v1/household/overview\n→ deterministic financial totals" },
    { title: "AI Coach", icon: "brain", image: asset("/images/finpilot/coach.png"), tech: ["FastAPI", "LangGraph", "Qdrant"], description: "A guided intelligence layer that combines trusted product data with contextual coaching.", snippet: "graph.invoke({ householdId, intent })\n→ grounded recommendation" },
    { title: "Investment View", icon: "chart-line", image: asset("/images/finpilot/investments.png"), tech: ["React", "Java", "Rules Engine"], description: "A transparent portfolio view designed around explainable calculations rather than opaque outputs.", snippet: "portfolioValue = positions\n  .reduce(sumMarketValue, 0)" },
  ],
};

interface FeatureExplorerProps {
  projectName: string;
  /** "mission" renders the Mission Control layout; "timeline" renders the Feature Timeline layout. */
  variant?: "mission" | "timeline";
}

/**
 * Shared feature explorer used by both the Mission Control section and the
 * Feature Timeline section. Renders a selector of features and a detail
 * panel with the selected feature's image, description, tech, and snippet.
 */
export function FeatureExplorer({ projectName, variant = "mission" }: FeatureExplorerProps) {
  const features = featureSets[projectName];
  const [active, setActive] = useState(0);
  if (!features) return null;
  const selected = features[active];

  if (variant === "timeline") {
    return (
      <div className="feature-timeline">
        <div className="feature-timeline-heading">
          <span className="mono-label">FEATURE TIMELINE</span>
          <span>SELECT A CUBE TO INSPECT</span>
        </div>
        <div className="feature-cubes">
          {features.map((feature, index) => (
            <motion.button
              key={feature.title}
              className={`feature-cube ${index === active ? "is-active" : ""}`}
              onClick={() => setActive(index)}
              whileHover={{ rotateX: -9, rotateY: index % 2 ? -10 : 10, y: -7 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
            >
              <span className="cube-number">{pad2(index + 1)}</span>
              <i className={`fas fa-${feature.icon}`} />
              <strong>{feature.title}</strong>
              <span className="cube-glow" />
            </motion.button>
          ))}
        </div>
        <motion.div className="feature-detail" key={selected.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <div className="feature-shot">
            <img src={selected.image} alt={`${selected.title} screenshot`} />
          </div>
          <div className="feature-copy">
            <span className="mono-label">{selected.title}</span>
            <p>{selected.description}</p>
            <div className="feature-tech">
              {selected.tech.map((item) => (
                <b key={item}>{item}</b>
              ))}
            </div>
            <pre><code>{selected.snippet}</code></pre>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mission-layout">
      <div className="mission-selector">
        {features.map((feature, index) => (
          <motion.button
            key={feature.title}
            className={`mission-card ${index === active ? "is-active" : ""}`}
            onClick={() => setActive(index)}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <span className="mission-card-index">{pad2(index + 1)}</span>
            <i className={`fas fa-${feature.icon}`} />
            <strong>{feature.title}</strong>
            <span className="mission-card-glow" aria-hidden="true" />
          </motion.button>
        ))}
      </div>

      <div className="mission-preview">
        <div className="mission-device">
          <div className="mission-device-topbar"><span /><span /><span /></div>
          <AnimatePresence mode="wait">
            <motion.img
              key={selected.image}
              src={selected.image}
              alt={selected.title}
              initial={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>
          <div className="mission-device-scanline" aria-hidden="true" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected.title}
            className="mission-copy"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <span className="mono-label">{selected.title}</span>
            <p>{selected.description}</p>
            <div className="mission-tech">
              {selected.tech.map((item) => (
                <b key={item}>{item}</b>
              ))}
            </div>
            <pre><code>{selected.snippet}</code></pre>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}