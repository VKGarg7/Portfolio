export const hero = {
  name: "Vansh Kumar Garg",
  role: "Software Engineer",
  tagline:
    "Backend-focused engineer building production APIs and full-stack systems with FastAPI, PostgreSQL & React",
  stack: [
    "Python",
    "FastAPI",
    "Java · Spring Boot",
    "Node.js · Express",
    "React · Next.js",
    "PostgreSQL",
    "MongoDB",
    "Docker",
  ],
};

export const about = {
  lede: "I'm Vansh — a Software Engineer with production experience building REST APIs and relational data systems on a live commercial ATS platform, who likes taking systems apart to understand how they really work.",
  ledeSecondary:
    "I care about writing code that's fast, reliable, and easy for the next person to reason about — the same qualities I look for in anything mechanical.",
  stats: [
    { num: "800+", unit: "LeetCode + GFG Solved" },
    { num: "15+", unit: "Production APIs Shipped" },
    { num: "6", unit: "Full-Stack Builds" },
    { num: "100%", unit: "Deployed & Live" },
  ],
  meta: [
    { label: "DRIVER ID", value: "VANSH" },
    { label: "CLASS", value: "SOFTWARE ENGINEER" },
    { label: "SPECIALIZATION", value: "FULL-STACK / BACKEND" },
    { label: "LOCATION", value: "Punjab, India" },
    { label: "EXPERIENCE", value: "Software Developer Intern @ EllocentLabs" },
    { label: "CURRENT FOCUS", value: "FastAPI · PostgreSQL · System Design" },
    { label: "PASSION", value: "CODE / CARS / BIKES" },
  ],
  detail:
    "I'm a Software Engineer with production experience building REST APIs and relational data systems in Python (FastAPI) and SQL (PostgreSQL) — including async processing, schema design, and auth flows on a live commercial ATS platform at EllocentLabs. I also work with Java/Spring Boot and full-stack development, and I'm comfortable owning projects end-to-end across Agile sprint cycles. Currently pursuing Computer Science and Business Systems at Thapar Institute of Engineering and Technology (CGPA 8.07), I actively strengthen my problem-solving skills through DSA practice, with 800+ problems solved across LeetCode and GeeksforGeeks.",
};

export interface ProfileCard {
  id: string;
  label: string;
  icon: string;
  lines: { primary: string; secondary?: string }[];
}

// Feeds the Garage chapter's rotating card stack — one card per facet of
// the profile, cycling Experience -> Education -> Achievements -> Location
// -> Current Focus.
export const profileCards: ProfileCard[] = [
  {
    id: "experience",
    label: "Experience",
    icon: "briefcase",
    lines: [
      { primary: "Software Developer Intern", secondary: "EllocentLabs · Feb 2026 – Present" },
      { primary: "15+ production REST APIs shipped", secondary: "Talent Pool, Bulk Import, Job Adder modules" },
    ],
  },
  {
    id: "education",
    label: "Education",
    icon: "graduation-cap",
    lines: [
      { primary: "B.E. Computer Science & Business Systems", secondary: "Thapar Institute of Engineering and Technology" },
      { primary: "CGPA 8.07" },
    ],
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: "trophy",
    lines: [
      { primary: "800+ problems solved", secondary: "LeetCode + GeeksforGeeks" },
      { primary: "15+ production APIs shipped" },
      { primary: "6 full-stack builds, 100% deployed & live" },
    ],
  },
  {
    id: "location",
    label: "Location",
    icon: "location-dot",
    lines: [{ primary: "Punjab, India" }, { primary: "Open to remote & relocation" }],
  },
  {
    id: "focus",
    label: "Current Focus",
    icon: "crosshairs",
    lines: [
      { primary: "FastAPI · PostgreSQL · System Design" },
      { primary: "Shipping production backend systems" },
    ],
  },
];

export type SkillLevel = "primary" | "production" | "experienced" | "working";

export interface SkillModule {
  id: string;
  name: string;
  sub: string;
  icon: string;
  items: { label: string; level: SkillLevel }[];
  telemetry: { label: string; target: number; unit: string };
}

export const skillModules: SkillModule[] = [
  {
    id: "engine",
    name: "ENGINE",
    sub: "Core Programming",
    icon: "cog",
    items: [
      { label: "Python", level: "primary" },
      { label: "SQL", level: "primary" },
      { label: "Java", level: "primary" },
      { label: "JavaScript / TypeScript", level: "primary" },
      { label: "C++", level: "working" },
    ],
    telemetry: { label: "THROUGHPUT", target: 800, unit: "DSA problems solved" },
  },
  {
    id: "transmission",
    name: "TRANSMISSION",
    sub: "Backend Systems",
    icon: "server",
    items: [
      { label: "FastAPI / Python", level: "production" },
      { label: "Spring Boot 3 / Spring Security", level: "production" },
      { label: "Node.js / Express.js", level: "production" },
      { label: "REST APIs / JWT / Microservices", level: "production" },
    ],
    telemetry: { label: "LOAD", target: 15, unit: "production APIs shipped" },
  },
  {
    id: "control",
    name: "CONTROL UNIT",
    sub: "Frontend",
    icon: "microchip",
    items: [
      { label: "React / Next.js", level: "production" },
      { label: "Tailwind CSS", level: "production" },
      { label: "HTML / CSS", level: "primary" },
    ],
    telemetry: { label: "RESPONSE", target: 100, unit: "% responsive builds shipped" },
  },
  {
    id: "telemetry",
    name: "TELEMETRY",
    sub: "Databases",
    icon: "database",
    items: [
      { label: "PostgreSQL", level: "production" },
      { label: "MySQL", level: "experienced" },
      { label: "MongoDB", level: "production" },
      { label: "Schema Design / Normalization / Indexing", level: "experienced" },
    ],
    telemetry: { label: "QUERIES", target: 3, unit: "core database engines" },
  },
  {
    id: "toolkit",
    name: "TOOLKIT",
    sub: "Developer Tools",
    icon: "toolbox",
    items: [
      { label: "Docker / GitHub Actions (CI)", level: "experienced" },
      { label: "Postman / Swagger / OpenAPI", level: "experienced" },
      { label: "Stripe API", level: "experienced" },
      { label: "Git", level: "primary" },
    ],
    telemetry: { label: "UPTIME", target: 100, unit: "% deployed & live" },
  },
];

export interface ExperienceEntry {
  tag: string;
  title: string;
  company?: string;
  duration: string;
  tech?: string[];
  bullets?: string[];
  desc?: string;
  active: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    tag: "CHECKPOINT — ACTIVE",
    title: "Software Developer Intern",
    company: "EllocentLabs",
    duration: "Feb 2026 – Present",
    tech: ["Python", "FastAPI", "PostgreSQL", "REST APIs"],
    bullets: [
      "Shipped 15+ production REST APIs across the Talent Pool, Bulk Import, and Job Adder modules of a live ATS platform, independently designing endpoints, database schemas, and auth flows in Python, FastAPI, and PostgreSQL within a service-oriented architecture.",
      "Eliminated request timeouts on large resume batches by re-architecting bulk upload from a synchronous call into an asynchronous worker with per-file status tracking, removing a recurring production failure point.",
      "Reduced duplicate candidate records to zero on re-import by writing SQL-based email-match upsert logic that updates existing profiles instead of inserting duplicates.",
      "Removed a full manual data-entry step for recruiters by reworking the Add-Candidate-to-Job flow to parse resumes server-side in Python and auto-prefill the candidate form.",
      "Built a non-blocking, cursor-paginated activity-logging service in Python to improve debuggability and audit visibility across all platform modules, merged after peer review in Agile/Scrum sprints.",
    ],
    active: true,
  },
  {
    tag: "NEXT STOP",
    title: "Full-Time Software Engineer Role",
    duration: "Open to opportunities — Available now",
    desc: "Looking to join a team building production backend systems or full-stack products where I can keep shipping REST APIs, owning data models, and learning from senior engineers.",
    active: false,
  },
];

export type ProjectStatus = "LIVE" | "PRODUCTION" | "PROTOTYPE";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectTimelineStep {
  label: string;
  date: string;
}

// ---- Case-study content for the full cinematic project detail page ----
// Optional and currently populated only for CareerFlow (the flagship
// project with real production detail to show). Values here are
// extrapolated from the existing desc/achievement copy above — endpoint
// paths, table names, and step timings are reasonable inferences from
// that copy, not independently re-verified against the live codebase, so
// review for accuracy before treating them as exact.
export interface StackChip {
  label: string;
  category: "language" | "framework" | "database" | "infra" | "tooling";
}

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  summary: string;
  auth: boolean;
  sampleResponse: string;
}

export interface DbTable {
  id: string;
  name: string;
  columns: { name: string; type: string; key?: "pk" | "fk" }[];
  x: number; // layout position, 0-100 (%) within the ER diagram canvas
  y: number;
}
export interface DbRelation {
  from: string; // DbTable id
  to: string;
  label: string;
}

export interface AuthStep {
  actor: string;
  action: string;
}

export interface DeployStep {
  label: string;
  system: string;
  status: "done" | "active";
}

export interface PerformanceStat {
  label: string;
  value: string;
  detail: string;
}

export interface CaseStudy {
  valueProposition: string;
  heroMetrics: { label: string; value: number; suffix: string }[];
  stackChips: StackChip[];
  architectureLayers: { name: string; detail: string }[];
  apiEndpoints: ApiEndpoint[];
  dbTables: DbTable[];
  dbRelations: DbRelation[];
  authFlow: AuthStep[];
  deployPipeline: DeployStep[];
  performance: PerformanceStat[];
  decisions: { title: string; detail: string }[];
  lessons: string[];
}

export interface Project {
  index: string;
  bay: string; // "BAY 01" — the garage-bay call sign shown on the card
  name: string;
  tagline: string;
  image: string;
  images?: string[];
  cls: string;
  engine: string;
  systems: string;
  status: ProjectStatus;
  techStack: string[];
  metrics: ProjectMetric[];
  timeline: ProjectTimelineStep[];
  desc: string;
  achievement: string;
  detailsHref: string;
  githubHref: string;
  liveHref: string;
  liveLabel: string;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    index: "PROJECT 01",
    bay: "BAY 01",
    name: "CareerFlow",
    tagline: "A smart job application tracker built like production software.",
    image: "/images/careerflow/dashboard-1.png",
    cls: "Web Application",
    engine: "Java 17 / Spring Boot 3 / React",
    systems: "PostgreSQL / Docker / Swagger",
    status: "LIVE",
    techStack: ["Java 17", "Spring Boot 3", "React", "PostgreSQL", "Docker", "Swagger"],
    metrics: [
      { label: "API endpoints", value: "60+" },
      { label: "Records managed", value: "130K+" },
      { label: "Backend tests", value: "192" },
      { label: "DB entities", value: "15" },
    ],
    timeline: [
      { label: "Schema + auth design", date: "Week 1–2" },
      { label: "Core API build-out", date: "Week 3–6" },
      { label: "Test coverage + hardening", date: "Week 7–8" },
      { label: "Docker deploy — Render + Vercel", date: "Week 9" },
    ],
    desc: "A smart job application tracking platform — a 60+ endpoint REST API across 10 backend modules over a normalized 15-entity PostgreSQL schema, secured with JWT and Google OAuth2, covered by ~200 automated tests, with a React dashboard managing 130,000+ records — 35,000+ applications across 6,000+ companies, plus ~44,000 interviews and ~35,000 follow-ups.",
    achievement:
      "Secured the platform end-to-end with Spring Security — dual JWT + Google OAuth2 authentication, BCrypt hashing, database token blacklisting, role-based access control enforced at the API layer, and audit logging of every significant action — validated by 192 backend tests, with a multi-stage Docker build deployed independently to Render and Vercel.",
    detailsHref: "/project-careerflow.html",
    githubHref: "https://github.com/VKGarg7/CareerFlow",
    liveHref: "https://career-flow-chi.vercel.app",
    liveLabel: "Live Demo",
    caseStudy: {
      valueProposition: "One dashboard to run an entire job search like a pipeline — not a spreadsheet.",
      heroMetrics: [
        { label: "API endpoints", value: 60, suffix: "+" },
        { label: "Records managed", value: 130, suffix: "K+" },
        { label: "Backend tests", value: 192, suffix: "" },
        { label: "Uptime", value: 100, suffix: "%" },
      ],
      stackChips: [
        { label: "Java 17", category: "language" },
        { label: "Spring Boot 3", category: "framework" },
        { label: "Spring Security", category: "framework" },
        { label: "React", category: "framework" },
        { label: "PostgreSQL", category: "database" },
        { label: "Docker", category: "infra" },
        { label: "Render", category: "infra" },
        { label: "Vercel", category: "infra" },
        { label: "Swagger / OpenAPI", category: "tooling" },
        { label: "JWT + Google OAuth2", category: "tooling" },
      ],
      architectureLayers: [
        { name: "Client", detail: "React dashboard consuming a versioned REST API over HTTPS." },
        { name: "API Layer", detail: "Spring Boot 3 service exposing 60+ endpoints across 10 modules, documented in Swagger/OpenAPI." },
        { name: "Security Layer", detail: "Spring Security filter chain — dual JWT + Google OAuth2, BCrypt hashing, DB-backed token blacklisting, role-based access control." },
        { name: "Data Layer", detail: "PostgreSQL, 15-entity normalized schema, managing 130,000+ records." },
        { name: "Infrastructure", detail: "Multi-stage Docker build; API deployed to Render, client deployed to Vercel." },
      ],
      apiEndpoints: [
        { method: "POST", path: "/api/auth/login", summary: "Authenticate with email/password, issue JWT", auth: false, sampleResponse: '{ "token": "eyJhbGciOi...", "expiresIn": 3600 }' },
        { method: "POST", path: "/api/auth/oauth/google", summary: "Exchange Google OAuth2 code for a session", auth: false, sampleResponse: '{ "token": "eyJhbGciOi...", "user": { "email": "..." } }' },
        { method: "GET", path: "/api/applications", summary: "Paginated, filterable application feed", auth: true, sampleResponse: '{ "items": [...], "total": 35238, "page": 1 }' },
        { method: "POST", path: "/api/applications", summary: "Create a new job application record", auth: true, sampleResponse: '{ "id": 40021, "status": "APPLIED" }' },
        { method: "PATCH", path: "/api/interviews/{id}", summary: "Update interview stage + write audit event", auth: true, sampleResponse: '{ "id": 8821, "stage": "TECHNICAL_ROUND" }' },
        { method: "GET", path: "/api/companies/{id}/stats", summary: "Aggregate application stats for one company", auth: true, sampleResponse: '{ "applications": 12, "interviews": 4, "offers": 1 }' },
        { method: "DELETE", path: "/api/applications/{id}", summary: "Soft-delete an application, retained for audit log", auth: true, sampleResponse: '{ "deleted": true }' },
      ],
      dbTables: [
        { id: "users", name: "users", x: 8, y: 12, columns: [{ name: "id", type: "bigint", key: "pk" }, { name: "email", type: "varchar" }, { name: "role", type: "varchar" }] },
        { id: "applications", name: "applications", x: 42, y: 8, columns: [{ name: "id", type: "bigint", key: "pk" }, { name: "user_id", type: "bigint", key: "fk" }, { name: "company_id", type: "bigint", key: "fk" }, { name: "status", type: "varchar" }] },
        { id: "companies", name: "companies", x: 76, y: 12, columns: [{ name: "id", type: "bigint", key: "pk" }, { name: "name", type: "varchar" }, { name: "domain", type: "varchar" }] },
        { id: "interviews", name: "interviews", x: 20, y: 55, columns: [{ name: "id", type: "bigint", key: "pk" }, { name: "application_id", type: "bigint", key: "fk" }, { name: "stage", type: "varchar" }, { name: "scheduled_at", type: "timestamp" }] },
        { id: "followups", name: "followups", x: 55, y: 62, columns: [{ name: "id", type: "bigint", key: "pk" }, { name: "application_id", type: "bigint", key: "fk" }, { name: "due_at", type: "timestamp" }] },
        { id: "audit_log", name: "audit_log", x: 84, y: 55, columns: [{ name: "id", type: "bigint", key: "pk" }, { name: "user_id", type: "bigint", key: "fk" }, { name: "action", type: "varchar" }, { name: "created_at", type: "timestamp" }] },
      ],
      dbRelations: [
        { from: "users", to: "applications", label: "1—N" },
        { from: "companies", to: "applications", label: "1—N" },
        { from: "applications", to: "interviews", label: "1—N" },
        { from: "applications", to: "followups", label: "1—N" },
        { from: "users", to: "audit_log", label: "1—N" },
      ],
      authFlow: [
        { actor: "Client", action: "Submit credentials or Google OAuth2 consent" },
        { actor: "API", action: "Validate credentials / exchange OAuth2 code" },
        { actor: "Spring Security", action: "Issue signed JWT, hash + store refresh token" },
        { actor: "Client", action: "Attach JWT as Bearer token on every request" },
        { actor: "API", action: "Verify signature, check DB token blacklist, enforce role-based access" },
        { actor: "API", action: "Write audit log entry for the authenticated action" },
      ],
      deployPipeline: [
        { label: "Push to main", system: "GitHub", status: "done" },
        { label: "Multi-stage Docker build", system: "GitHub Actions", status: "done" },
        { label: "Deploy API container", system: "Render", status: "done" },
        { label: "Deploy React client", system: "Vercel", status: "done" },
        { label: "Health check + live", system: "Render / Vercel", status: "active" },
      ],
      performance: [
        { label: "Backend tests", value: "192", detail: "Automated coverage across auth, data, and API layers" },
        { label: "Records managed", value: "130K+", detail: "35K+ applications, 44K+ interviews, 35K+ follow-ups" },
        { label: "API surface", value: "60+ endpoints", detail: "Across 10 backend modules" },
        { label: "Uptime", value: "100%", detail: "Deployed and live since launch" },
      ],
      decisions: [
        { title: "Dual JWT + OAuth2 over sessions", detail: "Chose stateless JWT auth (with DB-backed blacklisting for revocation) plus Google OAuth2 as an alternate login path, so the API stays horizontally scalable without sticky sessions." },
        { title: "Normalized 15-entity schema", detail: "Modeled applications, companies, interviews, and follow-ups as separate related entities rather than a denormalized flat table, trading some query complexity for data integrity at 130K+ record scale." },
        { title: "Independent deploys — Render + Vercel", detail: "Split API and client into separately deployed services so the frontend can ship UI changes without redeploying the backend, and vice versa." },
      ],
      lessons: [
        "Audit logging every significant action paid for itself immediately during debugging — being able to replay exactly what happened to a record beats guessing from application state alone.",
        "Role-based access control enforced at the API layer (not just hidden in the UI) is the only version that actually holds up under direct API calls.",
        "Writing the 192-test suite alongside the API modules — not after — caught schema/auth regressions before they reached the Swagger docs, not after.",
      ],
    },
  },
  {
    index: "PROJECT 02",
    bay: "BAY 02",
    name: "FinPilot AI",
    tagline: "An AI financial coach grounded in deterministic math, not guesses.",
    image: "/images/finpilot/home.png",
    cls: "AI Platform",
    engine: "Next.js / Spring Boot 3 / FastAPI",
    systems: "PostgreSQL / LangGraph / Qdrant",
    status: "PROTOTYPE",
    techStack: ["Next.js", "Spring Boot 3", "FastAPI", "PostgreSQL", "LangGraph", "Qdrant"],
    metrics: [
      { label: "Spec features", value: "501" },
      { label: "Modules", value: "35" },
      { label: "Backlog tickets", value: "32" },
      { label: "Spec documents", value: "6" },
    ],
    timeline: [
      { label: "Product spec + PRD", date: "Phase 1" },
      { label: "Multi-agent AI design", date: "Phase 2" },
      { label: "Deterministic compute layer", date: "Phase 3" },
      { label: "Prototype UI + reasoning layer", date: "Phase 4" },
    ],
    desc: "An AI-powered personal financial intelligence platform aggregating accounts, cards, investments, loans, and insurance into a single AI coaching layer — specified across a 6-document, 500+ feature product spec and built on deterministic, non-hallucinated calculations rather than free-form LLM output.",
    achievement:
      "Authored a full enterprise-grade specification suite — 501 features across 35 modules, PRD, 32-ticket backlog, multi-agent AI design, screen-level UX and testing docs — then designed a multi-service architecture separating deterministic financial computation (Java/Spring Boot) from the AI reasoning layer (Python/FastAPI/LangGraph).",
    detailsHref: "/project-finpilot.html",
    githubHref: "https://github.com/VKGarg7/FinPilot-AI",
    liveHref: "https://finpilot-ai-livid.vercel.app/",
    liveLabel: "Live Prototype",
  },
  {
    index: "PROJECT 03",
    bay: "BAY 03",
    name: "MovieTix",
    tagline: "Real-time seat locking so two people never buy the same seat.",
    image: "/images/movietix.png",
    cls: "Web Application",
    engine: "React / Node.js / Express",
    systems: "MongoDB / Stripe / Clerk",
    status: "LIVE",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Clerk"],
    metrics: [
      { label: "Payment flow", value: "Stripe" },
      { label: "Auth provider", value: "Clerk" },
      { label: "Booking model", value: "Real-time" },
      { label: "Admin dashboard", value: "Yes" },
    ],
    timeline: [
      { label: "Seat map + booking model", date: "Week 1" },
      { label: "Stripe checkout integration", date: "Week 2" },
      { label: "Webhooks + confirmations", date: "Week 3" },
      { label: "Admin dashboard + launch", date: "Week 4" },
    ],
    desc: "A full-stack movie ticket booking platform with real-time seat selection, secure Stripe payments, and a responsive UI. Includes user authentication via Clerk, automated booking confirmations via webhooks, and an admin dashboard.",
    achievement: "Real-time seat-locking during checkout to prevent double-booking under concurrent demand.",
    detailsHref: "/project-movietix.html",
    githubHref: "https://github.com/VKGarg7/MovieTix",
    liveHref: "https://movietix-rho.vercel.app/",
    liveLabel: "Live Demo",
  },
  {
    index: "PROJECT 04",
    bay: "BAY 04",
    name: "Food Delivery",
    tagline: "One backend, three roles, zero permission leaks.",
    image: "/images/food-delivery.webp",
    cls: "Web Application",
    engine: "React / Redux Toolkit / Node.js",
    systems: "Express / MongoDB / Stripe",
    status: "LIVE",
    techStack: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Stripe"],
    metrics: [
      { label: "User roles", value: "3" },
      { label: "Menu updates", value: "Real-time" },
      { label: "Checkout", value: "Stripe" },
      { label: "Access control", value: "Role-based" },
    ],
    timeline: [
      { label: "Role system design", date: "Week 1" },
      { label: "Menu + ordering flow", date: "Week 2" },
      { label: "Stripe checkout", date: "Week 3" },
      { label: "Delivery agent flow + launch", date: "Week 4" },
    ],
    desc: "A full-stack food delivery app with real-time menu updates, secure checkout, and role-based access for customers, restaurants, and delivery agents, backed by Stripe payment integration.",
    achievement: "Built a three-way role system (customer / restaurant / delivery agent) sharing one backend without permission leaks.",
    detailsHref: "/project-fooddelivery.html",
    githubHref: "https://github.com/VKGarg7/Food_Delivery_Website",
    liveHref: "https://food-delivery-website-one-chi.vercel.app/",
    liveLabel: "Live Demo",
  },
  {
    index: "PROJECT 05",
    bay: "BAY 05",
    name: "E-Commerce",
    tagline: "A mobile-first storefront that reflows without losing hierarchy.",
    image: "/images/ecom.png",
    cls: "Frontend Storefront",
    engine: "React / JavaScript",
    systems: "HTML / CSS / Tailwind",
    status: "LIVE",
    techStack: ["React", "JavaScript", "HTML", "CSS", "Tailwind"],
    metrics: [
      { label: "Layout", value: "Mobile-first" },
      { label: "Grid breakpoints", value: "4→1 col" },
      { label: "Admin controls", value: "Yes" },
      { label: "Framework", value: "React" },
    ],
    timeline: [
      { label: "Component system", date: "Week 1" },
      { label: "Product + category views", date: "Week 2" },
      { label: "Responsive grid tuning", date: "Week 3" },
    ],
    desc: "A responsive e-commerce front-end featuring product listings, category views, and promotional displays — designed mobile-first with admin controls for real-time product updates.",
    achievement: "Mobile-first layout system that reflows cleanly from a 4-column grid down to single-column without losing hierarchy.",
    detailsHref: "/project-ecommerce.html",
    githubHref: "https://github.com/VKGarg7/E-commerce-website",
    liveHref: "https://vkgarg7.github.io/E-commerce-website/",
    liveLabel: "Live Demo",
  },
  {
    index: "PROJECT 06",
    bay: "BAY 06",
    name: "Amazon Clone",
    tagline: "Pixel-accurate UI replication, pure CSS, no framework.",
    image: "/images/amazon.png",
    cls: "UI Replication",
    engine: "HTML / CSS",
    systems: "Semantic HTML",
    status: "LIVE",
    techStack: ["HTML", "CSS"],
    metrics: [
      { label: "Framework", value: "None" },
      { label: "Fidelity", value: "Pixel-accurate" },
      { label: "Markup", value: "Semantic" },
      { label: "Responsive", value: "Yes" },
    ],
    timeline: [
      { label: "Layout structure", date: "Day 1–2" },
      { label: "Hover + interaction detail", date: "Day 3" },
      { label: "Responsive pass", date: "Day 4" },
    ],
    desc: "A responsive front-end clone of Amazon featuring a clean product layout, navbar, and hover interactions — built with semantic HTML and modern CSS techniques.",
    achievement: "Pixel-accurate UI replication using pure CSS, no component framework.",
    detailsHref: "/project-amazonclone.html",
    githubHref: "https://github.com/VKGarg7/amazon-clone",
    liveHref: "https://vkgarg7.github.io/amazon-clone/",
    liveLabel: "Live Demo",
  },
];

export const contact = {
  headline: "Let's Build The Next Machine.",
  subline: "Ready to bring your next project to life? Send a transmission or reach me directly.",
  quote: "Clean code. Great UX. Real results.",
  availability: "Open to Freelance · Remote · Internships · Full-Time",
  actions: [
    { label: "Email Me", icon: "envelope", href: "mailto:ivansh.garg4@gmail.com" },
    { label: "LinkedIn", icon: "linkedin", href: "https://linkedin.com/in/vansh-garg-bb5060202/" },
    { label: "GitHub", icon: "github", href: "https://github.com/VKGarg7" },
    { label: "Resume", icon: "file", href: "/Vansh_Kumar_Garg_Resume.pdf" },
    { label: "LeetCode", icon: "code", href: "https://leetcode.com/VKGarg/" },
  ],
};
