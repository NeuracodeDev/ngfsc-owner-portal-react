import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, DollarSign, CreditCard, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock sales transaction data for grocery store/restaurant
const mockSalesData = [
  {
    id: 'TXN001',
    timestamp: new Date('2024-01-15T08:30:00'),
    amount: 45.50,
    paymentMethod: 'card',
    items: 3,
    cashier: 'Anna Svensson'
  },
  {
    id: 'TXN002', 
    timestamp: new Date('2024-01-15T09:15:00'),
    amount: 127.80,
    paymentMethod: 'cash',
    items: 8,
    cashier: 'Erik Larsson'
  },
  {
    id: 'TXN003',
    timestamp: new Date('2024-01-15T10:45:00'),
    amount: 89.20,
    paymentMethod: 'card',
    items: 5,
    cashier: 'Anna Svensson'
  },
  {
    id: 'TXN004',
    timestamp: new Date('2024-01-15T12:20:00'),
    amount: 234.75,
    paymentMethod: 'card', 
    items: 12,
    cashier: 'Maria Johansson'
  },
  {
    id: 'TXN005',
    timestamp: new Date('2024-01-15T14:10:00'),
    amount: 67.30,
    paymentMethod: 'cash',
    items: 4,
    cashier: 'Erik Larsson'
  }
];

const OrdersPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading] = useState(false);

  const filteredSales = useMemo(() => {
    if (!searchTerm) return mockSalesData;
    return mockSalesData.filter(sale => 
      sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.cashier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const PaymentMethodRenderer = (params: any) => {
    const method = params.value;
    const methodLabels = {
      card: 'Kort',
      cash: 'Kontant',
      mobile: 'Mobil'
    };
    return (
      <Badge variant={method === 'card' ? 'default' : method === 'cash' ? 'secondary' : 'outline'}>
        {methodLabels[method] || method}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
    }).format(amount);
  };

  const columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'Transaktion',
      sortable: true,
      filter: true,
      width: 130,
      cellStyle: { fontWeight: '600', color: 'hsl(var(--primary))' }
    },
    {
      field: 'timestamp',
      headerName: 'Tid',
      sortable: true,
      filter: 'agDateColumnFilter',
      width: 140,
      valueFormatter: (params) => params.value?.toLocaleTimeString('sv-SE', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },
    {
      field: 'amount',
      headerName: 'Belopp',
      sortable: true,
      filter: 'agNumberColumnFilter',
      width: 120,
      valueFormatter: (params) => formatCurrency(params.value),
      cellStyle: { fontWeight: '600' }
    },
    {
      field: 'items',
      headerName: 'Artiklar',
      sortable: true,
      filter: 'agNumberColumnFilter',
      width: 100,
      cellStyle: { textAlign: 'center' }
    },
    {
      field: 'paymentMethod',
      headerName: 'Betalning',
      sortable: true,
      filter: true,
      width: 120,
      cellRenderer: PaymentMethodRenderer
    },
    {
      field: 'cashier',
      headerName: 'Kassör',
      sortable: true,
      filter: true,
      flex: 1
    }
  ];

  const salesStats = useMemo(() => {
    const totalSales = mockSalesData.reduce((sum, sale) => sum + sale.amount, 0);
    const totalTransactions = mockSalesData.length;
    const avgTransactionValue = totalSales / totalTransactions;
    const cardPayments = mockSalesData.filter(sale => sale.paymentMethod === 'card').length;
    const cardPaymentPercentage = (cardPayments / totalTransactions) * 100;

    return { 
      totalSales, 
      totalTransactions, 
      avgTransactionValue,
      cardPaymentPercentage 
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Försäljning</h1>
        <p className="text-gray-600 mt-2">
          Dagens försäljning och transaktioner
        </p>
      </div>

      {/* Sales Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">Total Försäljning</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(salesStats.totalSales)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">Transaktioner</p>
                <p className="text-2xl font-bold text-gray-900">{salesStats.totalTransactions}</p>
              </div>
              <CreditCard className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">Genomsnitt/Köp</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(salesStats.avgTransactionValue)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">Kort %</p>
                <p className="text-2xl font-bold text-primary">{salesStats.cardPaymentPercentage.toFixed(0)}%</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Dagens Transaktioner</CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Sök transaktioner..."
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
              rowData={filteredSales}
              columnDefs={columnDefs}
              defaultColDef={{
                resizable: true,
                sortable: true,
                filter: true,
              }}
              animateRows={true}
              rowSelection="single"
              pagination={true}
              paginationPageSize={10}
              domLayout="normal"
              rowHeight={60}
              headerHeight={50}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;