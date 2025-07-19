// Mock authentication API
export interface User {
  id: string;
  email: string;
  name: string;
  storeName: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Mock user data
const MOCK_USER: User = {
  id: '1',
  email: 'owner@ngfsc.com',
  name: 'John Smith',
  storeName: 'Fresh Market Pro'
};

// Mock authentication functions
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation - in real app this would call Saleor GraphQL
  if (credentials.email && credentials.password) {
    return {
      user: MOCK_USER,
      token: 'mock-jwt-token-' + Date.now()
    };
  }
  
  throw new Error('Invalid credentials');
};

export const logoutUser = async (): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  localStorage.removeItem('ngfsc-token');
  localStorage.removeItem('ngfsc-user');
};

export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem('ngfsc-user');
  return userData ? JSON.parse(userData) : null;
};

export const getToken = (): string | null => {
  return localStorage.getItem('ngfsc-token');
};