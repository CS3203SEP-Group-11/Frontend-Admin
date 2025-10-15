import api from './axios';

export const getRevenueSummary = async () => {
  try {
    const res = await api.get('/payments/revenue-summary', {
      headers: {
        'X-User-Role': 'ADMIN'
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching revenue summary:', error);
    throw error;
  }
};

export const getSubscriberStats = async () => {
  try {
    const res = await api.get('/subscriptions/analytics', {
      headers: {
        'X-User-Role': 'ADMIN'
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching subscriber stats:', error);
    throw error;
  }
};

export const getCourseEnrollmentStats = async () => {
  try {
    const res = await api.get('/enrollments/analytics', {
      headers: {
        'X-User-Role': 'ADMIN'
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching enrollment stats:', error);
    throw error;
  }
};

export const getCourseAnalytics = async () => {
  try {
    const res = await api.get('/courses/analytics', {
      headers: {
        'X-User-Role': 'ADMIN'
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching course analytics:', error);
    throw error;
  }
};

export const getUserAnalytics = async () => {
  try {
    const res = await api.get('/users/analytics', {
      headers: {
        'X-User-Role': 'ADMIN'
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching user analytics:', error);
    throw error;
  }
};
