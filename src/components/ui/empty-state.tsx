import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    href?: string;
  };
  className?: string;
}

export const EmptyState = ({ 
  icon: Icon, 
  emoji, 
  title, 
  description, 
  action, 
  className = "" 
}: EmptyStateProps) => {
  return (
    <Card className={`bg-white shadow-sm border border-gray-200 ${className}`}>
      <CardContent className="text-center py-12">
        <div className="flex flex-col items-center space-y-4">
          {Icon && (
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Icon className="h-8 w-8 text-gray-400" />
            </div>
          )}
          {emoji && !Icon && (
            <div className="text-4xl">{emoji}</div>
          )}
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600 max-w-sm">{description}</p>
          </div>
          
          {action && (
            <Button 
              onClick={action.onClick}
              variant="outline"
              className="mt-4"
            >
              {action.label}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};