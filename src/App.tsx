import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

// Lazy-loaded components
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardLayout = lazy(() => import("./pages/DashboardLayout"));
const HomeDashboard = lazy(() => import("./pages/HomeDashboard"));
const InventoryPage = lazy(() => import("./pages/InventoryPage"));
const SurplusPage = lazy(() => import("./pages/SurplusPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Redirect root to app */}
            <Route path="/" element={<Navigate to="/app" replace />} />
            
            {/* Login route */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected dashboard routes */}
            <Route path="/app" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<HomeDashboard />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="surplus" element={<SurplusPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
