import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-slate-950/80 backdrop-blur-md border-b border-blue-500/20 shadow-lg shadow-blue-500/5 relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex-shrink-0 flex items-center group">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                ToDoze
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#home"
                  className="text-blue-100 hover:text-white hover:bg-blue-500/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  Home
                </a>
                <a
                  href="#dashboard"
                  className="text-blue-100 hover:text-white hover:bg-blue-500/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  Dashboard
                </a>
                <a
                  href="#login"
                  className="text-blue-100 hover:text-white hover:bg-blue-500/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  Login
                </a>
                <a
                  href="#signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-lg shadow-blue-500/20"
                >
                  Sign Up
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-500/10 transition-all duration-200"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-64 bg-slate-950/95 backdrop-blur-md border-r border-blue-500/20 shadow-2xl shadow-blue-500/10">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-blue-500/20">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-500/10 transition-all duration-200"
                >
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Navigation Links */}
              <div className="flex-1 px-4 py-6 space-y-2">
                <a
                  href="#home"
                  className="text-blue-100 hover:text-white hover:bg-blue-500/10 block px-4 py-3 rounded-md text-base font-medium transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#dashboard"
                  className="text-blue-100 hover:text-white hover:bg-blue-500/10 block px-4 py-3 rounded-md text-base font-medium transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </a>
                <a
                  href="#login"
                  className="text-blue-100 hover:text-white hover:bg-blue-500/10 block px-4 py-3 rounded-md text-base font-medium transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </a>
                <a
                  href="#signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 shadow-lg shadow-blue-500/20"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="p-6 border-t border-blue-500/20">
      <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-xs text-gray-400 text-center">
          Stay organized, stay productive
        </p>
      </div>
    </div>

      
    </>
  );
}