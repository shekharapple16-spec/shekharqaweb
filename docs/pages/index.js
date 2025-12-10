import Layout from '../components/Layout';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [dailyQuote, setDailyQuote] = useState('');

  useEffect(() => {
    const quotes = [
      "The only way to do great work is to love what you do.",
      "Innovation distinguishes between a leader and a follower.",
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "It does not matter how slowly you go as long as you do not stop.",
      "Believe you can and you're halfway there.",
      "The best time to plant a tree was 20 years ago. The second best time is now.",
      "Your limitation—it's only your imagination.",
      "Great things never come from comfort zones.",
      "Dream it. Wish it. Do it.",
      "Success doesn't just find you. You have to go out and get it.",
      "The harder you work for something, the greater you'll feel when you achieve it.",
      "Dream bigger. Do bigger.",
      "Don't stop when you're tired. Stop when you're done.",
      "Wake up with determination. Go to bed with satisfaction.",
      "Do something today that your future self will thank you for.",
      "Little things make big days.",
      "It's going to be hard, but hard does not mean impossible.",
      "Don't wait for opportunity. Create it.",
      "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
    ];

    // Get quote based on current date (same quote per day)
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const quoteIndex = dayOfYear % quotes.length;
    setDailyQuote(quotes[quoteIndex]);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Chandra Shekhar - Help Others | AI Development Expert</title>
        <meta name="description" content="Chandra Shekhar helps others master AI-powered coding assistance for faster development, better code quality, and increased productivity." />
        <link rel="canonical" href="https://shekhar-pro.vercel.app/" />
        <link rel="icon" href="/profile.jpg" type="image/jpeg" />
      </Head>
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
              <img src="/profile.jpg" alt="Chandra Shekhar Pandey" className="w-10 h-10 rounded-full object-cover border-2 border-blue-600" />
              <div className="flex-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Chandra Shekhar Pandey
                </h1>
                <div className="overflow-hidden h-6 mt-1">
                  <p className="text-xs text-gray-600 dark:text-gray-400 italic whitespace-nowrap animate-scroll-right">
                    "{dailyQuote}" • "{dailyQuote}" •
                  </p>
                </div>
              </div>
              <style jsx>{`
                @keyframes scroll-right {
                  0% {
                    transform: translateX(100%);
                  }
                  100% {
                    transform: translateX(-100%);
                  }
                }
                
                .animate-scroll-right {
                  animation: scroll-right 35s linear infinite;
                }
              `}</style>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Simplified */}
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Supercharge Your Test Automation Development Workflow
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Master AI-powered coding assistance for faster development, better code quality, and increased productivity
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 flex-wrap">
            <a href="/course" className="inline-block bg-white text-blue-600 hover:bg-gray-50 hover:text-blue-700 font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg hover:-translate-y-1">
              🎓 Start Learning
            </a>
            <a href="/blog" className="inline-block bg-pink-600 text-white hover:bg-pink-500 font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg hover:-translate-y-1">
              📝 Read Blog
            </a>
            <a href="https://www.linkedin.com/in/shekharqa" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-700 text-white hover:bg-blue-600 font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg hover:-translate-y-1">
              💼 LinkedIn
            </a>
            <a href="https://topmate.io/chandra_shekhar12/page/cgXfOwKFlG" target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg hover:-translate-y-1">
              🎯 Topmate
            </a>
          </div>
          <style jsx>{`
            a:hover {
              animation: pulse-glow 0.6s ease-in-out;
            }
            
            @keyframes pulse-glow {
              0%, 100% {
                box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
              }
              50% {
                box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
              }
            }
          `}</style>
        </div>
      </div>

      {/* Companies Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            I've provided quality testing solutions to industry-leading organizations
          </h2>
          <div className="relative w-full overflow-hidden py-8">
            <div className="flex gap-6 md:gap-8 animate-scroll-left">
              {/* Sabre */}
              <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition duration-300 transform hover:scale-110 font-bold shadow-lg whitespace-nowrap min-w-max">
                <span className="text-lg">✈️ Sabre</span>
              </div>
              {/* SITA */}
              <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg transition duration-300 transform hover:scale-110 font-bold shadow-lg whitespace-nowrap min-w-max">
                <span className="text-lg">✈️ SITA</span>
              </div>
              {/* HSBC */}
              <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg transition duration-300 transform hover:scale-110 font-bold shadow-lg whitespace-nowrap min-w-max">
                <span className="text-lg">🏦 HSBC</span>
              </div>
              {/* Standard Chartered */}
              <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-lg transition duration-300 transform hover:scale-110 font-bold shadow-lg whitespace-nowrap min-w-max">
                <span className="text-lg">🏦 Standard Chartered</span>
              </div>
              {/* British Airways */}
              <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition duration-300 transform hover:scale-110 font-bold shadow-lg whitespace-nowrap min-w-max">
                <span className="text-lg">✈️ British Airways</span>
              </div>
              {/* Adobe */}
              <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white rounded-lg transition duration-300 transform hover:scale-110 font-bold shadow-lg whitespace-nowrap min-w-max">
                <span className="text-lg">🎨 Adobe</span>
              </div>
              {/* Singapore Airlines */}
              <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white rounded-lg transition duration-300 transform hover:scale-110 font-bold shadow-lg whitespace-nowrap min-w-max">
                <span className="text-lg">✈️ Singapore Airlines</span>
              </div>
              {/* Tokio Marine */}
              <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-lg transition duration-300 transform hover:scale-110 font-bold shadow-lg whitespace-nowrap min-w-max">
                <span className="text-lg">🛡️ Tokio Marine</span>
              </div>
              {/* ING */}
              <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white rounded-lg transition duration-300 transform hover:scale-110 font-bold shadow-lg whitespace-nowrap min-w-max">
                <span className="text-lg">🏦 ING</span>
              </div>

              {/* Duplicate for seamless loop */}
              <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition duration-300 transform hover:scale-110 font-bold shadow-lg whitespace-nowrap min-w-max">
                <span className="text-lg">✈️ Sabre</span>
              </div>
              <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg transition duration-300 transform hover:scale-110 font-bold shadow-lg whitespace-nowrap min-w-max">
                <span className="text-lg">✈️ SITA</span>
              </div>
              <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg transition duration-300 transform hover:scale-110 font-bold shadow-lg whitespace-nowrap min-w-max">
                <span className="text-lg">🏦 HSBC</span>
              </div>
              <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-lg transition duration-300 transform hover:scale-110 font-bold shadow-lg whitespace-nowrap min-w-max">
                <span className="text-lg">🏦 Standard Chartered</span>
              </div>
            </div>
            <style jsx>{`
              @keyframes scroll-left {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              
              .animate-scroll-left {
                animation: scroll-left 40s linear infinite;
              }
              
              .animate-scroll-left:hover {
                animation-play-state: paused;
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* LinkedIn Recommendations Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            What People Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recommendation 1 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">PM</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Pankaj Mendiratta</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Founder | EYQA</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                "Chandra is a highly skilled Senior Automation Lead with a proven track record in delivering successful automation projects. His expertise in UI and API automation, coupled with his leadership abilities, make him a valuable asset to any team."
              </p>
            </div>

            {/* Recommendation 2 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">WZ</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Wanshan Zhang</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automation Lead at Standard Chartered Bank</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                "Chandra is quite skillful at setting up agile automation frameworks and always could troubleshoot the most challenging technical issues. Working with him on different teams was a great experience."
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="https://www.linkedin.com/in/shekharqa/" target="_blank" rel="noopener noreferrer" className="inline-block text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              View All Recommendations →
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 Chandra Shekhar Pandey. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
             </div>
        </div>
      </div>
    </Layout>
  );
}
