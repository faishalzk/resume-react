"use client";

import { motion } from "framer-motion";
import { useExperiences } from "@/providers/DataProvider";

export default function Experience() {
  const experiences = useExperiences();

  return (
    <section id="experience" className="py-24 md:py-32 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Experience</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight">
            Where I've
            <br />
            <span className="text-gray-500 dark:text-gray-400">worked</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />

          {/* Experience items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8"
              >
                {/* Dot */}
                <div className="absolute left-[-3px] top-1 w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white" />

                {/* Content */}
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-gray-500">{exp.date}</span>
                  <h3 className="text-xl md:text-2xl font-bold">{exp.role}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                </div>

                {/* Description */}
                <ul className="mt-4 space-y-2">
                  {exp.desc.map((item, i) => (
                    <li key={i} className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
