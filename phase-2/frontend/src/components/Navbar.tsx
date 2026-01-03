'use client';

import type { Variants } from "framer-motion";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Disable body scroll when sidebar is open and reset scroll position
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const sidebar = document.getElementById('mobile-sidebar');
      if (sidebar) {
        sidebar.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Login', href: '/login', icon: LogIn },
    { name: 'Register', href: '/register', icon: UserPlus },
  ];


  const sidebarVariants: Variants = {
    hidden: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };
  
  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="bg-slate-950/80 backdrop-blur-md border-b border-blue-500/20 shadow-lg shadow-blue-500/5 sticky top-0 z-40 scroll-optimized"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.a
                href="/"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-shrink-0 flex items-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-2"
                >
                  <span className="text-white font-bold text-sm">T</span>
                </motion.div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  ToDoze
                </span>
              </motion.a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                  whileHover={{ scale: 1.05, color: '#ffffff' }}
                  className="px-4 py-2 text-gray-300 hover:bg-blue-500/10 rounded-lg transition-all duration-200 font-medium"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <motion.button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-blue-500/10 transition-colors"
                onClick={toggleMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Navigation */}
      <motion.div
        id="mobile-sidebar"
        variants={sidebarVariants}
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        exit="exit"
        className="fixed top-0 left-0 h-full w-72 bg-slate-950 border-r border-blue-500/20 overflow-hidden z-50"
      >
        <div className="flex flex-col overflow-hidden">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-blue-500/20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-2"
              >
                <span className="text-white font-bold text-sm">T</span>
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                TodoApp
              </span>
            </motion.div>
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-blue-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="h-5 w-5 cursor-pointer" />
            </motion.button>
          </div>

          {/* Sidebar Navigation Links */}
          <div className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                  whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white transition-all duration-200 group"
                  onClick={toggleMenu}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Icon className="h-5 w-5 text-blue-400 group-hover:text-cyan-400 transition-colors" />
                  </motion.div>
                  <span className="font-medium">{item.name}</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;

