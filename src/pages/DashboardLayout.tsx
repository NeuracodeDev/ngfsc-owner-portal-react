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
  Brain
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
  

  const handleLogout = async () => {
    // For demo, just navigate to login
    navigate('/login');
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const sidebarItems = [
    { labelKey: 'dashboard', icon: LayoutDashboard, path: '/app' },
    { labelKey: 'sales', icon: ShoppingCart, path: '/app/orders' },
    { labelKey: 'purchaseOrders', icon: FileText, path: '/app/purchase-orders' },
    { labelKey: 'inventory', icon: Package, path: '/app/inventory' },
    { labelKey: 'surplus', icon: Recycle, path: '/app/surplus' },
    { labelKey: 'aiHistory', icon: Brain, path: '/app/ai-history' },
    { labelKey: 'settings', icon: Settings, path: '/app/settings' },
  ];


  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Enhanced Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary">
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
                    `flex items-center gap-3 px-4 py-3 transition-all duration-200 text-sm font-medium ${
                      isActive
                        ? 'bg-primary text-primary-foreground border-l-4 border-primary-glow'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-l-4 hover:border-gray-300'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{t(item.labelKey)}</span>
                </NavLink>
              </li>
            ))}
          </ul>

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
              </SelectContent>
            </Select>
          </div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;