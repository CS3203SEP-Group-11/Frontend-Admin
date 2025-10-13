// API service for instructor approval functionality
import { dummyAdminData } from '../data/dummyData';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class InstructorApprovalService {
  
  // Get all instructor approval requests
  static async getInstructorRequests() {
    await delay(800);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/admin/instructor-requests`);
    // return response.json();
    
    return dummyAdminData.instructorRequests;
  }

  // Approve an instructor request
  static async approveInstructorRequest(requestId, adminNotes = '') {
    await delay(1200);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/admin/instructor-requests/${requestId}/approve`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   },
    //   body: JSON.stringify({ adminNotes })
    // });
    // return response.json();
    
    // Simulate success response
    return {
      success: true,
      message: 'Instructor request approved successfully',
      requestId,
      approvedAt: new Date().toISOString()
    };
  }

  // Reject an instructor request
  static async rejectInstructorRequest(requestId, reason = '') {
    await delay(1200);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/admin/instructor-requests/${requestId}/reject`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   },
    //   body: JSON.stringify({ reason })
    // });
    // return response.json();
    
    // Simulate success response
    return {
      success: true,
      message: 'Instructor request rejected',
      requestId,
      rejectedAt: new Date().toISOString(),
      reason
    };
  }

  // Get instructor request details
  static async getInstructorRequestDetails(requestId) {
    await delay(500);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/admin/instructor-requests/${requestId}`);
    // return response.json();
    
    const request = dummyAdminData.instructorRequests.find(req => req.id === requestId);
    if (!request) {
      throw new Error('Instructor request not found');
    }
    
    return request;
  }

  // Send notification to user about approval/rejection
  static async sendApprovalNotification(userId, status, message = '') {
    await delay(300);
    
    // In a real app, this would trigger an email/notification:
    // const response = await fetch(`${API_BASE_URL}/notifications/instructor-approval`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   },
    //   body: JSON.stringify({ userId, status, message })
    // });
    // return response.json();
    
    console.log(`Notification sent to user ${userId}: Instructor application ${status}`);
    return { success: true };
  }

  // Get approval statistics
  static async getApprovalStatistics() {
    await delay(400);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/admin/instructor-requests/statistics`);
    // return response.json();
    
    const requests = dummyAdminData.instructorRequests;
    
    return {
      total: requests.length,
      pending: requests.filter(req => req.status === 'pending').length,
      approved: requests.filter(req => req.status === 'approved').length,
      rejected: requests.filter(req => req.status === 'rejected').length,
      thisMonth: requests.filter(req => {
        const requestDate = new Date(req.requestedAt);
        const now = new Date();
        return requestDate.getMonth() === now.getMonth() && 
               requestDate.getFullYear() === now.getFullYear();
      }).length
    };
  }
}

export default InstructorApprovalService;