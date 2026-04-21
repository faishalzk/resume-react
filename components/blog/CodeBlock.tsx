"use client";

import { useState } from "react";

interface CodeBlockProps {
  children: string;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract language from className (e.g., "language-python")
  const language = className?.replace("language-", "") || "";

  return (
    <div className="relative group my-6">
      {/* Header with language label and copy button */}
      <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 rounded-t-lg px-4 py-2 border-b border-gray-700">
        <span className="text-xs text-gray-400 font-mono uppercase">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <pre className="bg-gray-900 dark:bg-gray-950 rounded-b-lg p-4 overflow-x-auto">
        <code className={`${className || ""} text-sm font-mono text-gray-100`}>
          {children}
        </code>
      </pre>
    </div>
  );
}