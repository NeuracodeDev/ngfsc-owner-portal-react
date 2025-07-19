import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
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

  const sidebarItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/app' },
    { label: 'Orders', icon: ShoppingCart, path: '/app/orders' },
    { label: 'Purchase Orders', icon: FileText, path: '/app/purchase-orders' },
    { label: 'Inventory', icon: Package, path: '/app/inventory' },
    { label: 'Suppliers', icon: Users, path: '/app/suppliers' },
    { label: 'Surplus', icon: Recycle, path: '/app/surplus' },
    { label: 'AI History', icon: Brain, path: '/app/ai-history' },
    { label: 'Settings', icon: Settings, path: '/app/settings' },
  ];

  const reportsItems = [
    { label: 'Sustainability', path: '/app/reports/sustainability' },
    { label: 'Compliance', path: '/app/compliance' },
  ];

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Fixed Sidebar */}
      <aside className="w-60 bg-card border-r border-border flex flex-col shadow-soft">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary">NGFSC</h1>
              <p className="text-xs text-muted-foreground">Owner Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/app'}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Reports Section */}
          <div className="space-y-1 mt-4">
            <button
              onClick={() => setReportsExpanded(!reportsExpanded)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-5 w-5" />
                <span>Reports</span>
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
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                        }`
                      }
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-current" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between shadow-soft">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {mockUser?.storeName}
            </h2>
            <p className="text-sm text-muted-foreground">
              Welcome back, {mockUser?.name}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select defaultValue="en">
              <SelectTrigger className="w-32">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;