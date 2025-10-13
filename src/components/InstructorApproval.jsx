import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  ExternalLink, 
  Check, 
  X, 
  Eye,
  Clock,
  Award,
  Briefcase,
  FileText
} from 'lucide-react';
import { dummyAdminData } from '../data/dummyData';

const InstructorApproval = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch instructor requests
    setTimeout(() => {
      setRequests(dummyAdminData.instructorRequests);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = async (requestId) => {
    setActionLoading(requestId);
    
    // Simulate API call
    setTimeout(() => {
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'approved', approvedAt: new Date().toISOString() }
          : req
      ));
      setActionLoading(null);
      setShowDetailModal(false);
    }, 1500);
  };

  const handleReject = async (requestId) => {
    setActionLoading(requestId);
    
    // Simulate API call
    setTimeout(() => {
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected', rejectedAt: new Date().toISOString() }
          : req
      ));
      setActionLoading(null);
      setShowDetailModal(false);
    }, 1500);
  };

  const openDetailModal = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending', icon: Clock },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved', icon: Check },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected', icon: X }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 rounded-lg h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const processedRequests = requests.filter(req => req.status !== 'pending');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Instructor Approval Requests
        </h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {pendingRequests.length} pending requests
          </span>
        </div>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Pending Requests ({pendingRequests.length})
          </h3>
          <div className="grid gap-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={request.profileImage}
                      alt={request.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {request.name}
                        </h4>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {request.email}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Requested: {formatDate(request.requestedAt)}
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        <strong>Previous Role:</strong> {request.previousRole}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Qualifications:</strong> {request.qualifications}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openDetailModal(request)}
                      className="flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                    <button
                      onClick={() => handleApprove(request.id)}
                      disabled={actionLoading === request.id}
                      className="flex items-center px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                    >
                      {actionLoading === request.id ? (
                        <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-1"></div>
                      ) : (
                        <Check className="w-4 h-4 mr-1" />
                      )}
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      disabled={actionLoading === request.id}
                      className="flex items-center px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                    >
                      {actionLoading === request.id ? (
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-1"></div>
                      ) : (
                        <X className="w-4 h-4 mr-1" />
                      )}
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Processed Requests */}
      {processedRequests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Processed Requests ({processedRequests.length})
          </h3>
          <div className="grid gap-4">
            {processedRequests.map((request) => (
              <div key={request.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 opacity-75">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={request.profileImage}
                      alt={request.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {request.name}
                        </h4>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {request.email} • {request.previousRole}
                      </div>
                      {(request.approvedAt || request.rejectedAt) && (
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {request.status === 'approved' ? 'Approved' : 'Rejected'} on{' '}
                          {formatDate(request.approvedAt || request.rejectedAt)}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => openDetailModal(request)}
                    className="flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {requests.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No instructor requests yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Instructor approval requests will appear here when users apply to become instructors.
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Instructor Application Details
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Applicant Info */}
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedRequest.profileImage}
                    alt={selectedRequest.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {selectedRequest.name}
                      </h4>
                      {getStatusBadge(selectedRequest.status)}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 space-y-1">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {selectedRequest.email}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Applied: {formatDate(selectedRequest.requestedAt)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid gap-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
                      <h5 className="font-semibold text-gray-900 dark:text-white">Previous Role</h5>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 pl-7">
                      {selectedRequest.previousRole}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Award className="w-5 h-5 mr-2 text-gray-500" />
                      <h5 className="font-semibold text-gray-900 dark:text-white">Qualifications</h5>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 pl-7">
                      {selectedRequest.qualifications}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <FileText className="w-5 h-5 mr-2 text-gray-500" />
                      <h5 className="font-semibold text-gray-900 dark:text-white">Experience</h5>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 pl-7">
                      {selectedRequest.experience}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <ExternalLink className="w-5 h-5 mr-2 text-gray-500" />
                      <h5 className="font-semibold text-gray-900 dark:text-white">Portfolio</h5>
                    </div>
                    <a
                      href={selectedRequest.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 pl-7 flex items-center"
                    >
                      {selectedRequest.portfolio}
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <User className="w-5 h-5 mr-2 text-gray-500" />
                      <h5 className="font-semibold text-gray-900 dark:text-white">Motivation</h5>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 pl-7">
                      {selectedRequest.motivation}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedRequest.status === 'pending' && (
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleReject(selectedRequest.id)}
                      disabled={actionLoading === selectedRequest.id}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      {actionLoading === selectedRequest.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : (
                        <X className="w-4 h-4 mr-2" />
                      )}
                      Reject Application
                    </button>
                    <button
                      onClick={() => handleApprove(selectedRequest.id)}
                      disabled={actionLoading === selectedRequest.id}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {actionLoading === selectedRequest.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : (
                        <Check className="w-4 h-4 mr-2" />
                      )}
                      Approve as Instructor
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorApproval;