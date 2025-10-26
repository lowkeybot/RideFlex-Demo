import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Star, Users, Fuel, Cog, MapPin, Shield, Clock, Car, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AuthModal } from './auth-modal';

export function CarDetails({ user }: { user: any }) {
  const locations = [
    'Manila - BGC',
    'Manila - Makati',
    'Manila - Ortigas',
    'Manila - Alabang',
    'Cebu City',
    'Davao City'
  ];
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const navigate = useNavigate();
  // Track if booking is completed
  const [isBooked, setIsBooked] = useState(false);
  const { id } = useParams();
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [pickupTime, setPickupTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const timeOptions = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  // Function to check if a date should be disabled
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Function to check if return date should be disabled
  const isReturnDateDisabled = (date: Date) => {
    if (isDateDisabled(date)) return true;
    if (!pickupDate) return true;
    
    const pickup = new Date(pickupDate);
    pickup.setHours(0, 0, 0, 0);
    const returnCheck = new Date(date);
    returnCheck.setHours(0, 0, 0, 0);
    
    return returnCheck < pickup;
  };

  // Function to handle pickup date selection
  const handlePickupDateSelect = (date: Date | undefined) => {
    setPickupDate(date);
    // Reset return date if it's before the new pickup date
    if (date && returnDate && returnDate < date) {
      setReturnDate(undefined);
    }
    if (date && !returnDate) {
      setShowReturnCalendar(true);
    }
  };

  // Function to calculate rental duration
  const calculateDuration = () => {
    if (!pickupDate || !returnDate) return null;
    
    const diffTime = Math.abs(returnDate.getTime() - pickupDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Function to calculate total price
  const calculateTotalPrice = () => {
    const duration = calculateDuration();
    if (!duration) return 0;
    
    return car.price * duration;
  };

  // Mock car data - in real app this would come from API
  const car = {
    id: 1,
    name: "Toyota Vios",
    category: "sedan",
    price: 1800,
    hourlyPrice: 120,
    rating: 4.8,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1658662160331-62f7e52e63de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NTc3MDc5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1658662160331-62f7e52e63de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NTc3MDc5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    specs: {
      transmission: "Automatic",
      fuel: "Gasoline",
      seats: 5,
      luggage: 2,
      year: 2023,
      engine: "1.3L",
      fuelEconomy: "18 km/L"
    },
    available: true,
    location: "Manila - BGC",
    description: "Perfect for city driving and small trips. This reliable Toyota Vios offers excellent fuel economy and comfortable seating for up to 5 passengers.",
    features: [
      "Air Conditioning", "Power Steering", "Power Windows", "Central Locking",
      "ABS Brakes", "Airbags", "Audio System", "USB Charging Ports"
    ],
    extraFees: [
      { name: "Professional Driver", price: 800, unit: "day", description: "Experienced driver included" },
      { name: "Delivery Service", price: 500, unit: "trip", description: "Car delivered to your location" },
      { name: "Baby Car Seat", price: 200, unit: "day", description: "Child safety seat" },
      { name: "GPS Navigation", price: 150, unit: "day", description: "Garmin GPS device" }
    ]
  };

  const reviews = [
    {
      id: 1,
      user: "Maria Santos",
      rating: 5,
      date: "2024-12-01",
      comment: "Excellent car! Very clean and fuel efficient. Perfect for our weekend trip to Tagaytay."
    },
    {
      id: 2,
      user: "John Dela Cruz", 
      rating: 5,
      date: "2024-11-28",
      comment: "Great service. The car was in perfect condition and the booking process was so easy."
    },
    {
      id: 3,
      user: "Anna Reyes",
      rating: 4,
      date: "2024-11-25", 
      comment: "Good car for city driving. Minor issue with the air conditioning but overall satisfied."
    },
    {
      id: 4,
      user: "Carlos Mendoza",
      rating: 5,
      date: "2024-11-22",
      comment: "Highly recommend! Very reliable and the hourly rental option is perfect for quick errands."
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isUserLoggedIn = () => {
    // Example: check for a token in localStorage
    return !!localStorage.getItem('userToken');
  };

  return (
    <div className="min-h-screen bg-[rgba(255,101,0,1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/cars" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-bold text-[20px]">Back to Cars</span>
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Car Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative h-80 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center rounded-t-lg">
                  <div className="text-8xl text-orange-400">🚗</div>
                  <Badge className="absolute top-4 left-4 bg-orange-500 capitalize">
                    {car.category}
                  </Badge>
                  <div className="absolute bottom-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{car.rating}</span>
                    <span className="text-gray-500">({car.reviews} reviews)</span>
                  </div>
                </div>
                <div className="flex gap-2 p-4 justify-center">
                  <div className="w-20 h-16 rounded-lg border-2 border-orange-500 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <div className="text-2xl text-orange-400">🚗</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Car Information Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Car Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Cog className="h-5 w-5 text-orange-500" />
                        <div>
                          <div className="text-sm text-gray-600">Transmission</div>
                          <div>{car.specs.transmission}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Fuel className="h-5 w-5 text-orange-500" />
                        <div>
                          <div className="text-sm text-gray-600">Fuel Type</div>
                          <div>{car.specs.fuel}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-orange-500" />
                        <div>
                          <div className="text-sm text-gray-600">Seating</div>
                          <div>{car.specs.seats} passengers</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Car className="h-5 w-5 text-orange-500" />
                        <div>
                          <div className="text-sm text-gray-600">Engine</div>
                          <div>{car.specs.engine}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-orange-500">📦</span>
                        <div>
                          <div className="text-sm text-gray-600">Luggage</div>
                          <div>{car.specs.luggage} large bags</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-orange-500">⛽</span>
                        <div>
                          <div className="text-sm text-gray-600">Fuel Economy</div>
                          <div>{car.specs.fuelEconomy}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{car.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features">
                <Card>
                  <CardHeader>
                    <CardTitle>Included Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {car.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map(review => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarFallback>{review.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4>{review.user}</h4>
                                <div className="flex items-center space-x-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating 
                                          ? 'fill-yellow-400 text-yellow-400' 
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-700 mb-2">{review.comment}</p>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{car.name}</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Available
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{car.location}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pickup & Drop-off Locations */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Pickup Location
                      </Label>
                      <Select value={pickupLocation} onValueChange={setPickupLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pickup location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map(location => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Drop-off Location
                      </Label>
                      <Select value={dropoffLocation} onValueChange={setDropoffLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select drop-off location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map(location => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* Pricing */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl text-orange-500">₱{car.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">per day</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg">₱{car.hourlyPrice}</div>
                        <div className="text-sm text-gray-600">per hour</div>
                      </div>
                    </div>
                  </div>

                  {/* Calendar */}
                  <div>
                    <h4 className="mb-3 flex items-center">Pickup Date</h4>
                    {isBooked ? (
                      <input
                        type="text"
                        value={pickupDate ? pickupDate.toLocaleDateString() : ''}
                        readOnly
                        className="w-full bg-gray-100 cursor-not-allowed p-2 rounded"
                      />
                    ) : (
                      <>
                        <Calendar
                          mode="single"
                          selected={pickupDate}
                          onSelect={handlePickupDateSelect}
                          disabled={isDateDisabled}
                          className="rounded-md border"
                        />
                        {pickupDate && (
                          <div className="mt-2 p-2 bg-orange-50 rounded text-sm text-orange-700">
                            Pickup: {pickupDate.toLocaleDateString()}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Return Calendar */}
                  {pickupDate && (
                    <div>
                      <h4 className="mb-3 flex items-center">Return Date</h4>
                      {isBooked ? (
                        <input
                          type="text"
                          value={returnDate ? returnDate.toLocaleDateString() : ''}
                          readOnly
                          className="w-full bg-gray-100 cursor-not-allowed p-2 rounded"
                        />
                      ) : (
                        <>
                          <Calendar
                            mode="single"
                            selected={returnDate}
                            onSelect={setReturnDate}
                            disabled={isReturnDateDisabled}
                            className="rounded-md border"
                          />
                          {returnDate && (
                            <div className="mt-2 p-2 bg-orange-50 rounded text-sm text-orange-700">
                              Return: {returnDate.toLocaleDateString()}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* Duration and Total Price */}
                  {pickupDate && returnDate && (
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-orange-700">Duration:</span>
                        <span className="text-sm text-orange-800 font-medium">
                          {calculateDuration()} {calculateDuration() === 1 ? 'day' : 'days'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-orange-700">Total Price:</span>
                        <span className="text-lg text-orange-600 font-bold">
                          ₱{calculateTotalPrice().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Time Selection */}
                  {pickupDate && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm mb-2 block">Pickup Time</Label>
                        {isBooked ? (
                          <input
                            type="text"
                            value={pickupTime}
                            readOnly
                            className="w-full bg-gray-100 cursor-not-allowed p-2 rounded"
                          />
                        ) : (
                          <Select value={pickupTime} onValueChange={setPickupTime}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pickup time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeOptions.map(time => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                      {returnDate && (
                        <div>
                          <Label className="text-sm mb-2 block">Return Time</Label>
                          {isBooked ? (
                            <input
                              type="text"
                              value={returnTime}
                              readOnly
                              className="w-full bg-gray-100 cursor-not-allowed p-2 rounded"
                            />
                          ) : (
                            <Select value={returnTime} onValueChange={setReturnTime}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select return time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map(time => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Extra Services */}
                  <div>
                    <h4 className="mb-3">Optional Add-ons</h4>
                    <div className="space-y-3">
                      {car.extraFees.map((fee, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <div className="text-sm">{fee.name}</div>
                            <div className="text-xs text-gray-600">{fee.description}</div>
                          </div>
                          <div className="text-sm">₱{fee.price}/{fee.unit}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    size="lg"
                    onClick={() => {
                      if (!isUserLoggedIn()) {
                        setShowAuthModal(true);
                        return;
                      }
                      // Store booking details in localStorage before navigating
                      localStorage.setItem('bookingData', JSON.stringify({
                        pickupLocation,
                        dropoffLocation,
                        pickupDate: pickupDate ? pickupDate.toISOString().slice(0, 10) : '',
                        pickupTime,
                        dropoffDate: returnDate ? returnDate.toISOString().slice(0, 10) : '',
                        dropoffTime: returnTime,
                        rentalType: 'daily'
                      }));
                      navigate(`/booking/${id}`);
                    }}
                  >
                    <Clock className="h-5 w-5 mr-2" />
                    Book This Car
                  </Button>
                  {showAuthModal && (
                    <AuthModal
                      isOpen={showAuthModal}
                      onClose={() => setShowAuthModal(false)}
                      onLogin={user => {
                        localStorage.setItem('userToken', user.email);
                        setShowAuthModal(false);
                      }}
                    />
                  )}

                  <div className="text-xs text-gray-500 text-center">
                    Free cancellation up to 24 hours before pickup
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}