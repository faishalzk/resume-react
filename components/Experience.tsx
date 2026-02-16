"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Fullstack Engineer",
    company: "PT. Impact Credit Solutions (Nikel)",
    date: "August 2024 – Present",
    desc: [
      "Designed and implemented business flows using SpiffWorkflow to improve automation efficiency.",
      "Developed robust API solutions using Python Django and FastAPI.",
      "Created a low-code business automation engine using Python and Dramatiq inspired by BPMN."
    ],
    color: "bg-blue-500"
  },
  {
    role: "Fullstack Engineer (Innovation - Strategy)",
    company: "PT. Sejahtera Lunaria Annua (KoinWorks)",
    date: "December 2021 – August 2024",
    desc: [
      "Developed end-to-end web products using Python, Node.js, and Golang to drive internal disruption.",
      "Built a crawler engine to predict user revenue and repayment capability using XGBoost.",
      "Streamlined loan processing through ETL automation using AWS Lambda and Step Functions."
    ],
    color: "bg-purple-500"
  },
  {
    role: "Back End Developer",
    company: "PT. Fairtech Digital Indonesia",
    date: "November 2018 – December 2021",
    desc: [
      "Utilized Grails Framework for web applications and ElasticSearch to enhance search capabilities.",
      "Contributed to major web projects including Canon Asia, Michelin Guide, and Hong Kong Tourism Board."
    ],
    color: "bg-green-500"
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-black text-white relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
            Work Experience
          </span>
        </motion.h2>

        <div className="relative border-l border-gray-800 ml-4 md:ml-6 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              <span
                className={`absolute -left-[5px] top-2 w-3 h-3 rounded-full ${exp.color} ring-4 ring-black`}
              />
              <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Briefcase size={18} className="text-gray-400" />
                      {exp.role}
                    </h3>
                    <p className="text-blue-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 mt-2 md:mt-0 bg-zinc-800 px-3 py-1 rounded-full w-fit">
                    {exp.date}
                  </span>
                </div>
                <ul className="space-y-2 text-gray-400 list-disc list-inside marker:text-gray-600">
                  {exp.desc.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
