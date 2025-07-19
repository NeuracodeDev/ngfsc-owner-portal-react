import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      inventory: 'Inventory',
      surplus: 'Surplus',
      settings: 'Settings',
      logout: 'Logout',
      
      // Dashboard
      salesToday: 'Sales Today',
      salesThisWeek: 'Sales This Week',
      orders: 'orders',
      avg: 'avg',
      aiSuggestions: 'AI Suggestions',
      approve: 'Approve',
      decline: 'Decline',
      
      // Inventory
      inventoryManagement: 'Inventory Management',
      searchProducts: 'Search products, SKU, or category...',
      product: 'Product',
      sku: 'SKU',
      stockOnHand: 'Stock on Hand',
      daysOfCover: 'Days of Cover',
      unitPrice: 'Unit Price',
      supplier: 'Supplier',
      status: 'Status',
      
      // Surplus
      surplusManagement: 'Surplus Management',
      createListing: 'Create Listing',
      
      // Settings
      settingsTitle: 'Settings',
      notifications: 'Notifications',
      preferences: 'Preferences',
      dangerZone: 'Danger Zone',
      saveSettings: 'Save Settings',
      
      // Common
      loading: 'Loading...',
      search: 'Search',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
    }
  },
  sv: {
    translation: {
      // Navigation
      dashboard: 'Instrumentpanel',
      inventory: 'Lager',
      surplus: 'Överskott',
      settings: 'Inställningar',
      logout: 'Logga ut',
      
      // Dashboard
      salesToday: 'Försäljning idag',
      salesThisWeek: 'Försäljning denna vecka',
      orders: 'beställningar',
      avg: 'snitt',
      aiSuggestions: 'AI-förslag',
      approve: 'Godkänn',
      decline: 'Avslå',
      
      // Inventory
      inventoryManagement: 'Lagerhantering',
      searchProducts: 'Sök produkter, SKU eller kategori...',
      product: 'Produkt',
      sku: 'SKU',
      stockOnHand: 'Lager i lager',
      daysOfCover: 'Dagars täckning',
      unitPrice: 'Enhetspris',
      supplier: 'Leverantör',
      status: 'Status',
      
      // Common
      loading: 'Laddar...',
      search: 'Sök',
      save: 'Spara',
      cancel: 'Avbryt',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;