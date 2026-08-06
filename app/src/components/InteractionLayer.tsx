import { useEffect } from "react";

// hero .cta-btn buttons intentionally opt out of the magnetic/3D-tilt system —
// they use a single, restrained lift-on-hover instead (see HeroSection.css).
// they still get the cursor-tracked spotlight below, which is a legitimate,
// single-purpose touch consistent with Linear/Raycast-style surfaces.
const MAGNETIC_SELECTOR = ".btn, .contact-action";
const SPOTLIGHT_SELECTOR = ".btn, .contact-action, .cta-btn";
const MAGNETIC_RADIUS = 120;
const MAGNETIC_MAX_PULL = 12;
const SPRING_STIFFNESS = 0.18;
const SPRING_DAMPING = 0.72;

interface MagneticState {
  el: HTMLElement;
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function InteractionLayer() {
  useEffect(() => {
    const addRipple = (event: MouseEvent) => {
      const target = (event.target as Element).closest<HTMLElement>(".btn, .contact-action, .cta-btn, .system-node, .neural-node, .feature-cube");
      if (!target) return;
      // mount inside the clipped sheen/mask layer (if present) so the ripple is
      // contained to the button's rounded shape without clipping outward glow
      const mount = target.querySelector<HTMLElement>(":scope > .btn-sheen, :scope > .contact-action-sheen, :scope > .cta-btn-mask") ?? target;
      const ripple = document.createElement("span");
      const rect = target.getBoundingClientRect();
      ripple.className = "interaction-ripple";
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      mount.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    };
    document.addEventListener("click", addRipple);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches;
    if (reduceMotion) return () => document.removeEventListener("click", addRipple);

    const root = document.documentElement;
    const magnets = new Map<HTMLElement, MagneticState>();
    let rafId = 0;

    for (const el of document.querySelectorAll<HTMLElement>(MAGNETIC_SELECTOR)) {
      magnets.set(el, { el, targetX: 0, targetY: 0, x: 0, y: 0, vx: 0, vy: 0 });
    }

    const updatePointer = (event: PointerEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    // spotlight reflection across the glass surface, tracked while directly over the button;
    // hero .cta-btn only receives the light position, not the 3D tilt (see selector note above)
    const trackSpotlight = (event: PointerEvent) => {
      const target = (event.target as Element).closest<HTMLElement>(SPOTLIGHT_SELECTOR);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width;
      const ny = (event.clientY - rect.top) / rect.height;
      if (!target.classList.contains("cta-btn")) {
        target.style.setProperty("--tilt-x", `${(ny - .5) * -10}deg`);
        target.style.setProperty("--tilt-y", `${(nx - .5) * 10}deg`);
      }
      target.style.setProperty("--light-x", `${nx * 100}%`);
      target.style.setProperty("--light-y", `${ny * 100}%`);
    };

    // proximity-based magnetic pull: as the cursor nears a button (not just while over it),
    // the button drifts toward it, capped at MAGNETIC_MAX_PULL, eased with a spring simulation
    const updateMagneticTargets = (event: PointerEvent) => {
      for (const state of magnets.values()) {
        const rect = state.el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = event.clientX - cx;
        const dy = event.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const reach = MAGNETIC_RADIUS + Math.max(rect.width, rect.height) / 2;
        if (dist < reach) {
          const pull = (1 - dist / reach) * MAGNETIC_MAX_PULL;
          const angle = Math.atan2(dy, dx);
          state.targetX = Math.cos(angle) * pull;
          state.targetY = Math.sin(angle) * pull;
        } else {
          state.targetX = 0;
          state.targetY = 0;
        }
      }
    };

    const resetSpotlight = (event: PointerEvent) => {
      const target = (event.target as Element).closest<HTMLElement>(SPOTLIGHT_SELECTOR);
      if (!target) return;
      target.style.setProperty("--tilt-x", "0deg");
      target.style.setProperty("--tilt-y", "0deg");
    };

    const tick = () => {
      for (const state of magnets.values()) {
        const ax = (state.targetX - state.x) * SPRING_STIFFNESS;
        const ay = (state.targetY - state.y) * SPRING_STIFFNESS;
        state.vx = (state.vx + ax) * SPRING_DAMPING;
        state.vy = (state.vy + ay) * SPRING_DAMPING;
        state.x += state.vx;
        state.y += state.vy;
        state.el.style.setProperty("--magnetic-x", `${state.x.toFixed(2)}px`);
        state.el.style.setProperty("--magnetic-y", `${state.y.toFixed(2)}px`);
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointermove", updateMagneticTargets, { passive: true });
    document.addEventListener("pointermove", trackSpotlight, { passive: true });
    document.addEventListener("pointerout", resetSpotlight, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointermove", updateMagneticTargets);
      document.removeEventListener("click", addRipple);
      document.removeEventListener("pointermove", trackSpotlight);
      document.removeEventListener("pointerout", resetSpotlight);
      cancelAnimationFrame(rafId);
    };
  }, []);
  return <div className="cursor-spotlight" aria-hidden="true" />;
}
