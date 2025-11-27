export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface DockerCommand {
  title: string;
  command: string;
  description: string;
}

export interface FooterLink {
  title: string;
  url: string;
}

export interface FooterSection {
  heading: string;
  links: FooterLink[];
}

export type TabType = "overview" | "commands" | "concepts" | "commands-reference" | "tasks";

export interface DockerConcept {
  icon: string;
  title: string;
  description: string;
  example?: string;
  docsLink?: string;
}

export interface DockerCommandItem {
  title: string;
  command: string;
  description: string;
  examples?: string[];
}

export interface DockerCommandCategory {
  icon: string;
  category: string;
  commands: DockerCommandItem[];
}
