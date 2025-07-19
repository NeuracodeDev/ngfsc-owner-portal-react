import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
import { useSuppliers, Supplier } from '@/hooks/useSuppliers';
import { Search, Star, MapPin, Mail, Phone, Package, CheckCircle, XCircle, Users } from 'lucide-react';

const SupplierCatalogPage = () => {
  const { t } = useTranslation();
  const { suppliers, loading } = useSuppliers();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Get unique categories
  const allCategories = suppliers.flatMap(supplier => supplier.categories);
  const uniqueCategories = Array.from(new Set(allCategories));

  // Filter suppliers
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         supplier.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || supplier.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const SupplierCard = ({ supplier }: { supplier: Supplier }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 border border-gray-200 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {supplier.logo && (
              <img 
                src={supplier.logo} 
                alt={supplier.name}
                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
              />
            )}
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {supplier.name}
              </CardTitle>
              <div className="flex items-center space-x-1 mt-1">
                {renderStars(supplier.rating)}
                <span className="text-sm text-gray-600 ml-1">({supplier.rating})</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {supplier.catalog.length} {supplier.catalog.length === 1 ? 'produkt' : 'produkter'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Location */}
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          {supplier.location}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {supplier.categories.map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>

        {/* Certifications */}
        {supplier.certifications.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Certifieringar:</div>
            <div className="flex flex-wrap gap-1">
              {supplier.certifications.map((cert) => (
                <Badge key={cert} className="text-xs bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Sample Products */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Exempel på produkter:</div>
          <div className="space-y-1">
            {supplier.catalog.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Package className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-700">{product.name}</span>
                  {product.inStock ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : (
                    <XCircle className="w-3 h-3 text-red-500" />
                  )}
                </div>
                <span className="text-gray-600">${product.unitPrice}</span>
              </div>
            ))}
            {supplier.catalog.length > 3 && (
              <div className="text-xs text-gray-500">
                +{supplier.catalog.length - 3} fler produkter
              </div>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="pt-4 border-t border-gray-100 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            {supplier.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2 text-gray-400" />
            {supplier.phone}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Visa katalog
          </Button>
          <Button size="sm" className="flex-1">
            Begär offert
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl p-6 space-y-6 animate-fade-in">
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900">Leverantörs Katalog</h1>
          <p className="text-gray-600 mt-2">
            Hitta och jämför leverantörer för dina inköpsbehov
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Sök leverantörer, kategorier eller platser..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('')}
            >
              Alla kategorier
            </Button>
            {uniqueCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {loading ? 'Laddar leverantörer...' : `${filteredSuppliers.length} leverantörer hittade`}
          </div>
        </div>

        {/* Suppliers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 flex-1" />
                    <Skeleton className="h-8 flex-1" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredSuppliers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Inga leverantörer hittade</h3>
            <p className="text-gray-600">Försök med andra söktermer eller filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierCatalogPage;