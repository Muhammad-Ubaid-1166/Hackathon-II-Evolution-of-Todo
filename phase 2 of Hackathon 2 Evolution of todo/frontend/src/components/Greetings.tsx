'use client';

import { useSession } from 'next-auth/react';
import { motion, Variants } from 'framer-motion';
import { Calendar, Clock, Target, TrendingUp } from 'lucide-react';

const formatFullDate = () => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const getMotivationalQuote = () => {
  const quotes = [
    "Focus on progress, not perfection.",
    "Small steps daily lead to big changes yearly.",
    "Your only limit is your mind.",
    "Make it happen, then let it happen.",
    "Clarity comes from engagement, not thought."
  ];
  const index = new Date().getDate() % quotes.length;
  return quotes[index];
};

function Greetings() {
  const { data: session } = useSession();
  
  // Get user name from session, fall back to 'User' if not available
  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'User';

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mb-12"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8">
        {/* Left side - Greeting */}
        <motion.div variants={itemVariants} className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {getGreeting()}, <span className="text-gray-400">{userName}</span>
          </h1>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatFullDate()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </motion.div>
        
        {/* Right side - Stats */}
        <motion.div variants={itemVariants} className="flex gap-6 mt-6 md:mt-0">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-900 rounded-lg mb-2">
              <Target className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-xs text-gray-500">Tasks Today</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-900 rounded-lg mb-2">
              <TrendingUp className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-white">85%</p>
            <p className="text-xs text-gray-500">Completion</p>
          </div>
        </motion.div>
      </div>
      
      {/* Motivational quote */}
      <motion.div
        variants={itemVariants}
        className="mt-8 p-4 bg-gray-900/50 border border-gray-800 rounded-lg"
      >
        <p className="text-gray-400 italic">"{getMotivationalQuote()}"</p>
      </motion.div>
    </motion.div>
  );
}

export default Greetings;