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
    activeSubscriptions: 1247,
    pendingInstructorRequests: 5,
    totalSubscribers: 1247,
    subscriptionRevenue: 35420
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
  },

  // Instructor approval requests
  instructorRequests: [
    {
      id: 'req1',
      userId: 'user123',
      name: 'John Smith',
      email: 'john.smith@email.com',
      requestedAt: '2024-10-01T10:30:00Z',
      status: 'pending',
      qualifications: 'Masters in Computer Science, 5+ years teaching experience',
      experience: '5 years of experience in software development and 3 years in online teaching',
      portfolio: 'https://johnsmith.dev',
      motivation: 'I want to share my knowledge in web development and help students grow their careers.',
      previousRole: 'Senior Software Engineer at TechCorp',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'req2',
      userId: 'user456',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      requestedAt: '2024-09-30T14:20:00Z',
      status: 'pending',
      qualifications: 'PhD in Data Science, Certified AI Specialist',
      experience: '8 years in data science, published researcher with 15+ papers',
      portfolio: 'https://sarahjohnson.research.com',
      motivation: 'Passionate about making data science accessible to everyone through quality education.',
      previousRole: 'Lead Data Scientist at DataTech',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c0?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'req3',
      userId: 'user789',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      requestedAt: '2024-09-29T09:15:00Z',
      status: 'pending',
      qualifications: 'Masters in UI/UX Design, Adobe Certified Expert',
      experience: '6 years in design industry, worked with Fortune 500 companies',
      portfolio: 'https://michaelchen.design',
      motivation: 'I believe good design can change the world and want to teach the next generation of designers.',
      previousRole: 'Senior UX Designer at DesignStudio',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'req4',
      userId: 'user101',
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      requestedAt: '2024-09-28T16:45:00Z',
      status: 'pending',
      qualifications: 'Masters in Business Administration, PMP Certified',
      experience: '10+ years in project management and business strategy',
      portfolio: 'https://emilyrodriguez.biz',
      motivation: 'Want to help professionals advance their careers through practical business skills training.',
      previousRole: 'Senior Project Manager at BusinessCorp',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'req5',
      userId: 'user202',
      name: 'David Kim',
      email: 'david.kim@email.com',
      requestedAt: '2024-09-27T11:30:00Z',
      status: 'pending',
      qualifications: 'Masters in Cybersecurity, CISSP Certified',
      experience: '7 years in cybersecurity, security consultant for government agencies',
      portfolio: 'https://davidkim.security',
      motivation: 'Cybersecurity is critical in todays world. I want to educate people about digital safety.',
      previousRole: 'Senior Security Analyst at SecureTech',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    }
  ],

  // Subscription plans
  subscriptionPlans: [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Basic Monthly',
      amount: 19.99,
      billingCycle: 'MONTHLY',
      isActive: true,
      features: {
        coursesAccess: 'limited',
        downloadableContent: true,
        supportLevel: 'basic',
        maxCourses: 10
      },
      stripePriceId: 'price_basic_monthly',
      subscribersCount: 450,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Premium Weekly',
      amount: 9.99,
      billingCycle: 'WEEKLY',
      isActive: true,
      features: {
        coursesAccess: 'unlimited',
        downloadableContent: true,
        supportLevel: 'priority',
        certificateAccess: true,
        liveSessionAccess: true
      },
      stripePriceId: 'price_premium_weekly',
      subscribersCount: 180,
      createdAt: '2024-01-15T10:05:00Z',
      updatedAt: '2024-01-15T10:05:00Z'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Premium Annual',
      amount: 199.99,
      billingCycle: 'ANNUAL',
      isActive: true,
      features: {
        coursesAccess: 'unlimited',
        downloadableContent: true,
        supportLevel: 'priority',
        certificateAccess: true,
        liveSessionAccess: true,
        discount: '2 months free'
      },
      stripePriceId: 'price_premium_annual',
      subscribersCount: 477,
      createdAt: '2024-01-15T10:10:00Z',
      updatedAt: '2024-01-15T10:10:00Z'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Pro Quarterly',
      amount: 149.99,
      billingCycle: 'THREE_MONTH',
      isActive: true,
      features: {
        coursesAccess: 'unlimited',
        downloadableContent: true,
        supportLevel: 'premium',
        certificateAccess: true,
        liveSessionAccess: true,
        mentorshipAccess: true,
        projectReviews: true
      },
      stripePriceId: 'price_pro_quarterly',
      subscribersCount: 95,
      createdAt: '2024-02-01T10:00:00Z',
      updatedAt: '2024-02-01T10:00:00Z'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      name: 'Enterprise 6-Month',
      amount: 299.99,
      billingCycle: 'SIX_MONTH',
      isActive: true,
      features: {
        coursesAccess: 'unlimited',
        downloadableContent: true,
        supportLevel: 'enterprise',
        certificateAccess: true,
        liveSessionAccess: true,
        mentorshipAccess: true,
        projectReviews: true,
        customIntegrations: true
      },
      stripePriceId: 'price_enterprise_6month',
      subscribersCount: 45,
      createdAt: '2024-03-01T10:00:00Z',
      updatedAt: '2024-03-01T10:00:00Z'
    }
  ],

  // Subscription analytics
  subscriptionAnalytics: {
    totalRevenue: 35420,
    monthlyRecurringRevenue: 25340,
    annualRecurringRevenue: 10080,
    totalSubscribers: 1247,
    newSubscribersThisMonth: 87,
    revenueGrowth: 15.2,
    planDistribution: [
      { planName: 'Basic Monthly', subscribers: 450, percentage: 36.1 },
      { planName: 'Premium Weekly', subscribers: 180, percentage: 14.4 },
      { planName: 'Premium Annual', subscribers: 477, percentage: 38.2 },
      { planName: 'Pro Quarterly', subscribers: 95, percentage: 7.6 },
      { planName: 'Enterprise 6-Month', subscribers: 45, percentage: 3.6 }
    ]
  },

  // Transaction data
  transactions: [
    {
      id: 'txn_001',
      type: 'PURCHASE',
      amount: 99.99,
      currency: 'USD',
      status: 'SUCCESS',
      createdAt: '2024-10-03T09:30:00Z',
      userId: 'user_123',
      userEmail: 'john.doe@email.com',
      userName: 'John Doe',
      description: 'Course Purchase - Advanced React Development',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'txn_002',
      type: 'USER_SUBSCRIPTION_PAYMENT',
      amount: 29.99,
      currency: 'USD',
      status: 'SUCCESS',
      createdAt: '2024-10-03T08:15:00Z',
      userId: 'user_456',
      userEmail: 'sarah.wilson@email.com',
      userName: 'Sarah Wilson',
      description: 'Monthly Premium Subscription',
      paymentMethod: 'PayPal'
    },
    {
      id: 'txn_003',
      type: 'PURCHASE',
      amount: 149.99,
      currency: 'USD',
      status: 'PENDING',
      createdAt: '2024-10-03T07:45:00Z',
      userId: 'user_789',
      userEmail: 'mike.johnson@email.com',
      userName: 'Mike Johnson',
      description: 'Course Bundle - Full Stack Development',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'txn_004',
      type: 'RENEWAL',
      amount: 99.99,
      currency: 'USD',
      status: 'SUCCESS',
      createdAt: '2024-10-02T16:20:00Z',
      userId: 'user_101',
      userEmail: 'emma.davis@email.com',
      userName: 'Emma Davis',
      description: 'Annual Premium Subscription Renewal',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'txn_005',
      type: 'PURCHASE',
      amount: 79.99,
      currency: 'USD',
      status: 'FAILED',
      createdAt: '2024-10-02T14:10:00Z',
      userId: 'user_202',
      userEmail: 'david.brown@email.com',
      userName: 'David Brown',
      description: 'Course Purchase - Python for Data Science',
      paymentMethod: 'Credit Card',
      failureReason: 'Insufficient funds'
    },
    {
      id: 'txn_006',
      type: 'INSTRUCTOR_PAYOUT',
      amount: 450.00,
      currency: 'USD',
      status: 'SUCCESS',
      createdAt: '2024-10-02T12:00:00Z',
      userId: 'instructor_001',
      userEmail: 'alex.smith@email.com',
      userName: 'Alex Smith',
      description: 'Monthly instructor earnings payout',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'txn_007',
      type: 'USER_SUBSCRIPTION_PAYMENT',
      amount: 19.99,
      currency: 'USD',
      status: 'SUCCESS',
      createdAt: '2024-10-02T10:30:00Z',
      userId: 'user_303',
      userEmail: 'lisa.garcia@email.com',
      userName: 'Lisa Garcia',
      description: 'Weekly Basic Subscription',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'txn_008',
      type: 'REFUND',
      amount: -59.99,
      currency: 'USD',
      status: 'SUCCESS',
      createdAt: '2024-10-02T09:15:00Z',
      userId: 'user_404',
      userEmail: 'robert.lee@email.com',
      userName: 'Robert Lee',
      description: 'Refund for Course - JavaScript Fundamentals',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'txn_009',
      type: 'PURCHASE',
      amount: 199.99,
      currency: 'USD',
      status: 'SUCCESS',
      createdAt: '2024-10-01T15:45:00Z',
      userId: 'user_505',
      userEmail: 'maria.rodriguez@email.com',
      userName: 'Maria Rodriguez',
      description: 'Course Purchase - Advanced Machine Learning',
      paymentMethod: 'PayPal'
    },
    {
      id: 'txn_010',
      type: 'USER_SUBSCRIPTION_PAYMENT',
      amount: 249.99,
      currency: 'USD',
      status: 'SUCCESS',
      createdAt: '2024-10-01T13:20:00Z',
      userId: 'user_606',
      userEmail: 'james.taylor@email.com',
      userName: 'James Taylor',
      description: 'Quarterly Pro Subscription',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'txn_011',
      type: 'PURCHASE',
      amount: 89.99,
      currency: 'USD',
      status: 'PENDING',
      createdAt: '2024-10-01T11:00:00Z',
      userId: 'user_707',
      userEmail: 'anna.white@email.com',
      userName: 'Anna White',
      description: 'Course Purchase - UI/UX Design Principles',
      paymentMethod: 'PayPal'
    },
    {
      id: 'txn_012',
      type: 'INSTRUCTOR_PAYOUT',
      amount: 320.50,
      currency: 'USD',
      status: 'SUCCESS',
      createdAt: '2024-09-30T16:30:00Z',
      userId: 'instructor_002',
      userEmail: 'chris.wilson@email.com',
      userName: 'Chris Wilson',
      description: 'Monthly instructor earnings payout',
      paymentMethod: 'Bank Transfer'
    }
  ],

  // Transaction statistics
  transactionStats: {
    totalTransactions: 1847,
    totalRevenue: 45780.00,
    todayTransactions: 23,
    todayRevenue: 1250.00,
    pendingTransactions: 8,
    failedTransactions: 12,
    averageTransactionValue: 87.45,
    transactionsByType: {
      PURCHASE: 890,
      USER_SUBSCRIPTION_PAYMENT: 620,
      RENEWAL: 180,
      REFUND: 45,
      INSTRUCTOR_PAYOUT: 112
    },
    transactionsByStatus: {
      SUCCESS: 1720,
      PENDING: 85,
      FAILED: 42
    },
    monthlyRevenue: [
      { month: 'Jan', revenue: 38450 },
      { month: 'Feb', revenue: 42100 },
      { month: 'Mar', revenue: 39800 },
      { month: 'Apr', revenue: 45200 },
      { month: 'May', revenue: 47600 },
      { month: 'Jun', revenue: 44900 },
      { month: 'Jul', revenue: 46800 },
      { month: 'Aug', revenue: 48200 },
      { month: 'Sep', revenue: 45780 },
      { month: 'Oct', revenue: 12300 }
    ]
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