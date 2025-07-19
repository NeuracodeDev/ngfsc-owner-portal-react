import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';

const PurchaseOrdersPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('purchaseOrders')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('managePurchaseOrders')}
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          {t('createPO')}
        </Button>
      </div>

      <Card className="shadow-elevated border-0">
        <CardHeader>
          <CardTitle>{t('purchaseOrders')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            {t('purchaseOrdersSoon')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseOrdersPage;