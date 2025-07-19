import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOrders, Order } from '@/hooks/useOrders';
import { OrderDetailsDrawer } from '@/components/OrderDetailsDrawer';
import { Search, Package, DollarSign, Calendar, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const OrdersPage = () => {
  const { t } = useTranslation();
  const { orders, loading } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    return orders.filter(order => 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const getStatusBadgeVariant = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'shipped': return 'secondary';
      case 'confirmed': return 'outline';
      case 'pending': return 'destructive';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const StatusRenderer = (params: any) => {
    const status = params.value;
    return (
      <Badge variant={getStatusBadgeVariant(status)} className="capitalize">
        {status}
      </Badge>
    );
  };

  const PaymentMethodRenderer = (params: any) => {
    const method = params.value;
    const methodLabels = {
      card: 'Credit Card',
      bank_transfer: 'Bank Transfer',
      invoice: 'Invoice',
      cash: 'Cash'
    };
    return <span className="capitalize">{methodLabels[method] || method}</span>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const columnDefs: ColDef[] = [
    {
      field: 'orderNumber',
      headerName: 'Order #',
      sortable: true,
      filter: true,
      width: 150,
      cellStyle: { fontWeight: '600', color: 'hsl(var(--primary))' }
    },
    {
      field: 'customerName',
      headerName: 'Customer',
      sortable: true,
      filter: true,
      flex: 1
    },
    {
      field: 'date',
      headerName: 'Date',
      sortable: true,
      filter: 'agDateColumnFilter',
      width: 120,
      valueFormatter: (params) => params.value?.toLocaleDateString()
    },
    {
      field: 'total',
      headerName: 'Total',
      sortable: true,
      filter: 'agNumberColumnFilter',
      width: 120,
      valueFormatter: (params) => formatCurrency(params.value),
      cellStyle: { fontWeight: '600' }
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment',
      sortable: true,
      filter: true,
      width: 140,
      cellRenderer: PaymentMethodRenderer
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      filter: true,
      width: 120,
      cellRenderer: StatusRenderer
    }
  ];

  const handleRowClick = (event: any) => {
    setSelectedOrder(event.data);
    setDrawerOpen(true);
  };

  const orderStats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;

    return { totalOrders, totalRevenue, deliveredOrders, pendingOrders };
  }, [orders]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('ordersManagement')}</h1>
        <p className="text-muted-foreground mt-2">
          Spåra och hantera kundbeställningar
        </p>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">{orderStats.totalOrders}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(orderStats.totalRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold text-success">{orderStats.deliveredOrders}</p>
              </div>
              <Calendar className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{orderStats.pendingOrders}</p>
              </div>
              <Calendar className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="shadow-elevated border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Senaste beställningar</CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Sök beställningar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className={cn(
            "ag-theme-alpine w-full h-[600px]",
            "dark:ag-theme-alpine-dark"
          )}>
            <AgGridReact
              rowData={filteredOrders}
              columnDefs={columnDefs}
              defaultColDef={{
                resizable: true,
                sortable: true,
                filter: true,
              }}
              animateRows={true}
              rowSelection="single"
              onRowClicked={handleRowClick}
              pagination={true}
              paginationPageSize={10}
              domLayout="normal"
              rowHeight={60}
              headerHeight={50}
              className="cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>

      {/* Order Details Drawer */}
      <OrderDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrdersPage;