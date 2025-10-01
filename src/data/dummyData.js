// Dummy data for admin dashboard

export const dummyAdminData = {
  // Admin profile
  admin: {
    id: 'admin1',
    username: 'admin',
    email: 'admin@levelup.com',
    role: 'ADMIN',
    createdAt: '2024-01-15T08:00:00Z'
  },

  // Dashboard statistics
  dashboardStats: {
    totalUsers: 2847,
    totalCourses: 156,
    totalRevenue: 45780,
    monthlyGrowth: 12.5,
    newUsersToday: 23,
    pendingCourses: 8,
    activeSubscriptions: 1247
  },

  // Recent activities
  recentActivities: [
    {
      id: 'activity1',
      type: 'system',
      description: 'System maintenance completed',
      timestamp: '2024-10-01T08:30:00Z'
    },
    {
      id: 'activity2',
      type: 'system',
      description: 'Database backup completed successfully',
      timestamp: '2024-10-01T07:45:00Z'
    },
    {
      id: 'activity3',
      type: 'system',
      description: 'Security scan completed - no issues found',
      timestamp: '2024-10-01T06:20:00Z'
    },
    {
      id: 'activity4',
      type: 'system',
      description: 'Performance monitoring updated',
      timestamp: '2024-09-30T15:30:00Z'
    },
    {
      id: 'activity5',
      type: 'system',
      description: 'Server logs archived',
      timestamp: '2024-09-30T14:00:00Z'
    },
    {
      id: 'activity6',
      type: 'system',
      description: 'Cache cleared and optimized',
      timestamp: '2024-09-30T11:15:00Z'
    },
    {
      id: 'activity7',
      type: 'system',
      description: 'SSL certificates renewed',
      timestamp: '2024-09-30T09:45:00Z'
    },
    {
      id: 'activity8',
      type: 'system',
      description: 'Network infrastructure upgraded',
      timestamp: '2024-09-29T16:20:00Z'
    }
  ],

  // Analytics data
  analytics: {
    userGrowth: [
      { label: 'Sep 24', value: 45 },
      { label: 'Sep 25', value: 52 },
      { label: 'Sep 26', value: 38 },
      { label: 'Sep 27', value: 61 },
      { label: 'Sep 28', value: 49 },
      { label: 'Sep 29', value: 67 },
      { label: 'Sep 30', value: 55 },
      { label: 'Oct 01', value: 23 }
    ],
    courseAnalytics: {
      completions: 1247,
      totalEnrollments: 2847,
      completionRate: 0.78,
      averageRating: 4.7,
      topCategories: [
        { name: 'Programming', percentage: 45 },
        { name: 'Data Science', percentage: 25 },
        { name: 'Web Development', percentage: 20 },
        { name: 'Design', percentage: 10 }
      ]
    },
    revenueAnalytics: {
      total: 45780,
      daily: [
        { label: 'Sep 24', value: 1250 },
        { label: 'Sep 25', value: 1580 },
        { label: 'Sep 26', value: 980 },
        { label: 'Sep 27', value: 2100 },
        { label: 'Sep 28', value: 1450 },
        { label: 'Sep 29', value: 1890 },
        { label: 'Sep 30', value: 1670 },
        { label: 'Oct 01', value: 890 }
      ]
    }
  }
};

// Utility functions to simulate API delays
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate API responses
export const simulateApiCall = async (data, delayMs = 500) => {
  await delay(delayMs);
  return Promise.resolve(data);
};

// Login simulation
export const simulateLogin = async (credentials) => {
  await delay(800);
  
  if (credentials.username === 'admin' && credentials.password === 'admin123') {
    const token = 'dummy-admin-token-' + Date.now();
    return {
      token,
      admin: dummyAdminData.admin
    };
  } else {
    throw new Error('Invalid credentials');
  }
};