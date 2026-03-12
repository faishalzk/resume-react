import { SocialLink } from '@/types';

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/faishalzk",
    icon: "Github"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/faishalzk",
    icon: "Linkedin"
  },
  {
    name: "Email",
    url: "mailto:faishalzakanaufal@gmail.com",
    icon: "Mail"
  }
];

// Provider function for dependency injection
export const getSocialLinks = (): SocialLink[] => socialLinks;
