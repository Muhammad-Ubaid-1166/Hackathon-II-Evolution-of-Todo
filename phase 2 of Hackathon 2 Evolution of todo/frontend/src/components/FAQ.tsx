"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, X } from 'lucide-react';

function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      question: 'How do I get started with Aura?',
      answer: 'Simply create an account, add your first task, and you\'re ready to go! The setup process takes less than 2 minutes.',
      category: 'getting-started',
      tags: ['setup', 'account', 'beginner']
    },
    {
      id: '2',
      question: 'Is Aura free to use?',
      answer: 'Yes! Aura offers a comprehensive free tier with all essential features. Premium features are available for power users.',
      category: 'pricing',
      tags: ['free', 'premium', 'pricing']
    },
    {
      id: '3',
      question: 'Is my data secure?',
      answer: 'We use industry-standard encryption and security measures to protect your data. Your information is safe with us.',
      category: 'security',
      tags: ['security', 'privacy', 'encryption']
    },
    {
      id: '4',
      question: 'Can I collaborate with my team?',
      answer: 'Yes, Aura supports real-time collaboration with team members. You can share workspaces and assign tasks to specific team members.',
      category: 'collaboration',
      tags: ['team', 'sharing', 'collaboration']
    },
    {
      id: '5',
      question: 'Does Aura have a mobile app?',
      answer: 'Yes, Aura is available on iOS and Android devices with full synchronization across all your devices.',
      category: 'features',
      tags: ['mobile', 'app', 'sync']
    },
    {
      id: '6',
      question: 'How do I export my data?',
      answer: 'You can export your data at any time from the settings menu. We support multiple formats including CSV and JSON.',
      category: 'data',
      tags: ['export', 'data', 'backup']
    }
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'security', label: 'Security' },
    { id: 'collaboration', label: 'Collaboration' },
    { id: 'features', label: 'Features' },
    { id: 'data', label: 'Data' }
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Questions & Answers
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Everything you need to know about Aura. Can't find what you're looking for? 
            <a href="#" className="text-white underline ml-1">Contact our support team</a>.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white hover:bg-gray-800 transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-white text-black'
                    : 'bg-gray-900 text-gray-400 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredFaqs.map((faq) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="group"
            >
              <div className="h-full p-6 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <button
                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 group-hover:bg-gray-700 transition-colors"
                  >
                    {expandedId === faq.id ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {faq.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-800 rounded-md text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedId === faq.id ? 'auto' : 0,
                    opacity: expandedId === faq.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-400 pt-4 border-t border-gray-800">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredFaqs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No questions found matching your search.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-white underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl font-medium mb-4">Still have questions?</h2>
          <p className="text-gray-500 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <button className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default FAQ;