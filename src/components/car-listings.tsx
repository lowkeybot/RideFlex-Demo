import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Star, Users, Fuel, Cog, MapPin, Filter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CarListings() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  
  // Search criteria from URL parameters
  const [searchCriteria, setSearchCriteria] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: ''
  });

  // Load search parameters on component mount
  useEffect(() => {
    const criteria = {
      pickupLocation: searchParams.get('pickupLocation') || '',
      dropoffLocation: searchParams.get('dropoffLocation') || '',
      pickupDate: searchParams.get('pickupDate') || '',
      pickupTime: searchParams.get('pickupTime') || '',
      dropoffDate: searchParams.get('dropoffDate') || '',
      dropoffTime: searchParams.get('dropoffTime') || ''
    };
    setSearchCriteria(criteria);
  }, [searchParams]);

  const cars = [
    {
      id: 1,
      name: "Toyota Vios",
      category: "sedan",
      price: 1800,
      hourlyPrice: 120,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1658662160331-62f7e52e63de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NTc3MDc5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: {
        transmission: "Automatic",
        fuel: "Gasoline",
        seats: 5,
        luggage: 2
      },
      available: true,
      location: "Manila - BGC"
    },
    {
      id: 2,
      name: "Honda City",
      category: "sedan",
      price: 1900,
      hourlyPrice: 130,
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1658662160331-62f7e52e63de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NTc3MDc5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: {
        transmission: "CVT",
        fuel: "Gasoline",
        seats: 5,
        luggage: 2
      },
      available: true,
      location: "Manila - Makati"
    },
    {
      id: 3,
      name: "Honda CR-V",
      category: "suv",
      price: 3200,
      hourlyPrice: 220,
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1639280791656-5f8506ff21d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXJ8ZW58MXx8fHwxNzU3ODE5Mzk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: {
        transmission: "CVT",
        fuel: "Gasoline",
        seats: 7,
        luggage: 4
      },
      available: true,
      location: "Manila - BGC"
    },
    {
      id: 4,
      name: "Toyota Fortuner",
      category: "suv",
      price: 3800,
      hourlyPrice: 280,
      rating: 4.8,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1639280791656-5f8506ff21d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXJ8ZW58MXx8fHwxNzU3ODE5Mzk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: {
        transmission: "Automatic",
        fuel: "Diesel",
        seats: 7,
        luggage: 4
      },
      available: false,
      location: "Manila - Ortigas"
    },
    {
      id: 5,
      name: "Toyota Hiace",
      category: "van",
      price: 4500,
      hourlyPrice: 350,
      rating: 4.7,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1597244231257-e72375d34671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW4lMjB2ZWhpY2xlfGVufDF8fHx8MTc1NzgxOTQwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: {
        transmission: "Manual",
        fuel: "Diesel",
        seats: 15,
        luggage: 6
      },
      available: true,
      location: "Manila - Alabang"
    },
    {
      id: 6,
      name: "Nissan Urvan",
      category: "van",
      price: 4200,
      hourlyPrice: 320,
      rating: 4.6,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1597244231257-e72375d34671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW4lMjB2ZWhpY2xlfGVufDF8fHx8MTc1NzgxOTQwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specs: {
        transmission: "Manual",
        fuel: "Gasoline",
        seats: 12,
        luggage: 5
      },
      available: true,
      location: "Cebu City"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Cars', count: cars.length },
    { id: 'sedan', name: 'Sedan', count: cars.filter(c => c.category === 'sedan').length },
    { id: 'suv', name: 'SUV', count: cars.filter(c => c.category === 'suv').length },
    { id: 'van', name: 'Van', count: cars.filter(c => c.category === 'van').length }
  ];

  const filteredCars = cars.filter(car => {
    // Apply search criteria filtering
    if (searchCriteria.pickupLocation && !car.location.includes(searchCriteria.pickupLocation)) {
      return false;
    }
    
    // Category filtering
    if (selectedCategory !== 'all' && car.category !== selectedCategory) return false;
    
    // Price filtering
    if (priceFilter === 'under2000' && car.price >= 2000) return false;
    if (priceFilter === '2000-4000' && (car.price < 2000 || car.price > 4000)) return false;
    if (priceFilter === 'over4000' && car.price <= 4000) return false;
    
    return true;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews; // popular = most reviews
    }
  });

  return (
    <div className="min-h-screen bg-[rgba(255,100,20,1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-4 text-[rgba(255,255,255,1)] font-bold text-[36px]">Available Cars</h1>
          <p className="text-[rgba(255,255,255,1)] text-[20px]">Choose from our fleet of reliable vehicles</p>
          
          {/* Show search criteria if present */}
          {searchCriteria.pickupLocation && (
            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <h3 className="text-lg text-orange-800 mb-2">Search Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-orange-700">
                <div>
                  <span className="font-medium">Pickup:</span> {searchCriteria.pickupLocation}
                </div>
                {searchCriteria.pickupDate && (
                  <div>
                    <span className="font-medium">Date:</span> {searchCriteria.pickupDate} at {searchCriteria.pickupTime}
                  </div>
                )}
                {searchCriteria.dropoffDate && (
                  <div>
                    <span className="font-medium">Return:</span> {searchCriteria.dropoffDate} at {searchCriteria.dropoffTime}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span>Filters:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under2000">Under ₱2,000</SelectItem>
                  <SelectItem value="2000-4000">₱2,000 - ₱4,000</SelectItem>
                  <SelectItem value="over4000">Over ₱4,000</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-orange-500 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="ml-2">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Car Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedCars.map(car => (
                <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="h-48 relative bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                      <div className="text-6xl text-orange-400">🚗</div>
                      {!car.available && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <Badge variant="destructive">Not Available</Badge>
                        </div>
                      )}
                    </div>
                    <Badge className="absolute top-4 left-4 bg-orange-500 capitalize">
                      {car.category}
                    </Badge>
                    <div className="absolute bottom-4 right-4 bg-white rounded-full px-2 py-1 text-sm flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{car.rating}</span>
                      <span className="text-gray-500">({car.reviews})</span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl mb-2">{car.name}</h3>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{car.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Cog className="h-4 w-4" />
                        <span>{car.specs.transmission}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Fuel className="h-4 w-4" />
                        <span>{car.specs.fuel}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{car.specs.seats} seats</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>📦</span>
                        <span>{car.specs.luggage} bags</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="text-2xl text-orange-500">₱{car.price.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">/day</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg">₱{car.hourlyPrice}</div>
                          <div className="text-sm text-gray-600">/hour</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          asChild 
                          variant="outline" 
                          className="flex-1"
                          disabled={!car.available}
                        >
                          <Link to={`/cars/${car.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedCars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No cars found matching your filters.</p>
                <Button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceFilter('all');
                  }}
                  className="mt-4"
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}