import { ExperienceItem } from '@/types';

export const experiences: ExperienceItem[] = [
  {
    role: "Fullstack Engineer",
    company: "PT. Impact Credit Solutions (Nikel)",
    date: "August 2024 – Present",
    desc: [
      "Designed and implemented business flows using SpiffWorkflow to improve automation efficiency.",
      "Developed robust API solutions using Python Django and FastAPI.",
      "Created a low-code business automation engine using Python and Dramatiq inspired by BPMN."
    ],
    color: "bg-blue-500"
  },
  {
    role: "Fullstack Engineer (Innovation - Strategy)",
    company: "PT. Sejahtera Lunaria Annua (KoinWorks)",
    date: "December 2021 – August 2024",
    desc: [
      "Developed end-to-end web products using Python, Node.js, and Golang to drive internal disruption.",
      "Built a crawler engine to predict user revenue and repayment capability using XGBoost.",
      "Streamlined loan processing through ETL automation using AWS Lambda and Step Functions."
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
