"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useTyping } from "@/hooks/useAnimation";
import { useRef } from "react";

export default function Hero() {
  const { displayedText } = useTyping("Building robust systems with Python & Java", 80);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black">
      <motion.div style={{ y, opacity }} className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Minimal large name */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-6"
          >
            Fullstack Engineer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-gray-900 dark:text-white tracking-tight mb-6"
          >
            Faishal
            <br />
            <span className="text-gray-400 dark:text-gray-600">Zaka</span>
          </motion.h1>

          {/* Minimal tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-2 mb-10"
          >
            <span className="h-[1px] w-8 bg-gray-300 dark:bg-gray-700" />
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[2px] h-4 ml-1 bg-gray-400 align-middle"
              />
            </p>
            <span className="h-[1px] w-8 bg-gray-300 dark:bg-gray-700" />
          </motion.div>

          {/* Minimal icon links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center gap-6"
          >
            {[
              { href: "https://github.com/faishalzk", icon: Github },
              { href: "https://linkedin.com/in/faishalzk", icon: Linkedin },
              { href: "mailto:faishalzakanaufal@gmail.com", icon: Mail },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                target="_blank"
                className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll</span>
          <ArrowDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
