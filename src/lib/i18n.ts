import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      orders: 'Orders',
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
      orders: 'Beställningar',
      purchaseOrders: 'Inköpsorder',
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
      createPO: 'Skapa inköpsorder',
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