"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Minimal header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500">About</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight">
            Building the future
            <br />
            <span className="text-gray-500">with code & curiosity</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left - Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              I'm <strong>Faishal Zaka Naufal</strong>, a Computer Science Master's graduate with over 6 years of experience in software development.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              My journey through fintech has made me an expert in <span className="text-gray-900 dark:text-white font-medium">Python</span> and <span className="text-gray-900 dark:text-white font-medium">Java</span>, specializing in credit scoring models and business process automation.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              With a unique background in <span className="text-gray-900 dark:text-white font-medium">Astronomy</span>, I bring analytical thinking and curiosity to every challenge.
            </p>
          </motion.div>

          {/* Right - Stats & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { number: "6+", label: "Years" },
                { number: "3+", label: "Companies" },
                { number: "10+", label: "Projects" },
              ].map((stat, i) => (
                <div key={i} className="border-l-2 border-gray-200 dark:border-gray-800 pl-4">
                  <span className="text-3xl md:text-4xl font-bold">{stat.number}</span>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white" />
                <span className="text-gray-600 dark:text-gray-400">Fullstack Engineer based in Jakarta</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white" />
                <span className="text-gray-600 dark:text-gray-400">Generative AI Specialist</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white" />
                <span className="text-gray-600 dark:text-gray-400">Fintech Industry Expert</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
