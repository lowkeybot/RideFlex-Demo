import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { SearchForm } from './search-form';
import { Calendar, MapPin, Clock, Star, Shield, Phone, Search, CheckCircle, Car, RotateCcw, MessageCircle, Mail, HelpCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Homepage() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: ''
  });

  const handleSearch = () => {
    // Validate required fields
    if (!searchData.pickupLocation || !searchData.pickupDate || !searchData.pickupTime) {
      alert('Please select pickup location, date, and time to search for cars.');
      return;
    }

    // Create search parameters
    const searchParams = new URLSearchParams();
    Object.entries(searchData).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, value);
      }
    });

    // Navigate to car listings with search parameters
    navigate(`/cars?${searchParams.toString()}`);
  };

  const howItWorksSteps = [
    {
      icon: Search,
      title: "Search & Compare",
      description: "Browse our fleet, compare prices, and choose the perfect car for your needs",
      details: "Filter by location, car type, and rental duration"
    },
    {
      icon: CheckCircle,
      title: "Book & Verify",
      description: "Complete your booking and verify your driver's license instantly",
      details: "Secure payment with multiple Philippine payment options"
    },
    {
      icon: Car,
      title: "Pickup & Drive",
      description: "Collect your car from the designated location and start your journey",
      details: "Use our app for keyless entry and vehicle inspection"
    },
    {
      icon: RotateCcw,
      title: "Return & Go",
      description: "Return the car to any approved location and end your rental",
      details: "Automatic billing and digital receipt sent instantly"
    }
  ];

  const supportOptions = [
    {
      icon: Phone,
      title: "24/7 Phone Support",
      description: "Call us anytime for immediate assistance",
      contact: "+63 2 8123 4567",
      available: "Available 24/7"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team instantly",
      contact: "Available in app and website",
      available: "7 AM - 11 PM Daily"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions and get detailed responses",
      contact: "support@rideflex.ph",
      available: "Response within 2 hours"
    },
    {
      icon: HelpCircle,
      title: "Help Center",
      description: "Find answers to common questions and guides",
      contact: "Comprehensive FAQ and tutorials",
      available: "Available anytime"
    }
  ];

  const featuredCars = [
    {
      id: 1,
      name: "Toyota Vios",
      category: "Sedan",
      price: "₱1,800",
      rating: 4.8,
      image: "sedan car",
      features: ["Automatic", "5 Seats", "AC"]
    },
    {
      id: 2,
      name: "Honda CR-V",
      category: "SUV",
      price: "₱3,200",
      rating: 4.9,
      image: "suv car",
      features: ["Automatic", "7 Seats", "4WD"]
    },
    {
      id: 3,
      name: "Toyota Hiace",
      category: "Van",
      price: "₱4,500",
      rating: 4.7,
      image: "van vehicle",
      features: ["Manual", "15 Seats", "AC"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl mb-6 font-bold">
                Your Perfect Ride, <span className="text-yellow-300">Anytime</span>
              </h1>
              <p className="text-xl mb-8 text-orange-100">
                Flexible car rentals by the hour or day. No long queues, no paperwork. 
                Just book, unlock, and drive with Rideflex.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Hourly & Daily Rentals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Multiple Pickup Locations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Fully Insured</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                  Start Booking
                </Button>
                <Button size="lg" variant="outline" className="border-white text-[rgba(254,102,0,1)] hover:bg-white hover:text-gray-100 bg-[rgba(255,255,255,1)]">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <h3 className="text-2xl text-gray-800 mb-6">Find Your Car</h3>
                <SearchForm 
                  searchData={searchData}
                  onSearchDataChange={setSearchData}
                  onSearch={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Detailed */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-foreground font-bold">How Rideflex Works</h2>
            <p className="text-xl text-muted-foreground">Rent a car in 4 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-white border">
                  <CardContent className="bg-[rgba(255,128,0,1)] rounded-[14px] px-[30px] py-[24px]">
                    <div className="bg-[rgba(255,255,255,0)] text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-sm inline-block mb-4">
                      Step {index + 1}
                    </div>
                    <h3 className="text-xl mb-3 text-gray-900 font-bold text-[24px]">{step.title}</h3>
                    <p className="text-[rgba(255,255,255,1)] mb-3">{step.description}</p>
                    <p className="text-sm text-[rgba(255,255,255,1)]">{step.details}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-[rgba(245,107,0,1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4 text-[36px] font-bold text-[rgba(255,255,255,1)]">Popular Cars</h2>
            <p className="text-[rgba(250,250,250,1)] text-[20px]">Choose from our fleet of well-maintained vehicles</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <div className="text-6xl text-orange-400">🚗</div>
                  <Badge className="absolute top-4 left-4 bg-orange-500">{car.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl">{car.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{car.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl text-orange-500">{car.price}</span>
                      <span className="text-gray-600">/day</span>
                    </div>
                    <Button asChild className="bg-orange-500 hover:bg-orange-600">
                      <Link to={`/cars/${car.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-orange-500 text-orange-500">
              <Link to="/cars">View All Cars</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900 font-bold">We're Here to Help</h2>
            <p className="text-xl text-gray-600">Get support whenever you need it, however you prefer</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-2 hover:border-orange-200">
                  <CardContent className="p-6">
                    <div className="bg-orange-100 text-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg mb-2 text-gray-900">{option.title}</h3>
                    <p className="text-gray-600 mb-3 text-sm">{option.description}</p>
                    <p className="text-orange-500 mb-2 text-sm">{option.contact}</p>
                    <Badge variant="secondary" className="text-xs bg-orange-50 text-orange-600">
                      {option.available}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-orange-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl mb-4 text-gray-900">Need Emergency Assistance?</h3>
              <p className="text-gray-600 mb-6">
                For roadside assistance, accidents, or urgent matters, call our emergency hotline immediately.
              </p>
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white">
                <Phone className="h-5 w-5 mr-2" />
                Emergency: +63 917 123 4567
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-orange-100">
            Join thousands of satisfied customers who choose Rideflex for their transportation needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 text-white hover:bg-orange-700" onClick={() => window.dispatchEvent(new CustomEvent('open-signup-modal'))}>
              Get Started
            </Button>
            <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
              <Link to="/cars">Browse Cars Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-orange-500 hover:bg-white hover:text-orange-500">
              <Phone className="h-5 w-5 mr-2" />
              <Link to="/support">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}