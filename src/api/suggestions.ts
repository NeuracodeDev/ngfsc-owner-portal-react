// Mock AI suggestions API
export interface Suggestion {
  id: string;
  type: 'pricing' | 'inventory' | 'promotion' | 'surplus';
  message: string;
  proposedAction: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  status: 'pending' | 'approved' | 'declined';
}

// Mock suggestions data
const MOCK_SUGGESTIONS: Suggestion[] = [
  {
    id: '1',
    type: 'pricing',
    message: 'Organic bananas are overpriced compared to market average',
    proposedAction: 'Reduce price by 15% to $3.49/lb',
    priority: 'high',
    createdAt: '2024-01-15T10:30:00Z',
    status: 'pending'
  },
  {
    id: '2',
    type: 'inventory',
    message: 'Low stock alert: Premium olive oil will run out in 2 days',
    proposedAction: 'Reorder 24 units immediately',
    priority: 'high',
    createdAt: '2024-01-15T09:15:00Z',
    status: 'pending'
  },
  {
    id: '3',
    type: 'promotion',
    message: 'Seasonal vegetables have low turnover this week',
    proposedAction: 'Create 20% off promotion for root vegetables',
    priority: 'medium',
    createdAt: '2024-01-15T08:45:00Z',
    status: 'pending'
  },
  {
    id: '4',
    type: 'surplus',
    message: 'Excess strawberries approaching expiration date',
    proposedAction: 'List 15 lbs on surplus marketplace at 30% discount',
    priority: 'high',
    createdAt: '2024-01-15T07:20:00Z',
    status: 'pending'
  }
];

export const getSuggestions = async (): Promise<Suggestion[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return MOCK_SUGGESTIONS.filter(s => s.status === 'pending');
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