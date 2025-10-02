import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  LogOut,
  Menu,
  X,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { dummyAdminData } from '../data/dummyData';

const AdminSidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  
  // Get pending instructor requests count
  const pendingRequests = dummyAdminData.instructorRequests.filter(req => req.status === 'pending').length;

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview & Statistics'
    },
    {
      id: 'instructor-approval',
      label: 'Instructor Requests',
      icon: UserCheck,
      description: 'Approve Instructor Applications'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'System Configuration'
    }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`admin-sidebar ${isOpen ? 'open' : ''} z-50`}>
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LA</span>
              </div>
              <div>
                <h2 className="text-white font-semibold">LevelUp Admin</h2>
                <p className="text-gray-300 text-xs">Administrator Portal</p>
              </div>
            </div>
            
            {/* Mobile close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  // Close sidebar on mobile after selection
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                <div className="text-left flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.label}</span>
                    {item.id === 'instructor-approval' && pendingRequests > 0 && (
                      <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                        {pendingRequests}
                      </span>
                    )}
                  </div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;