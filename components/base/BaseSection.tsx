"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface BaseSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  title?: string;
  titleGradient?: string;
}

// Open/Closed Principle: Base component that can be extended
export function BaseSection({
  children,
  id,
  className = "",
  title,
  titleGradient,
}: BaseSectionProps) {
  return (
    <section id={id} className={className}>
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-center"
        >
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${titleGradient || "from-blue-400 to-purple-600"}`}>
            {title}
          </span>
        </motion.h2>
      )}
      {children}
    </section>
  );
}

// Animation variants factory for reusability
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};
