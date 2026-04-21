"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

// Twinkling stars background
function Stars({ count = 15 }: { count?: number }) {
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

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      <Stars count={20} />

      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Contact</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight text-gray-900 dark:text-white">
            Let's
            <br />
            <span className="text-gray-500 dark:text-gray-400">connect</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto"
        >
          Have a project in mind? Let's explore the possibilities together.
        </motion.p>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <a
            href="mailto:faishalzakanaufal@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span className="font-medium">Get in touch</span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          {[
            { href: "https://linkedin.com/in/faishalzk", icon: Linkedin, label: "LinkedIn" },
            { href: "https://github.com/faishalzk", icon: Github, label: "GitHub" },
            { href: "mailto:faishalzakanaufal@gmail.com", icon: Mail, label: "Email" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Faishal Zaka Naufal
          </p>
        </footer>
      </div>
    </section>
  );
}
