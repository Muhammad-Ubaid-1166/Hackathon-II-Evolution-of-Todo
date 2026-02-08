"use client";
import { Filter, Check } from "lucide-react";

interface TaskFiltersProps {
  currentFilter: 'all' | 'today' | 'upcoming' | 'completed' | 'highPriority';
  onFilterChange: (filter: 'all' | 'today' | 'upcoming' | 'completed' | 'highPriority') => void;
}

export default function TaskFilters({ currentFilter, onFilterChange }: TaskFiltersProps) {
  const filters: { key: 'all' | 'today' | 'upcoming' | 'completed' | 'highPriority'; label: string; count?: number }[] = [
    { key: 'all', label: 'All Tasks', count: 24 },
    { key: 'today', label: 'Today', count: 5 },
    { key: 'upcoming', label: 'Upcoming', count: 8 },
    { key: 'completed', label: 'Completed', count: 11 },
    { key: 'highPriority', label: 'High Priority', count: 3 }
  ];

  return (
    <div className="bg-black border border-gray-900 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
          <Filter className="w-4 h-4 text-black" />
        </div>
        <h2 className="text-lg font-semibold text-white">Filters</h2>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all ${
              currentFilter === f.key
                ? 'bg-white text-black'
                : 'bg-transparent text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700'
            }`}
          >
            {f.label}
            {f.count && (
              <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                currentFilter === f.key
                  ? 'bg-black/10 text-black'
                  : 'bg-gray-900 text-gray-500'
              }`}>
                {f.count}
              </span>
            )}
            {currentFilter === f.key && (
              <Check className="absolute -top-1 -right-1 w-3 h-3 bg-white text-black rounded-full p-0.5" />
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-900 flex items-center justify-between">
        <p className="text-xs text-gray-600">
          Showing tasks based on selected filter
        </p>
        <button
          onClick={() => onFilterChange('all')}
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}