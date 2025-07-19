import { useState, useEffect } from 'react';

export interface Order {
  id: string;
  orderNumber: string;
  date: Date;
  total: number;
  paymentMethod: 'card' | 'bank_transfer' | 'invoice' | 'cash';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  timeline: OrderEvent[];
}

export interface OrderItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface OrderEvent {
  id: string;
  timestamp: Date;
  status: string;
  description: string;
  user?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: new Date('2024-01-15'),
    total: 145.50,
    paymentMethod: 'card',
    status: 'delivered',
    customerName: 'Fresh Foods Market',
    customerEmail: 'orders@freshfoods.com',
    items: [
      { id: '1', sku: 'ORG-TOM-001', name: 'Organic Tomatoes', quantity: 5, unitPrice: 12.99, total: 64.95 },
      { id: '2', sku: 'ORG-LET-001', name: 'Organic Lettuce', quantity: 8, unitPrice: 4.99, total: 39.92 },
      { id: '3', sku: 'ORG-CAR-001', name: 'Organic Carrots', quantity: 3, unitPrice: 13.54, total: 40.63 }
    ],
    timeline: [
      { id: '1', timestamp: new Date('2024-01-15T09:00:00'), status: 'pending', description: 'Order placed' },
      { id: '2', timestamp: new Date('2024-01-15T09:30:00'), status: 'confirmed', description: 'Order confirmed', user: 'System' },
      { id: '3', timestamp: new Date('2024-01-15T14:00:00'), status: 'shipped', description: 'Order shipped via FreshExpress', user: 'Warehouse' },
      { id: '4', timestamp: new Date('2024-01-16T11:00:00'), status: 'delivered', description: 'Order delivered successfully', user: 'Driver' }
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: new Date('2024-01-16'),
    total: 89.25,
    paymentMethod: 'bank_transfer',
    status: 'shipped',
    customerName: 'Green Garden Café',
    customerEmail: 'procurement@greengarden.com',
    items: [
      { id: '4', sku: 'ORG-BAS-001', name: 'Organic Basil', quantity: 10, unitPrice: 3.50, total: 35.00 },
      { id: '5', sku: 'ORG-SPI-001', name: 'Organic Spinach', quantity: 6, unitPrice: 9.04, total: 54.25 }
    ],
    timeline: [
      { id: '5', timestamp: new Date('2024-01-16T08:15:00'), status: 'pending', description: 'Order placed' },
      { id: '6', timestamp: new Date('2024-01-16T10:00:00'), status: 'confirmed', description: 'Order confirmed and payment received', user: 'Finance' },
      { id: '7', timestamp: new Date('2024-01-16T16:30:00'), status: 'shipped', description: 'Order picked and shipped', user: 'Warehouse' }
    ]
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: new Date('2024-01-17'),
    total: 267.80,
    paymentMethod: 'invoice',
    status: 'confirmed',
    customerName: 'Healthy Eats Restaurant',
    customerEmail: 'orders@healthyeats.com',
    items: [
      { id: '6', sku: 'ORG-AVO-001', name: 'Organic Avocados', quantity: 12, unitPrice: 15.99, total: 191.88 },
      { id: '7', sku: 'ORG-LEM-001', name: 'Organic Lemons', quantity: 8, unitPrice: 9.49, total: 75.92 }
    ],
    timeline: [
      { id: '8', timestamp: new Date('2024-01-17T11:00:00'), status: 'pending', description: 'Order placed' },
      { id: '9', timestamp: new Date('2024-01-17T12:00:00'), status: 'confirmed', description: 'Order confirmed, preparing for fulfillment', user: 'Sales Team' }
    ]
  }
];

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setOrders(mockOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const getOrderById = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      order.timeline.push({
        id: Date.now().toString(),
        timestamp: new Date(),
        status,
        description: `Status updated to ${status}`,
        user: 'Current User'
      });
      setOrders([...orders]);
    }
  };

  return {
    orders,
    loading,
    selectedOrder,
    setSelectedOrder,
    getOrderById,
    updateOrderStatus
  };
};