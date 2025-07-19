// Mock Saleor GraphQL types and responses
export interface SalesData {
  today: {
    revenue: number;
    orders: number;
    averageOrderValue: number;
    trend: number[];
  };
  thisWeek: {
    revenue: number;
    orders: number;
    averageOrderValue: number;
    trend: number[];
  };
}

// Mock sales data
const MOCK_SALES_DATA: SalesData = {
  today: {
    revenue: 1247.50,
    orders: 23,
    averageOrderValue: 54.24,
    trend: [1100, 1200, 1150, 1180, 1247] // Last 5 periods for sparkline
  },
  thisWeek: {
    revenue: 8652.30,
    orders: 156,
    averageOrderValue: 55.46,
    trend: [7200, 7800, 8100, 8300, 8652] // Weekly trend
  }
};

export const getSalesData = async (): Promise<SalesData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return MOCK_SALES_DATA;
};