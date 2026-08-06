import { Experience } from "./scenes/Experience";
import { InteractionLayer } from "./components/InteractionLayer";
import { Nav } from "./components/Nav";
import { ChapterStage } from "./components/ChapterStage";
import { ChapterDots } from "./components/ChapterDots";
import { BootScreen } from "./components/BootScreen";
import { NameReveal } from "./components/NameReveal";
import { HeroSection } from "./components/HeroSection";
import { GarageSection } from "./components/GarageSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ArchitectureSection } from "./components/ArchitectureSection";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { useChapterNav } from "./hooks/useChapterNav";
import { useMouseParallax } from "./hooks/useMouseParallax";
import { useBootStore } from "./hooks/useBootSequence";
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { chapters } from "./data/chapters";

export default function App() {
  useChapterNav(chapters.length);
  const { target, smooth } = useMouseParallax();
  const reducedMotion = useReducedMotion();
  const bootPhase = useBootStore((s) => s.phase);

  // Boot cinematic locks page scroll/interaction with the chapter content
  // until it finishes — the chapter stages still mount underneath (chapter
  // 0 is visually identical to the tail of the reveal) so the handoff has
  // nothing to pop in.
  useBodyScrollLock(bootPhase !== "done");

  return (
    <>
      <InteractionLayer />
      <Experience mouse={target} mouseSmooth={smooth} reducedMotion={reducedMotion} />

      {bootPhase === "checklist" && <BootScreen reducedMotion={reducedMotion} />}
      {bootPhase === "reveal" && <NameReveal reducedMotion={reducedMotion} />}

      {bootPhase === "done" && (
        <>
          <Nav />
          <ChapterDots />

          <ChapterStage index={0}>
            <HeroSection />
          </ChapterStage>
          <ChapterStage index={1}>
            <GarageSection />
          </ChapterStage>
          <ChapterStage index={2}>
            <ProjectsSection />
          </ChapterStage>
          <ChapterStage index={3}>
            <ArchitectureSection />
          </ChapterStage>
          <ChapterStage index={4}>
            <SkillsSection />
          </ChapterStage>
          <ChapterStage index={5}>
            <ExperienceSection />
          </ChapterStage>
          <ChapterStage index={6}>
            <ContactSection />
          </ChapterStage>
        </>
      )}
    </>
  );
}
