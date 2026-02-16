"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-zinc-900 text-white relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Get In Touch
          </span>
        </motion.h2>
        
        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
          <a
            href="mailto:faishalzakanaufal@gmail.com"
            className="flex items-center gap-3 px-8 py-4 bg-blue-600 rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            <Mail className="w-5 h-5" />
            <span className="font-semibold">Say Hello</span>
          </a>
          
          <div className="flex gap-6">
            <a 
              href="https://linkedin.com/in/faishalzk" 
              target="_blank"
              className="p-4 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-all hover:scale-110"
            >
              <Linkedin className="w-6 h-6 text-blue-400" />
            </a>
            <a 
              href="https://github.com/faishalzk" 
              target="_blank"
              className="p-4 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-all hover:scale-110"
            >
              <Github className="w-6 h-6 text-white" />
            </a>
          </div>
        </div>
        
        <footer className="border-t border-zinc-800 pt-8 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Faishal Zaka Naufal. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
}
