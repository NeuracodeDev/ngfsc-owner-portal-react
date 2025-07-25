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
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const PurchaseOrdersPage = lazy(() => import("./pages/PurchaseOrdersPage"));

const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const AIHistoryPage = lazy(() => import("./pages/AIHistoryPage"));
const SustainabilityReportPage = lazy(() => import("./pages/SustainabilityReportPage"));
const ComplianceDocsPage = lazy(() => import("./pages/ComplianceDocsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Redirect root to app dashboard */}
            <Route path="/" element={<Navigate to="/app" replace />} />
            
            {/* Optional login route (no auth required) */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Dashboard routes - no auth protection */}
            <Route path="/app" element={<DashboardLayout />}>
              <Route index element={<HomeDashboard />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="purchase-orders" element={<PurchaseOrdersPage />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="inventory/:sku" element={<ProductDetailPage />} />
              
              <Route path="surplus" element={<SurplusPage />} />
              <Route path="ai-history" element={<AIHistoryPage />} />
              <Route path="reports/sustainability" element={<SustainabilityReportPage />} />
              <Route path="compliance" element={<ComplianceDocsPage />} />
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
