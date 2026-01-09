'use client';
import { Check, Calendar, Flag, Edit2, Trash2 } from 'lucide-react';
import type { Task } from '../../lib/api';

interface TaskListProps {
  tasks: Task[];
  filter: 'all' | 'today' | 'upcoming' | 'completed' | 'highPriority';
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function TaskList({ tasks, filter, onToggleComplete, onEdit, onDelete }: TaskListProps) {
  const getFilterTitle = () => {
    switch (filter) {
      case 'all': return 'All Tasks';
      case 'today': return "Today's Tasks";
      case 'upcoming': return 'Upcoming Tasks';
      case 'completed': return 'Completed Tasks';
      case 'highPriority': return 'High Priority Tasks';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm">
        <h2 className="text-xl font-bold text-white mb-6">
          {getFilterTitle()}
          <span className="text-gray-400 text-base ml-2">(0)</span>
        </h2>
        <div className="text-center py-12">
          <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Check className="text-blue-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No tasks found</h3>
          <p className="text-gray-400 mb-6">
            {filter === 'completed' 
              ? "You haven&apos;t completed any tasks yet." 
              : "Add your first task to get started!"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm">
      <h2 className="text-xl font-bold text-white mb-6">
        {getFilterTitle()}
        <span className="text-gray-400 text-base ml-2">({tasks.length})</span>
      </h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`group p-5 rounded-xl border transition-all duration-300 ${
              task.completed
                ? 'bg-slate-900/30 border-blue-500/10 opacity-60'
                : 'bg-slate-900/50 border-blue-500/30 hover:border-blue-500/50 hover:bg-slate-900/70'
            }`}
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
                className="mt-1 h-5 w-5 rounded border-blue-500/50 bg-slate-900/50 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className={`text-lg font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                    {task.title}
                  </p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                    task.priority === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    <Flag className="mr-1 w-3 h-3" />
                    {task.priority}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Due: {formatDate(task.dueDate)}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(task)}
                      className="p-2 text-gray-400 hover:text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

