import Link from "next/link";
import { blogPosts } from "@/content/blog";
import Navbar from "@/components/Navbar";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-24 pb-16">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mt-6 tracking-tight">
            Writing
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            Thoughts on software engineering, research, and technology.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-12">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="border-b border-gray-200 dark:border-gray-800 pb-12">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                    {post.excerpt}
                  </p>

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

                  {/* Read more */}
                  <span className="inline-block mt-4 text-sm font-medium group-hover:underline">
                    Read more →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {blogPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">Coming soon...</p>
          </div>
        )}
      </div>
    </main>
  );
}
