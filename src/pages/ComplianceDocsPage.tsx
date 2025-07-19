import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const ComplianceDocsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('complianceDocuments')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('manageCompliance')}
        </p>
      </div>

      <Card className="shadow-elevated border-0">
        <CardHeader>
          <CardTitle>{t('complianceDocumentation')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            {t('complianceManagementSoon')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceDocsPage;