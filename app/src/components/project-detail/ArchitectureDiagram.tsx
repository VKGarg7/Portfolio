import { motion } from "framer-motion";
import type { CaseStudy } from "../../data/content";
import { DetailSectionHeading } from "./DetailSectionHeading";
import { pad2 } from "../../lib/format";

export function ArchitectureDiagram({ cs }: { cs: CaseStudy }) {
  return (
    <section id="architecture" className="detail-section">
      <DetailSectionHeading label="SYSTEM ARCHITECTURE" title="Five layers, one request at a time." />

      <div className="arch-stack">
        {cs.architectureLayers.map((layer, i) => (
          <motion.div
            key={layer.name}
            className="arch-layer"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="arch-layer-node">
              <span className="arch-layer-index">{pad2(i + 1)}</span>
              <div>
                <strong>{layer.name}</strong>
                <p>{layer.detail}</p>
              </div>
            </div>
            {i < cs.architectureLayers.length - 1 && (
              <span className="arch-layer-connector" aria-hidden="true">
                <span className="arch-layer-pulse" />
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
