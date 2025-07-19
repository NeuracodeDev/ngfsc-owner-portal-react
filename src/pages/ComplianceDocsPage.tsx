import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';

const ComplianceDocsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{t('complianceDocuments')}</h1>
        <p className="text-gray-600 mt-2">
          {t('manageCompliance')}
        </p>
      </div>

      <EmptyState
        icon={FileText}
        title={t('complianceDocumentation')}
        description={t('complianceManagementSoon')}
        action={{
          label: "Läs mer",
          onClick: () => window.open('https://docs.lovable.dev', '_blank')
        }}
      />
    </div>
  );
};

export default ComplianceDocsPage;