import { FeatureExplorer } from "./FeatureExplorer";
import "./FeatureTimeline.css";

export function FeatureTimeline({ projectName }: { projectName: string }) {
  return <FeatureExplorer projectName={projectName} variant="timeline" />;
}