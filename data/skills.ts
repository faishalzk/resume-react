import { Skill } from '@/types';

export const skills: Skill[] = [
  // Languages
  { name: "Python", category: 'language' },
  { name: "Java", category: 'language' },
  { name: "JavaScript", category: 'language' },
  { name: "TypeScript", category: 'language' },
  { name: "Go", category: 'language' },

  // Frameworks
  { name: "Django", category: 'framework' },
  { name: "FastAPI", category: 'framework' },
  { name: "React", category: 'framework' },
  { name: "Next.js", category: 'framework' },
  { name: "Grails", category: 'framework' },

  // Tools
  { name: "AWS", category: 'tool' },
  { name: "Docker", category: 'tool' },
  { name: "PostgreSQL", category: 'tool' },
  { name: "ElasticSearch", category: 'tool' },
  { name: "Git", category: 'tool' },

  // AI/ML
  { name: "TensorFlow", category: 'other' },
  { name: "XGBoost", category: 'other' },
  { name: "Generative AI", category: 'other' },
];

// Provider function for dependency injection
export const getSkills = (): Skill[] => skills;

// Grouped skills by category
export const getSkillsByCategory = (): Record<string, Skill[]> => {
  return skills.reduce((acc, skill) => {
    const category = skill.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
};
