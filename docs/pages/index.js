import Layout from '../components/Layout';
import Head from 'next/head';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Master GitHub Copilot for Faster Development</title>
        <meta name="description" content="Your complete guide to leveraging AI-powered coding assistance for faster development, better code quality, and increased productivity." />
        <link rel="canonical" href="https://shekhar-pro.vercel.app/" />
      </Head>
      {/* HEADER - Hero Section with Images */}
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center px-0 relative overflow-hidden py-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-4000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full">
          <div className="grid grid-cols-1 gap-0 h-screen items-center">
            {/* Left - Text Content */}
            <div className="text-center px-8 sm:px-12 lg:px-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Master GitHub Copilot
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                Your complete guide to leveraging AI-powered coding assistance for faster development, better code quality, and increased productivity
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/course" className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center">
                  Start Learning
                </a>
                <a href="https://www.linkedin.com/in/shekharqa" target="_blank" rel="noopener noreferrer" className="bg-blue-700 text-white hover:bg-blue-800 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.81 0-9.728h3.554v1.375c.429-.661 1.196-1.605 2.905-1.605 2.122 0 3.714 1.388 3.714 4.373v5.585zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.707 0-.958.77-1.708 1.955-1.708 1.187 0 1.919.75 1.942 1.708 0 .949-.771 1.707-1.982 1.707zm1.581 11.597H3.714V9.724h3.203v10.728zM22.225 0H1.771C.798 0 0 .774 0 1.729v20.542C0 23.227.798 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                  </svg>
                  LinkedIn
                </a>
                <a href="https://topmate.io/chandra_shekhar12/page/cgXfOwKFlG" target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white hover:bg-purple-700 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Topmate
                </a>
              </div>

              {/* Quality Testing Solutions Text */}
              <div className="mt-24 pt-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    I've provided quality testing solutions to industry-leading organizations
                  </span>
                </h2>

                {/* Animated Companies Scroll */}
                <div className="relative w-full overflow-hidden">
                  <div className="flex gap-6 md:gap-8 animate-infinite-scroll">
                    <a href="https://www.sabre.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-full transition duration-300 transform hover:scale-110 font-semibold shadow-lg whitespace-nowrap">
                      Sabre
                    </a>
                    <a href="https://www.sita.aero" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-full transition duration-300 transform hover:scale-110 font-semibold shadow-lg whitespace-nowrap">
                      SITA
                    </a>
                    <a href="https://www.hsbc.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full transition duration-300 transform hover:scale-110 font-semibold shadow-lg whitespace-nowrap">
                      HSBC
                    </a>
                    <a href="https://www.sc.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-full transition duration-300 transform hover:scale-110 font-semibold shadow-lg whitespace-nowrap">
                      Standard Chartered
                    </a>
                    <a href="https://www.britishairways.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 text-white rounded-full transition duration-300 transform hover:scale-110 font-semibold shadow-lg whitespace-nowrap">
                      British Airways
                    </a>
                    <a href="https://www.adobe.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white rounded-full transition duration-300 transform hover:scale-110 font-semibold shadow-lg whitespace-nowrap">
                      Adobe
                    </a>
                    <a href="https://www.singaporeair.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white rounded-full transition duration-300 transform hover:scale-110 font-semibold shadow-lg whitespace-nowrap">
                      Singapore Airlines
                    </a>
                    <a href="https://www.tokiomarinehcc.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-full transition duration-300 transform hover:scale-110 font-semibold shadow-lg whitespace-nowrap">
                      Tokio Marine
                    </a>
                    <a href="https://www.ing.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white rounded-full transition duration-300 transform hover:scale-110 font-semibold shadow-lg whitespace-nowrap">
                      ING
                    </a>

                    {/* Duplicate for seamless loop */}
                    <a href="https://www.sabre.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-full transition duration-300 transform hover:scale-110 font-semibold shadow-lg whitespace-nowrap">
                      Sabre
                    </a>
                    <a href="https://www.sita.aero" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-full transition duration-300 transform hover:scale-110 font-semibold shadow-lg whitespace-nowrap">
                      SITA
                    </a>
                    <a href="https://www.hsbc.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full transition duration-300 transform hover:scale-110 font-semibold shadow-lg whitespace-nowrap">
                      HSBC
                    </a>
                    <a href="https://www.sc.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-full transition duration-300 transform hover:scale-110 font-semibold shadow-lg whitespace-nowrap">
                      Standard Chartered
                    </a>
                  </div>
                </div>
              </div>

              <style jsx>{`
                @keyframes infinite-scroll {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
                
                .animate-infinite-scroll {
                  animation: infinite-scroll 40s linear infinite;
                }
                
                .animate-infinite-scroll:hover {
                  animation-play-state: paused;
                }
              `}</style>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="mt-16 mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                LinkedIn Recommendations
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Recommendation 1 */}
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-xl p-8 shadow-2xl hover:shadow-3xl transition transform hover:scale-105 duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Pankaj Mendiratta</h3>
                    <p className="text-blue-100 text-sm">Founder | EYQA</p>
                    <p className="text-blue-200 text-xs mt-1">Teacher recommendation • July 23, 2024</p>
                  </div>
                </div>
                <p className="text-blue-50 leading-relaxed">
                  "Chandra is a highly skilled Senior Automation Lead with a proven track record in delivering successful automation projects. His expertise in UI and API automation, coupled with his leadership abilities, make him a valuable asset to any team. With a strong background in diverse industries and impressive client portfolio, Chandra consistently exceeds expectations."
                </p>
              </div>

              {/* Recommendation 2 */}
              <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-700 rounded-xl p-8 shadow-2xl hover:shadow-3xl transition transform hover:scale-105 duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Wanshan Zhang</h3>
                    <p className="text-purple-100 text-sm">Automation Lead at Standard Chartered Bank</p>
                    <p className="text-purple-200 text-xs mt-1">Colleague recommendation • March 1, 2024</p>
                  </div>
                </div>
                <p className="text-purple-50 leading-relaxed">
                  "Nice coworker, quite skillful to setup the agile automation framework, always could troubleshoot most of the technical issues and help the other colleagues. Working with Chandra on different teams was a great experience."
                </p>
              </div>
            </div>

            {/* View More Link */}
            <div className="text-center mt-10">
              <a href="https://www.linkedin.com/in/shekharqa/" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg">
                View All Recommendations on LinkedIn →
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </Layout>
  );
}
