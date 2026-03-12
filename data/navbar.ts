import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  { name: "About", href: "/#about" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Skills", href: "/#skills" },
  { name: "Writing", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

// Provider function for dependency injection
export const getNavItems = (): NavItem[] => navItems;
