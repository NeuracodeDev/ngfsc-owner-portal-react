import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/hooks/useOrders';
import { 
  Package, 
  User, 
  Mail, 
  Calendar, 
  CreditCard, 
  CheckCircle,
  Clock,
  Truck,
  ShoppingCart 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

export const OrderDetailsDrawer = ({ open, onOpenChange, order }: OrderDetailsDrawerProps) => {
  if (!order) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-success';
      case 'shipped': return 'text-info';
      case 'confirmed': return 'text-warning';
      case 'pending': return 'text-muted-foreground';
      case 'cancelled': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'shipped': return Truck;
      case 'confirmed': return Package;
      case 'pending': return Clock;
      case 'cancelled': return Clock;
      default: return Clock;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return CreditCard;
      case 'bank_transfer': return CreditCard;
      case 'invoice': return Mail;
      case 'cash': return CreditCard;
      default: return CreditCard;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">
              {order.orderNumber}
            </SheetTitle>
            <Badge 
              variant={order.status === 'delivered' ? 'default' : 'secondary'}
              className={cn("capitalize", getStatusColor(order.status))}
            >
              {order.status}
            </Badge>
          </div>
          <SheetDescription>
            Order details and timeline
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Customer Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{order.customerName}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {order.customerEmail}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{order.date.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  {(() => {
                    const PaymentIcon = getPaymentMethodIcon(order.paymentMethod);
                    return <PaymentIcon className="h-4 w-4 text-muted-foreground" />;
                  })()}
                  <span className="text-muted-foreground">Payment:</span>
                  <span className="font-medium capitalize">
                    {order.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center font-medium">
                <span>Total Amount:</span>
                <span className="text-lg text-primary">{formatCurrency(order.total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4" />
                Order Items ({order.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} × {formatCurrency(item.unitPrice)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(item.total)}</p>
                      </div>
                    </div>
                    {index < order.items.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.timeline.map((event, index) => {
                  const StatusIcon = getStatusIcon(event.status);
                  const isLast = index === order.timeline.length - 1;
                  
                  return (
                    <div key={event.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center",
                          getStatusColor(event.status),
                          "bg-current/10"
                        )}>
                          <StatusIcon className="h-4 w-4 text-current" />
                        </div>
                        {!isLast && (
                          <div className="w-px h-6 bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground capitalize">
                            {event.status}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {event.timestamp.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {event.description}
                        </p>
                        {event.user && (
                          <p className="text-xs text-muted-foreground mt-1">
                            by {event.user}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};