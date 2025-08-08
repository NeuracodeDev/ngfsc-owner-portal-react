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
    <div className="min-h-screen bg-background flex w-full">
      {/* Modern Sidebar */}
      <aside className="w-60 bg-card border-r border-border flex flex-col shadow-lg">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-brand-gradient shadow-glow">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">DineEarn</h1>
              <p className="text-xs text-muted-foreground">Restaurant Dashboard</p>
            </div>
          </div>
        </div>

        {/* Modern Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/app'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium group ${
                      isActive
                        ? 'bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 transition-colors" />
                  <span className="font-medium">{t(item.labelKey)}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            {t('logout')}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Modern Top Bar */}
        <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between shadow-lg backdrop-blur-sm">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {mockUser?.storeName}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t('welcome')}, {mockUser?.name}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select defaultValue="sv" onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32 bg-muted border-border">
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