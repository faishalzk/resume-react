"use client";

import { motion } from "framer-motion";
import { Code2, Zap, TrendingUp, Layers } from "lucide-react";

export default function About() {
  const achievements = [
    {
      icon: <Layers className="w-5 h-5" />,
      highlight: "BPMN Workflows",
      text: "Designed and implemented BPMN-based workflow automation for borrower and loan onboarding (LOS), reducing manual intervention and improving processing efficiency",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      highlight: "60-70% Faster",
      text: "Reduced onboarding processing time by ~60–70% through automation of credit decision workflows",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      highlight: "Credit Scoring",
      text: "Built credit scoring models using alternative data, improving loan qualification and collection effectiveness",
    },
    {
      icon: <Code2 className="w-5 h-5" />,
      highlight: "Low-code Tools",
      text: "Developed low-code automation tools enabling faster iteration of business processes",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500">About</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight">
            Backend
            <br />
            <span className="text-gray-500 dark:text-gray-400">Engineer</span>
          </h2>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="max-w-3xl">
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Backend Engineer with 6+ years of experience building scalable systems and automating complex business workflows in fintech environments. Specialized in designing workflow-driven systems (BPMN, SpiffWorkflow) and backend services using Python (FastAPI, Django), enabling business process automation and improving operational efficiency.
            </p>
          </div>
        </motion.div>

        {/* Key Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 md:mb-20"
        >
          <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-8">Key Achievements</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 bg-gray-50 dark:bg-zinc-900 rounded-lg border border-gray-100 dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <span className="inline-block text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                      {item.highlight}
                    </span>
                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Background & Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 md:gap-20"
        >
          {/* Background */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Background</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              With a unique background in <span className="text-gray-900 dark:text-white font-medium">Astronomy</span>, I bring analytical thinking and curiosity to every challenge.
            </p>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">At a Glance</h3>
            <div className="grid grid-cols-3 gap-6">
              {[
                { number: "6+", label: "Years" },
                { number: "60-70%", label: "Efficiency" },
                { number: "10+", label: "Projects" },
              ].map((stat, i) => (
                <div key={i}>
                  <span className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{stat.number}</span>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
