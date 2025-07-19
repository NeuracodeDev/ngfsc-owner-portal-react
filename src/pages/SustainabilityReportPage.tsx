import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const SustainabilityReportPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('sustainabilityReport')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('trackEnvironmentalImpact')}
        </p>
      </div>

      <Card className="shadow-elevated border-0">
        <CardHeader>
          <CardTitle>{t('environmentalImpact')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            {t('sustainabilityReportingSoon')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SustainabilityReportPage;