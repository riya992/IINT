export interface InquiryFormInput {
  name: string;
  email: string;
  vision: string;
  program: string;
  archetype: string;
}

export interface SavedApplication {
  id: string;
  name: string;
  email: string;
  vision: string;
  program: string;
  archetype: string;
  status: "Reviewing" | "Interview Scheduled" | "Accepted";
  submittedAt: string;
}

export interface ResearchNode {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  fidelity: number;
  tags: string[];
}

export interface ProgramArchetype {
  id: string;
  name: string;
  description: string;
  courses: string[];
  duration: string;
  icon: string;
}
