"use client";
import { TrendingUp, BarChart3 } from "lucide-react";

interface ProductivityCardProps {
  completedTasks: number;
  todayTasks: number;
}

export default function ProductivityCard({ completedTasks, todayTasks }: ProductivityCardProps) {
  const percentage = todayTasks > 0 ? Math.min(Math.round((completedTasks / todayTasks) * 100), 100) : 0;

  return (
    <div className="bg-black border border-gray-900 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-black" />
        </div>
        <h2 className="text-xl font-semibold text-white">Productivity</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-3">
            <span className="text-sm font-medium text-gray-400">Today's Completion</span>
            <span className="text-sm font-medium text-white">{percentage}%</span>
          </div>
          
          <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-gray-500">
            {completedTasks} of {todayTasks} tasks
          </p>
          
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < Math.floor(percentage / 20)
                    ? "bg-white"
                    : "bg-gray-800"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}