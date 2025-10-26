import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Calendar, Clock, Search } from 'lucide-react';

interface SearchFormProps {
  searchData: {
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
    pickupTime: string;
    dropoffDate: string;
    dropoffTime: string;
  };
  onSearchDataChange: (data: any) => void;
  onSearch: () => void;
}

export function SearchForm({ searchData, onSearchDataChange, onSearch }: SearchFormProps) {
  const locations = [
    'Manila - BGC',
    'Manila - Makati',
    'Manila - Ortigas',
    'Manila - Alabang',
    'Cebu City',
    'Davao City',
    'Iloilo City'
  ];

  const timeOptions = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const updateSearchData = (field: string, value: string) => {
    onSearchDataChange({
      ...searchData,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Pickup Location */}
      <div className="space-y-2">
        <Label className="text-gray-700 flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          Pickup Location
        </Label>
  <Select value={searchData.pickupLocation} onValueChange={(value: string) => updateSearchData('pickupLocation', value)}>
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

      {/* Drop-off Location */}
      <div className="space-y-2">
        <Label className="text-gray-700 flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          Drop-off Location
        </Label>
  <Select value={searchData.dropoffLocation} onValueChange={(value: string) => updateSearchData('dropoffLocation', value)}>
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

      {/* Pickup Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-700 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Pickup Date
          </Label>
          <Input 
            type="date" 
            value={searchData.pickupDate}
            onChange={(e) => updateSearchData('pickupDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]} className="text-[rgba(93,93,93,1)]"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-700 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Time
          </Label>
          <Select value={searchData.pickupTime} onValueChange={(value: string) => updateSearchData('pickupTime', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map(time => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Drop-off Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-700 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Drop-off Date
          </Label>
          <Input 
            type="date" 
            value={searchData.dropoffDate}
            onChange={(e) => updateSearchData('dropoffDate', e.target.value)}
            min={searchData.pickupDate || new Date().toISOString().split('T')[0]} className="text-[rgba(93,93,93,1)]"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-700 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Time
          </Label>
          <Select value={searchData.dropoffTime} onValueChange={(value: string) => updateSearchData('dropoffTime', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map(time => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Button */}
      <Button 
        onClick={onSearch}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        size="lg"
      >
        <Search className="h-5 w-5 mr-2" />
        Search Available Cars
      </Button>
    </div>
  );
}