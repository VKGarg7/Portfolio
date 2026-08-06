import { motion } from "framer-motion";

interface DetailSectionHeadingProps {
  label: string;
  title: string;
}

/**
 * Shared animated section heading used across all case-study detail
 * sections. Encapsulates the standard fade-up scroll-reveal animation.
 */
export function DetailSectionHeading({ label, title }: DetailSectionHeadingProps) {
  return (
    <motion.div
      className="detail-section-heading"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="mono-label">{label}</span>
      <h2>{title}</h2>
    </motion.div>
  );
}