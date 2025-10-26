import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Calendar, Clock, MapPin, CreditCard, Smartphone, Building, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export function BookingCheckout() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  // Get booking details from localStorage (set in car-details before navigating)
  const initialBookingData = (() => {
    try {
      const data = localStorage.getItem('bookingData');
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  })();

  const [bookingData, setBookingData] = useState({
    pickupLocation: initialBookingData.pickupLocation || '',
    dropoffLocation: initialBookingData.dropoffLocation || '',
    pickupDate: initialBookingData.pickupDate || '',
    pickupTime: initialBookingData.pickupTime || '',
    dropoffDate: initialBookingData.dropoffDate || '',
    dropoffTime: initialBookingData.dropoffTime || '',
    addOns: [],
    paymentMethod: ''
  });

  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);

  // Mock car data
  const car = {
    id: 1,
    name: "Toyota Vios",
    category: "sedan",
    price: 1800,
    hourlyPrice: 120,
    location: "Manila - BGC",
    image: "https://images.unsplash.com/photo-1658662160331-62f7e52e63de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NTc3MDc5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  };

  const addOns = [
    { id: 1, name: "Professional Driver", price: 800, unit: "day", description: "Experienced driver included" },
    { id: 2, name: "Delivery Service", price: 500, unit: "trip", description: "Car delivered to your location" },
    { id: 3, name: "Baby Car Seat", price: 200, unit: "day", description: "Child safety seat" },
    { id: 4, name: "GPS Navigation", price: 150, unit: "day", description: "Garmin GPS device" }
  ];

  const locations = [
    'Manila - BGC',
    'Manila - Makati', 
    'Manila - Ortigas',
    'Manila - Alabang',
    'Cebu City',
    'Davao City'
  ];

  const timeOptions = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const paymentMethods = [
    { id: 'gcash', name: 'GCash', icon: <Smartphone className="h-5 w-5" /> },
    { id: 'paymaya', name: 'PayMaya', icon: <Smartphone className="h-5 w-5" /> },
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'bank', name: 'Bank Transfer', icon: <Building className="h-5 w-5" /> }
  ];

  const handleAddOnChange = (addOnId: number, checked: boolean) => {
    setSelectedAddOns(prev => 
      checked 
        ? [...prev, addOnId]
        : prev.filter(id => id !== addOnId)
    );
  };

  const calculateRentalCost = () => {
    if (!bookingData.pickupDate || !bookingData.dropoffDate || !bookingData.pickupTime || !bookingData.dropoffTime) return 0;
    const pickup = new Date(`${bookingData.pickupDate}T${bookingData.pickupTime}`);
    const dropoff = new Date(`${bookingData.dropoffDate}T${bookingData.dropoffTime}`);
    if (isNaN(pickup.getTime()) || isNaN(dropoff.getTime())) return 0;
    const diffMs = dropoff.getTime() - pickup.getTime();
    if (diffMs <= 0) return 0;
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const cost = days * car.price;
    return isNaN(cost) || cost < 0 ? 0 : cost;
  };

  const calculateAddOnsCost = () => {
    const days = bookingData.pickupDate && bookingData.dropoffDate ? 
      Math.ceil((new Date(bookingData.dropoffDate).getTime() - new Date(bookingData.pickupDate).getTime()) / (1000 * 60 * 60 * 24)) : 1;
    const validDays = isNaN(days) || days < 0 ? 1 : days;
    return selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      if (!addOn) return total;
      if (addOn.unit === 'trip') {
        return total + addOn.price;
      } else {
        return total + (addOn.price * validDays);
      }
    }, 0);
  };

  const rentalCost = calculateRentalCost();
  const addOnsCost = calculateAddOnsCost();
  const subtotal = isNaN(rentalCost + addOnsCost) || (rentalCost + addOnsCost) < 0 ? 0 : rentalCost + addOnsCost;
  const tax = isNaN(subtotal) || subtotal < 0 ? 0 : subtotal * 0.12; // 12% VAT
  const total = isNaN(subtotal + tax) || subtotal + tax < 0 ? 0 : subtotal + tax;

  const handleBooking = () => {
    if (!bookingData.pickupLocation || !bookingData.dropoffLocation || 
        !bookingData.pickupDate || !bookingData.pickupTime ||
        !bookingData.dropoffDate || !bookingData.dropoffTime ||
        !bookingData.paymentMethod) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Booking confirmed! You will receive a confirmation email shortly.');
    }, 1000); // Simulate 1s delay
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData(prev => ({ ...prev, paymentMethod: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to={`/cars/${id}`} className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Car Details</span>
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Pickup Location
                    </Label>
                    <Input 
                      type="text"
                      value={bookingData.pickupLocation}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Drop-off Location
                    </Label>
                    <Input 
                      type="text"
                      value={bookingData.dropoffLocation}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Pickup Date
                    </Label>
                    <Input 
                      type="text"
                      value={bookingData.pickupDate}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Pickup Time
                    </Label>
                    <Input 
                      type="text"
                      value={bookingData.pickupTime}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Drop-off Date & Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Drop-off Date
                    </Label>
                    <Input 
                      type="text"
                      value={bookingData.dropoffDate}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Drop-off Time
                    </Label>
                    <Input 
                      type="text"
                      value={bookingData.dropoffTime}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card>
              <CardHeader>
                <CardTitle>Optional Add-ons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {addOns.map(addOn => (
                    <div key={addOn.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`addon-${addOn.id}`}
                          checked={selectedAddOns.includes(addOn.id)}
                          onCheckedChange={(checked: boolean) => handleAddOnChange(addOn.id, checked)}
                        />
                        <div>
                          <Label htmlFor={`addon-${addOn.id}`} className="cursor-pointer">
                            {addOn.name}
                          </Label>
                          <p className="text-sm text-gray-600">{addOn.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div>₱{addOn.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">per {addOn.unit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {paymentMethods.map(method => (
                    <label key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={bookingData.paymentMethod === method.id}
                        onChange={handlePaymentMethodChange}
                        className="text-orange-500"
                      />
                      {method.icon}
                      <span>{method.name}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Car Info */}
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <div className="w-16 h-12 bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4>{car.name}</h4>
                      <p className="text-sm text-gray-600">{car.location}</p>
                    </div>
                  </div>

                  {/* Rental Details */}
                  {bookingData.pickupDate && bookingData.dropoffDate && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Pickup:</span>
                        <span>{bookingData.pickupDate} at {bookingData.pickupTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Drop-off:</span>
                        <span>{bookingData.dropoffDate} at {bookingData.dropoffTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>
                          {`${Math.ceil((new Date(bookingData.dropoffDate).getTime() - new Date(bookingData.pickupDate).getTime()) / (1000 * 60 * 60 * 24))} days`}
                        </span>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Cost Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Car Rental</span>
                      <span>₱{rentalCost.toLocaleString()}</span>
                    </div>
                    
                    {selectedAddOns.length > 0 && (
                      <>
                        {selectedAddOns.map(addOnId => {
                          const addOn = addOns.find(a => a.id === addOnId);
                          if (!addOn) return null;
                          
                          const days = bookingData.pickupDate && bookingData.dropoffDate ? 
                            Math.ceil((new Date(bookingData.dropoffDate).getTime() - new Date(bookingData.pickupDate).getTime()) / (1000 * 60 * 60 * 24)) : 1;
                          
                          const cost = addOn.unit === 'trip' ? addOn.price : addOn.price * days;
                          
                          return (
                            <div key={addOn.id} className="flex justify-between text-gray-600">
                              <span>{addOn.name}</span>
                              <span>₱{cost.toLocaleString()}</span>
                            </div>
                          );
                        })}
                      </>
                    )}

                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₱{subtotal.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>VAT (12%)</span>
                      <span>₱{tax.toLocaleString()}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg">
                    <span>Total</span>
                    <span className="text-orange-500">₱{total.toLocaleString()}</span>
                  </div>

                  <Button 
                    onClick={handleBooking}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      'Confirm Booking'
                    )}
                  </Button>

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