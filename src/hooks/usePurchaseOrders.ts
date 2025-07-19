import { useState, useEffect } from 'react';

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  supplierEmail: string;
  created: Date;
  eta: Date;
  status: 'draft' | 'sent' | 'confirmed' | 'shipped' | 'received' | 'cancelled';
  total: number;
  items: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface CreatePORequest {
  supplierId: string;
  items: Array<{
    sku: string;
    quantity: number;
  }>;
  notes?: string;
}

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    poNumber: 'PO-2024-001',
    supplier: 'FreshFarms Co.',
    supplierEmail: 'orders@freshfarms.com',
    created: new Date('2024-01-10'),
    eta: new Date('2024-01-18'),
    status: 'confirmed',
    total: 1245.00,
    items: [
      { id: '1', sku: 'ORG-TOM-001', name: 'Organic Tomatoes', quantity: 50, unitPrice: 12.99, total: 649.50 },
      { id: '2', sku: 'ORG-LET-001', name: 'Organic Lettuce', quantity: 80, unitPrice: 4.99, total: 399.20 },
      { id: '3', sku: 'ORG-CAR-001', name: 'Organic Carrots', quantity: 30, unitPrice: 6.54, total: 196.20 }
    ]
  },
  {
    id: '2',
    poNumber: 'PO-2024-002',
    supplier: 'Green Valley Organics',
    supplierEmail: 'sales@greenvalley.com',
    created: new Date('2024-01-12'),
    eta: new Date('2024-01-20'),
    status: 'sent',
    total: 856.75,
    items: [
      { id: '4', sku: 'ORG-BAS-001', name: 'Organic Basil', quantity: 100, unitPrice: 3.50, total: 350.00 },
      { id: '5', sku: 'ORG-SPI-001', name: 'Organic Spinach', quantity: 60, unitPrice: 8.44, total: 506.75 }
    ]
  },
  {
    id: '3',
    poNumber: 'PO-2024-003',
    supplier: 'Sustainable Produce Ltd',
    supplierEmail: 'procurement@sustainable.com',
    created: new Date('2024-01-14'),
    eta: new Date('2024-01-22'),
    status: 'draft',
    total: 2180.50,
    items: [
      { id: '6', sku: 'ORG-AVO-001', name: 'Organic Avocados', quantity: 120, unitPrice: 15.99, total: 1918.80 },
      { id: '7', sku: 'ORG-LEM-001', name: 'Organic Lemons', quantity: 80, unitPrice: 3.27, total: 261.70 }
    ]
  }
];

export const usePurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPurchaseOrders(mockPurchaseOrders);
      setLoading(false);
    };

    fetchPurchaseOrders();
  }, []);

  const createPurchaseOrder = async (request: CreatePORequest): Promise<PurchaseOrder> => {
    setCreateLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newPO: PurchaseOrder = {
      id: Date.now().toString(),
      poNumber: `PO-2024-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
      supplier: 'New Supplier', // This would come from supplier lookup
      supplierEmail: 'orders@newsupplier.com',
      created: new Date(),
      eta: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      status: 'draft',
      total: 0, // Would be calculated from items
      items: [] // Would be populated from request
    };

    setPurchaseOrders(prev => [...prev, newPO]);
    setCreateLoading(false);
    
    return newPO;
  };

  const updatePOStatus = async (poId: string, status: PurchaseOrder['status']) => {
    const po = purchaseOrders.find(p => p.id === poId);
    if (po) {
      po.status = status;
      setPurchaseOrders([...purchaseOrders]);
    }
  };

  return {
    purchaseOrders,
    loading,
    createLoading,
    createPurchaseOrder,
    updatePOStatus
  };
};