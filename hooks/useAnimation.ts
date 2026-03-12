"use client";

import { useState, useEffect } from "react";
import { UseTypingResult, UseThemeResult, UseMousePositionResult, Theme } from "@/types";

// SRP: Each hook has a single responsibility
// DIP: Return types are defined by interfaces, making it easy to mock for testing

export function useTyping(text: string, speed: number = 100): UseTypingResult {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const type = () => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(type, speed);
      } else {
        setIsTyping(false);
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [text, speed]);

  return { displayedText, isTyping };
}

// Factory function for creating typed text cycling (OCP)
export function createTypingHook(getTexts: () => string[], interval: number = 3000) {
  return function useTypedText(initialSpeed: number = 80): UseTypingResult {
    const texts = getTexts();
    const [textIndex, setTextIndex] = useState(0);

    const { displayedText, isTyping } = useTyping(texts[textIndex], initialSpeed);

    useEffect(() => {
      if (!isTyping) {
        const timeout = setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % texts.length);
        }, interval);
        return () => clearTimeout(timeout);
      }
    }, [isTyping, texts.length, interval]);

    return { displayedText, isTyping };
  };
}

export function useTheme(): UseThemeResult {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("light", saved === "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  return { theme, toggleTheme };
}

export function useMousePosition(): UseMousePositionResult {
  const [mousePosition, setMousePosition] = useState<UseMousePositionResult>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
}
