import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import { User, Lock, Mail, Phone, Upload } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
  activeTab?: 'signin' | 'signup';
  setActiveTab?: React.Dispatch<React.SetStateAction<'signin' | 'signup'>>;
}

export function AuthModal(props: AuthModalProps) {
  const { isOpen, onClose, onLogin, activeTab, setActiveTab } = props;
  const [internalTab, setInternalTab] = useState<'signin' | 'signup'>('signin');
  const tab = typeof activeTab === 'string' ? activeTab : internalTab;
  const setTab = setActiveTab || setInternalTab;
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    residentialAddress: '',
    agreeToTerms: false
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
  const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signInData.email, password: signInData.password })
      });
      if (!res.ok) {
        let data = {};
        try { data = await res.json(); } catch {}
  toast.error((data && typeof data === 'object' && 'error' in data ? (data as any).error : undefined) || 'Login failed');
        return;
      }
      // Fetch user info after login
  const userRes = await fetch(`/api/user?email=${encodeURIComponent(signInData.email)}`);
      if (!userRes.ok) {
        toast.error('Could not fetch user info');
        return;
      }
      const userInfo = await userRes.json();
      onLogin(userInfo);
      toast.success('Successfully signed in!');
      onClose();
    } catch {
      toast.error('Network error. Please try again.');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpData.firstName || !signUpData.lastName || !signUpData.email || 
        !signUpData.phone || !signUpData.password || !signUpData.confirmPassword || !signUpData.residentialAddress) {
      toast.error('Please fill in all fields');
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!signUpData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    try {
  const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          email: signUpData.email,
          phone: signUpData.phone,
          password: signUpData.password,
          residentialAddress: signUpData.residentialAddress
        })
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Sign up failed');
        return;
      }
      toast.success('Account created successfully! You can now sign in.');
      setTab('signin');
    } catch {
      toast.error('Network error. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Welcome to Rideflex</DialogTitle>
        </DialogHeader>

  <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4 mt-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Address
                </Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signInData.email}
                  onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Password
                </Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={signInData.password}
                  onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Login
              </Button>

              <div className="text-center">
                <button type="button" className="text-sm text-orange-500 hover:underline">
                  Forgot your password?
                </button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-6">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-firstname" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    First Name
                  </Label>
                  <Input
                    id="signup-firstname"
                    type="text"
                    placeholder="First name"
                    value={signUpData.firstName}
                    onChange={(e) => setSignUpData({...signUpData, firstName: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-lastname">Last Name</Label>
                  <Input
                    id="signup-lastname"
                    type="text"
                    placeholder="Last name"
                    value={signUpData.lastName}
                    onChange={(e) => setSignUpData({...signUpData, lastName: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Address
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-phone" className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone Number
                </Label>
                <Input
                  id="signup-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={signUpData.phone}
                  onChange={(e) => setSignUpData({...signUpData, phone: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Password
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <Input
                  id="signup-confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={signUpData.confirmPassword}
                  onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-residential-address" className="flex items-center">
                  Residential Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="signup-residential-address"
                  type="text"
                  placeholder="Enter your full residential address"
                  value={signUpData.residentialAddress}
                  onChange={(e) => setSignUpData({...signUpData, residentialAddress: e.target.value})}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={signUpData.agreeToTerms}
                  onCheckedChange={(checked: boolean) => setSignUpData({...signUpData, agreeToTerms: checked})}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{' '}
                  <button type="button" className="text-orange-500 hover:underline">
                    Terms and Conditions
                  </button>
                  {' '}and{' '}
                  <button type="button" className="text-orange-500 hover:underline">
                    Privacy Policy
                  </button>
                </Label>
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-600 mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  );
}