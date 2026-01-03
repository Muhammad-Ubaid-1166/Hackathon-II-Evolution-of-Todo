'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckSquare, Trophy } from 'lucide-react';

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Plus,
      title: 'Create Tasks',
      description: 'Simply add your tasks with titles, priorities, and due dates. Our intuitive interface makes it effortless.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      icon: CheckSquare,
      title: 'Organize & Track',
      description: 'Keep track of your progress with visual indicators, categories, and smart filtering options.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      number: '03',
      icon: Trophy,
      title: 'Achieve Goals',
      description: 'Complete tasks, build streaks, and celebrate your achievements with our gamification features.',
      color: 'from-blue-500 to-sky-500'
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
        staggerChildren: 0.2
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
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-optimized animated-bg"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-600/5 rounded-full blur-light animated-bg-light"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get started in just three simple steps and transform your productivity today
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative cursor-pointer"
            >
              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0 origin-left"
                />
              )}

              <div className="relative p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-white/20 transition-all duration-300 z-10">
                {/* Step number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-white/20 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-sm font-bold">{step.number}</span>
                </motion.div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default HowItWorks;

