import { ExperienceItem } from '@/types';

export const experiences: ExperienceItem[] = [
  {
    role: "Backend Engineer",
    company: "PT. Impact Credit Solutions (Nikel)",
    date: "August 2024 – Present",
    desc: [
      "Designed and implemented workflow-driven business processes using SpiffWorkflow (BPMN), reducing borrower and loan onboarding processing time by ~60–70%.",
      "Built and integrated backend services (Python, Django, FastAPI) to support workflow execution and business rule orchestration.",
      "Developed a low-code automation engine using Python and Dramatiq, enabling non-engineering teams to configure business workflows faster."
    ],
    color: "bg-blue-500"
  },
  {
    role: "Backend Engineer | Innovation - Strategy",
    company: "PT. Sejahtera Lunaria Annua (KoinWorks)",
    date: "December 2021 – August 2024",
    desc: [
      "Built end-to-end internal products to enable new fintech business opportunities and improve lending operations.",
      "Developed credit scoring models (XGBoost) using alternative data (ecommerce), improving loan qualification and collection effectiveness.",
      "Designed data pipelines using AWS Lambda and Step Functions to process rejected loan users and generate alternative loan offerings."
    ],
    color: "bg-purple-500"
  },
  {
    role: "Back End Developer",
    company: "PT. Fairtech Digital Indonesia",
    date: "November 2018 – December 2021",
    desc: [
      "Utilized Grails Framework for web applications and ElasticSearch to enhance search capabilities.",
      "Contributed to major web projects including Canon Asia, Michelin Guide, and Hong Kong Tourism Board."
    ],
    color: "bg-green-500"
  }
];

// Provider function for dependency injection
export const getExperiences = (): ExperienceItem[] => experiences;
