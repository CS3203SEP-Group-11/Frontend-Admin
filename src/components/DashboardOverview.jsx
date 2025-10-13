import { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  UserPlus,
  CheckCircle,
  CreditCard
} from 'lucide-react';
import { getRevenueSummary } from '../api/analytics';
import api from '../api/axios';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    monthlyGrowth: 0
  });
  // Removed recent activities
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      console.log('Fetching total users...');
      const usersRes = await api.get('/users/all');
      console.log('Users response:', usersRes);
      const totalUsers = Array.isArray(usersRes.data) ? usersRes.data.length : 0;

      console.log('Fetching total courses...');
      const coursesRes = await api.get('/courses');
      console.log('Courses response:', coursesRes);
      const totalCourses = Array.isArray(coursesRes.data) ? coursesRes.data.length : 0;

      console.log('Fetching revenue summary...');
      const revenueRes = await getRevenueSummary();
      console.log('Revenue response:', revenueRes);
      const totalRevenue = revenueRes && revenueRes.revenue ? Number(revenueRes.revenue) : 0;

      setStats((prev) => ({
        ...prev,
        totalUsers,
        totalCourses,
        totalRevenue,
      }));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: BookOpen,
      color: 'bg-green-500',
    },
    {
      title: 'Total Subscribers',
      value: stats.totalSubscribers || 0,
      icon: CreditCard,
      color: 'bg-orange-500',
      change: '+22%',
      changeType: 'positive'
    },
    {
      title: 'Revenue',
      value: `$${(stats.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-purple-500',
    }
  ];

  const quickStats = [
    {
      title: 'New Users Today',
      value: stats.newUsersToday,
      icon: UserPlus,
      color: 'text-green-600'
    },
    {
      title: 'Active Subscriptions',
      value: stats.activeSubscriptions,
      icon: CheckCircle,
      color: 'text-blue-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="gradient-green rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h2>
        <p className="text-white/90">
          Monitor and manage your LevelUp platform with real-time insights and controls.
        </p>
      </div>

      {/* Main stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick stats */}
      {/* You may want to render quickStats here if needed */}

      {/* Top Categories and Enrollment Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Categories
          </h3>
          <div className="space-y-3">
            {(stats.courseAnalytics?.topCategories || []).map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {category.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment Stats */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Enrollment Stats
          </h3>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {stats.courseAnalytics?.totalEnrollments || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Enrollments</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {((stats.courseAnalytics?.completionRate || 0) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {stats.courseAnalytics?.averageRating || 'N/A'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;