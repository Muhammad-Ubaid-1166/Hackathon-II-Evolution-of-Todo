'use client';
import { Check, X, Calendar } from 'lucide-react';

interface StatsCardsProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  todayTasks: number;
}

export default function StatsCards({ 
  totalTasks, 
  completedTasks, 
  pendingTasks, 
  todayTasks 
}: StatsCardsProps) {
  const stats = [
    { label: 'Total Tasks', value: totalTasks, icon: Check, color: 'blue' },
    { label: 'Completed', value: completedTasks, icon: Check, color: 'green' },
    { label: 'Pending', value: pendingTasks, icon: X, color: 'yellow' },
    { label: "Today's Tasks", value: todayTasks, icon: Calendar, color: 'purple' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div 
          key={idx} 
          className="group p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
              <stat.icon className="text-blue-400 w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

