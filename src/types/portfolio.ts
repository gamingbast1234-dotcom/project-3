export interface PersonalInfo {
  name: string;
  tagline: string;
  professionalTitle: string;
  education: string;
  semester: string;
  location: string;
  email: string;
  githubUrl: string;
  instagramUrl: string;
  xUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  introduction: string;
  goal: string;
  heroPhoto: string;
  spotlightPhoto: string;
  workspacePhoto: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'programming' | 'web' | 'ai' | 'cloud' | 'tools';
  categoryLabel: string;
  level: string;
  proficiency: number; // 0 - 100
  experience: string;
  description: string;
  highlights: string[];
  icon: string;
  color: 'cyan' | 'purple' | 'blue' | 'indigo';
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  extendedDescription: string;
  category: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveDemoUrl?: string;
  hasInteractiveDemo?: boolean;
  features: string[];
  architectureNotes: string;
  metrics?: { label: string; value: string }[];
}

export interface Superpower {
  id: string;
  title: string;
  codename: string;
  tagline: string;
  description: string;
  perks: string[];
  stats: {
    logic: number;
    creativity: number;
    speed: number;
    curiosity: number;
  };
  color: string;
  accentHex: string;
  iconName: string;
}

export interface JourneyMilestone {
  step: number;
  title: string;
  period: string;
  category: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  summary: string;
  details: string[];
  technologies: string[];
}
