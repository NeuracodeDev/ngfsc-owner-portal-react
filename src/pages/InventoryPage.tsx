import { useTranslation } from 'react-i18next';
import { useInventory } from '@/hooks/useInventory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

const InventoryPage = () => {
  const { t } = useTranslation();
  const { inventory, loading, searchTerm, search } = useInventory();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStockStatus = (daysOfCover: number) => {
    if (daysOfCover <= 2) {
      return {
        variant: 'destructive' as const,
        icon: AlertTriangle,
        text: 'Critical'
      };
    } else if (daysOfCover <= 5) {
      return {
        variant: 'default' as const,
        icon: AlertTriangle,
        text: 'Low'
      };
    } else {
      return {
        variant: 'secondary' as const,
        icon: CheckCircle,
        text: 'Good'
      };
    }
  };

  return (
    <div className="space-y-6">
      <div className="mt-6">{/* Added top margin for better spacing */}
        <h1 className="text-3xl font-bold text-gray-900">{t('inventoryManagement')}</h1>{/* Darker heading color */}
        <p className="text-gray-600 mt-2">{/* More neutral secondary text */}
          Övervaka lagernivåer och hantera ditt produktlager
        </p>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">{t('product')} {t('inventory')}</CardTitle>{/* Better typography */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t('searchProducts')}
              value={searchTerm}
              onChange={(e) => search(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('product')}</TableHead>
                    <TableHead>{t('sku')}</TableHead>
                    <TableHead>{t('stockOnHand')}</TableHead>
                    <TableHead>{t('daysOfCover')}</TableHead>
                    <TableHead>{t('unitPrice')}</TableHead>
                    <TableHead>{t('supplier')}</TableHead>
                    <TableHead>{t('status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        {searchTerm ? 'Inga produkter hittades för din sökning.' : 'Inga lagerartiklar hittades.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    inventory.map((item) => {
                      const status = getStockStatus(item.daysOfCover);
                      const StatusIcon = status.icon;
                      
                      return (
                        <TableRow key={item.id} className="hover:bg-secondary/50">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-8 h-8 object-cover rounded"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                              <div>
                                <div className="font-medium text-foreground">{item.name}</div>
                                <div className="text-sm text-muted-foreground">{item.category}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                          <TableCell>
                            <span className="font-medium">{item.stockOnHand}</span>
                          </TableCell>
                          <TableCell>
                            <span className={`font-medium ${
                              item.daysOfCover <= 2 ? 'text-destructive' : 
                              item.daysOfCover <= 5 ? 'text-warning' : 'text-success'
                            }`}>
                              {item.daysOfCover} dagar
                            </span>
                          </TableCell>
                          <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {item.supplier}
                          </TableCell>
                          <TableCell>
                            <Badge variant={status.variant} className="flex items-center space-x-1 w-fit">
                              <StatusIcon className="h-3 w-3" />
                              <span>{status.text}</span>
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPage;