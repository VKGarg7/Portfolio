import { useEffect, useState } from "react";

export interface DetailNavSection {
  id: string;
  label: string;
}

interface DetailNavProps {
  sections: DetailNavSection[];
  scrollRootRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Sticky side navigation with active-section highlighting, driven by an
 * IntersectionObserver scoped to the page's own scroll container (the
 * detail overlay owns its own scroll, not the window).
 */
export function DetailNav({ sections, scrollRootRef }: DetailNavProps) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { root, threshold: [0.3, 0.5, 0.7], rootMargin: "-10% 0px -40% 0px" }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections, scrollRootRef]);

  function handleClick(id: string) {
    const root = scrollRootRef.current;
    const el = document.getElementById(id);
    if (!root || !el) return;
    root.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
  }

  return (
    <nav className="detail-nav" aria-label="Case study sections">
      {sections.map((section) => (
        <button
          key={section.id}
          className={`detail-nav-item ${active === section.id ? "is-active" : ""}`}
          onClick={() => handleClick(section.id)}
        >
          <span className="detail-nav-dot" />
          <span className="detail-nav-label">{section.label}</span>
        </button>
      ))}
    </nav>
  );
}
