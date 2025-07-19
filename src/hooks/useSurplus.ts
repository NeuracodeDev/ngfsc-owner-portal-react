import { useState, useEffect } from 'react';
import { getSurplusListings, createListing as apiCreateListing, type SurplusListing, type CreateListingData } from '@/api/surplus';

export const useSurplus = () => {
  const [listings, setListings] = useState<SurplusListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);

  const loadListings = async () => {
    try {
      setLoading(true);
      const data = await getSurplusListings();
      setListings(data);
    } catch (error) {
      console.error('Failed to load surplus listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const createListing = async (data: CreateListingData) => {
    try {
      setCreateLoading(true);
      const newListing = await apiCreateListing(data);
      setListings(prev => [newListing, ...prev]);
      return newListing;
    } catch (error) {
      console.error('Failed to create listing:', error);
      throw error;
    } finally {
      setCreateLoading(false);
    }
  };

  return {
    listings,
    loading,
    createLoading,
    createListing,
    refetch: loadListings
  };
};