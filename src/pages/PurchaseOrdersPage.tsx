import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { useTranslation } from 'react-i18next';
import { Plus, ShoppingCart } from 'lucide-react';

const PurchaseOrdersPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mt-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('purchaseOrders')}</h1>
          <p className="text-gray-600 mt-2">
            {t('managePurchaseOrders')}
          </p>
        </div>
        <Button className="bg-brand-gradient hover-scale">
          <Plus className="h-4 w-4 mr-2" />
          {t('createPO')}
        </Button>
      </div>

      <EmptyState
        icon={ShoppingCart}
        title={t('purchaseOrders')}
        description={t('purchaseOrdersSoon')}
        action={{
          label: "Läs mer",
          onClick: () => window.open('https://docs.lovable.dev', '_blank')
        }}
      />
    </div>
  );
};

export default PurchaseOrdersPage;