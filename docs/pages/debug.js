import { useState } from 'react';
import Layout from '../components/Layout';

export default function Debug() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testData] = useState({
    name: 'Debug Test User',
    email: 'debug@test.com',
    phone: '9999999999',
    company: 'Debug Co',
    experience: 'beginner'
  });

  const testEnrollmentAPI = async () => {
    setLoading(true);
    try {
      console.log('Sending test enrollment...');
      const response = await fetch('/api/send-enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const data = await response.json();
      console.log('Response:', data);
      setResponse({
        status: response.status,
        success: data.success,
        message: data.message || data.error,
        details: data.details || data.enrollmentId,
        fullData: JSON.stringify(data, null, 2)
      });
    } catch (error) {
      console.error('Error:', error);
      setResponse({
        status: 'ERROR',
        success: false,
        message: error.message,
        details: error.toString(),
        fullData: null
      });
    } finally {
      setLoading(false);
    }
  };

  const testGetAPI = async () => {
    setLoading(true);
    try {
      console.log('Fetching enrollments...');
      const response = await fetch('/api/get-enrollments', {
        headers: {
          'Authorization': 'Bearer ' + Buffer.from('SecureAdminPass123!').toString('base64'),
        },
      });

      const data = await response.json();
      console.log('Response:', data);
      setResponse({
        status: response.status,
        success: data.success,
        message: `Found ${data.enrollments?.length || 0} enrollments`,
        details: data.total || data.error,
        fullData: JSON.stringify(data, null, 2)
      });
    } catch (error) {
      console.error('Error:', error);
      setResponse({
        status: 'ERROR',
        success: false,
        message: error.message,
        details: error.toString(),
        fullData: null
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">🧪 API Debug Panel</h1>
        
        <div className="space-y-4">
          <button
            onClick={testEnrollmentAPI}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : '1. Test Send Enrollment API'}
          </button>

          <button
            onClick={testGetAPI}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : '2. Test Get Enrollments API'}
          </button>
        </div>

        {response && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold mb-4">📊 Response</h2>
            
            <div className="space-y-2 mb-4">
              <div>
                <span className="font-semibold">Status:</span> 
                <span className={response.status === 200 ? 'text-green-600' : 'text-red-600'}>
                  {' '}{response.status}
                </span>
              </div>
              <div>
                <span className="font-semibold">Success:</span> 
                <span>{response.success ? '✅ Yes' : '❌ No'}</span>
              </div>
              <div>
                <span className="font-semibold">Message:</span> 
                <span>{response.message}</span>
              </div>
              <div>
                <span className="font-semibold">Details:</span> 
                <span>{response.details}</span>
              </div>
            </div>

            {response.fullData && (
              <div>
                <span className="font-semibold">Full Response:</span>
                <pre className="bg-black text-green-400 p-4 rounded mt-2 overflow-auto text-sm">
                  {response.fullData}
                </pre>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-bold mb-2">📝 Test Data Being Sent:</h3>
          <pre className="bg-white p-3 rounded text-sm overflow-auto">
            {JSON.stringify(testData, null, 2)}
          </pre>
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold mb-2">🔍 What This Tests:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Can the API receive requests?</li>
            <li>Is the database connected?</li>
            <li>Can data be saved?</li>
            <li>Can data be retrieved?</li>
            <li>Is authentication working?</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
