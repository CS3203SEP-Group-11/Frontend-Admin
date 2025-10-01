import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  BookOpen,
  Calendar,
  Download
} from 'lucide-react';
import { dummyAdminData, simulateApiCall } from '../data/dummyData';

const Analytics = () => {
  const [userGrowth, setUserGrowth] = useState([]);
  const [courseAnalytics, setCourseAnalytics] = useState({});
  const [revenueAnalytics, setRevenueAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [userGrowthData, courseData, revenueData] = await Promise.all([
        simulateApiCall(dummyAdminData.analytics.userGrowth),
        simulateApiCall(dummyAdminData.analytics.courseAnalytics),
        simulateApiCall(dummyAdminData.analytics.revenueAnalytics)
      ]);

      setUserGrowth(userGrowthData || []);
      setCourseAnalytics(courseData);
      setRevenueAnalytics(revenueData);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const MetricCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <div className={`flex items-center mt-1 ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">
              {change >= 0 ? '+' : ''}{change}%
            </span>
          </div>
        </div>
        <div className={`${color} p-3 rounded-full`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const SimpleChart = ({ data, title, color = 'primary' }) => {
    if (!data || data.length === 0) {
      return (
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      );
    }

    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
        <div className="flex items-end space-x-2 h-48">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-full bg-${color}-500 rounded-t transition-all duration-300 hover:bg-${color}-600`}
                style={{ 
                  height: `${(item.value / maxValue) * 100}%`,
                  minHeight: '4px'
                }}
                title={`${item.label}: ${item.value}`}
              />
              <span className="text-xs text-gray-500 mt-2 transform rotate-45 origin-left">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Insights and performance metrics for your platform
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input-field"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button className="btn-primary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value={userGrowth.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
          change={12.5}
          icon={Users}
          color="bg-blue-500"
        />
        <MetricCard
          title="Course Completions"
          value={courseAnalytics.completions?.toLocaleString() || '0'}
          change={8.2}
          icon={BookOpen}
          color="bg-green-500"
        />
        <MetricCard
          title="Revenue"
          value={`$${(revenueAnalytics.total || 0).toLocaleString()}`}
          change={15.3}
          icon={DollarSign}
          color="bg-primary-500"
        />
        <MetricCard
          title="Avg. Session"
          value="24m"
          change={-2.1}
          icon={Calendar}
          color="bg-cyan-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              User Growth
            </h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <SimpleChart 
            data={userGrowth} 
            title="New Users" 
            color="blue"
          />
        </div>

        {/* Revenue Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Revenue Trend
            </h3>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <SimpleChart 
            data={revenueAnalytics.daily || []} 
            title="Daily Revenue" 
            color="primary"
          />
        </div>
      </div>

      {/* Course Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                      className="bg-primary-500 h-2 rounded-full"
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

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Enrollment Stats
          </h3>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">
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

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Platform Health
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Uptime</span>
              <span className="text-sm font-medium text-green-600">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Response Time</span>
              <span className="text-sm font-medium text-blue-600">120ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Error Rate</span>
              <span className="text-sm font-medium text-yellow-600">0.01%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Active Sessions</span>
              <span className="text-sm font-medium text-primary-600">1,247</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Quick Reports
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Users className="w-6 h-6 text-blue-500 mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">User Report</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Detailed user analytics</p>
          </button>
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <BookOpen className="w-6 h-6 text-green-500 mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Course Report</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Course performance data</p>
          </button>
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <DollarSign className="w-6 h-6 text-primary-500 mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Revenue Report</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Financial analytics</p>
          </button>
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <BarChart3 className="w-6 h-6 text-cyan-500 mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Custom Report</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Build custom analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;