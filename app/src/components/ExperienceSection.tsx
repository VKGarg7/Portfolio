import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { AnimatedCountUp } from "./AnimatedCountUp";
import { pad2 } from "../lib/format";
import "./ExperienceSection.css";

type PitStop = { year: string; title: string; company: string; tech: string[]; achievement: string; stats: [number, string][] };
const pitStops: PitStop[] = [
  { year: "2022 - 2026", title: "Computer Science & Business Systems", company: "Thapar Institute of Engineering and Technology", tech: ["DSA", "Java", "Python", "System Design"], achievement: "Built the problem-solving foundation: 800+ LeetCode and GeeksforGeeks problems solved alongside full-stack product work.", stats: [[800, "Problems"], [8.07, "CGPA"], [6, "Builds"]] },
  { year: "2024 - 2026", title: "Independent Product Builder", company: "Production-grade personal projects", tech: ["React", "Spring Boot", "FastAPI", "Docker"], achievement: "Designed and shipped end-to-end applications spanning AI finance, job tracking, booking, commerce, and delivery workflows.", stats: [[6, "Projects"], [100, "% Live"], [501, "Features"]] },
  { year: "2026 - Present", title: "Software Developer Intern", company: "EllocentLabs", tech: ["Python", "FastAPI", "PostgreSQL", "REST APIs"], achievement: "Shipped production APIs, asynchronous import workflows, cursor-paginated logging, and reliable candidate data flows for a live ATS platform.", stats: [[15, "APIs"], [0, "Duplicates"], [130, "K Records"]] },
];

function Counter({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <strong>
        <AnimatedCountUp value={value} duration={900} decimals={value % 1 ? 2 : 0} />
      </strong>
      <span>{label}</span>
    </div>
  );
}

export function ExperienceSection() {
  const [active, setActive] = useState(2);
  return (
    <div className="scene" id="experience">
      <div className="scene-inner pit-section">
        <SectionHeading chapter="CHAPTER 06 - CAREER TIMELINE" title="F1 Pit Stop Log" />
        <p className="pit-intro">Every checkpoint adds another system, another lesson, and another lap of production engineering experience.</p>
        <div className="pit-timeline">
          {pitStops.map((stop, index) => {
            const expanded = active === index;
            return (
              <motion.article
                key={stop.title}
                className={`pit-stop ${expanded ? "is-expanded" : ""}`}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                initial={{ opacity: 0, x: index % 2 ? 35 : -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
              >
                <div className="pit-rail">
                  <span>{stop.year}</span>
                  <i />
                  <b />
                </div>
                <div className="pit-card glass-card">
                  <div className="pit-copy">
                    <p className="mono-label">CHECKPOINT {pad2(index + 1)} · {stop.year}</p>
                    <h3>{stop.title}</h3>
                    <h4>{stop.company}</h4>
                    <div className="pit-tech">
                      {stop.tech.map((tech) => (
                        <b key={tech}>{tech}</b>
                      ))}
                    </div>
                    {expanded && (
                      <motion.div className="pit-expanded" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                        <p>{stop.achievement}</p>
                        <div className="pit-stats">
                          {stop.stats.map(([value, label]) => (
                            <Counter key={label} value={value} label={label} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                    <span className="pit-expand">
                      {expanded ? "COLLAPSE" : "VIEW PIT DATA"} <i className={`fas fa-chevron-${expanded ? "up" : "down"}`} />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}