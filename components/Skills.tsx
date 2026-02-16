"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  Cloud, 
  Layout, 
  Server, 
  Terminal,
  Cpu,
  Workflow
} from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: <Code2 size={24} className="text-blue-400" />,
    skills: ["Python", "Java", "Golang", "TypeScript", "SQL", "Groovy"]
  },
  {
    title: "Backend & Frameworks",
    icon: <Server size={24} className="text-green-400" />,
    skills: ["FastAPI", "Django", "Node.js", "Grails", "SpiffWorkflow"]
  },
  {
    title: "Frontend",
    icon: <Layout size={24} className="text-pink-400" />,
    skills: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"]
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud size={24} className="text-cyan-400" />,
    skills: ["AWS Lambda", "Step Functions", "Docker", "GitHub CI/CD"]
  },
  {
    title: "Data & AI",
    icon: <Cpu size={24} className="text-purple-400" />,
    skills: ["Generative AI", "XGBoost", "ElasticSearch", "TensorFlow"]
  },
  {
    title: "Tools",
    icon: <Terminal size={24} className="text-orange-400" />,
    skills: ["Git", "Linux", "Postman", "Jira"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-black text-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            Tech Stack
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-zinc-800 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-200">
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-black rounded-md text-sm text-gray-400 border border-zinc-800 hover:text-white hover:border-zinc-600 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
