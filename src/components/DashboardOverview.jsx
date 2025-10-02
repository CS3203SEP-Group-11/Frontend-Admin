import { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { dummyAdminData, simulateApiCall } from '../data/dummyData';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    monthlyGrowth: 0
  });
  const [courseAnalytics, setCourseAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [dashboardStats, courseData] = await Promise.all([
        simulateApiCall(dummyAdminData.dashboardStats),
        simulateApiCall(dummyAdminData.analytics.courseAnalytics)
      ]);
      
      setStats(dashboardStats);
      setCourseAnalytics(courseData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
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
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: BookOpen,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
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
      change: '+15%',
      changeType: 'positive'
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className={`flex items-center mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Categories and Enrollment Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Categories
          </h3>
          <div className="space-y-3">
            {(courseAnalytics.topCategories || []).map((category, index) => (
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
                {courseAnalytics.totalEnrollments || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Enrollments</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {((courseAnalytics.completionRate || 0) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {courseAnalytics.averageRating || 'N/A'}
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