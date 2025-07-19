import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AIHistoryPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI History</h1>
        <p className="text-muted-foreground mt-2">
          Track AI suggestions and their outcomes
        </p>
      </div>

      <Card className="shadow-elevated border-0">
        <CardHeader>
          <CardTitle>AI Suggestion History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            AI history tracking coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIHistoryPage;