"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Astronomical Image Denoising",
    desc: "Designed a novelty ML model using CycleGAN with attention layers to enhance astronomical images.",
    tags: ["Python", "CycleGAN", "TensorFlow"],
    link: "#",
    github: "#"
  },
  {
    title: "COVID-19 Data Modeling",
    desc: "Analyzed community mobility and weather variability using Random Forest and XGBoost.",
    tags: ["Python", "XGBoost", "Data Science"],
    link: "#",
    github: "#"
  },
  {
    title: "Social Media Automation",
    desc: "Developed sentiment analysis tools and social media automation using Python and ADB.",
    tags: ["Python", "ADB", "NLP"],
    link: "#",
    github: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-zinc-900 text-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Featured Projects
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-black border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-300 relative"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <a href={project.github} className="text-gray-400 hover:text-white"><Github size={20} /></a>
                <a href={project.link} className="text-gray-400 hover:text-white"><ExternalLink size={20} /></a>
              </div>
              
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                    {project.desc}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
                    >
                      {tag}
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
