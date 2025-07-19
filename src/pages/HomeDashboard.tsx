import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSalesData, type SalesData } from '@/api/saleorMocks';
import SuggestionList from '@/components/SuggestionList';
import { DollarSign, ShoppingCart, TrendingUp, Loader2 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const HomeDashboard = () => {
  const { t } = useTranslation();
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
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your store performance and AI recommendations
        </p>
      </div>

      {/* Sales Cards with Enhanced Design */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Today */}
        <Card className="shadow-elevated border-0 bg-gradient-to-br from-card to-card/50 overflow-hidden group hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {t('salesToday')}
              </CardTitle>
              <div className="text-3xl font-bold text-foreground mt-2">
                {salesData ? formatCurrency(salesData.today.revenue) : '—'}
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-success" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <ShoppingCart className="h-4 w-4" />
                <span>{salesData?.today.orders || 0} {t('orders')}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>
                  {salesData ? formatCurrency(salesData.today.averageOrderValue) : '—'} {t('avg')}
                </span>
              </div>
            </div>
            {/* Mini Sparkline */}
            {salesData?.today.trend && (
              <div className="h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData.today.trend.map((value, index) => ({ value, index }))}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--success))" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sales This Week */}
        <Card className="shadow-elevated border-0 bg-gradient-to-br from-card to-card/50 overflow-hidden group hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {t('salesThisWeek')}
              </CardTitle>
              <div className="text-3xl font-bold text-foreground mt-2">
                {salesData ? formatCurrency(salesData.thisWeek.revenue) : '—'}
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-info/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-info" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <ShoppingCart className="h-4 w-4" />
                <span>{salesData?.thisWeek.orders || 0} {t('orders')}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>
                  {salesData ? formatCurrency(salesData.thisWeek.averageOrderValue) : '—'} {t('avg')}
                </span>
              </div>
            </div>
            {/* Mini Sparkline */}
            {salesData?.thisWeek.trend && (
              <div className="h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData.thisWeek.trend.map((value, index) => ({ value, index }))}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--info))" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestions */}
      <SuggestionList />
    </div>
  );
};

export default HomeDashboard;