"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ArrowLeft, ArrowRight, TrendingUp } from 'lucide-react';

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Manager',
      company: 'TechCorp',
      content: 'Aura has completely transformed how I manage my daily tasks. The interface is beautiful and the productivity boost is incredible! I\'ve tried many tools, but this one just clicks.',
      rating: 5,
      avatar: 'SJ',
      metrics: {
        productivity: '+40%',
        timeSaved: '3hrs/day',
        tasksCompleted: '127'
      }
    },
    {
      name: 'Michael Chen',
      role: 'Software Developer',
      company: 'DevStudio',
      content: 'As a developer, I needed something clean and efficient. Aura delivers exactly that - no clutter, just results. The minimalist design helps me focus on what matters.',
      rating: 5,
      avatar: 'MC',
      metrics: {
        productivity: '+35%',
        timeSaved: '2.5hrs/day',
        tasksCompleted: '98'
      }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Student',
      company: 'University',
      content: 'Perfect for managing assignments and study schedules. The mobile app keeps me organized on the go! I\'ve never been more productive with my studies.',
      rating: 5,
      avatar: 'ER',
      metrics: {
        productivity: '+50%',
        timeSaved: '4hrs/day',
        tasksCompleted: '156'
      }
    },
    {
      name: 'David Thompson',
      role: 'Entrepreneur',
      company: 'StartupHub',
      content: 'The best task management app I\'ve used. Simple, powerful, and actually helps me get more done every day. It\'s become an essential part of my workflow.',
      rating: 5,
      avatar: 'DT',
      metrics: {
        productivity: '+45%',
        timeSaved: '3.5hrs/day',
        tasksCompleted: '142'
      }
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 px-6 bg-black relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Real people, real results. See how Aura is transforming productivity for professionals and students worldwide.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-8 md:p-12"
                >
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2">
                      {/* Quote */}
                      <Quote className="w-8 h-8 text-gray-700 mb-6" />
                      
                      <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                        {testimonials[activeIndex].content}
                      </p>
                      
                      {/* User Info */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-lg">
                            {testimonials[activeIndex].avatar}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {testimonials[activeIndex].name}
                          </h3>
                          <p className="text-gray-500">
                            {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                          </p>
                        </div>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex gap-1">
                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-white fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    {/* Metrics */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-white">Impact Metrics</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-500 text-sm">Productivity</span>
                            <span className="text-green-400 text-sm font-medium">
                              {testimonials[activeIndex].metrics.productivity}
                            </span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div 
                              className="bg-green-400 h-2 rounded-full" 
                              style={{ width: '85%' }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-500 text-sm">Time Saved</span>
                            <span className="text-blue-400 text-sm font-medium">
                              {testimonials[activeIndex].metrics.timeSaved}
                            </span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div 
                              className="bg-blue-400 h-2 rounded-full" 
                              style={{ width: '75%' }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-500 text-sm">Tasks Completed</span>
                            <span className="text-purple-400 text-sm font-medium">
                              {testimonials[activeIndex].metrics.tasksCompleted}
                            </span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div 
                              className="bg-purple-400 h-2 rounded-full" 
                              style={{ width: '90%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-4">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-gray-500">Results tracked over 3 months</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-900 border border-gray-800 text-white hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeIndex ? 'bg-white' : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-900 border border-gray-800 text-white hover:bg-gray-800 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-full mb-6">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-sm text-gray-400">Join 10,000+ satisfied users</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to transform your productivity?
          </h3>
          <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
            Start your free trial today and see why professionals and students around the world choose Aura.
          </p>
          <button className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;