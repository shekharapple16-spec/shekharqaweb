import Link from 'next/link';

export default function BlogHome() {
  const blogPosts = [
    {
      id: 1,
      title: 'Testing in a Logged-In State with Playwright MCP Browser Extension',
      excerpt: 'Learn how to test applications that require authentication without logging in every time.',
      date: 'August 21, 2025',
      tags: ['playwright', 'mcp', 'testing', 'ai'],
      slug: 'testing-logged-in-state'
    },
    {
      id: 2,
      title: 'Automating Form Submissions with Playwright MCP',
      excerpt: 'Automate browser tasks like filling out forms using natural language prompts.',
      date: 'July 10, 2025',
      tags: ['playwright', 'mcp', 'ai'],
      slug: 'automating-form-submissions'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" legacyBehavior>
          <a className="mb-6 inline-block px-4 py-2 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg transition">
            ← Back to Home
          </a>
        </Link>
        <h1 className="text-5xl font-bold mb-4">Blog</h1>
        <p className="text-blue-100 mb-12">Testing & Automation Insights</p>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition duration-300"
            >
              <Link href={`/blog/${post.slug}`} legacyBehavior>
                <a className="group">
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition">
                    {post.title}
                  </h2>
                </a>
              </Link>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm bg-blue-900 text-blue-200 px-3 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
