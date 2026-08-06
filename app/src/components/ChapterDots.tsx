import { chapters } from "../data/chapters";
import { useChapterStore, goToChapter } from "../hooks/useChapterNav";
import "./ChapterDots.css";

export function ChapterDots() {
  const activeIndex = useChapterStore((s) => s.index);

  return (
    <div className="chapter-dots" aria-label="Chapter navigation">
      {chapters.map((c, i) => (
        <button
          key={c.id}
          className={`chapter-dot ${i === activeIndex ? "active" : ""}`}
          onClick={() => goToChapter(i)}
          aria-label={`Go to ${c.label}`}
          aria-current={i === activeIndex}
        >
          <span className="chapter-dot-mark" />
          <span className="chapter-dot-label">{c.label}</span>
        </button>
      ))}
    </div>
  );
}
