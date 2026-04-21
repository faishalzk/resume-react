import { Skill } from '@/types';

export const skills: Skill[] = [
  // Languages
  { name: "Python", category: 'language' },
  { name: "Golang", category: 'language' },
  { name: "JavaScript", category: 'language' },
  { name: "TypeScript", category: 'language' },

  // Frameworks
  { name: "Django", category: 'framework' },
  { name: "FastAPI", category: 'framework' },
  { name: "Node.js", category: 'framework' },
  { name: "SpiffWorkflow", category: 'framework' },
  { name: "Dramatiq", category: 'framework' },

  // Tools
  { name: "AWS Lambda", category: 'tool' },
  { name: "Step Functions", category: 'tool' },
  { name: "ETL", category: 'tool' },
  { name: "PostgreSQL", category: 'tool' },
  { name: "MySQL", category: 'tool' },
  { name: "ElasticSearch", category: 'tool' },
  { name: "GraphQL", category: 'tool' },
  { name: "Git", category: 'tool' },

  // AI/ML
  { name: "XGBoost", category: 'other' },
  { name: "Credit Scoring", category: 'other' },
  { name: "BPMN", category: 'other' },
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
