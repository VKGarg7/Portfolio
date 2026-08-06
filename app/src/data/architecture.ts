export interface ArchLayer {
  id: string;
  label: string;
  sub: string;
  icon: string;
  items: string[];
}

// Three tiers, top to bottom: what a request touches on its way through a
// typical build — mirrors the stack described in About/Skills but framed as
// a system diagram rather than a per-skill inventory.
export const architectureLayers: ArchLayer[] = [
  {
    id: "client",
    label: "CLIENT LAYER",
    sub: "What the user touches",
    icon: "display",
    items: ["React / Next.js", "Tailwind CSS", "Responsive, mobile-first UI"],
  },
  {
    id: "service",
    label: "SERVICE LAYER",
    sub: "Business logic & APIs",
    icon: "server",
    items: ["FastAPI (Python)", "Spring Boot 3 (Java)", "Node.js / Express", "REST APIs, JWT auth, microservices"],
  },
  {
    id: "data",
    label: "DATA LAYER",
    sub: "State that outlives a request",
    icon: "database",
    items: ["PostgreSQL", "MongoDB", "Schema design, indexing, normalization"],
  },
];

export const architectureFlow = [
  "Client sends a request",
  "Service layer authenticates, validates, and applies business rules",
  "Data layer persists or retrieves state",
  "Response flows back through the same path",
];
