import { SocialLink } from '@/types';

// Hero section data
export const heroData = {
  title: "Fullstack Engineer",
  name: "Faishal Zaka Naufal",
  typingTexts: [
    "Building robust systems with Python & Java",
    "Innovating with Generative AI",
    "Crafting fintech solutions",
    "Fullstack Engineer based in Jakarta",
  ],
};

// Export typing texts for useTyping hook
export const getTypingTexts = (): string[] => heroData.typingTexts;
export const getHeroTitle = (): string => heroData.title;
export const getHeroName = (): string => heroData.name;
