"use client";

import { createContext, useContext, ReactNode } from "react";
import { PortfolioData, NavItem, Project, ExperienceItem, Skill, SocialLink, HeroData } from "@/types";
import { getNavItems } from "@/data/navbar";
import { getProjects } from "@/data/projects";
import { getExperiences } from "@/data/experience";
import { getSkills } from "@/data/skills";
import { getSocialLinks } from "@/data/socials";
import { heroData } from "@/data/hero";

// Default data - can be overridden for testing or localization
const defaultData: PortfolioData = {
  navItems: getNavItems(),
  projects: getProjects(),
  experiences: getExperiences(),
  skills: getSkills(),
  socialLinks: getSocialLinks(),
  heroData: heroData,
};

// Create context with default values
const PortfolioContext = createContext<PortfolioData>(defaultData);

// Provider component - Dependency Inversion Principle
interface DataProviderProps {
  children: ReactNode;
  data?: Partial<PortfolioData>;
}

export function DataProvider({ children, data = {} }: DataProviderProps) {
  const mergedData: PortfolioData = {
    ...defaultData,
    ...data,
    // Ensure arrays are always present
    navItems: data.navItems || defaultData.navItems,
    projects: data.projects || defaultData.projects,
    experiences: data.experiences || defaultData.experiences,
    skills: data.skills || defaultData.skills,
    socialLinks: data.socialLinks || defaultData.socialLinks,
    heroData: data.heroData || defaultData.heroData,
  };

  return (
    <PortfolioContext.Provider value={mergedData}>
      {children}
    </PortfolioContext.Provider>
  );
}

// Custom hook to consume data - follows Dependency Inversion
export function usePortfolioData(): PortfolioData {
  return useContext(PortfolioContext);
}

// Individual data hooks for better granularity (Interface Segregation)
export function useNavItems(): NavItem[] {
  const { navItems } = useContext(PortfolioContext);
  return navItems;
}

export function useProjects(): Project[] {
  const { projects } = useContext(PortfolioContext);
  return projects;
}

export function useExperiences(): ExperienceItem[] {
  const { experiences } = useContext(PortfolioContext);
  return experiences;
}

export function useSkills(): Skill[] {
  const { skills } = useContext(PortfolioContext);
  return skills;
}

export function useSocialLinks(): SocialLink[] {
  const { socialLinks } = useContext(PortfolioContext);
  return socialLinks;
}

export function useHeroData(): HeroData {
  const { heroData } = useContext(PortfolioContext);
  return heroData;
}
