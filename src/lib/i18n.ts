import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      sales: 'Sales',
      purchaseOrders: 'Purchase Orders',
      inventory: 'Inventory',
      suppliers: 'Suppliers',
      surplus: 'Surplus',
      aiHistory: 'AI History',
      reports: 'Reports',
      sustainability: 'Sustainability',
      compliance: 'Compliance',
      settings: 'Settings',
      logout: 'Logout',
      
      // Dashboard
      salesToday: 'Sales Today',
      salesThisWeek: 'Sales This Week',
      ordersCount: 'orders',
      avg: 'avg',
      aiSuggestions: 'AI Suggestions',
      approve: 'Approve',
      decline: 'Decline',
      
      // Orders
      ordersManagement: 'Orders Management',
      orderNumber: 'Order #',
      date: 'Date',
      total: 'Total',
      paymentMethod: 'Payment Method',
      orderDetails: 'Order Details',
      lineItems: 'Line Items',
      timeline: 'Timeline',
      quantity: 'Quantity',
      price: 'Price',
      
      // Purchase Orders
      purchaseOrdersManagement: 'Purchase Orders Management',
      createPO: 'Create PO',
      poNumber: 'PO #',
      created: 'Created',
      eta: 'ETA',
      selectSupplier: 'Select Supplier',
      selectProduct: 'Select Product',
      addItem: 'Add Item',
      submit: 'Submit',
      
      // Suppliers
      suppliersManagement: 'Suppliers Management',
      rating: 'Rating',
      categories: 'Categories',
      catalog: 'Catalog',
      packSize: 'Pack Size',
      moq: 'MOQ',
      
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
      productDetails: 'Product Details',
      history: 'History',
      pricing: 'Pricing',
      stockMovements: 'Stock Movements',
      
      // AI History
      aiHistoryManagement: 'AI History',
      suggestion: 'Suggestion',
      outcome: 'Outcome',
      impact: 'Impact',
      accepted: 'Accepted',
      rejected: 'Rejected',
      
      // Sustainability
      sustainabilityReport: 'Sustainability Report',
      wasteSaved: 'Waste Saved (kg)',
      co2Avoided: 'CO₂ Avoided (kg)',
      surplusTraded: 'Surplus Traded',
      
      // Compliance
      complianceDocuments: 'Compliance Documents',
      haccpLogs: 'HACCP Logs',
      allergenReports: 'Allergen Reports',
      uploadDocument: 'Upload Document',
      download: 'Download',
      
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
      welcome: 'Welcome back',
    }
  },
  sv: {
    translation: {
      // Navigation
      dashboard: 'Instrumentpanel',
      sales: 'Försäljning',
      purchaseOrders: 'Inköp',
      inventory: 'Lager',
      suppliers: 'Leverantörer',
      surplus: 'Överskott',
      aiHistory: 'AI-historik',
      reports: 'Rapporter',
      sustainability: 'Hållbarhet',
      compliance: 'Efterlevnad',
      settings: 'Inställningar',
      logout: 'Logga ut',
      
      // Dashboard
      salesToday: 'Försäljning idag',
      salesThisWeek: 'Försäljning denna vecka',
      ordersCount: 'beställningar',
      avg: 'snitt',
      yesterday: 'igår',
      lastWeek: 'förra veckan',
      aiSuggestions: 'AI-förslag',
      approve: 'Godkänn',
      decline: 'Avslå',
      
      // Orders
      ordersManagement: 'Beställningshantering',
      orderNumber: 'Beställning #',
      date: 'Datum',
      total: 'Totalt',
      paymentMethod: 'Betalningsmetod',
      orderDetails: 'Beställningsdetaljer',
      lineItems: 'Radartiklar',
      timeline: 'Tidslinje',
      quantity: 'Kvantitet',
      price: 'Pris',
      
      // Purchase Orders
      purchaseOrdersManagement: 'Inköpsorderhantering',
      poNumber: 'Inköpsorder #',
      created: 'Skapad',
      eta: 'Förväntad leverans',
      selectSupplier: 'Välj leverantör',
      selectProduct: 'Välj produkt',
      addItem: 'Lägg till artikel',
      submit: 'Skicka',
      
      // Suppliers
      suppliersManagement: 'Leverantörshantering',
      rating: 'Betyg',
      categories: 'Kategorier',
      catalog: 'Katalog',
      packSize: 'Förpackningsstorlek',
      moq: 'Minsta orderkvantitet',
      
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
      productDetails: 'Produktdetaljer',
      history: 'Historik',
      pricing: 'Prissättning',
      stockMovements: 'Lagerrörelser',
      
      // AI History
      aiHistoryManagement: 'AI-historik',
      suggestion: 'Förslag',
      outcome: 'Resultat',
      impact: 'Påverkan',
      accepted: 'Accepterat',
      rejected: 'Avvisat',
      
      // Sustainability
      sustainabilityReport: 'Hållbarhetsrapport',
      wasteSaved: 'Avfall sparat (kg)',
      co2Avoided: 'CO₂ undviket (kg)',
      surplusTraded: 'Överskott handlat',
      
      // Compliance
      complianceDocuments: 'Efterlevnadsdokument',
      haccpLogs: 'HACCP-loggar',
      allergenReports: 'Allergenrapporter',
      uploadDocument: 'Ladda upp dokument',
      download: 'Ladda ner',
      
      // Surplus
      surplusManagement: 'Överskottshantering',
      createListing: 'Skapa annons',
      
      // Settings
      settingsTitle: 'Inställningar',
      notifications: 'Notifikationer',
      preferences: 'Preferenser',
      dangerZone: 'Farozon',
      saveSettings: 'Spara inställningar',
      
      // Common
      loading: 'Laddar...',
      search: 'Sök',
      save: 'Spara',
      cancel: 'Avbryt',
      delete: 'Radera',
      edit: 'Redigera',
      view: 'Visa',
      welcome: 'Välkommen tillbaka',
      
      // Additional Settings Page
      managePreferences: 'Hantera dina butiksreferenser och kontoinställningar',
      slackUserId: 'Slack Användar-ID',
      slackPlaceholder: 'Ange ditt Slack användar-ID (t.ex. U1234567890)',
      slackDescription: 'Få AI-förslag och varningar skickade direkt till din Slack',
      preferredLanguage: 'Föredraget språk',
      languageDescription: 'Välj ditt föredragna språk för instrumentpanelsgränssnittet',
      saving: 'Sparar...',
      deleteStore: 'Ta bort butik',
      deleteStoreDescription: 'Ta bort din butik permanent och all tillhörande data. Denna åtgärd kan inte ångras.',
      areYouSure: 'Är du helt säker?',
      deleteConfirmation: 'Denna åtgärd kan inte ångras. Detta kommer permanent att radera din butik, ta bort all din data från våra servrar och avbryta alla aktiva prenumerationer. Alla lager-, försäljningsdata och AI-förslag kommer att gå förlorade för alltid.',
      yesDeleteStore: 'Ja, ta bort min butik',
      
      // Report Pages Additional
      trackEnvironmentalImpact: 'Spåra din miljöpåverkan och hållbarhetsmått',
      environmentalImpact: 'Miljöpåverkan',
      sustainabilityReportingSoon: 'Hållbarhetsrapportering kommer snart...',
      manageCompliance: 'Hantera HACCP-loggar, allergenrapporter och efterlevnadsdokumentation',
      complianceDocumentation: 'Efterlevnadsdokumentation',
      complianceManagementSoon: 'Efterlevnadshantering kommer snart...',
      
      // Purchase Orders Page Additional
      managePurchaseOrders: 'Hantera leverantörsinköpsorder och upphandling',
      createPO: 'Skapa IO',
      purchaseOrdersSoon: 'Hantering av inköpsorder kommer snart...',
      
      // Supplier Catalog Page Additional
      browseSuppliers: 'Bläddra och hantera ditt leverantörsnätverk',
      supplierCatalogSoon: 'Leverantörskatalog kommer snart...',
      
      // AI History Page Additional
      trackAISuggestions: 'Spåra AI-förslag och deras resultat',
      aiSuggestionHistory: 'AI-förslagshistorik',
      aiHistorySoon: 'AI-historikspårning kommer snart...',
      
      // Toast messages
      settingsSaved: 'Inställningar sparade',
      settingsSavedDescription: 'Dina preferenser har uppdaterats framgångsrikt.',
      error: 'Fel',
      saveSettingsError: 'Misslyckades att spara inställningar. Försök igen.',
      storeDeletionInitiated: 'Radering av butik initierad',
      storeDeletionDescription: 'Din begäran om radering av butik har skickats. Du kommer att få ett bekräftelsemail.',
      deleteStoreError: 'Misslyckades att ta bort butik. Kontakta support.',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'sv',
    fallbackLng: 'sv',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;