import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import DashboardOverview from '../components/DashboardOverview';
import InstructorApplications from '../components/InstructorApplications';
import SubscriptionManagement from '../components/SubscriptionManagement';
import TransactionManagement from '../components/TransactionManagement';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isLoggedIn, admin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'subscription-management':
        return <SubscriptionManagement />;
      case 'transaction-management':
        return <TransactionManagement />;
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <p className="text-gray-600 dark:text-gray-400">Settings panel coming soon...</p>
            </div>
          </div>
        );
      case 'applications':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Instructor Applications</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-0 shadow-sm">
              <div className="overflow-hidden">
                <InstructorApplications />
              </div>
            </div>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="admin-main">
        <AdminHeader 
          admin={admin}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="mt-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;