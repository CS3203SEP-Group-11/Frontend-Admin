import { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  UserPlus,
  CheckCircle
} from 'lucide-react';
import { getRevenueSummary, getCourseAnalytics, getCourseEnrollmentStats } from '../api/analytics';
import api from '../api/axios';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    newUsersToday: 0,
    pendingCourses: 0,
    activeSubscriptions: 0
  });
  const [courseAnalytics, setCourseAnalytics] = useState({});
  const [enrollmentStats, setEnrollmentStats] = useState({});
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

      // Test if course service is responding at all
      console.log('Testing course service health by calling /courses directly...');
      console.log('Course service seems to be working since /courses returned data');

      console.log('Fetching revenue summary...');
      const revenueRes = await getRevenueSummary();
      console.log('Revenue response:', revenueRes);
      const totalRevenue = revenueRes && revenueRes.totalRevenue ? Number(revenueRes.totalRevenue) : 0;

      // Try course analytics with error handling
      try {
        console.log('Fetching course analytics...');
        const courseAnalyticsRes = await getCourseAnalytics();
        console.log('Course analytics response:', courseAnalyticsRes);
        setCourseAnalytics(courseAnalyticsRes || {});
      } catch (error) {
        console.error('Course analytics failed:', error);
        console.error('Course analytics error details:', error.response?.data);
        setCourseAnalytics({});
      }

      // Try enrollment stats with error handling
      try {
        console.log('Fetching enrollment stats...');
        const enrollmentStatsRes = await getCourseEnrollmentStats();
        console.log('Enrollment stats response:', enrollmentStatsRes);
        setEnrollmentStats(enrollmentStatsRes || {});
      } catch (error) {
        console.error('Enrollment stats failed:', error);
        console.error('Enrollment stats error details:', error.response?.data);
        setEnrollmentStats({});
      }

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

  const CategoryBarChart = ({ data, title }) => {
    if (!data || data.length === 0) {
      return (
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      );
    }

    const maxEnrollments = Math.max(...data.map(d => d.enrollments));
    
    return (
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
        <div className="space-y-3">
          {data.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
                <span className="text-sm text-gray-500">
                  {category.enrollments} enrollments
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-6 rounded-full flex items-center px-2 transition-all duration-300"
                    style={{ 
                      width: `${(category.enrollments / maxEnrollments) * 100}%`,
                      minWidth: '20px'
                    }}
                  >
                    <span className="text-xs font-semibold text-white">
                      {category.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Stats
          </h3>
          <div className="space-y-4">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {stat.title}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Course Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Categories by Enrollments */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Course Categories by Enrollments
          </h3>
          <CategoryBarChart 
            data={courseAnalytics.topCategories || []} 
            title="Enrollment Distribution"
          />
        </div>

        {/* Enrollment Statistics */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Enrollment Statistics
          </h3>
          <div className="space-y-4">
            <div className="text-center p-6 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
              <p className="text-4xl font-bold text-cyan-600">
                {enrollmentStats.totalEnrollments?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Enrollments</p>
            </div>
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-4xl font-bold text-green-600">
                {enrollmentStats.totalCompletions?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Course Completions</p>
            </div>
            <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <p className="text-4xl font-bold text-orange-600">
                {((enrollmentStats.completionRate || 0) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Completion Rate ({enrollmentStats.totalCompletions || 0} of {enrollmentStats.totalEnrollments || 0})
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* System status */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          System Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">API Services</span>
            <span className="text-xs text-green-600 font-medium">Operational</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Database</span>
            <span className="text-xs text-green-600 font-medium">Operational</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">File Storage</span>
            <span className="text-xs text-yellow-600 font-medium">Degraded</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;