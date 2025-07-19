import { useState, useEffect } from 'react';

export interface SustainabilityMetrics {
  wasteReduced: {
    monthly: Array<{ month: string; kg: number }>;
    total: number;
  };
  co2Avoided: {
    daily: Array<{ date: string; kg: number }>;
    total: number;
  };
  surplusTraded: {
    byCategory: Array<{ category: string; amount: number; color: string }>;
    totalValue: number;
  };
  certificationStatus: {
    active: string[];
    pending: string[];
    expired: string[];
  };
  impactScore: number; // 0-100
}

const mockSustainabilityData: SustainabilityMetrics = {
  wasteReduced: {
    monthly: [
      { month: 'Jul', kg: 245 },
      { month: 'Aug', kg: 289 },
      { month: 'Sep', kg: 312 },
      { month: 'Oct', kg: 378 },
      { month: 'Nov', kg: 425 },
      { month: 'Dec', kg: 467 },
      { month: 'Jan', kg: 523 }
    ],
    total: 2639
  },
  co2Avoided: {
    daily: [
      { date: '2024-01-10', kg: 12.5 },
      { date: '2024-01-11', kg: 15.2 },
      { date: '2024-01-12', kg: 18.7 },
      { date: '2024-01-13', kg: 14.3 },
      { date: '2024-01-14', kg: 16.8 },
      { date: '2024-01-15', kg: 22.1 },
      { date: '2024-01-16', kg: 19.4 },
      { date: '2024-01-17', kg: 17.6 }
    ],
    total: 1456.8
  },
  surplusTraded: {
    byCategory: [
      { category: 'Vegetables', amount: 45.2, color: 'hsl(var(--success))' },
      { category: 'Fruits', amount: 32.8, color: 'hsl(var(--info))' },
      { category: 'Herbs', amount: 15.5, color: 'hsl(var(--warning))' },
      { category: 'Dairy', amount: 6.5, color: 'hsl(var(--destructive))' }
    ],
    totalValue: 8945.50
  },
  certificationStatus: {
    active: ['USDA Organic', 'Fair Trade', 'Carbon Neutral'],
    pending: ['B Corp', 'Rainforest Alliance'],
    expired: ['ISO 14001']
  },
  impactScore: 87
};

export const useSustainabilityMetrics = () => {
  const [metrics, setMetrics] = useState<SustainabilityMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      setMetrics(mockSustainabilityData);
      setLoading(false);
    };

    fetchMetrics();
  }, []);

  const getWasteReductionTrend = () => {
    if (!metrics?.wasteReduced.monthly.length) return 0;
    
    const data = metrics.wasteReduced.monthly;
    const recent = data.slice(-2);
    if (recent.length < 2) return 0;
    
    return ((recent[1].kg - recent[0].kg) / recent[0].kg) * 100;
  };

  const getCO2AvoidanceTrend = () => {
    if (!metrics?.co2Avoided.daily.length) return 0;
    
    const data = metrics.co2Avoided.daily;
    const recent = data.slice(-2);
    if (recent.length < 2) return 0;
    
    return ((recent[1].kg - recent[0].kg) / recent[0].kg) * 100;
  };

  return {
    metrics,
    loading,
    getWasteReductionTrend,
    getCO2AvoidanceTrend
  };
};