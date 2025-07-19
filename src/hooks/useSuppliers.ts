import { useState, useEffect } from 'react';

export interface Supplier {
  id: string;
  name: string;
  logo?: string;
  email: string;
  phone: string;
  categories: string[];
  rating: number;
  location: string;
  certifications: string[];
  catalog: SupplierProduct[];
}

export interface SupplierProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  packSize: string;
  unitPrice: number;
  moq: number; // Minimum Order Quantity
  inStock: boolean;
  description?: string;
}

const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'FreshFarms Co.',
    logo: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=100&h=100&fit=crop&crop=center',
    email: 'orders@freshfarms.com',
    phone: '+1 (555) 123-4567',
    categories: ['Vegetables', 'Fruits', 'Herbs'],
    rating: 4.8,
    location: 'California, USA',
    certifications: ['USDA Organic', 'Fair Trade', 'Non-GMO'],
    catalog: [
      {
        id: '1',
        sku: 'ORG-TOM-001',
        name: 'Organic Tomatoes',
        category: 'Vegetables',
        packSize: '5 lbs',
        unitPrice: 12.99,
        moq: 10,
        inStock: true,
        description: 'Premium organic beefsteak tomatoes, locally grown'
      },
      {
        id: '2',
        sku: 'ORG-LET-001',
        name: 'Organic Lettuce',
        category: 'Vegetables',
        packSize: '2 lbs',
        unitPrice: 4.99,
        moq: 20,
        inStock: true,
        description: 'Fresh organic romaine lettuce, crisp and flavorful'
      },
      {
        id: '3',
        sku: 'ORG-CAR-001',
        name: 'Organic Carrots',
        category: 'Vegetables',
        packSize: '3 lbs',
        unitPrice: 6.54,
        moq: 15,
        inStock: false,
        description: 'Sweet organic carrots, perfect for juicing or cooking'
      }
    ]
  },
  {
    id: '2',
    name: 'Green Valley Organics',
    logo: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop&crop=center',
    email: 'sales@greenvalley.com',
    phone: '+1 (555) 987-6543',
    categories: ['Herbs', 'Leafy Greens', 'Microgreens'],
    rating: 4.6,
    location: 'Oregon, USA',
    certifications: ['USDA Organic', 'Demeter Biodynamic'],
    catalog: [
      {
        id: '4',
        sku: 'ORG-BAS-001',
        name: 'Organic Basil',
        category: 'Herbs',
        packSize: '0.5 lbs',
        unitPrice: 3.50,
        moq: 25,
        inStock: true,
        description: 'Aromatic organic basil, perfect for culinary applications'
      },
      {
        id: '5',
        sku: 'ORG-SPI-001',
        name: 'Organic Spinach',
        category: 'Leafy Greens',
        packSize: '1 lb',
        unitPrice: 8.44,
        moq: 30,
        inStock: true,
        description: 'Tender organic baby spinach leaves'
      }
    ]
  },
  {
    id: '3',
    name: 'Sustainable Produce Ltd',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
    email: 'procurement@sustainable.com',
    phone: '+1 (555) 456-7890',
    categories: ['Fruits', 'Citrus', 'Exotic Fruits'],
    rating: 4.9,
    location: 'Florida, USA',
    certifications: ['USDA Organic', 'Rainforest Alliance', 'Carbon Neutral'],
    catalog: [
      {
        id: '6',
        sku: 'ORG-AVO-001',
        name: 'Organic Avocados',
        category: 'Fruits',
        packSize: '10 lbs',
        unitPrice: 15.99,
        moq: 5,
        inStock: true,
        description: 'Premium Hass avocados, perfectly ripe and creamy'
      },
      {
        id: '7',
        sku: 'ORG-LEM-001',
        name: 'Organic Lemons',
        category: 'Citrus',
        packSize: '5 lbs',
        unitPrice: 3.27,
        moq: 20,
        inStock: true,
        description: 'Juicy organic lemons, high in vitamin C'
      }
    ]
  }
];

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 900));
      setSuppliers(mockSuppliers);
      setLoading(false);
    };

    fetchSuppliers();
  }, []);

  const getSupplierById = (id: string): Supplier | undefined => {
    return suppliers.find(supplier => supplier.id === id);
  };

  const searchProducts = (query: string): SupplierProduct[] => {
    const allProducts = suppliers.flatMap(supplier => 
      supplier.catalog.map(product => ({ ...product, supplierName: supplier.name }))
    );
    
    if (!query) return allProducts;
    
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.sku.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    suppliers,
    loading,
    selectedSupplier,
    setSelectedSupplier,
    getSupplierById,
    searchProducts
  };
};