import { useEffect, useState } from 'react';
import { listPendingInstructorApplications, approveInstructorApplication, rejectInstructorApplication } from '../api/instructorApplication';

export default function InstructorApplications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listPendingInstructorApplications();
      setItems(data);
    } catch (e) {
      setError(e.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onApprove = async (id) => {
    try {
      await approveInstructorApplication(id);
      await load();
    } catch (e) {
      alert(e.message || 'Failed to approve');
    }
  };
  const onReject = async (id) => {
    try {
      await rejectInstructorApplication(id);
      await load();
    } catch (e) {
      alert(e.message || 'Failed to reject');
    }
  };

  if (loading) return <div className="p-6">Loading applications...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Instructor Applications</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Pending Instructor Applications</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Review and manage instructor applications</p>
        </div>
        
        {items.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-2">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No pending applications</h3>
            <p className="text-gray-600 dark:text-gray-400">All instructor applications have been reviewed.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-48">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-64">
                    Expertise
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Bio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-44">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-44">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {items.map(app => (
                  <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                    <td className="px-6 py-4 w-48">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {(app.applicantName || app.userId || '?').charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {app.applicantName || app.userId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 w-24">
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {app.experienceYears ?? '0'} {(app.experienceYears === 1) ? 'year' : 'years'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 w-64">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {app.expertise ? (
                          <div className="flex flex-wrap gap-1">
                            {app.expertise.split(',').map((skill, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Not specified</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        <div className="max-w-xs">
                          <p className="line-clamp-2" title={app.bio}>
                            {app.bio || <span className="text-gray-400 italic">No bio provided</span>}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 w-44">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {app.createdAt ? (
                          <div>
                            <div className="font-medium">
                              {new Date(app.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-xs">
                              {new Date(app.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Unknown</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 w-44">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150" 
                          onClick={() => onApprove(app.id)}
                        >
                          Approve
                        </button>
                        <button 
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150" 
                          onClick={() => onReject(app.id)}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
