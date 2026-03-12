"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useThemeContext } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 dark:border-white/10 border-gray-300 transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? (
          <Moon className="w-5 h-5 text-purple-400" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
