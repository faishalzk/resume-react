import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/content/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Navbar from "@/components/Navbar";
import CodeBlock from "@/components/blog/CodeBlock";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Faishal Zaka Naufal`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <Navbar />
      <article className="max-w-3xl mx-auto px-4 md:px-6 pt-24 pb-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-block text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          ← All posts
        </Link>

        {/* Header */}
        <header className="mb-12">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]]}
            components={{
              h1: ({ children, id }) => <h1 id={id} className="text-3xl font-bold mt-12 mb-6">{children}</h1>,
              h2: ({ children, id }) => <h2 id={id} className="text-2xl font-bold mt-10 mb-4 scroll-mt-24">{children}</h2>,
              h3: ({ children, id }) => <h3 id={id} className="text-xl font-bold mt-8 mb-3">{children}</h3>,
              p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>,
              li: ({ children }) => <li className="ml-4 mb-2 text-gray-700 dark:text-gray-300">{children}</li>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => <strong className="font-bold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              code: ({ children, className }) => {
                // Inline code (not in a pre block) gets styled differently
                if (!className) {
                  return <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-gray-800 dark:text-gray-200">{children}</code>;
                }
                return <code className={className}>{children}</code>;
              },
              pre: ({ children }) => {
                // Extract the code element's props
                const codeElement = children as React.ReactElement;
                const { className, children: codeContent } = codeElement.props;
                return (
                  <CodeBlock className={className}>
                    {String(codeContent)}
                  </CodeBlock>
                );
              },
              hr: () => <hr className="my-8 border-gray-200 dark:border-gray-800" />,
              table: ({ children }) => <table className="w-full my-6 border-collapse">{children}</table>,
              thead: ({ children }) => <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>,
              tbody: ({ children }) => <tbody>{children}</tbody>,
              tr: ({ children }) => <tr className="border-b border-gray-200 dark:border-gray-700">{children}</tr>,
              th: ({ children }) => <th className="px-4 py-2 text-left font-semibold">{children}</th>,
              td: ({ children }) => <td className="px-4 py-2">{children}</td>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/blog"
            className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← All posts
          </Link>
        </footer>
      </article>
    </main>
  );
}
