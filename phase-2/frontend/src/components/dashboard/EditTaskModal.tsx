'use client';
import { useState, useEffect, useRef } from 'react';
import { Edit2, ChevronDown, Save, X } from 'lucide-react';
import type { Task } from '../../lib/api';

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

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Edit2 className="w-5 h-5 text-blue-400" />
          Edit Task
        </h2>

        {/* Form */}
        <div onKeyDown={handleKeyDown}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
              placeholder="What needs to be done?"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
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
                  <div className="absolute z-10 mt-2 w-full bg-slate-900 border border-blue-500/30 rounded-xl shadow-lg overflow-hidden">
                    {(['low', 'medium', 'high'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setPriority(p);
                          setShowDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-3 hover:bg-blue-500/20 transition-colors ${
                          priority === p ? 'bg-blue-500/20' : ''
                        }`}
                      >
                        <span className={`capitalize ${
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

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-gray-300 font-medium hover:bg-slate-700/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 shadow-lg shadow-blue-500/30"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 w-5 h-5" />
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

