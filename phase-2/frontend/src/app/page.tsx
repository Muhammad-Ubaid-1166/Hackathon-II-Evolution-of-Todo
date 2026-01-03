'use client';

import { motion, Variants } from 'framer-motion';
import Hero from '@/components/Hero'
import StatsSection from '@/components/StatsSection'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const
    }
  }
};

export default function Home() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full bg-gradient-to-br from-slate-950 relative overflow-hidden"
    >
      <motion.div variants={sectionVariants}>
        <Hero />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <StatsSection />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <HowItWorks />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <Testimonials />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <FAQ />
      </motion.div>
    </motion.div>
  );
}

