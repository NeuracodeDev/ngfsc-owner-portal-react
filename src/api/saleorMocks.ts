// Mock Saleor GraphQL types and responses
export interface SalesData {
  today: {
    revenue: number;
    orders: number;
    averageOrderValue: number;
  };
  thisWeek: {
    revenue: number;
    orders: number;
    averageOrderValue: number;
  };
}

// Mock sales data
const MOCK_SALES_DATA: SalesData = {
  today: {
    revenue: 1247.50,
    orders: 23,
    averageOrderValue: 54.24
  },
  thisWeek: {
    revenue: 8652.30,
    orders: 156,
    averageOrderValue: 55.46
  }
};

export const getSalesData = async (): Promise<SalesData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return MOCK_SALES_DATA;
};