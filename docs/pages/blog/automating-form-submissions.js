import Link from 'next/link';

export default function AutomatingFormSubmissions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/" legacyBehavior>
          <a className="mb-6 inline-block px-4 py-2 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg transition">
            ← Back to Home
          </a>
        </Link>
        <Link href="/blog" legacyBehavior>
          <a className="text-blue-400 hover:text-blue-300 mb-8 inline-block">← Back to Blog</a>
        </Link>

        <article>
          <h1 className="text-4xl font-bold mb-4">
            Automating Form Submissions with Playwright MCP and a Prompt File
          </h1>
          <div className="text-gray-400 mb-8">
            <span>July 10, 2025</span>
            <div className="flex gap-2 mt-3">
              <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded text-sm">#playwright</span>
              <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded text-sm">#mcp</span>
              <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded text-sm">#ai</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p>
              Have you ever wished you could automate browser tasks — like filling out a form or uploading
              a file — without writing a full-blown test script? What if all you needed was a plain-text
              prompt written in natural language? Well now you can with Playwright's MCP server.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Why Automate Form Submissions?</h2>
            <p>
              Manual form submissions are tedious, error-prone, and time-consuming. Automating them saves
              time and reduces the risk of human error. Traditional test scripts require code knowledge,
              but natural language prompts make automation accessible to everyone.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Using Playwright MCP</h2>
            <p>
              Playwright's MCP (Model Context Protocol) server enables you to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Write automation as natural language</li>
              <li>Fill forms without code</li>
              <li>Upload files programmatically</li>
              <li>Click buttons and navigate pages</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Example Prompt</h2>
            <p>Instead of writing code, you can simply write:</p>
            <div className="bg-gray-900 p-4 rounded my-4 border border-gray-700">
              <code className="text-green-400">
                Navigate to the contact form, fill in name "John", email "john@example.com", 
                and message "Hello", then submit.
              </code>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Getting Started</h2>
            <p>
              Set up the Playwright MCP server and connect it with your prompt file. Define your
              automation tasks in plain English and let the server handle the browser interactions.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
