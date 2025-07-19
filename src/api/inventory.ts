// Mock inventory API
export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  image: string;
  stockOnHand: number;
  daysOfCover: number;
  category: string;
  unitPrice: number;
  supplier: string;
  lastRestocked: string;
}

// Mock inventory data
const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    sku: 'ORG-BAN-001',
    name: 'Organic Bananas',
    image: '/api/placeholder/100/100',
    stockOnHand: 45,
    daysOfCover: 3,
    category: 'Fruits',
    unitPrice: 4.99,
    supplier: 'Green Valley Farms',
    lastRestocked: '2024-01-12T00:00:00Z'
  },
  {
    id: '2',
    sku: 'PREM-OIL-002',
    name: 'Premium Olive Oil',
    image: '/api/placeholder/100/100',
    stockOnHand: 8,
    daysOfCover: 2,
    category: 'Oils & Vinegars',
    unitPrice: 24.99,
    supplier: 'Mediterranean Imports',
    lastRestocked: '2024-01-10T00:00:00Z'
  },
  {
    id: '3',
    sku: 'ORG-CAR-003',
    name: 'Organic Carrots',
    image: '/api/placeholder/100/100',
    stockOnHand: 120,
    daysOfCover: 7,
    category: 'Vegetables',
    unitPrice: 2.49,
    supplier: 'Local Harvest Co',
    lastRestocked: '2024-01-14T00:00:00Z'
  },
  {
    id: '4',
    sku: 'FRES-STR-004',
    name: 'Fresh Strawberries',
    image: '/api/placeholder/100/100',
    stockOnHand: 25,
    daysOfCover: 1,
    category: 'Berries',
    unitPrice: 6.99,
    supplier: 'Berry Best Farms',
    lastRestocked: '2024-01-14T00:00:00Z'
  },
  {
    id: '5',
    sku: 'ORG-SPL-005',
    name: 'Organic Spinach',
    image: '/api/placeholder/100/100',
    stockOnHand: 35,
    daysOfCover: 4,
    category: 'Leafy Greens',
    unitPrice: 3.99,
    supplier: 'Green Valley Farms',
    lastRestocked: '2024-01-13T00:00:00Z'
  }
];

export const getInventory = async (searchTerm?: string): Promise<InventoryItem[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  let inventory = [...MOCK_INVENTORY];
  
  if (searchTerm) {
    inventory = inventory.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  return inventory;
};