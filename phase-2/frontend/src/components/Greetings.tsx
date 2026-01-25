
'use client';

import { useSession } from 'next-auth/react';
import { motion, Variants } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const formatFullDate = () => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
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
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="my-8 flex flex-col lg:items-start items-center text-center lg:text-left"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex gap-2 mb-4 items-center">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: 'spring' as const, stiffness: 400 }}
          className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
          {getGreeting()}, {userName} 👋
        </h1>
      </motion.div>
      
      <motion.p
        variants={itemVariants}
        className="text-gray-400 text-lg"
      >
        {formatFullDate()}
      </motion.p>
      <motion.p
        variants={itemVariants}
        className="text-gray-500 mt-1"
      >
        Stay focused and accomplish your goals today!
      </motion.p>
    </motion.div>
  );
}

export default Greetings;

