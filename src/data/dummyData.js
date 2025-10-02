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
    pendingInstructorRequests: 5
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
  ]
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