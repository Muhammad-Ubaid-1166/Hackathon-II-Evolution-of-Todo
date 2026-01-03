'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, TrendingUp, Clock } from 'lucide-react';

function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Active Users',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: CheckCircle,
      value: '50,000+',
      label: 'Tasks Completed',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: TrendingUp,
      value: '85%',
      label: 'Productivity Boost',
      color: 'from-blue-500 to-sky-500'
    },
    {
      icon: Clock,
      value: '2min',
      label: 'Avg. Setup Time',
      color: 'from-sky-500 to-cyan-500'
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className='relative overflow-hidden py-20'>
      {/* Optimized animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-optimized animated-bg"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-light animated-bg-light"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join our growing community of productive individuals and teams
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-white/20 transition-all duration-300 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold text-white mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default StatsSection;

