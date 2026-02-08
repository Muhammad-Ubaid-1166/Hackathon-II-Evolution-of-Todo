"use client";
import { useState, useEffect, useRef } from "react";
import { Edit2, ChevronDown, Save, X, Calendar, Flag } from "lucide-react";
import type { Task } from "../../lib/api";

interface EditTaskModalProps {
  task: Task | null;
  onClose: () => void;
  onSave: (taskId: string, title: string, priority: 'low' | 'medium' | 'high', dueDate: string) => Promise<void>;
}

export default function EditTaskModal({ task, onClose, onSave }: EditTaskModalProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (task && !hasInitialized.current) {
      const timer = setTimeout(() => {
        setTitle(task.title);
        setPriority(task.priority);
        setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
      }, 0);
      hasInitialized.current = true;
      return () => clearTimeout(timer);
    } else if (!task) {
      hasInitialized.current = false;
    }
  }, [task]);

  const handleSave = async () => {
    if (!task || !title.trim()) return;
    setIsSaving(true);
    await onSave(task.id, title, priority, dueDate);
    setIsSaving(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return 'text-gray-300';
      case 'medium': return 'text-gray-400';
      case 'low': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-black border border-gray-800 rounded-lg p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white rounded-md hover:bg-gray-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <Edit2 className="w-4 h-4 text-black" />
          </div>
          <h2 className="text-xl font-semibold text-white">Edit Task</h2>
        </div>

        {/* Form */}
        <div onKeyDown={handleKeyDown} className="space-y-6">
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
              autoFocus
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
                  onFocus={() => setFocused('priority')}
                  className={`w-full px-0 py-3 bg-transparent border-b transition-colors ${
                    focused === 'priority' ? 'border-white' : 'border-gray-800'
                  } text-white flex justify-between items-center focus:outline-none`}
                >
                  <span className="capitalize">{priority}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {showDropdown && (
                  <div className="absolute z-10 mt-2 w-full bg-black border border-gray-800 rounded-md shadow-lg overflow-hidden">
                    {(['low', 'medium', 'high'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setPriority(p);
                          setShowDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-3 hover:bg-gray-900 transition-colors ${
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

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-black border border-gray-800 rounded-md text-gray-400 font-medium hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-white text-black font-medium py-3 px-4 rounded-md flex items-center justify-center transition-all disabled:opacity-50 hover:bg-gray-200"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}