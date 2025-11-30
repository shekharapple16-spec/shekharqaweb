import Layout from '../components/Layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Course() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [existingVideos, setExistingVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [enrollmentStats, setEnrollmentStats] = useState({
    total: 0,
    beginner: 0,
    intermediate: 0,
    advanced: 0
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [enrollmentData, setEnrollmentData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    linkedin: '',
    experience: 'beginner'
  });

  const allVideos = [
    {
      id: 1,
      title: 'HTTP MCP Playwright',
      description: 'Demonstration of HTTP MCP with Playwright automation',
      videoPath: '/videos/http mcp_playwright.mp4',
      fileName: 'http mcp_playwright.mp4'
    },
    {
      id: 2,
      title: 'Jira Acceptance Extract with Playwright MCP',
      description: 'Automating Jira acceptance extraction using Playwright MCP',
      videoPath: '/videos/jira acceptance extract and used playwright mcp to automate it.mp4',
      fileName: 'jira acceptance extract and used playwright mcp to automate it.mp4'
    }
  ];

  useEffect(() => {
    const checkVideos = async () => {
      try {
        const videoList = await Promise.all(
          allVideos.map(async (video) => {
            const response = await fetch(video.videoPath, { method: 'HEAD' });
            return response.ok ? video : null;
          })
        );
        setExistingVideos(videoList.filter(v => v !== null));
      } catch (error) {
        console.error('Error checking videos:', error);
      } finally {
        setLoadingVideos(false);
      }
    };
    checkVideos();
  }, []);

  useEffect(() => {
    const fetchEnrollmentStats = async () => {
      try {
        const response = await fetch('/api/get-enrollments');
        const data = await response.json();
        
        if (data.success && data.enrollments) {
          const enrollments = data.enrollments;
          const beginner = enrollments.filter(e => e.experience === 'beginner').length;
          const intermediate = enrollments.filter(e => e.experience === 'intermediate').length;
          const advanced = enrollments.filter(e => e.experience === 'advanced').length;
          const total = enrollments.length;

          setEnrollmentStats({
            total,
            beginner,
            intermediate,
            advanced
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchEnrollmentStats();
    // Refresh stats every 10 seconds
    const interval = setInterval(fetchEnrollmentStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleEnrollmentSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/send-enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentData),
      });

      const data = await response.json();

      // Show success message regardless of response status
      alert(`Thank you for enrolling!\n\nName: ${enrollmentData.name}\nEmail: ${enrollmentData.email}\nPhone: ${enrollmentData.phone}\nCompany: ${enrollmentData.company}\nLinkedIn: ${enrollmentData.linkedin}\nExperience: ${enrollmentData.experience}`);
      setShowEnrollForm(false);
      setEnrollmentData({
        name: '',
        email: '',
        phone: '',
        company: '',
        linkedin: '',
        experience: 'beginner'
      });
    } catch (error) {
      console.error('Submission error:', error);
      // Show success message even on error
      alert(`Thank you for enrolling!\n\nName: ${enrollmentData.name}\nEmail: ${enrollmentData.email}\nPhone: ${enrollmentData.phone}\nCompany: ${enrollmentData.company}\nLinkedIn: ${enrollmentData.linkedin}\nExperience: ${enrollmentData.experience}`);
      setShowEnrollForm(false);
      setEnrollmentData({
        name: '',
        email: '',
        phone: '',
        company: '',
        linkedin: '',
        experience: 'beginner'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnrollmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      {/* Course Header */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <button className="mb-6 px-4 py-2 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg transition">
              ← Back to Home
            </button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            GitHub Copilot for Test Automation
          </h1>
          <p className="text-lg text-blue-100">
            Master AI-powered test case generation, test data creation, and script automation
          </p>
        </div>
      </div>

      {/* Course Navigation */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2 rounded-lg transition ${
                activeTab === 'overview' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              📚 Course Overview
            </button>
            <button 
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-2 rounded-lg transition ${
                activeTab === 'videos' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              🎬 Resources & Videos
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Course Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Day 1 */}
              <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                Day 1 (45 Minutes) – GHCP + Test Case Automation
              </h2>
            </div>

            {/* Day 1 Sections */}
            <div className="space-y-8 ml-16">
              {/* Section 1 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border-l-4 border-blue-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                    15 mins
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    1. GHCP – Brief Introduction
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">→</span>
                    <span>What is GitHub Copilot?</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">→</span>
                    <span>How Copilot helps automation engineers</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">→</span>
                    <span>Real-world use cases (test case creation, code assistance)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">→</span>
                    <span>Quick examples of prompts for QA tasks</span>
                  </li>
                </ul>
              </div>

              {/* Section 2 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border-l-4 border-purple-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-semibold">
                    20 mins
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    2. AI for Test Case Generation
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li className="flex gap-3">
                    <span className="text-purple-600 font-bold">→</span>
                    <span>Generating test cases from requirements, user stories, PDF documents</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600 font-bold">→</span>
                    <span>Identifying positive/negative scenarios</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600 font-bold">→</span>
                    <span>Structuring test cases using AI</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600 font-bold">→</span>
                    <span>Example prompts for high-quality test cases</span>
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border-l-4 border-pink-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 px-3 py-1 rounded-full text-sm font-semibold">
                    10 mins
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    3. Test Data Creation – Part 1
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li className="flex gap-3">
                    <span className="text-pink-600 font-bold">→</span>
                    <span>Why automated test data matters</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pink-600 font-bold">→</span>
                    <span>Techniques: synthetic data, random data, boundary data</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pink-600 font-bold">→</span>
                    <span>How AI can auto-generate data sets</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-pink-600 font-bold">→</span>
                    <span>Quick demonstration prompts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                Day 2 (45 Minutes) – Test Data + Script Generation + Demo
              </h2>
            </div>

            {/* Day 2 Sections */}
            <div className="space-y-8 ml-16">
              {/* Section 1 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border-l-4 border-green-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                    10 mins
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    1. Test Data Creation – Part 2
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">→</span>
                    <span>Generating complex datasets (JSON, CSV, DB-ready)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">→</span>
                    <span>Data variations: edge cases, negative patterns</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">→</span>
                    <span>Integrating test data into frameworks</span>
                  </li>
                </ul>
              </div>

              {/* Section 2 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border-l-4 border-yellow-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-semibold">
                    20 mins
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    2. Script Generation using AI
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li className="flex gap-3">
                    <span className="text-yellow-600 font-bold">→</span>
                    <span>Generate Selenium/Playwright scripts with prompts</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-600 font-bold">→</span>
                    <span>Auto-creating locators, assertions, waits</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-600 font-bold">→</span>
                    <span>From Gherkin → script generation workflow</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-600 font-bold">→</span>
                    <span>Best practices for prompt-driven script creation</span>
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border-l-4 border-red-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-3 py-1 rounded-full text-sm font-semibold">
                    15 mins
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    3. End-to-End Demo
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li className="flex gap-3">
                    <span className="text-red-600 font-bold">→</span>
                    <span>Start with a requirement document</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600 font-bold">→</span>
                    <span>Generate test cases, test data, and test scripts</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600 font-bold">→</span>
                    <span>Show complete automated flow using GHCP/GenAI</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-600 font-bold">→</span>
                    <span>Highlight real productivity gains with video demonstrations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Enrollment Progress Bar */}
          <div className="my-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-xl p-10 border-2 border-blue-200 dark:border-blue-700 shadow-lg">
            <div className="text-center mb-8">
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">⚡ Live Enrollment</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">Join the growing community today!</p>
            </div>
            
            {/* Animated Bar Container */}
            <div className="relative">
              <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-8 overflow-hidden shadow-inner">
                <div
                  className={`h-full rounded-full transition-all duration-1000 font-bold flex items-center justify-center text-white text-sm relative bg-gradient-to-r from-green-400 to-green-600 shadow-lg shadow-green-400`}
                  style={{ width: `${Math.max(15, Math.min((enrollmentStats.total / 15) * 100, 100))}%` }}
                >
                  {enrollmentStats.total >= 15 ? '✓ New Batch Enrollment Started - FREE' : `${Math.max(15, Math.round((enrollmentStats.total / 15) * 100))}%`}
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div className="mt-6 text-center">
              {enrollmentStats.total >= 25 ? (
                <p className="text-green-600 dark:text-green-400 font-semibold">✓ Batch Full - New Batch Enrollment Started!</p>
              ) : (
                <p className="text-yellow-600 dark:text-yellow-400 font-semibold">{25 - enrollmentStats.total} spots remaining for Batch 2</p>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-lg mb-6 opacity-90">
              Enroll now and master GitHub Copilot for test automation in just 2 days!
            </p>
            <button 
              onClick={() => setShowEnrollForm(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
              Enroll Now
            </button>
          </div>

          {/* Enrollment Form Modal */}
          {showEnrollForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Enroll Now</h2>
                  <button 
                    onClick={() => setShowEnrollForm(false)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleEnrollmentSubmit} className="p-6 space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={enrollmentData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-200"
                      placeholder="shekhar"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={enrollmentData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-200"
                      placeholder="shekhar@example.com"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={enrollmentData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-200"
                      placeholder="+91 85068 XXXX"
                    />
                  </div>

                  {/* Company Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={enrollmentData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-200"
                      placeholder="Your Company"
                    />
                  </div>

                  {/* LinkedIn Profile Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="text"
                      name="linkedin"
                      value={enrollmentData.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-200"
                      placeholder="www.linkedin.com/in/yourprofile"
                    />
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Experience Level
                    </label>
                    <select
                      name="experience"
                      value={enrollmentData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-200"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition duration-300 mt-6"
                  >
                    {submitting ? 'Submitting...' : 'Submit Enrollment'}
                  </button>
                </form>
              </div>
            </div>
          )}
            </>
          )}

          {/* Videos Tab */}
          {activeTab === 'videos' && (
            <>
              {/* Resources & Videos Section */}
              <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
              🎬 Resources & Video Demonstrations
            </h2>

            {/* Video Player Modal */}
            {selectedVideo && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-black rounded-lg w-full max-w-4xl">
                  <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h3 className="text-white font-bold text-lg">{selectedVideo.title}</h3>
                    <button onClick={() => setSelectedVideo(null)} className="text-white text-2xl hover:text-gray-300">
                      ✕
                    </button>
                  </div>
                  <video 
                    controls 
                    className="w-full aspect-video"
                    autoPlay
                  >
                    <source src={selectedVideo.videoPath} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
            
            {loadingVideos ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">Loading videos...</p>
              </div>
            ) : existingVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {existingVideos.map((video) => (
                  <div key={video.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                    <div 
                      className="relative aspect-video bg-gray-900 flex items-center justify-center cursor-pointer hover:opacity-80 transition group overflow-hidden"
                      onClick={() => setSelectedVideo(video)}
                    >
                      <video 
                        className="w-full h-full object-cover"
                        muted
                      >
                        <source src={video.videoPath} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition flex items-center justify-center">
                        <svg className="w-16 h-16 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {video.description}
                      </p>
                      <button 
                        onClick={() => setSelectedVideo(video)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
                      >
                        Watch Video
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
                <p className="text-blue-800 dark:text-blue-200 text-lg">
                  No videos uploaded yet. Upload MP4 files to the <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs">/public/videos/</code> folder.
                </p>
              </div>
            )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
