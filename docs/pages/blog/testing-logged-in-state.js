import Link from 'next/link';

export default function TestingLoggedInState() {
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
            Testing in a Logged-In State with the Playwright MCP Browser Extension
          </h1>
          <div className="text-gray-400 mb-8">
            <span>August 21, 2025</span>
            <div className="flex gap-2 mt-3">
              <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded text-sm">#playwright</span>
              <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded text-sm">#mcp</span>
              <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded text-sm">#testing</span>
              <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded text-sm">#ai</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p>
              If you've ever needed to test an application that requires authentication, you know the pain
              of logging in every time or, worse, handing over your credentials to an LLM. With the new
              Playwright MCP Browser Extension for Chrome and Edge, that's no longer necessary.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Problem</h2>
            <p>
              Testing authenticated applications presents unique challenges. You either need to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Log in manually before each test</li>
              <li>Share your credentials with testing tools</li>
              <li>Maintain complex session management</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Solution</h2>
            <p>
              The Playwright MCP Browser Extension provides a seamless way to handle authentication during testing.
              It allows you to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Maintain persistent sessions</li>
              <li>Avoid credential sharing</li>
              <li>Test protected pages efficiently</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Getting Started</h2>
            <p>
              Install the extension from the Chrome or Edge web store and connect it to your Playwright tests.
              You can now write tests that automatically handle authentication without exposing credentials.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
