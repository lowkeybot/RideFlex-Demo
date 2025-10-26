import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/navigation';
import { Homepage } from './components/homepage';
import { CarListings } from './components/car-listings';
import { CarDetails } from './components/car-details';
import { BookingCheckout } from './components/booking-checkout';
import { UserProfile } from './components/user-profile';
import { AdminDashboard } from './components/admin-dashboard';
import { Support } from './components/support';
import { AuthModal } from './components/auth-modal';
import { SignUp } from './components/SignUp';
import { Toaster } from './components/ui/sonner';

export default function App() {
  React.useEffect(() => {
    const handler = () => {
      setShowAuthModal(true);
      setAuthTab('signup');
    };
    window.addEventListener('open-signup-modal', handler);
    return () => window.removeEventListener('open-signup-modal', handler);
  }, []);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation 
          user={user} 
          onShowAuth={(tab) => { setShowAuthModal(true); setAuthTab(tab === 'signup' ? 'signup' : 'signin'); }}
          onLogout={() => setUser(null)}
        />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cars" element={<CarListings />} />
          <Route path="/cars/:id" element={<CarDetails user={user} />} />
          <Route path="/booking/:id" element={<BookingCheckout />} />
          <Route path="/profile" element={<UserProfile user={user} />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/support" element={<Support />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={setUser}
          activeTab={authTab}
          setActiveTab={setAuthTab}
        />
        <Toaster />
      </div>
    </Router>
  );
}