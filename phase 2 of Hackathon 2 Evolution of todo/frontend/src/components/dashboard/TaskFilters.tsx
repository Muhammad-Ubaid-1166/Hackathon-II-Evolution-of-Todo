'use client';

interface TaskFiltersProps {
  currentFilter: 'all' | 'today' | 'upcoming' | 'completed' | 'highPriority';
  onFilterChange: (filter: 'all' | 'today' | 'upcoming' | 'completed' | 'highPriority') => void;
}

export default function TaskFilters({ currentFilter, onFilterChange }: TaskFiltersProps) {
  const filters: { key: 'all' | 'today' | 'upcoming' | 'completed' | 'highPriority'; label: string }[] = [
    { key: 'all', label: 'All Tasks' },
    { key: 'today', label: 'Today' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'completed', label: 'Completed' },
    { key: 'highPriority', label: 'High Priority' }
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm mb-6">
      <div className="flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              currentFilter === f.key
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-blue-500/10 text-gray-300 hover:bg-blue-500/20 border border-blue-500/20'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

