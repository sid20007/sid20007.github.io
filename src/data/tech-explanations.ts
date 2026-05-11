export interface TechExplanation {
  definition: string;
  context: string;
}

export const techExplanations: Record<string, TechExplanation> = {
  "Next.js": {
    definition: "React Framework",
    context: "Used for high-performance rendering and unified full-stack API architecture."
  },
  "Telegram Bot": {
    definition: "Conversational UI",
    context: "Chosen to deliver instant, low-latency commands and seamless mobile interaction."
  },
  "PostgreSQL": {
    definition: "Relational Database",
    context: "Provides robust, transaction-safe storage for patient records and family trees."
  },
  "JavaScript": {
    definition: "Dynamic Scripting",
    context: "Powers flexible automation and complex script logic for scraping actions."
  },
  "Playwright": {
    definition: "Automation Library",
    context: "Enables flawless headless browser actions to navigate student portals securely."
  },
  "Web Scraping": {
    definition: "Data Extraction",
    context: "Automates the manual process of logging in and extracting attendance history."
  },
  "Kotlin": {
    definition: "Native Android Language",
    context: "Guarantees lightweight, highly performance-efficient background execution."
  },
  "Android": {
    definition: "Mobile Platform",
    context: "Provides direct, low-level access to system-wide network status listeners."
  },
  "Networking": {
    definition: "Network Telemetry",
    context: "Leveraged to monitor active carrier network bands and detect 5G-to-4G drops."
  },
  "Go": {
    definition: "Systems Language",
    context: "Chosen for high-concurrency performance, low-latency execution, and robust network primitives."
  },
  "Distributed Systems": {
    definition: "Networked Architecture",
    context: "Deals with replication, fault tolerance, consistent hashing, and consensus protocols."
  },
  "DevOps": {
    definition: "Infrastructure & CI/CD",
    context: "Focused on zero-downtime schema migrations, cloud scaling, and containerized deployment pipelines."
  },
  "CRDT": {
    definition: "Conflict-Free Replicated Data Types",
    context: "Enables offline-first state sync and real-time collaboration without a coordinating server."
  },
  "TypeScript": {
    definition: "Typed JavaScript",
    context: "Guarantees runtime safety and clear, robust schemas for highly interactive user interfaces."
  },
  "Rust": {
    definition: "Safe Systems Language",
    context: "Used to build blazing-fast terminal renders with guaranteed memory safety and zero-cost abstractions."
  },
  "WebGPU": {
    definition: "Next-gen Graphics API",
    context: "Directly accesses hardware graphic acceleration to deliver ultra-smooth 120fps client renders."
  },
  "eBPF": {
    definition: "Kernel-level Probe Engine",
    context: "Permits sandboxed C programs to run inside the Linux kernel for zero-overhead telemetry collection."
  },
  "Observability": {
    definition: "Distributed Telemetry",
    context: "Deploys high-fidelity tracing and structural logging to diagnose deep production regressions."
  }
};
