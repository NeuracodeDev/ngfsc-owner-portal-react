import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSalesData, type SalesData } from '@/api/saleorMocks';
import SuggestionList from '@/components/SuggestionList';
import { DollarSign, ShoppingCart, TrendingUp, Loader2 } from 'lucide-react';

const HomeDashboard = () => {
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSalesData = async () => {
      try {
        const data = await getSalesData();
        setSalesData(data);
      } catch (error) {
        console.error('Failed to load sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSalesData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Monitor your store performance and AI recommendations
        </p>
      </div>

      {/* Sales Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Today */}
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Today</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {salesData ? formatCurrency(salesData.today.revenue) : '—'}
            </div>
            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <ShoppingCart className="h-3 w-3" />
                <span>{salesData?.today.orders || 0} orders</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3" />
                <span>
                  {salesData ? formatCurrency(salesData.today.averageOrderValue) : '—'} avg
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales This Week */}
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {salesData ? formatCurrency(salesData.thisWeek.revenue) : '—'}
            </div>
            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <ShoppingCart className="h-3 w-3" />
                <span>{salesData?.thisWeek.orders || 0} orders</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3" />
                <span>
                  {salesData ? formatCurrency(salesData.thisWeek.averageOrderValue) : '—'} avg
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestions */}
      <SuggestionList />
    </div>
  );
};

export default HomeDashboard;