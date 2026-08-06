import { useEffect, useRef } from "react";
import { create } from "zustand";
import { useBootStore } from "./useBootSequence";

interface ChapterState {
  index: number;
  /** true while a chapter transition animation is playing — input is locked out */
  transitioning: boolean;
  setIndex: (i: number) => void;
  setTransitioning: (v: boolean) => void;
}

export const useChapterStore = create<ChapterState>((set) => ({
  index: 0,
  transitioning: false,
  setIndex: (i) => set({ index: i }),
  setTransitioning: (v) => set({ transitioning: v }),
}));

const TRANSITION_LOCK_MS = 1100;
const WHEEL_THRESHOLD = 24;
const SWIPE_THRESHOLD = 40;

let chapterCount = 1;
let navLocked = false;

/**
 * Lets a chapter (e.g. Projects) temporarily own wheel/touch/keyboard input
 * instead of it being converted into a whole-chapter jump — used for
 * cinematic scroll sequences that live *inside* a single chapter. While a
 * capture handler is registered, gestures are routed to it; it returns
 * true if it consumed the gesture, or false to signal "let the global
 * chapter navigator handle this instead" (used at the first/last item in
 * the internal sequence, to hand control back to normal chapter jumps).
 */
type ScrollCaptureHandler = (delta: number) => boolean;
let scrollCapture: ScrollCaptureHandler | null = null;

export function setScrollCapture(handler: ScrollCaptureHandler | null) {
  scrollCapture = handler;
}

/**
 * Jumps directly to an absolute chapter index (used by nav links / dot
 * indicators). Shares the same transition lock as gesture-driven navigation
 * so a click during an in-flight transition can't double-fire.
 */
export function goToChapter(index: number) {
  if (navLocked || useBootStore.getState().phase !== "done") return;
  const { index: current, setIndex, setTransitioning } = useChapterStore.getState();
  const next = Math.min(chapterCount - 1, Math.max(0, index));
  if (next === current) return;

  navLocked = true;
  setTransitioning(true);
  setIndex(next);
  window.setTimeout(() => {
    navLocked = false;
    useChapterStore.getState().setTransitioning(false);
  }, TRANSITION_LOCK_MS);
}

/**
 * Converts scroll/swipe/keyboard gestures into discrete chapter jumps
 * (index += 1 / -= 1), one full chapter per gesture — never a scrubbed
 * in-between value. Bind this once at the app root; it registers global
 * window listeners, so a second instance would double-fire every gesture.
 */
export function useChapterNav(count: number) {
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    chapterCount = count;
  }, [count]);

  useEffect(() => {
    function go(delta: number) {
      const { index } = useChapterStore.getState();
      goToChapter(index + delta);
    }

    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) { e.preventDefault(); return; }
      const delta = e.deltaY > 0 ? 1 : -1;
      if (scrollCapture && scrollCapture(delta)) { e.preventDefault(); return; }
      e.preventDefault();
      go(delta);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        if (scrollCapture && scrollCapture(1)) { e.preventDefault(); return; }
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (scrollCapture && scrollCapture(-1)) { e.preventDefault(); return; }
        e.preventDefault();
        go(-1);
      }
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0].clientY;
    }
    function onTouchEnd(e: TouchEvent) {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > SWIPE_THRESHOLD) {
        const dir = delta > 0 ? 1 : -1;
        if (!(scrollCapture && scrollCapture(dir))) go(dir);
      }
      touchStartY.current = null;
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);
}
