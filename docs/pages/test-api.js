'use client';

import { useState } from 'react';
import Layout from '../components/Layout';

export default function TestAPI() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTest = async (action) => {
    setLoading(true);
    setResponse(null);
    
    try {
      console.log(`Testing: ${action}`);
      const res = await fetch('/api/test-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });

      const data = await res.json();
      console.log('Response:', data);
      
      setResponse({
        status: res.status,
        success: data.success,
        message: data.message,
        error: data.error,
        data: data.data || data.count || data.deletedCount || data.timestamp,
        fullResponse: JSON.stringify(data, null, 2)
      });
    } catch (error) {
      console.error('Error:', error);
      setResponse({
        status: 'ERROR',
        success: false,
        message: error.message,
        fullResponse: error.toString()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Database Test Suite</h1>

          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Quick Tests</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => runTest('connection-test')}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                1. Test Connection
              </button>
              
              <button
                onClick={() => runTest('create-table')}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                2. Create Table
              </button>
              
              <button
                onClick={() => runTest('insert-test')}
                disabled={loading}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
              >
                3. Insert Test Data
              </button>
              
              <button
                onClick={() => runTest('select-all')}
                disabled={loading}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
              >
                4. View All Data
              </button>
              
              <button
                onClick={() => runTest('delete-all')}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                5. Delete All Data
              </button>
            </div>

            {loading && (
              <div className="mt-4 text-center">
                <p className="text-gray-600">Testing...</p>
              </div>
            )}
          </div>

          {response && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Response</h2>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Status: <span className={response.status === 200 ? 'text-green-600' : 'text-red-600'}>
                    {response.status}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Success: <span className={response.success ? 'text-green-600' : 'text-red-600'}>
                    {response.success ? '✅ Yes' : '❌ No'}
                  </span>
                </p>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-gray-800">{response.message}</p>
              </div>

              {response.error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded">
                  <p className="text-red-800 font-semibold">Error:</p>
                  <p className="text-red-700 text-sm">{response.error}</p>
                </div>
              )}

              {response.data && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 rounded">
                  <p className="text-green-800 font-semibold">Data:</p>
                  <pre className="text-green-700 text-xs overflow-auto max-h-48">
                    {JSON.stringify(response.data, null, 2)}
                  </pre>
                </div>
              )}

              <div className="p-3 bg-gray-100 border border-gray-400 rounded">
                <p className="text-gray-800 font-semibold mb-2">Full Response:</p>
                <pre className="text-gray-700 text-xs overflow-auto max-h-64">
                  {response.fullResponse}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
