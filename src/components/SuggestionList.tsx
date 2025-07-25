import { useTranslation } from 'react-i18next';
import { useSuggestions } from '@/hooks/useSuggestions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Check, 
  X, 
  Loader2,
  TrendingUp,
  Package,
  Megaphone,
  Recycle
} from 'lucide-react';

const SuggestionList = () => {
  const { t } = useTranslation();
  const { suggestions, loading, actionLoading, approveSuggestion, declineSuggestion } = useSuggestions();
  const { toast } = useToast();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pricing':
        return <TrendingUp className="h-4 w-4" />;
      case 'inventory':
        return <Package className="h-4 w-4" />;
      case 'promotion':
        return <Megaphone className="h-4 w-4" />;
      case 'surplus':
        return <Recycle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveSuggestion(id);
      toast({
        title: "Suggestion approved",
        description: "The suggestion has been approved and action will be taken.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve suggestion. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDecline = async (id: string) => {
    try {
      await declineSuggestion(id);
      toast({
        title: "Suggestion declined",
        description: "The suggestion has been declined.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decline suggestion. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('aiSuggestions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
          <span>{t('aiSuggestions')}</span>
          {suggestions.length > 0 && (
            <Badge variant="secondary">{suggestions.length}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {suggestions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Inga väntande förslag för tillfället.
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(suggestion.type)}
                    <Badge 
                      variant={getPriorityVariant(suggestion.priority)}
                      className="text-xs"
                    >
                      {suggestion.priority} priority
                    </Badge>
                    <span className="text-xs text-gray-500 capitalize">
                      {suggestion.type}
                    </span>
                  </div>
                  
                  <p className="text-sm font-medium text-gray-900">
                    {suggestion.message}
                  </p>
                  
                  <p className="text-sm text-gray-600">
                    <strong>Proposed action:</strong> {suggestion.proposedAction}
                  </p>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleApprove(suggestion.id)}
                    disabled={actionLoading === suggestion.id}
                    className="text-success border-success hover:bg-success hover:text-success-foreground hover-scale"
                  >
                    {actionLoading === suggestion.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                    {t('approve')}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDecline(suggestion.id)}
                    disabled={actionLoading === suggestion.id}
                    className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground hover-scale"
                  >
                    <X className="h-4 w-4" />
                    {t('decline')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SuggestionList;