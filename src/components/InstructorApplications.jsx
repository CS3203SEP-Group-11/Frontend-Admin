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
      <h2 className="text-2xl font-bold mb-4">Pending Instructor Applications</h2>
      {items.length === 0 ? (
        <div className="text-gray-600">No pending applications.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="p-3 text-left">Applicant</th>
                <th className="p-3 text-left">Experience</th>
                <th className="p-3 text-left">Expertise</th>
                <th className="p-3 text-left">Bio</th>
                <th className="p-3 text-left">Submitted</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(app => (
                <tr key={app.id} className="border-t">
                  <td className="p-3">{app.applicantName || app.userId}</td>
                  <td className="p-3">{app.experienceYears ?? '-'}</td>
                  <td className="p-3">{app.expertise || '-'}</td>
                  <td className="p-3 max-w-md truncate" title={app.bio}>{app.bio}</td>
                  <td className="p-3">{app.createdAt ? new Date(app.createdAt).toLocaleString() : '-'}</td>
                  <td className="p-3 space-x-2 text-center">
                    <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => onApprove(app.id)}>Approve</button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => onReject(app.id)}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
