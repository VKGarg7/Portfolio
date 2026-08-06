import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useChapterStore } from "../hooks/useChapterNav";

interface ChapterStageProps {
  index: number;
  children: ReactNode;
}

/**
 * Renders one chapter's DOM content as a full-viewport "room". Only the
 * active chapter (plus whichever chapter is animating in/out) stays
 * mounted — everything else is unrendered entirely, so there's no
 * continuous scroll track and no stacked/overlapping content between
 * chapters.
 *
 * `wasActive` tracks this element's animation state across renders and must
 * only ever be reset to null when the element actually leaves the DOM
 * (isMounted -> false) or on a genuine unmount — NOT in a per-render effect
 * cleanup. An effect's cleanup runs before every re-invocation, not just on
 * unmount, so mutating a ref there to "undo" the previous run permanently
 * clobbers state on every legitimate transition (isActive: true -> false
 * would see `previous` reset to null right before the exit-tween branch
 * checks it, and the exit tween would silently never fire).
 */
export function ChapterStage({ index, children }: ChapterStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const wasActive = useRef<boolean | null>(null);
  const activeIndex = useChapterStore((s) => s.index);
  const isActive = activeIndex === index;
  const isAdjacent = Math.abs(activeIndex - index) === 1;
  const isMounted = isActive || isAdjacent;

  useLayoutEffect(() => {
    if (!isMounted) {
      wasActive.current = null;
      return;
    }

    const el = ref.current;
    if (!el) return;

    const previous = wasActive.current;

    if (previous === null) {
      // First commit where this element actually exists in the DOM: snap
      // to the correct resting state synchronously (no animation) so
      // there's no flash, then play the enter tween only if it mounted as
      // the active chapter.
      if (isActive) {
        gsap.set(el, { autoAlpha: 0, y: 50, rotateX: -6, scale: 0.96 });
        gsap.to(el, { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.25 });
      } else {
        gsap.set(el, { autoAlpha: 0 });
      }
    } else if (isActive && !previous) {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 50, rotateX: -6, scale: 0.96 },
        { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.25 }
      );
    } else if (!isActive && previous) {
      gsap.to(el, { autoAlpha: 0, y: -40, rotateX: 6, scale: 0.97, duration: 0.5, ease: "power2.in" });
    }

    wasActive.current = isActive;
  }, [isActive, isMounted]);

  if (!isMounted) return null;

  return (
    <div
      ref={ref}
      className="chapter-stage"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: isActive ? 2 : 1,
        pointerEvents: isActive ? "auto" : "none",
        perspective: "1600px",
      }}
    >
      {children}
    </div>
  );
}
