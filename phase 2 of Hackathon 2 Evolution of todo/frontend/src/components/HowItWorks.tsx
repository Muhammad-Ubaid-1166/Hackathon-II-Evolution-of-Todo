"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, BarChart3, CheckCircle } from 'lucide-react';

function HowItWorks() {
  const phases = [
    {
      id: 'discover',
      title: 'Discover',
      subtitle: 'Your creative space',
      description: 'Create your personal canvas where ideas come to life. Organize thoughts, projects, and resources in a way that makes sense to you.',
      icon: Zap,
      features: ['Unlimited nodes', 'Custom spaces', 'Flexible layouts']
    },
    {
      id: 'organize',
      title: 'Organize',
      subtitle: 'Structure your thoughts',
      description: 'Connect ideas, establish relationships, and build a knowledge graph that grows with your thinking process.',
      icon: Target,
      features: ['Smart connections', 'Visual hierarchy', 'Tagging system']
    },
    {
      id: 'achieve',
      title: 'Achieve',
      subtitle: 'Turn ideas into reality',
      description: 'Track progress, set milestones, and celebrate wins as your concepts evolve into completed projects.',
      icon: BarChart3,
      features: ['Progress tracking', 'Milestone celebrations', 'Analytics']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
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
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your Journey
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            From scattered thoughts to organized brilliance. Here's how Aura transforms your creative process.
          </p>
        </motion.div>

        {/* Phases Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute top-24 left-0 right-0 h-px bg-gray-800"></div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-16 relative">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-black border-4 border-white rounded-full z-10"></div>
                
                {/* Phase number */}
                <div className="flex justify-center mb-8">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">{index + 1}</span>
                  </div>
                </div>
                
                {/* Phase content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{phase.title}</h3>
                  <p className="text-gray-500 mb-6">{phase.subtitle}</p>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center">
                      <phase.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-400 mb-8 leading-relaxed">{phase.description}</p>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {phase.features.map((feature, i) => (
                      <li key={i} className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-white" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Arrow to next phase */}
                  {index < phases.length - 1 && (
                    <div className="hidden md:flex justify-center mt-8">
                      <ArrowRight className="w-6 h-6 text-gray-700" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-full mb-6">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-sm text-gray-400">Ready to get started?</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Begin your creative journey today
          </h3>
          <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who have transformed their thinking process with Aura.
          </p>
          <button className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;