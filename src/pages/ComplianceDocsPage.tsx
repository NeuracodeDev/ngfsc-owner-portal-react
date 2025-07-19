import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ComplianceDocsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Compliance Documents</h1>
        <p className="text-muted-foreground mt-2">
          Manage HACCP logs, allergen reports, and compliance documentation
        </p>
      </div>

      <Card className="shadow-elevated border-0">
        <CardHeader>
          <CardTitle>Compliance Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Compliance management coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceDocsPage;