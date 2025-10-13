import { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  UserPlus,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { getRevenueSummary } from '../api/analytics';
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
  const [activities, setActivities] = useState([]);
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
      title: 'Pending Courses',
      value: stats.pendingCourses,
      icon: Clock,
      color: 'text-yellow-600'
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

      {/* Quick stats and recent activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick stats */}
        <div className="card p-6">
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

        {/* Recent activities */}
        <div className="card lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activities
            </h3>
            <button className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400">
              View All
            </button>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-shrink-0">
                    {activity.type === 'user' && <Users className="w-4 h-4 text-blue-500" />}
                    {activity.type === 'course' && <BookOpen className="w-4 h-4 text-green-500" />}
                    {activity.type === 'system' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 dark:text-gray-400">No recent activities</p>
              </div>
            )}
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