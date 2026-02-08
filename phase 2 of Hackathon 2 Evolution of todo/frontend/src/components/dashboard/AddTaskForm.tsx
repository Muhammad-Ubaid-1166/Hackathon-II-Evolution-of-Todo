"use client";
import { useState } from "react";
import { Plus, ChevronDown, Calendar, Flag } from "lucide-react";

interface AddTaskFormProps {
  onAddTask: (title: string, priority: 'low' | 'medium' | 'high', dueDate: string) => Promise<void>;
  submitting: boolean;
}

export default function AddTaskForm({ onAddTask, submitting }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onAddTask(title, priority, dueDate);
    setTitle('');
    setPriority('medium');
    setDueDate('');
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return 'text-gray-300';
      case 'medium': return 'text-gray-400';
      case 'low': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-black border border-gray-900 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
          <Plus className="w-4 h-4 text-black" />
        </div>
        <h2 className="text-xl font-semibold text-white">Add New Task</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setFocused('title')}
            onBlur={() => setFocused(null)}
            className={`w-full px-0 py-3 bg-transparent border-b transition-colors ${
              focused === 'title' ? 'border-white' : 'border-gray-800'
            } text-white placeholder-gray-600 focus:outline-none`}
            placeholder="What needs to be done?"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Flag className="w-4 h-4" />
              Priority
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className={`w-full px-0 py-3 bg-transparent border-b transition-colors ${
                  focused === 'priority' ? 'border-white' : 'border-gray-800'
                } text-white flex justify-between items-center focus:outline-none`}
                onFocus={() => setFocused('priority')}
              >
                <span className="capitalize">{priority}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {showDropdown && (
                <div className="absolute z-50 mt-2 w-full bg-black border border-gray-800 rounded-md shadow-lg overflow-hidden">
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setPriority(p);
                        setShowDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-3 hover:bg-gray-900 transition-colors cursor-pointer ${
                        priority === p ? 'bg-gray-900' : ''
                      }`}
                    >
                      <span className={`capitalize ${getPriorityColor(p)}`}>{p}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              onFocus={() => setFocused('date')}
              onBlur={() => setFocused(null)}
              className={`w-full px-0 py-3 bg-transparent border-b transition-colors ${
                focused === 'date' ? 'border-white' : 'border-gray-800'
              } text-white focus:outline-none`}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-white text-black font-medium py-3 px-4 rounded-md flex items-center justify-center transition-all disabled:opacity-50 hover:bg-gray-200"
        >
          {submitting ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full"></div>
              Adding...
            </>
          ) : (
            <>
              <Plus className="mr-2 w-4 h-4" />
              Add Task
            </>
          )}
        </button>
      </form>
    </div>
  );
}