"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Cloud,
  Server,
  Terminal,
  Cpu,
} from "lucide-react";

// Skill categories
const skillCategories = [
  {
    title: "Languages",
    icon: <Code2 size={20} className="text-gray-900 dark:text-white" />,
    skills: ["Python", "Golang", "JavaScript", "TypeScript"]
  },
  {
    title: "Backend",
    icon: <Server size={20} className="text-gray-900 dark:text-white" />,
    skills: ["FastAPI", "Django", "Node.js", "SpiffWorkflow", "Dramatiq"]
  },
  {
    title: "Cloud & Data",
    icon: <Cloud size={20} className="text-gray-900 dark:text-white" />,
    skills: ["AWS Lambda", "Step Functions", "ETL", "PostgreSQL", "MySQL"]
  },
  {
    title: "Search & APIs",
    icon: <Terminal size={20} className="text-gray-900 dark:text-white" />,
    skills: ["ElasticSearch", "GraphQL", "Git"]
  },
  {
    title: "Workflow & AI",
    icon: <Cpu size={20} className="text-gray-900 dark:text-white" />,
    skills: ["BPMN", "XGBoost", "Credit Scoring"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500">Skills</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight">
            Tools I
            <br />
            <span className="text-gray-500 dark:text-gray-400">use daily</span>
          </h2>
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  {category.icon}
                  <h3 className="text-lg font-bold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded text-gray-600 dark:text-gray-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
