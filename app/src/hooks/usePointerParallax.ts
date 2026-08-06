import { useRef, useState, type MouseEvent } from "react";

/**
 * Shared normalized mouse-parallax tracking hook.
 * Returns a ref to attach to the container element, the normalized pointer
 * position (-1..1), and handlers to wire up onMouseMove / onMouseLeave.
 */
export function usePointerParallax(scale = 2) {
  const ref = useRef<HTMLElement | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  function onMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * scale,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * scale,
    });
  }

  function onMouseLeave() {
    setPointer({ x: 0, y: 0 });
  }

  return { ref, pointer, onMouseMove, onMouseLeave };
}