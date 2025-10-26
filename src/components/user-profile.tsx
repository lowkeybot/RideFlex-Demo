import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { User, Phone, Mail, Upload, Calendar, Car, CreditCard, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfileProps {
  user: any;
}

export function UserProfile({ user }: UserProfileProps) {
  const [profileData, setProfileData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    zipCode: ''
  });

  const [idVerification, setIdVerification] = useState({
    licenseNumber: '',
    expiryDate: '',
    licenseImage: null,
    selfieImage: null
  });

  const bookingHistory = [
    {
      id: 'B001',
      car: 'Toyota Vios',
      date: '2024-12-01',
      duration: '2 days',
      cost: '₱3,600',
      status: 'completed',
      location: 'Manila - BGC'
    },
    {
      id: 'B002',
      car: 'Honda CR-V',
      date: '2024-11-15',
      duration: '5 hours',
      cost: '₱1,100',
      status: 'completed',
      location: 'Manila - Makati'
    },
    {
      id: 'B003',
      car: 'Toyota Hiace',
      date: '2024-11-28',
      duration: '1 day',
      cost: '₱4,500',
      status: 'upcoming',
      location: 'Manila - Alabang'
    }
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  const handleIdVerification = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idVerification.licenseNumber || !idVerification.expiryDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('ID verification submitted! We will review your documents within 24 hours.');
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setIdVerification({
      ...idVerification,
      [field]: file
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <User className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl mb-2">Please Sign In</h3>
            <p className="text-gray-600 text-center mb-6">
              You need to sign in to view your profile and booking history.
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="bg-orange-500 text-white text-2xl">
                    {user.name?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl mb-2">{user.name}</h3>
                <p className="text-gray-600 text-center mb-4">{user.email}</p>
                
                <div className="flex items-center space-x-2 mb-4">
                  {user.verified ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge className="bg-green-500">Verified</Badge>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <Badge variant="secondary">Pending Verification</Badge>
                    </>
                  )}
                </div>

                <div className="w-full space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Bookings:</span>
                    <span>3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Spent:</span>
                    <span>₱9,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Member Since:</span>
                    <span>Nov 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={profileData.city}
                            onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input
                            id="zipCode"
                            value={profileData.zipCode}
                            onChange={(e) => setProfileData({...profileData, zipCode: e.target.value})}
                          />
                        </div>
                      </div>

                      <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                        Update Profile
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="verification" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      ID Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user.verified ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl mb-2">Account Verified</h3>
                        <p className="text-gray-600">Your identity has been successfully verified.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleIdVerification} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="licenseNumber">Driver's License Number</Label>
                          <Input
                            id="licenseNumber"
                            value={idVerification.licenseNumber}
                            onChange={(e) => setIdVerification({...idVerification, licenseNumber: e.target.value})}
                            placeholder="Enter your license number"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">License Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            type="date"
                            value={idVerification.expiryDate}
                            onChange={(e) => setIdVerification({...idVerification, expiryDate: e.target.value})}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Upload Driver's License</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600 mb-2">
                              Click to upload your driver's license photo
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload('licenseImage', e.target.files?.[0] || null)}
                              className="hidden"
                              id="license-upload"
                            />
                            <Label htmlFor="license-upload" className="cursor-pointer">
                              <Button type="button" variant="outline" size="sm">
                                Browse Files
                              </Button>
                            </Label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Upload Selfie</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600 mb-2">
                              Take a clear selfie for identity verification
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload('selfieImage', e.target.files?.[0] || null)}
                              className="hidden"
                              id="selfie-upload"
                            />
                            <Label htmlFor="selfie-upload" className="cursor-pointer">
                              <Button type="button" variant="outline" size="sm">
                                Browse Files
                              </Button>
                            </Label>
                          </div>
                        </div>

                        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                          Submit for Verification
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Car className="h-5 w-5 mr-2" />
                      Booking History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bookingHistory.map(booking => (
                        <div key={booking.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="text-lg">{booking.car}</h4>
                              <p className="text-sm text-gray-600">{booking.location}</p>
                            </div>
                            <Badge 
                              className={booking.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}
                            >
                              {booking.status}
                            </Badge>
                          </div>
                          
                          <div className="grid md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Booking ID:</span>
                              <div>{booking.id}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Date:</span>
                              <div>{booking.date}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Duration:</span>
                              <div>{booking.duration}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Cost:</span>
                              <div className="text-orange-500">{booking.cost}</div>
                            </div>
                          </div>

                          <Separator className="my-3" />
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Receipt
                            </Button>
                            {booking.status === 'upcoming' && (
                              <Button variant="outline" size="sm">
                                Cancel Booking
                              </Button>
                            )}
                            {booking.status === 'completed' && (
                              <Button variant="outline" size="sm">
                                Book Again
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                              <CreditCard className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div>**** **** **** 1234</div>
                              <div className="text-sm text-gray-600">Expires 12/27</div>
                            </div>
                          </div>
                          <Badge>Primary</Badge>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        Add New Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {bookingHistory.filter(b => b.status === 'completed').map(booking => (
                        <div key={booking.id} className="flex justify-between items-center">
                          <div>
                            <div>{booking.car} - {booking.date}</div>
                            <div className="text-sm text-gray-600">{booking.id}</div>
                          </div>
                          <div className="text-right">
                            <div>{booking.cost}</div>
                            <div className="text-sm text-gray-600">Paid</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}