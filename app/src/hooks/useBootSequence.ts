import { create } from "zustand";

export type BootPhase =
  | "checklist" // system-check lines ticking through
  | "reveal" // camera pulls back, garage doors open, vehicles + city + name appear
  | "done"; // boot overlay fully gone, normal site interactive

interface BootState {
  phase: BootPhase;
  skipped: boolean;
  setPhase: (p: BootPhase) => void;
  skip: () => void;
}

const SESSION_KEY = "bootSequencePlayed";

// If it already played once this session (e.g. user navigated back to the
// site, or a hot reload in dev), don't replay the ~6s cinematic — go
// straight to the interactive site same as clicking Skip.
const alreadyPlayed = typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1";

export const useBootStore = create<BootState>((set) => ({
  phase: alreadyPlayed ? "done" : "checklist",
  skipped: alreadyPlayed,
  setPhase: (p) => {
    if (p === "done" && typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "1");
    }
    set({ phase: p });
  },
  skip: () => {
    if (typeof window !== "undefined") sessionStorage.setItem(SESSION_KEY, "1");
    set({ phase: "done", skipped: true });
  },
}));
