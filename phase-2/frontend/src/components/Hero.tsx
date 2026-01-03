'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Optimized animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-optimized animated-bg"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-optimized animated-bg delay-700"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-600/5 rounded-full blur-light animated-bg-light"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        {/* Header Badge */}
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Modern Task Management
          </motion.div>
        </motion.div>

        {/* Hero Section */}
        <div className="text-center">
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-6 leading-tight"
          >
            Simplify Your Life <br />
            with TodoApp
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            A modern, intuitive task management application that helps you organize your daily tasks,
            boost productivity, and achieve your goals with ease.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-20"
          >
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              Go to Dashboard
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 cursor-pointer"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
