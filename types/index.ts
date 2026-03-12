// Navigation
export interface NavItem {
  name: string;
  href: string;
}

// Projects
export interface Project {
  title: string;
  desc: string;
  tags: string[];
  link: string;
  github: string;
}

// Experience
export interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  desc: string[];
  color: string;
}

// Skills
export interface Skill {
  name: string;
  icon?: string;
  category?: 'language' | 'framework' | 'tool' | 'other';
}

// Social Links
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// Hero Data
export interface HeroData {
  title: string;
  name: string;
  typingTexts: string[];
}

// Section common props
export interface SectionProps {
  id?: string;
  className?: string;
}

// Animation variants
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: [number, number, number, number];
}

// Base component interface
export interface SectionComponent {
  (props: SectionProps): React.ReactNode;
}

// Theme
export type Theme = 'dark' | 'light';

// Hook return types
export interface UseTypingResult {
  displayedText: string;
  isTyping: boolean;
}

export interface UseThemeResult {
  theme: Theme;
  toggleTheme: () => void;
}

export interface UseMousePositionResult {
  x: number;
  y: number;
}

// Data provider context
export interface PortfolioData {
  navItems: NavItem[];
  projects: Project[];
  experiences: ExperienceItem[];
  skills: Skill[];
  socialLinks: SocialLink[];
  heroData: HeroData;
}
