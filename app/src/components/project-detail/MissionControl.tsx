import { FeatureExplorer } from "../FeatureExplorer";
import { DetailSectionHeading } from "./DetailSectionHeading";

export function MissionControl({ projectName }: { projectName: string }) {
  return (
    <section id="mission-control" className="detail-section detail-mission">
      <DetailSectionHeading label="MISSION CONTROL" title="Select a system to inspect." />
      <FeatureExplorer projectName={projectName} />
    </section>
  );
}