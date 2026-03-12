import { Project } from '@/types';

export const projects: Project[] = [
  {
    title: "Astronomical Image Denoising",
    desc: "Designed a novelty ML model using CycleGAN with attention layers to enhance astronomical images.",
    tags: ["Python", "CycleGAN", "TensorFlow"],
    link: "/blog/attentiongan-astronomical-image-denoising",
    github: ""
  },
  {
    title: "COVID-19 Data Modeling",
    desc: "Analyzed community mobility and weather variability using Random Forest and XGBoost.",
    tags: ["Python", "XGBoost", "Data Science"],
    link: "",
    github: ""
  },
  {
    title: "Social Media Automation",
    desc: "Developed sentiment analysis tools and social media automation using Python and ADB.",
    tags: ["Python", "ADB", "NLP"],
    link: "",
    github: ""
  }
];

// Provider function for dependency injection
export const getProjects = (): Project[] => projects;
