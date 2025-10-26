import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';

export function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    licenseNumber: '',
    licenseCountry: '',
    licenseExpiry: '',
    licenseImage: null,
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    billingAddress: '',
    residentialAddress: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToLicense: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setForm(prev => ({ ...prev, [name]: files && files[0] ? files[0] : null }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic required fields
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      toast.error('Please fill in all basic fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    // Identity verification
    if (!form.dateOfBirth || !form.licenseNumber || !form.licenseCountry || !form.licenseExpiry) {
      toast.error('Please fill in all license info');
      return;
    }
    // Payment info
    if (!form.cardNumber || !form.cardExpiry || !form.cardCVV || !form.billingAddress) {
      toast.error('Please fill in all payment info');
      return;
    }
    // Residential address
    if (!form.residentialAddress) {
      toast.error('Please provide your residential address');
      return;
    }
    // Legal agreements
    if (!form.agreeToTerms || !form.agreeToPrivacy || !form.agreeToLicense) {
      toast.error('Please agree to all legal terms');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          dateOfBirth: form.dateOfBirth,
          licenseNumber: form.licenseNumber,
          licenseCountry: form.licenseCountry,
          licenseExpiry: form.licenseExpiry,
          licenseImage: form.licenseImage,
          cardNumber: form.cardNumber,
          cardExpiry: form.cardExpiry,
          cardCVV: form.cardCVV,
          billingAddress: form.billingAddress,
          residentialAddress: form.residentialAddress
        })
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Sign up failed');
      } else {
        toast.success('Account created! You can now sign in.');
        navigate('/');
      }
    } catch {
      toast.error('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">Create Your Account</h2>
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />
        </div>
        {/* Identity Verification */}
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input id="dateOfBirth" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="licenseNumber">Driver's License Number</Label>
          <Input id="licenseNumber" name="licenseNumber" value={form.licenseNumber} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="licenseCountry">Issuing Country/State</Label>
          <Input id="licenseCountry" name="licenseCountry" value={form.licenseCountry} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="licenseExpiry">License Expiration Date</Label>
          <Input id="licenseExpiry" name="licenseExpiry" type="date" value={form.licenseExpiry} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="licenseImage">Upload/Scan of Driver's License (optional at signup)</Label>
          <Input id="licenseImage" name="licenseImage" type="file" accept="image/*" onChange={handleChange} />
        </div>
        {/* Payment Info */}
        <div>
          <Label htmlFor="cardNumber">Credit/Debit Card Number</Label>
          <Input id="cardNumber" name="cardNumber" value={form.cardNumber} onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cardExpiry">Card Expiry</Label>
            <Input id="cardExpiry" name="cardExpiry" value={form.cardExpiry} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="cardCVV">CVV</Label>
            <Input id="cardCVV" name="cardCVV" value={form.cardCVV} onChange={handleChange} required />
          </div>
        </div>
        <div>
          <Label htmlFor="billingAddress">Billing Address</Label>
          <Input id="billingAddress" name="billingAddress" value={form.billingAddress} onChange={handleChange} required />
        </div>
        {/* Residential Address (Prominent & Required) */}
        <div>
          <Label htmlFor="residentialAddress" className="font-bold text-orange-600">Residential Address <span className="text-red-500">*</span></Label>
          <Input
            id="residentialAddress"
            name="residentialAddress"
            value={form.residentialAddress}
            onChange={handleChange}
            required
            placeholder="Enter your full residential address"
            className="border-2 border-orange-500 focus:border-orange-600 bg-orange-50"
          />
        </div>
        {/* Legal & Agreements */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={form.agreeToTerms} onCheckedChange={(checked: boolean) => setForm(f => ({ ...f, agreeToTerms: checked }))} />
            <Label htmlFor="terms" className="text-sm">I agree to the Terms and Conditions</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="privacy" checked={form.agreeToPrivacy} onCheckedChange={(checked: boolean) => setForm(f => ({ ...f, agreeToPrivacy: checked }))} />
            <Label htmlFor="privacy" className="text-sm">I agree to the Privacy Policy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="license" checked={form.agreeToLicense} onCheckedChange={(checked: boolean) => setForm(f => ({ ...f, agreeToLicense: checked }))} />
            <Label htmlFor="license" className="text-sm">I agree to provide a valid license & insurance if applicable</Label>
          </div>
        </div>
        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
    </div>
  );
}
