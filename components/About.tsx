"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-zinc-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
              <p>
                Hi, I'm <span className="text-white font-semibold">Faishal Zaka Naufal</span>.
              </p>
              <p>
                I am a Computer Science Master's graduate with over <span className="text-blue-400">6 years</span> of software development experience, 
                specializing in Python and Java.
              </p>
              <p>
                My journey has taken me through the dynamic fintech industry, where I've focused on 
                building credit scoring models, automating complex business processes, and leveraging 
                <span className="text-purple-400"> Generative AI</span> to solve real-world problems.
              </p>
              <p>
                I also have a background in Astronomy, which fuels my curiosity and analytical approach to engineering challenges.
              </p>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-8 bg-black ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <div className="space-y-4">
                  <p className="text-slate-300">
                    "I am committed to creating dynamic, scalable, and user-centric web applications using modern technologies."
                  </p>
                  <div className="h-px bg-gray-800 my-4" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Location: Jakarta, Indonesia</span>
                    <span>Experience: 6+ Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
