import { SocialLink } from '@/types';

// Hero section data
export const heroData = {
  title: "Backend Engineer",
  name: "Faishal Zaka Naufal",
  typingTexts: [
    "Building scalable systems with Python & Go",
    "Automating complex business workflows",
    "Crafting fintech solutions",
    "Backend Engineer based in Jakarta",
  ],
};

// Export typing texts for useTyping hook
export const getTypingTexts = (): string[] => heroData.typingTexts;
export const getHeroTitle = (): string => heroData.title;
export const getHeroName = (): string => heroData.name;
