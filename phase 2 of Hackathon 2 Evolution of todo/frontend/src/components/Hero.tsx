"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Grid3x3, Zap, Layers, BarChart3 } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5"></div>
      
      {/* Floating elements */}
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        className="absolute top-20 left-10 w-20 h-20 border border-gray-800 rounded-lg flex items-center justify-center"
      >
        <Grid3x3 className="w-8 h-8 text-gray-700" />
      </motion.div>
      
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
        className="absolute top-40 right-20 w-16 h-16 border border-gray-800 rounded-lg flex items-center justify-center"
      >
        <Zap className="w-6 h-6 text-gray-700" />
      </motion.div>
      
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute bottom-20 left-20 w-24 h-24 border border-gray-800 rounded-lg flex items-center justify-center"
      >
        <Layers className="w-10 h-10 text-gray-700" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-gray-800 rounded-full text-xs text-gray-500"
        >
          <Sparkles className="w-3 h-3" />
        
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6"
        >
          Organize your
          <br />
          <span className="relative">
            creative
            <motion.div
              className="absolute bottom-0 left-0 h-3 bg-white"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 1 }}
            />
          </span>
          <br />
          thoughts
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12"
        >
          A minimalist canvas for organizing your thoughts, ideas, and projects in a spatial workspace that adapts to your thinking process.
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-8 mb-12 max-w-md mx-auto"
        >
          <div>
            <div className="text-2xl font-bold text-white">10K+</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">50K+</div>
            <div className="text-sm text-gray-600">Tasks Created</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white text-black font-medium rounded-lg flex items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 border border-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            View Demo
          </motion.button>
        </motion.div>

        {/* Bottom text */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-sm text-gray-600"
        >
          No credit card required • Free for personal use • 14-day trial for teams
        </motion.div>
      </motion.div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
}