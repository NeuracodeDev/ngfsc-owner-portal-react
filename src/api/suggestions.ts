// Mock AI suggestions API
export interface Suggestion {
  id: string;
  type: 'pricing' | 'inventory' | 'marketing' | 'operations';
  message: string;
  proposedAction: string;
  impact: 'high' | 'medium' | 'low';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  category: string;
  status: 'pending' | 'approved' | 'declined';
  createdAt: Date;
  estimatedRevenue?: number;
}

// Mock suggestions data
const MOCK_SUGGESTIONS: Suggestion[] = [
  {
    id: '1',
    type: 'pricing',
    message: 'Consider reducing the price of Organic Kale by 15% to increase sales velocity',
    proposedAction: 'Update price from $4.99 to $4.24',
    impact: 'medium',
    priority: 'high',
    category: 'Price Optimization',
    status: 'pending',
    estimatedRevenue: 320,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    type: 'inventory',
    message: 'Tomato stock is running low (2 days remaining)',
    proposedAction: 'Reorder 500 units from FreshFarms Co.',
    impact: 'high',
    priority: 'urgent',
    category: 'Stock Management',
    status: 'pending',
    estimatedRevenue: 1250,
    createdAt: new Date('2024-01-14'),
  },
  {
    id: '3',
    type: 'marketing',
    message: 'Bundle slow-moving herbs together for a "Herb Garden Pack"',
    proposedAction: 'Create bundle: Basil + Cilantro + Parsley for $8.99',
    impact: 'medium',
    priority: 'medium',
    category: 'Product Bundling',
    status: 'approved',
    estimatedRevenue: 180,
    createdAt: new Date('2024-01-13'),
  },
  {
    id: '4',
    type: 'operations',
    message: 'Supplier delivery times have increased by 2 days on average',
    proposedAction: 'Adjust reorder points to account for longer lead times',
    impact: 'low',
    priority: 'low',
    category: 'Supply Chain',
    status: 'declined',
    createdAt: new Date('2024-01-12'),
  },
  {
    id: '5',
    type: 'inventory',
    message: 'Seasonal demand spike detected for winter vegetables',
    proposedAction: 'Increase stock levels for carrots, potatoes, and onions by 40%',
    impact: 'high',
    priority: 'urgent',
    category: 'Seasonal Planning',
    status: 'pending',
    estimatedRevenue: 2100,
    createdAt: new Date('2024-01-16'),
  },
];

export const getSuggestions = async (): Promise<Suggestion[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return MOCK_SUGGESTIONS;
};

export const approveSuggestion = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const suggestion = MOCK_SUGGESTIONS.find(s => s.id === id);
  if (suggestion) {
    suggestion.status = 'approved';
  }
};

export const declineSuggestion = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const suggestion = MOCK_SUGGESTIONS.find(s => s.id === id);
  if (suggestion) {
    suggestion.status = 'declined';
  }
};