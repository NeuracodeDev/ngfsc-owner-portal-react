import { useState, useEffect } from 'react';
import { getInventory, type InventoryItem } from '@/api/inventory';

export const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadInventory = async (search?: string) => {
    try {
      setLoading(true);
      const data = await getInventory(search);
      setInventory(data);
    } catch (error) {
      console.error('Failed to load inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadInventory(searchTerm);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const search = (term: string) => {
    setSearchTerm(term);
  };

  return {
    inventory,
    loading,
    searchTerm,
    search,
    refetch: () => loadInventory(searchTerm)
  };
};