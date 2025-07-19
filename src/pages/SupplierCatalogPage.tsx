import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SupplierCatalogPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Supplier Catalog</h1>
        <p className="text-muted-foreground mt-2">
          Browse and manage your supplier network
        </p>
      </div>

      <Card className="shadow-elevated border-0">
        <CardHeader>
          <CardTitle>Suppliers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Supplier catalog coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierCatalogPage;