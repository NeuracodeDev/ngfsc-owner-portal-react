import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  Recycle, 
  Settings, 
  LogOut, 
  Leaf,
  Globe,
  ShoppingCart,
  FileText,
  Users,
  Brain,
  BarChart3,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DashboardLayout = () => {
  const { t, i18n } = useTranslation();
  // Mock user data for demo
  const mockUser = {
    name: 'John Smith',
    storeName: 'Fresh Market Pro'
  };
  const navigate = useNavigate();
  const [reportsExpanded, setReportsExpanded] = useState(false);

  const handleLogout = async () => {
    // For demo, just navigate to login
    navigate('/login');
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const sidebarItems = [
    { labelKey: 'dashboard', icon: LayoutDashboard, path: '/app' },
    { labelKey: 'orders', icon: ShoppingCart, path: '/app/orders' },
    { labelKey: 'purchaseOrders', icon: FileText, path: '/app/purchase-orders' },
    { labelKey: 'inventory', icon: Package, path: '/app/inventory' },
    { labelKey: 'suppliers', icon: Users, path: '/app/suppliers' },
    { labelKey: 'surplus', icon: Recycle, path: '/app/surplus' },
    { labelKey: 'aiHistory', icon: Brain, path: '/app/ai-history' },
    { labelKey: 'settings', icon: Settings, path: '/app/settings' },
  ];

  const reportsItems = [
    { labelKey: 'sustainability', path: '/app/reports/sustainability' },
    { labelKey: 'compliance', path: '/app/compliance' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Enhanced Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary">NGFSC</h1>
              <p className="text-xs text-gray-500">Owner Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation with improved density */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/app'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{t(item.labelKey)}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Reports Section */}
          <div className="space-y-1 mt-6">
            <button
              onClick={() => setReportsExpanded(!reportsExpanded)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5" />
                <span>{t('reports')}</span>
              </div>
              {reportsExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {reportsExpanded && (
              <ul className="ml-6 space-y-1">
                {reportsItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                        }`
                      }
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-current" />
                      <span>{t(item.labelKey)}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-500 hover:text-gray-900"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            {t('logout')}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {mockUser?.storeName}
            </h2>
            <p className="text-sm text-gray-600">
              {t('welcome')}, {mockUser?.name}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select defaultValue="sv" onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32 shadow-lg">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sv">Svenska</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        {/* Page Content with max-width constraint */}
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;