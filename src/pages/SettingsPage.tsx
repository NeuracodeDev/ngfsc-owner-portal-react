import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { Save, Trash2 } from 'lucide-react';

const SettingsPage = () => {
  const [slackId, setSlackId] = useState('');
  const [language, setLanguage] = useState('sv');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('settingsSaved'),
        description: t('settingsSavedDescription'),
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: t('saveSettingsError'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStore = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('storeDeletionInitiated'),
        description: t('storeDeletionDescription'),
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: t('deleteStoreError'),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('settings')}</h1>
        <p className="text-muted-foreground">
          {t('managePreferences')}
        </p>
      </div>

      <div className="space-y-6">
        {/* Notifications Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>{t('notifications')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="slack-id">{t('slackUserId')}</Label>
              <Input
                id="slack-id"
                placeholder={t('slackPlaceholder')}
                value={slackId}
                onChange={(e) => setSlackId(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                {t('slackDescription')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>{t('preferences')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">{t('preferredLanguage')}</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sv">Svenska</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {t('languageDescription')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Settings */}
        <div className="flex justify-start">
          <Button 
            onClick={handleSaveSettings}
            disabled={loading}
            className="bg-gradient-primary"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? t('saving') : t('saveSettings')}
          </Button>
        </div>

        {/* Danger Zone */}
        <Card className="shadow-soft border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">{t('dangerZone')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">{t('deleteStore')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('deleteStoreDescription')}
              </p>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t('deleteStore')}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('areYouSure')}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('deleteConfirmation')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteStore}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {t('yesDeleteStore')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;