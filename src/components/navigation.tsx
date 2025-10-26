import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { User, LogOut, Settings, Car } from 'lucide-react';
import ridflexLogo from '../assets/3ced4dc42a2cc97640db1289ede4488557e6359d.png';

interface NavigationProps {
  user: any;
  onShowAuth: (tab?: 'signin' | 'signup') => void;
  onLogout: () => void;
}

export function Navigation({ user, onShowAuth, onLogout }: NavigationProps) {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={ridflexLogo} alt="Rideflex" className="h-10 w-10" />
            <div className="text-2xl font-bold text-orange-500">Rideflex</div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-[24px] font-bold">
            <Link 
              to="/" 
              className={`hover:text-orange-500 transition-colors ${
                location.pathname === '/' ? 'text-orange-500' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              className={`hover:text-orange-500 transition-colors ${
                location.pathname === '/cars' ? 'text-orange-500' : 'text-gray-700'
              }`}
            >
              Browse Cars
            </Link>
            <Link 
              to="/support" 
              className={`hover:text-orange-500 transition-colors ${
                location.pathname === '/support' ? 'text-orange-500' : 'text-gray-700'
              }`}
            >
              Support
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link to="/profile">
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-orange-500 text-white">
                          {user.firstName?.[0] || user.lastName?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block">{user.firstName} {user.lastName}</span>
                    </Button>
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/bookings" className="flex items-center space-x-2">
                      <Car className="h-4 w-4" />
                      <span>My Bookings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} className="flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => onShowAuth('signin')}>
                  Login
                </Button>
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => onShowAuth('signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}