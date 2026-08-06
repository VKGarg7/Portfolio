export interface ChapterWaypoint {
  id: string;
  label: string;
  /** Font Awesome icon name (without the fa- prefix), shown in the nav */
  icon: string;
  /** camera world position for this room */
  position: [number, number, number];
  /** point the camera looks at in this room */
  target: [number, number, number];
  fov: number;
}

// Each chapter is a distinct "room" the camera cuts/flies to — positions are
// spread out and reoriented (not just marching along +z) so consecutive
// chapters read as different spaces rather than one continuous corridor.
export const chapters: ChapterWaypoint[] = [
  { id: "hero", label: "Hero", icon: "house", position: [0, 0, 10], target: [0, 0, 0], fov: 50 },
  { id: "garage", label: "Garage", icon: "id-badge", position: [6, -1, 4], target: [1, -0.5, -3], fov: 45 },
  { id: "projects", label: "Projects", icon: "diagram-project", position: [-7, 1, 3], target: [-1, 0, -4], fov: 42 },
  { id: "architecture", label: "Architecture", icon: "layer-group", position: [0, 5, 6], target: [0, 0, -2], fov: 48 },
  { id: "skills", label: "Skills", icon: "gauge-high", position: [7, 2, -2], target: [1, 0.5, -6], fov: 44 },
  { id: "experience", label: "Experience", icon: "route", position: [-6, -2, -1], target: [-0.5, -0.5, -5], fov: 46 },
  { id: "contact", label: "Contact", icon: "satellite-dish", position: [0, 0, 8], target: [0, 0, -1], fov: 52 },
];
