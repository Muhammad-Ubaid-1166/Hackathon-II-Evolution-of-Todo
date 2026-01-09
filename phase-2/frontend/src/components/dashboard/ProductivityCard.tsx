'use client';
import { TrendingUp } from 'lucide-react';

interface ProductivityCardProps {
  completedTasks: number;
  todayTasks: number;
}

export default function ProductivityCard({ completedTasks, todayTasks }: ProductivityCardProps) {
  const percentage = todayTasks > 0 ? Math.min(Math.round((completedTasks / todayTasks) * 100), 100) : 0;

  return (
    <div className="relative z-5 p-6 bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border border-cyan-500/20 rounded-2xl backdrop-blur-sm ">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-cyan-400" />
        Productivity
      </h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Today&apos;s Completion</span>
            <span className="text-sm font-medium text-cyan-400">{percentage}%</span>
          </div>
          <div className="w-full bg-slate-900/50 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        <p className="text-sm text-gray-400">{completedTasks} of {todayTasks} tasks completed today</p>
      </div>
    </div>
  );
}

