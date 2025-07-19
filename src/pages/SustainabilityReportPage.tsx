import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SustainabilityReportPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sustainability Report</h1>
        <p className="text-muted-foreground mt-2">
          Track your environmental impact and sustainability metrics
        </p>
      </div>

      <Card className="shadow-elevated border-0">
        <CardHeader>
          <CardTitle>Environmental Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Sustainability reporting coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SustainabilityReportPage;