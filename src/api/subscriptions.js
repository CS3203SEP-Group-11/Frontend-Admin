import api from './axios';

// Fetch all active subscription plans
export const getSubscriptionPlans = async () => {
  try {
    const res = await api.get('/subscription-plans/active');
    return res.data;
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    throw error;
  }
};

// Fetch subscription analytics (admin)
export const getSubscriptionAnalytics = async () => {
  try {
    const res = await api.get('/subscriptions/analytics', {
      headers: {
        'X-User-Role': 'ADMIN'
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching subscription analytics:', error);
    throw error;
  }
};
