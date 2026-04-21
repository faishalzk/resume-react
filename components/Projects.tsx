"use client";

import { motion } from "framer-motion";
import { useProjects } from "@/providers/DataProvider";
import Link from "next/link";

export default function Projects() {
  const projects = useProjects();

  return (
    <section id="projects" className="py-24 md:py-32 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500">Projects</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight">
            Featured
            <br />
            <span className="text-gray-500 dark:text-gray-400">work</span>
          </h2>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {project.link ? (
                <Link href={project.link}>
                  <div className="h-full bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="p-6 md:p-8">
                      <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        {project.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-gray-200 dark:bg-zinc-800 rounded text-gray-600 dark:text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="h-full bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden">
                  <div className="p-6 md:p-8">
                    <h3 className="text-lg md:text-xl font-bold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {project.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-200 dark:bg-zinc-800 rounded text-gray-600 dark:text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
