"use client";
import { Check, X, Calendar, BarChart3, ListTodo, Clock, CheckCircle } from "lucide-react";

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
    { 
      label: 'Total Tasks', 
      value: totalTasks, 
      icon: ListTodo, 
      change: totalTasks > 0 ? `+${Math.floor(Math.random() * 10) + 1}` : '0',
      trend: 'up' as const
    },
    { 
      label: 'Completed', 
      value: completedTasks, 
      icon: CheckCircle, 
      change: completedTasks > 0 ? `+${Math.floor(Math.random() * 10) + 1}` : '0',
      trend: 'up' as const
    },
    { 
      label: 'Pending', 
      value: pendingTasks, 
      icon: Clock, 
      change: pendingTasks > 0 ? `-${Math.floor(Math.random() * 10) + 1}` : '0',
      trend: 'down' as const
    },
    { 
      label: "Today's Tasks", 
      value: todayTasks, 
      icon: Calendar, 
      change: todayTasks > 0 ? `+${Math.floor(Math.random() * 10) + 1}` : '0',
      trend: 'up' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div 
          key={idx} 
          className="bg-black border border-gray-900 rounded-lg p-6 hover:border-gray-800 transition-all duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-black" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
            </div>
            <div className={`flex items-center text-xs ${
              stat.trend === 'up' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {stat.trend === 'up' ? (
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) : (
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
              {stat.change}
            </div>
          </div>
          
          {/* Mini sparkline chart */}
          <div className="mt-4 h-10 flex items-end justify-between">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gray-800 rounded-full"
                style={{
                  height: `${Math.random() * 100}%`,
                  opacity: 0.3 + (Math.random() * 0.7)
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}