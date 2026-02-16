#!/bin/bash

# Create directories
mkdir -p app

# Create package.json
cat > package.json << 'EOF'
{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "14.2.3",
    "lucide-react": "^0.378.0",
    "framer-motion": "^11.2.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.3"
  }
}
EOF

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# Create next.config.mjs
cat > next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
EOF

# Create tailwind.config.ts
cat > tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
EOF

# Create postcss.config.mjs
cat > postcss.config.mjs << 'EOF'
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
EOF

# Create app/globals.css
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
EOF

# Create app/layout.tsx
cat > app/layout.tsx << 'EOF'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faishal Zaka Naufal - Portfolio",
  description: "Fullstack Engineer | Python | Java | AI/ML",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
EOF

# Create app/page.tsx
cat > app/page.tsx << 'EOF'
import { Mail, MapPin, Linkedin, Github, Phone, FileText } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24 max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl rounded-lg my-8 text-gray-800">
      {/* Header */}
      <header className="mb-12 border-b pb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Faishal Zaka Naufal</h1>
        <h2 className="text-xl md:text-2xl text-blue-600 font-medium mb-6">Computer Science Master's Graduate | Fullstack Engineer</h2>
        
        <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-600">
          <a href="mailto:faishalzakanaufal@gmail.com" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Mail size={18} />
            <span>faishalzakanaufal@gmail.com</span>
          </a>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>Jakarta, Indonesia</span>
          </div>
          <a href="tel:+6281221585403" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Phone size={18} />
            <span>+62 81221585403</span>
          </a>
        </div>
        
        <div className="flex gap-4 mt-6">
          <a href="https://linkedin.com/in/faishalzk" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <Linkedin size={20} />
            LinkedIn
          </a>
          <a href="https://github.com/faishalzk" target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-900 transition-colors">
            <Github size={20} />
            GitHub
          </a>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-blue-600 pl-4">Professional Summary</h3>
        <p className="text-gray-700 leading-relaxed">
          Computer Science Master's graduate with over 6 years of software development experience, specializing in Python and Java. 
          Proven track record in the fintech industry, focusing on credit scoring models, business process automation, and generative AI. 
          Experienced in building machine learning models for image processing and NLP applications.
        </p>
      </section>

      {/* Technical Highlights */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-4">Technical Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-2">Backend Expertise</h4>
            <p className="text-gray-700">Python (FastAPI, Django), Golang, and Groovy (Grails).</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-2">Fintech & Automation</h4>
            <p className="text-gray-700">3+ years in fintech; expert in SpiffWorkflow and BPMN for credit decisioning.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-2">Cloud & Data</h4>
            <p className="text-gray-700">Hands-on with AWS Lambda, Step Functions, and serverless ETL pipelines.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-2">AI/ML Research</h4>
            <p className="text-gray-700">Published research in Generative Adversarial Networks (AttentionGAN) and XGBoost modeling.</p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-4">Work Experience</h3>
        
        <div className="mb-8 relative pl-8 border-l-2 border-gray-200 last:border-0">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600"></div>
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <h4 className="text-xl font-bold text-gray-900">Fullstack Engineer</h4>
            <span className="text-blue-600 font-medium">Aug 2024 – Present</span>
          </div>
          <div className="text-gray-600 mb-4 font-medium">PT. Impact Credit Solutions (Nikel) | Jakarta</div>
          <ul className="list-disc list-outside ml-4 space-y-2 text-gray-700">
            <li>Designed and implemented business flows using <strong>SpiffWorkflow</strong> to improve automation efficiency.</li>
            <li>Developed robust API solutions using <strong>Python Django</strong> and <strong>FastAPI</strong>.</li>
            <li>Created a low-code business automation engine using Python and <strong>Dramatiq</strong> inspired by BPMN.</li>
          </ul>
        </div>

        <div className="mb-8 relative pl-8 border-l-2 border-gray-200">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-400"></div>
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <h4 className="text-xl font-bold text-gray-900">Fullstack Engineer (Innovation - Strategy)</h4>
            <span className="text-gray-500 font-medium">Dec 2021 – Aug 2024</span>
          </div>
          <div className="text-gray-600 mb-4 font-medium">PT. Sejahtera Lunaria Annua (KoinWorks) | Jakarta</div>
          <ul className="list-disc list-outside ml-4 space-y-2 text-gray-700">
            <li>Developed end-to-end web products using <strong>Python, Node.js, and Golang</strong> to drive internal disruption.</li>
            <li>Built a crawler engine to predict user revenue and repayment capability using <strong>XGBoost</strong>.</li>
            <li>Streamlined loan processing through ETL automation using <strong>AWS Lambda</strong> and <strong>Step Functions</strong>.</li>
          </ul>
        </div>

        <div className="mb-8 relative pl-8 border-l-2 border-gray-200">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-400"></div>
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <h4 className="text-xl font-bold text-gray-900">Back End Developer</h4>
            <span className="text-gray-500 font-medium">Nov 2018 – Dec 2021</span>
          </div>
          <div className="text-gray-600 mb-4 font-medium">PT. Fairtech Digital Indonesia | Jakarta</div>
          <ul className="list-disc list-outside ml-4 space-y-2 text-gray-700">
            <li>Utilized <strong>Grails Framework</strong> for web applications and <strong>ElasticSearch</strong> to enhance search capabilities.</li>
            <li>Contributed to major web projects including <strong>Canon Asia</strong>, <strong>Michelin Guide</strong>, and <strong>Hong Kong Tourism Board</strong>.</li>
          </ul>
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-4">Education</h3>
        <div className="space-y-6">
          <div>
            <div className="flex flex-col md:flex-row justify-between">
              <h4 className="text-lg font-bold text-gray-900">Master of Computer Science (Generative AI)</h4>
              <span className="text-gray-500">2020 – 2023</span>
            </div>
            <div className="text-gray-600">University of Indonesia</div>
            <div className="text-gray-500 text-sm">GPA: 3.52</div>
          </div>
          <div>
            <div className="flex flex-col md:flex-row justify-between">
              <h4 className="text-lg font-bold text-gray-900">Bachelor of Science (Astronomy)</h4>
              <span className="text-gray-500">2013 – 2017</span>
            </div>
            <div className="text-gray-600">Institut Teknologi Bandung</div>
            <div className="text-gray-500 text-sm">GPA: 3.03</div>
          </div>
        </div>
      </section>

      {/* Research & Projects */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-4">Research & Projects</h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-blue-600">Astronomical Image Denoising (AttentionGAN)</h4>
            <p className="text-gray-700 text-sm mt-1">Designed a novelty ML model using CycleGAN with attention layers.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-blue-600">COVID-19 Data Modeling</h4>
            <p className="text-gray-700 text-sm mt-1">Experimented with Random Forest and XGBoost to analyze community mobility and weather variability.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-blue-600">Social Media Automation</h4>
            <p className="text-gray-700 text-sm mt-1">Developed sentiment analysis tools and social media automation using Python and ADB.</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-4">Core Skills</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {["Python", "Java", "Golang", "Node.js", "Groovy", "TypeScript", "SQL"].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Frameworks</h4>
            <div className="flex flex-wrap gap-2">
              {["FastAPI", "Django", "SpiffWorkflow", "ReactJS", "Grails"].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Tools</h4>
            <div className="flex flex-wrap gap-2">
              {["AWS", "ElasticSearch", "GitHub CI/CD", "Adobe Experience Manager"].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules
.next
.DS_Store
.env.local
EOF

echo "Setup script finished. Now run: npm install && npm run dev"
