import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { checkAdminAuth, logoutAdmin, getAdminToken } from '../../lib/auth';

export default function Enrollments() {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExperience, setFilterExperience] = useState('all');
  const [isAuthed, setIsAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check if component is mounted (client-side only)
    setMounted(true);
    
    if (!checkAdminAuth()) {
      router.push('/admin/login');
    } else {
      setIsAuthed(true);
      fetchEnrollments();
    }
  }, []);

  const fetchEnrollments = async () => {
    try {
      const token = getAdminToken();
      const response = await fetch('/api/get-enrollments', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setEnrollments(data.enrollments);
      } else if (response.status === 401) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Experience', 'Enrolled At'];
    const csvContent = [
      headers.join(','),
      ...enrollments.map(e =>
        [
          e.id,
          `"${e.name}"`,
          e.email,
          e.phone,
          `"${e.company || ''}"`,
          e.experience,
          new Date(e.enrolledAt).toLocaleString(),
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enrollments-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const deleteEnrollment = async (id) => {
    if (confirm('Are you sure you want to delete this enrollment?')) {
      try {
        const token = getAdminToken();
        const response = await fetch(`/api/delete-enrollment?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setEnrollments(enrollments.filter(e => e.id !== id));
        } else if (response.status === 401) {
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Error deleting enrollment:', error);
      }
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  const filteredEnrollments = enrollments.filter(e => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone.includes(searchTerm);
    const matchesExperience = filterExperience === 'all' || e.experience === filterExperience;
    return matchesSearch && matchesExperience;
  });

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <Link href="/">
              <button className="px-4 py-2 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg transition">
                ← Back to Home
              </button>
            </Link>
            {isAuthed && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
              >
                Logout
              </button>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Course Enrollments
          </h1>
          <p className="text-lg text-blue-100">
            View and manage all course enrollment data
          </p>
        </div>
      </div>

      {!isAuthed ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Redirecting to login...</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Loading enrollments...</p>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 text-center">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {enrollments.length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">Total Enrollments</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-6 text-center">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {enrollments.filter(e => e.experience === 'beginner').length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">Beginners</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-6 text-center">
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    {enrollments.filter(e => e.experience === 'intermediate').length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">Intermediate</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-6 text-center">
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {enrollments.filter(e => e.experience === 'advanced').length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">Advanced</p>
                </div>
              </div>

              {/* Filters and Actions */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-200"
                  />
                  <select
                    value={filterExperience}
                    onChange={(e) => setFilterExperience(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <button
                  onClick={downloadCSV}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  📥 Download as CSV
                </button>
              </div>

              {/* Enrollments Table */}
              {filteredEnrollments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300 dark:border-gray-600">
                        <th className="text-left py-3 px-4 font-bold text-gray-800 dark:text-gray-200">
                          Name
                        </th>
                        <th className="text-left py-3 px-4 font-bold text-gray-800 dark:text-gray-200">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 font-bold text-gray-800 dark:text-gray-200">
                          Phone
                        </th>
                        <th className="text-left py-3 px-4 font-bold text-gray-800 dark:text-gray-200">
                          Company
                        </th>
                        <th className="text-left py-3 px-4 font-bold text-gray-800 dark:text-gray-200">
                          Experience
                        </th>
                        <th className="text-left py-3 px-4 font-bold text-gray-800 dark:text-gray-200">
                          Enrolled
                        </th>
                        <th className="text-left py-3 px-4 font-bold text-gray-800 dark:text-gray-200">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEnrollments.map((enrollment) => (
                        <tr
                          key={enrollment.id}
                          className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                          <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                            {enrollment.name}
                          </td>
                          <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                            <a
                              href={`mailto:${enrollment.email}`}
                              className="text-blue-600 hover:underline"
                            >
                              {enrollment.email}
                            </a>
                          </td>
                          <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                            {enrollment.phone}
                          </td>
                          <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                            {enrollment.company || '-'}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                enrollment.experience === 'beginner'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : enrollment.experience === 'intermediate'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              }`}
                            >
                              {enrollment.experience.charAt(0).toUpperCase() +
                                enrollment.experience.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-xs">
                            {new Date(enrollment.enrolledAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => deleteEnrollment(enrollment.id)}
                              className="text-red-600 hover:text-red-800 hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400">
                    No enrollments found matching your criteria.
                  </p>
                </div>
              )}

              <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
                Showing {filteredEnrollments.length} of {enrollments.length} enrollments
              </p>
            </>
          )}
        </div>
      </div>
      )}
    </Layout>
  );
}
