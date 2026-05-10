export interface Tech {
  name: string;
  category: "language" | "frontend" | "backend" | "infrastructure" | "tool";
}

export const techStack: Tech[] = [
  { name: "TypeScript", category: "language" },
  { name: "Rust", category: "language" },
  { name: "Go", category: "language" },
  { name: "Python", category: "language" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Redis", category: "backend" },
  { name: "GraphQL", category: "backend" },
  { name: "Docker", category: "infrastructure" },
  { name: "AWS", category: "infrastructure" },
  { name: "Kubernetes", category: "infrastructure" },
  { name: "Terraform", category: "infrastructure" },
  { name: "Git", category: "tool" },
  { name: "Neovim", category: "tool" },
  { name: "Figma", category: "tool" },
  { name: "Linear", category: "tool" },
];

export const categories = [
  { key: "language" as const, label: "Languages" },
  { key: "frontend" as const, label: "Frontend" },
  { key: "backend" as const, label: "Backend" },
  { key: "infrastructure" as const, label: "Infrastructure" },
  { key: "tool" as const, label: "Tools" },
];