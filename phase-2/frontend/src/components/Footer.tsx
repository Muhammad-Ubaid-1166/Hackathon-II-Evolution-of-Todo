'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 border-t border-blue-500/20">
      {/* Optimized background gradient accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-light animated-bg-light"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-light animated-bg-light"
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div variants={fadeInUp}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                ToDoze
              </h3>
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Simplify your life with modern task management. Stay organized, boost productivity, and achieve your goals.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Dashboard', 'Features', 'About Us'].map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <a
                    href={link === 'Home' ? '/' : '#'}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal & Social */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-3 mb-6">
              {[
                { icon: Twitter, href: '#' },
                { icon: Github, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Mail, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            <div className="space-y-2">
              {['Privacy Policy', 'Terms of Service'].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-blue-500/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 TodoApp. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Made with <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-blue-400 inline-block"
              >
                ♥
              </motion.span> for productivity
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;

