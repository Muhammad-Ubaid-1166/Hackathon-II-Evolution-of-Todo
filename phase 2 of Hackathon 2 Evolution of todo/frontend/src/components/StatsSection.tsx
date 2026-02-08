"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';

function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Active Users',
      change: '+15%',
      description: 'From creative professionals to students'
    },
    {
      icon: CheckCircle,
      value: '50,000+',
      label: 'Tasks Completed',
      change: '+23%',
      description: 'With an average completion rate of 92%'
    },
    {
      icon: TrendingUp,
      value: '85%',
      label: 'Productivity Boost',
      change: '+7%',
      description: 'Reported by our user community'
    },
    {
      icon: Clock,
      value: '2min',
      label: 'Avg. Setup Time',
      change: '-30%',
      description: 'From sign-up to first task created'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const counterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3
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
            By the Numbers
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Aura is making a real impact on productivity and creativity worldwide
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative group"
            >
              <div className="h-full p-8 bg-gray-900 border border-gray-800 rounded-lg">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-black" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change.startsWith('+') ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 rotate-180" />
                    )}
                    {stat.change}
                  </div>
                </div>
                
                {/* Value */}
                <motion.div
                  variants={counterVariants}
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                >
                  {stat.value}
                </motion.div>
                
                {/* Label */}
                <h3 className="text-lg font-medium text-white mb-3">{stat.label}</h3>
                
                {/* Description */}
                <p className="text-gray-500 text-sm">{stat.description}</p>
                
                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800 group-hover:bg-white transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-full mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Growing daily</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to join the community?
          </h3>
          <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
            Start your free trial today and see why thousands of creators choose Aura for their most important work.
          </p>
          <button className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default StatsSection;