import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Car, Users, DollarSign, Calendar, Plus, Edit, Trash2, 
  BarChart3, TrendingUp, MapPin, Settings 
} from 'lucide-react';
import { toast } from 'sonner';

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  
  const [newCar, setNewCar] = useState({
    name: '',
    category: '',
    price: '',
    hourlyPrice: '',
    location: '',
    specs: {
      transmission: '',
      fuel: '',
      seats: '',
      luggage: ''
    }
  });

  // Mock data
  const stats = {
    totalCars: 25,
    activeBookings: 12,
    revenue: 156750,
    customers: 89
  };

  const cars = [
    {
      id: 1,
      name: "Toyota Vios",
      category: "sedan",
      price: 1800,
      hourlyPrice: 120,
      location: "Manila - BGC",
      status: "available",
      bookings: 23
    },
    {
      id: 2,
      name: "Honda CR-V",
      category: "suv",
      price: 3200,
      hourlyPrice: 220,
      location: "Manila - Makati",
      status: "rented",
      bookings: 18
    },
    {
      id: 3,
      name: "Toyota Hiace",
      category: "van",
      price: 4500,
      hourlyPrice: 350,
      location: "Manila - Alabang",
      status: "maintenance",
      bookings: 15
    }
  ];

  const bookings = [
    {
      id: 'B001',
      customer: 'Maria Santos',
      car: 'Toyota Vios',
      date: '2024-12-15',
      duration: '2 days',
      amount: '₱3,600',
      status: 'active'
    },
    {
      id: 'B002',
      customer: 'John Dela Cruz',
      car: 'Honda CR-V',
      date: '2024-12-14',
      duration: '5 hours',
      amount: '₱1,100',
      status: 'completed'
    },
    {
      id: 'B003',
      customer: 'Anna Reyes',
      car: 'Toyota Hiace',
      date: '2024-12-16',
      duration: '1 day',
      amount: '₱4,500',
      status: 'upcoming'
    }
  ];

  const customers = [
    {
      id: 1,
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '+63 912 345 6789',
      totalBookings: 5,
      totalSpent: '₱18,500',
      verified: true
    },
    {
      id: 2,
      name: 'John Dela Cruz',
      email: 'john@email.com',
      phone: '+63 923 456 7890',
      totalBookings: 3,
      totalSpent: '₱12,200',
      verified: true
    },
    {
      id: 3,
      name: 'Anna Reyes',
      email: 'anna@email.com',
      phone: '+63 934 567 8901',
      totalBookings: 2,
      totalSpent: '₱8,800',
      verified: false
    }
  ];

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCar.name || !newCar.category || !newCar.price || !newCar.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Car added successfully!');
    setIsAddCarModalOpen(false);
    setNewCar({
      name: '',
      category: '',
      price: '',
      hourlyPrice: '',
      location: '',
      specs: { transmission: '', fuel: '', seats: '', luggage: '' }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'rented': return 'bg-blue-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'upcoming': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your car rental business</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cars">Cars</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="flex items-center p-6">
                  <Car className="h-8 w-8 text-orange-500 mr-4" />
                  <div>
                    <p className="text-sm text-gray-600">Total Cars</p>
                    <p className="text-2xl">{stats.totalCars}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <Calendar className="h-8 w-8 text-blue-500 mr-4" />
                  <div>
                    <p className="text-sm text-gray-600">Active Bookings</p>
                    <p className="text-2xl">{stats.activeBookings}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <DollarSign className="h-8 w-8 text-green-500 mr-4" />
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl">₱{stats.revenue.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <Users className="h-8 w-8 text-purple-500 mr-4" />
                  <div>
                    <p className="text-sm text-gray-600">Total Customers</p>
                    <p className="text-2xl">{stats.customers}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Revenue Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                      <p className="text-gray-600">Revenue chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map(booking => (
                      <div key={booking.id} className="flex justify-between items-center">
                        <div>
                          <p>{booking.customer}</p>
                          <p className="text-sm text-gray-600">{booking.car}</p>
                        </div>
                        <div className="text-right">
                          <p>{booking.amount}</p>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cars" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Car Fleet Management</h2>
              <Dialog open={isAddCarModalOpen} onOpenChange={setIsAddCarModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Car
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Car</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddCar} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="car-name">Car Name</Label>
                      <Input
                        id="car-name"
                        value={newCar.name}
                        onChange={(e) => setNewCar({...newCar, name: e.target.value})}
                        placeholder="e.g., Toyota Vios"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="car-category">Category</Label>
                      <Select value={newCar.category} onValueChange={(value: string) => setNewCar({...newCar, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="daily-price">Daily Price (₱)</Label>
                        <Input
                          id="daily-price"
                          type="number"
                          value={newCar.price}
                          onChange={(e) => setNewCar({...newCar, price: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hourly-price">Hourly Price (₱)</Label>
                        <Input
                          id="hourly-price"
                          type="number"
                          value={newCar.hourlyPrice}
                          onChange={(e) => setNewCar({...newCar, hourlyPrice: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Select value={newCar.location} onValueChange={(value: string) => setNewCar({...newCar, location: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Manila - BGC">Manila - BGC</SelectItem>
                          <SelectItem value="Manila - Makati">Manila - Makati</SelectItem>
                          <SelectItem value="Manila - Ortigas">Manila - Ortigas</SelectItem>
                          <SelectItem value="Manila - Alabang">Manila - Alabang</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                      Add Car
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Car</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Daily Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cars.map(car => (
                      <TableRow key={car.id}>
                        <TableCell>{car.name}</TableCell>
                        <TableCell className="capitalize">{car.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {car.location}
                          </div>
                        </TableCell>
                        <TableCell>₱{car.price.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(car.status)}>
                            {car.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{car.bookings}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <h2 className="text-2xl">Booking Management</h2>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Car</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map(booking => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{booking.customer}</TableCell>
                        <TableCell>{booking.car}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.duration}</TableCell>
                        <TableCell>{booking.amount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <h2 className="text-2xl">Customer Database</h2>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Total Bookings</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Verified</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map(customer => (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.totalBookings}</TableCell>
                        <TableCell>{customer.totalSpent}</TableCell>
                        <TableCell>
                          <Badge className={customer.verified ? 'bg-green-500' : 'bg-yellow-500'}>
                            {customer.verified ? 'Verified' : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl">Settings</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Business Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Business Name</Label>
                    <Input defaultValue="Rideflex Car Rental" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Email</Label>
                    <Input defaultValue="support@rideflex.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Phone</Label>
                    <Input defaultValue="+63 912 345 6789" />
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Base Service Fee (%)</Label>
                    <Input type="number" defaultValue="10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Delivery Fee (₱)</Label>
                    <Input type="number" defaultValue="500" />
                  </div>
                  <div className="space-y-2">
                    <Label>Late Return Fee (₱/hour)</Label>
                    <Input type="number" defaultValue="200" />
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Update Pricing
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}