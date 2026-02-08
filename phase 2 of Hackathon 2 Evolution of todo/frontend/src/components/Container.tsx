import { useState } from 'react';
import { Menu, X, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <span className="text-black font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-white">Aura</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Home
              </Link>
              <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/features" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Pricing
              </Link>
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Sign In
              </Link>
              <Link href="/register" className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="absolute right-0 top-0 h-full w-64 bg-black border-l border-gray-900">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-900">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                    <span className="text-black font-bold text-sm">A</span>
                  </div>
                  <span className="text-xl font-bold text-white">Aura</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Navigation Links */}
              <div className="flex-1 p-4 space-y-2">
                <Link
                  href="/"
                  className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/features"
                  className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
              </div>
              
              {/* Mobile Auth */}
              <div className="p-4 border-t border-gray-900 space-y-2">
                <Link
                  href="/login"
                  className="block w-full px-4 py-3 text-center text-gray-400 hover:text-white border border-gray-800 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block w-full px-4 py-3 text-center bg-white text-black rounded-md font-medium hover:bg-gray-200 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}