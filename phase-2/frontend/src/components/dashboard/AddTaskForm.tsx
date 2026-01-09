'use client';
import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';

interface AddTaskFormProps {
  onAddTask: (title: string, priority: 'low' | 'medium' | 'high', dueDate: string) => Promise<void>;
  submitting: boolean;
}

export default function AddTaskForm({ onAddTask, submitting }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onAddTask(title, priority, dueDate);
    setTitle('');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-blue-400" />
        Add New Task
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
            placeholder="What needs to be done?"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white flex justify-between items-center"
              >
                <span className="capitalize">{priority}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showDropdown && (
                <div className="absolute z-50 mt-2 w-full bg-slate-900 border border-blue-500/30 rounded-xl shadow-lg ">
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setPriority(p);
                        setShowDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-3 hover:bg-blue-500/20 transition-colors z-50 cursor-pointer ${
                        priority === p ? 'bg-blue-500/20' : ''
                      }`}
                    >
                      <span className={`capitalize  ${
                        p === 'high' ? 'text-red-400' :
                        p === 'medium' ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {p}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 shadow-lg shadow-blue-500/30 cursor-pointer"
        >
          {submitting ? (
            <>
              <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              Adding...
            </>
          ) : (
            <>
              <Plus className="mr-2 w-5 h-5" />
              Add Task
            </>
          )}
        </button>
      </form>
    </div>
  );
}

