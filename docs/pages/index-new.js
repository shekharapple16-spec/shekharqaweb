import Layout from '../components/Layout';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Chandra Shekhar - AI-Powered Development</title>
        <meta name="description" content="Master AI-powered coding assistance for faster development, better code quality, and increased productivity." />
        <link rel="canonical" href="https://shekhar-pro.vercel.app/" />
      </Head>
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Chandra Shekhar Pandey
            </h1>
            <div className="hidden md:flex gap-8">
              <a href="/course" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Course</a>
              <a href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Blog</a>
              <a href="https://www.linkedin.com/in/shekharqa" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Simplified */}
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Supercharge Your Development Workflow
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Master AI-powered coding assistance for faster development, better code quality, and increased productivity
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/course" className="inline-block bg-blue-600 text-white hover:bg-blue-700 font-semibold py-3 px-8 rounded-lg transition duration-300">
              Start Learning
            </a>
            <a href="/blog" className="inline-block bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 font-semibold py-3 px-8 rounded-lg transition duration-300">
              Read Blog
            </a>
            <a href="https://www.linkedin.com/in/shekharqa" target="_blank" rel="noopener noreferrer" className="inline-block bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 font-semibold py-3 px-8 rounded-lg transition duration-300">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Trusted by Industry Leaders
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-center">Sabre</p>
            </div>
            <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-center">SITA</p>
            </div>
            <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-center">HSBC</p>
            </div>
            <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-center">Standard Chartered</p>
            </div>
            <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-center">British Airways</p>
            </div>
            <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-center">Adobe</p>
            </div>
            <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-center">Singapore Airlines</p>
            </div>
            <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-center">Tokio Marine</p>
            </div>
            <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-center">ING</p>
            </div>
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
          <p>&copy; 2025 Chandra Shekhar. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
             </div>
        </div>
      </div>
    </Layout>
  );
}
