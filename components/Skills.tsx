"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Cloud,
  Layout,
  Server,
  Terminal,
  Cpu,
} from "lucide-react";

// Minimal skill categories
const skillCategories = [
  {
    title: "Languages",
    icon: <Code2 size={20} className="text-gray-900 dark:text-white" />,
    skills: ["Python", "Java", "Golang", "TypeScript", "SQL", "Groovy"]
  },
  {
    title: "Backend",
    icon: <Server size={20} className="text-gray-900 dark:text-white" />,
    skills: ["FastAPI", "Django", "Node.js", "Grails", "SpiffWorkflow"]
  },
  {
    title: "Frontend",
    icon: <Layout size={20} className="text-gray-900 dark:text-white" />,
    skills: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"]
  },
  {
    title: "Cloud",
    icon: <Cloud size={20} className="text-gray-900 dark:text-white" />,
    skills: ["AWS Lambda", "Step Functions", "Docker", "CI/CD"]
  },
  {
    title: "Data & AI",
    icon: <Cpu size={20} className="text-gray-900 dark:text-white" />,
    skills: ["Gen AI", "XGBoost", "ElasticSearch", "TensorFlow"]
  },
  {
    title: "Tools",
    icon: <Terminal size={20} className="text-gray-900 dark:text-white" />,
    skills: ["Git", "Linux", "Postman", "Jira"]
  }
];

// Star component for astronomy feel
function TwinklingStars({ count = 20 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gray-900 dark:bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white overflow-hidden">
      <TwinklingStars count={15} />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Minimal header */}
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
            <span className="text-gray-500">use daily</span>
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
