// Mock surplus marketplace API
export interface SurplusListing {
  id: string;
  sku: string;
  productName: string;
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
  status: 'active' | 'sold' | 'expired';
  buyer?: string;
  quantitySold: number;
  expirationDate: string;
  createdAt: string;
}

export interface CreateListingData {
  sku: string;
  quantity: number;
  discountedPrice: number;
  expirationDate: string;
}

// Mock surplus listings data
const MOCK_LISTINGS: SurplusListing[] = [
  {
    id: '1',
    sku: 'FRES-STR-004',
    productName: 'Fresh Strawberries',
    quantity: 15,
    originalPrice: 6.99,
    discountedPrice: 4.89,
    status: 'active',
    quantitySold: 0,
    expirationDate: '2024-01-17T00:00:00Z',
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    sku: 'ORG-BAN-001',
    productName: 'Organic Bananas',
    quantity: 20,
    originalPrice: 4.99,
    discountedPrice: 3.49,
    status: 'sold',
    buyer: 'City Cafe',
    quantitySold: 20,
    expirationDate: '2024-01-16T00:00:00Z',
    createdAt: '2024-01-14T10:30:00Z'
  },
  {
    id: '3',
    sku: 'ORG-SPL-005',
    productName: 'Organic Spinach',
    quantity: 10,
    originalPrice: 3.99,
    discountedPrice: 2.79,
    status: 'active',
    quantitySold: 0,
    expirationDate: '2024-01-18T00:00:00Z',
    createdAt: '2024-01-15T06:15:00Z'
  }
];

export const getSurplusListings = async (): Promise<SurplusListing[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  return [...MOCK_LISTINGS];
};

export const createListing = async (data: CreateListingData): Promise<SurplusListing> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In real app, this would call Saleor GraphQL to create listing
  const newListing: SurplusListing = {
    id: Date.now().toString(),
    sku: data.sku,
    productName: `Product for ${data.sku}`, // In real app, would lookup product name
    quantity: data.quantity,
    originalPrice: 0, // Would be fetched from product data
    discountedPrice: data.discountedPrice,
    status: 'active',
    quantitySold: 0,
    expirationDate: data.expirationDate,
    createdAt: new Date().toISOString()
  };
  
  MOCK_LISTINGS.push(newListing);
  return newListing;
};