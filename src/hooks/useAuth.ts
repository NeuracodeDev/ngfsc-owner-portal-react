import { useState, useEffect } from 'react';
import { loginUser, logoutUser, getCurrentUser, type LoginCredentials, type User } from '@/api/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    // Check for existing user on mount
    const existingUser = getCurrentUser();
    setUser(existingUser);
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoginLoading(true);
    try {
      const response = await loginUser(credentials);
      setUser(response.user);
      
      // Store in localStorage
      localStorage.setItem('ngfsc-token', response.token);
      localStorage.setItem('ngfsc-user', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API fails
      setUser(null);
    }
  };

  return {
    user,
    loading,
    loginLoading,
    isAuthenticated: !!user,
    login,
    logout
  };
};