import { motion } from "framer-motion";
import { useState } from "react";
import type { CaseStudy, DbTable } from "../../data/content";
import { DetailSectionHeading } from "./DetailSectionHeading";

function tableCenter(table: DbTable) {
  return { x: table.x, y: table.y };
}

export function DatabaseDiagram({ cs }: { cs: CaseStudy }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const tableById = new Map(cs.dbTables.map((t) => [t.id, t]));

  return (
    <section id="database" className="detail-section">
      <DetailSectionHeading label="DATABASE DESIGN" title="A normalized schema that scales past 130K records." />

      <div className="er-diagram">
        <svg className="er-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {cs.dbRelations.map((rel) => {
            const from = tableById.get(rel.from);
            const to = tableById.get(rel.to);
            if (!from || !to) return null;
            const a = tableCenter(from);
            const b = tableCenter(to);
            const midX = (a.x + b.x) / 2;
            const isActive = hovered === rel.from || hovered === rel.to;
            return (
              <path
                key={`${rel.from}-${rel.to}`}
                d={`M ${a.x} ${a.y} Q ${midX} ${(a.y + b.y) / 2} ${b.x} ${b.y}`}
                className={`er-line ${isActive ? "is-active" : ""}`}
                fill="none"
              />
            );
          })}
        </svg>

        {cs.dbTables.map((table) => (
          <motion.div
            key={table.id}
            className={`er-table ${hovered === table.id ? "is-hovered" : ""}`}
            style={{ left: `${table.x}%`, top: `${table.y}%` }}
            onMouseEnter={() => setHovered(table.id)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.4 }}
          >
            <span className="er-table-name">{table.name}</span>
            <div className="er-table-columns">
              {table.columns.map((col) => (
                <div key={col.name} className={`er-column ${col.key ?? ""}`}>
                  <span>{col.name}</span>
                  <b>{col.type}</b>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
