// API service for subscription management functionality
import { dummyAdminData } from '../data/dummyData';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8083/api';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class SubscriptionService {
  
  // Get all subscription plans
  static async getSubscriptionPlans() {
    await delay(800);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/subscription-plans/active`);
    // return response.json();
    
    return dummyAdminData.subscriptionPlans;
  }

  // Create a new subscription plan
  static async createSubscriptionPlan(planData) {
    await delay(1200);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/subscription-plans/admin/create`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   },
    //   body: JSON.stringify(planData)
    // });
    // return response.json();
    
    // Simulate success response
    return {
      success: true,
      message: 'Subscription plan created successfully',
      data: {
        id: `plan_${Date.now()}`,
        ...planData,
        isActive: true,
        subscribersCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
  }

  // Update subscription plan
  static async updateSubscriptionPlan(planId, updateData) {
    await delay(1000);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/subscription-plans/admin/${planId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   },
    //   body: JSON.stringify(updateData)
    // });
    // return response.json();
    
    // Simulate success response
    return {
      success: true,
      message: 'Subscription plan updated successfully',
      planId,
      updatedAt: new Date().toISOString()
    };
  }

  // Toggle plan active status
  static async togglePlanStatus(planId, isActive) {
    await delay(800);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/subscription-plans/admin/${planId}/status`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   },
    //   body: JSON.stringify({ isActive })
    // });
    // return response.json();
    
    // Simulate success response
    return {
      success: true,
      message: `Subscription plan ${isActive ? 'activated' : 'deactivated'} successfully`,
      planId,
      isActive,
      updatedAt: new Date().toISOString()
    };
  }

  // Delete subscription plan
  static async deleteSubscriptionPlan(planId) {
    await delay(1000);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/subscription-plans/admin/${planId}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   }
    // });
    // return response.json();
    
    // Simulate success response
    return {
      success: true,
      message: 'Subscription plan deleted successfully',
      planId
    };
  }

  // Get subscription analytics
  static async getSubscriptionAnalytics() {
    await delay(600);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/subscription-plans/admin/analytics`);
    // return response.json();
    
    return dummyAdminData.subscriptionAnalytics;
  }

  // Get subscribers by plan
  static async getSubscribersByPlan(planId) {
    await delay(500);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/subscription-plans/admin/${planId}/subscribers`);
    // return response.json();
    
    // Simulate subscribers data
    const plan = dummyAdminData.subscriptionPlans.find(p => p.id === planId);
    return {
      planId,
      planName: plan?.name || 'Unknown Plan',
      totalSubscribers: plan?.subscribersCount || 0,
      subscribers: Array.from({ length: Math.min(plan?.subscribersCount || 0, 10) }, (_, i) => ({
        id: `sub_${planId}_${i + 1}`,
        userId: `user_${Date.now()}_${i}`,
        userName: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        subscribedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active'
      }))
    };
  }

  // Get subscription statistics
  static async getSubscriptionStatistics() {
    await delay(400);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/subscription-plans/admin/statistics`);
    // return response.json();
    
    const plans = dummyAdminData.subscriptionPlans;
    const analytics = dummyAdminData.subscriptionAnalytics;
    
    return {
      totalPlans: plans.length,
      activePlans: plans.filter(plan => plan.isActive).length,
      inactivePlans: plans.filter(plan => !plan.isActive).length,
      totalSubscribers: analytics.totalSubscribers,
      totalRevenue: analytics.totalRevenue,
      monthlyRevenue: analytics.monthlyRecurringRevenue,
      annualRevenue: analytics.annualRecurringRevenue,
      churnRate: analytics.churnRate,
      averageRevenuePerUser: analytics.totalRevenue / analytics.totalSubscribers
    };
  }

  // Cancel user subscription (admin action)
  static async cancelUserSubscription(subscriptionId, userId, reason = '') {
    await delay(1000);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/subscriptions/admin/${subscriptionId}/cancel`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   },
    //   body: JSON.stringify({ userId, reason })
    // });
    // return response.json();
    
    return {
      success: true,
      message: 'User subscription cancelled successfully',
      subscriptionId,
      userId,
      cancelledAt: new Date().toISOString(),
      reason
    };
  }

  // Refund user subscription (admin action)
  static async refundUserSubscription(subscriptionId, userId, amount, reason = '') {
    await delay(1200);
    
    // In a real app, this would be an actual API call:
    // const response = await fetch(`${API_BASE_URL}/subscriptions/admin/${subscriptionId}/refund`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //   },
    //   body: JSON.stringify({ userId, amount, reason })
    // });
    // return response.json();
    
    return {
      success: true,
      message: 'User subscription refunded successfully',
      subscriptionId,
      userId,
      refundAmount: amount,
      refundedAt: new Date().toISOString(),
      reason
    };
  }
}

export default SubscriptionService;