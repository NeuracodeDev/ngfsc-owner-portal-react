import { useState, useEffect } from 'react';
import { getSuggestions, approveSuggestion as apiApproveSuggestion, declineSuggestion as apiDeclineSuggestion, type Suggestion } from '@/api/suggestions';

export const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      const data = await getSuggestions();
      setSuggestions(data);
    } catch (error) {
      console.error('Failed to load suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  const approveSuggestion = async (id: string) => {
    try {
      setActionLoading(id);
      await apiApproveSuggestion(id);
      // Remove from suggestions list after approval
      setSuggestions(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Failed to approve suggestion:', error);
      throw error;
    } finally {
      setActionLoading(null);
    }
  };

  const declineSuggestion = async (id: string) => {
    try {
      setActionLoading(id);
      await apiDeclineSuggestion(id);
      // Remove from suggestions list after decline
      setSuggestions(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Failed to decline suggestion:', error);
      throw error;
    } finally {
      setActionLoading(null);
    }
  };

  return {
    suggestions,
    loading,
    actionLoading,
    approveSuggestion,
    declineSuggestion,
    refetch: loadSuggestions
  };
};