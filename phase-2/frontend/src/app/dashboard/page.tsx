'use client'
import { useState, useEffect, useCallback } from 'react';
import Greetings from '../../components/Greetings'
import { useToastTask } from '../../components/toast'
import { taskAPI, type Task } from '../../lib/api'
import { EditTaskModal } from '../../components/dashboard'
import Loading from "../loading"
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Flag, 
  Trash2,
  Edit2,
  Clock,
  Check,
  X
} from 'lucide-react';

const TodoDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Show toast message
  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Fetch tasks from backend
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await taskAPI.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      showToast('Failed to load tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Computed values
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const todayTasks = tasks.filter(task => {
    const today = new Date();
    const taskDate = new Date(task.dueDate);
    return taskDate.toDateString() === today.toDateString();
  }).length;

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const now = new Date();
    const taskDate = new Date(task.dueDate);

    switch (filter) {
      case 'today':
        return taskDate.toDateString() === now.toDateString();
      case 'upcoming':
        return taskDate > now && !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  // Handle add task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      showToast('Task title is required', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await taskAPI.createTask({
        title: newTaskTitle,
        priority: newTaskPriority,
        dueDate: newTaskDueDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });
      showToast('Task added successfully', 'success');
      setNewTaskTitle('');
      setNewTaskPriority('medium');
      setNewTaskDueDate('');
      setShowAddForm(false);
      await fetchTasks();
    } catch (error) {
      console.error('Failed to create task:', error);
      showToast('Failed to add task', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      await taskAPI.toggleTask(id);
      showToast(task.completed ? 'Task marked as incomplete' : 'Task marked as complete', 'success');
      await fetchTasks();
    } catch (error) {
      console.error('Failed to toggle task:', error);
      showToast('Failed to update task', 'error');
    }
  };

  // Delete task
  const deleteTask = async (id: string) => {
    try {
      await taskAPI.deleteTask(id);
      showToast('Task deleted', 'success');
      await fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
      showToast('Failed to delete task', 'error');
    }
  };

  // Save edited task
  const saveEditedTask = async (taskId: string, title: string, priority: 'low' | 'medium' | 'high', dueDate: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      await taskAPI.updateTask(taskId, {
        title,
        priority,
        dueDate: dueDate || new Date().toISOString(),
        completed: task.completed
      });
      showToast('Task updated successfully', 'success');
      setEditingTask(null);
      await fetchTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
      showToast('Failed to update task', 'error');
    }
  };

  // Loading state
  if (loading) {
    return (
     <Loading/>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-white transition-all duration-300 ${
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Edit Modal */}
      <EditTaskModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={saveEditedTask}
      />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Greeting */}
        <Greetings />

        {/* Stats Row */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[140px] bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-semibold text-white">{completedTasks}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[140px] bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-xl">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-semibold text-white">{pendingTasks}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[140px] bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-xl">
                <Calendar className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Today</p>
                <p className="text-2xl font-semibold text-white">{todayTasks}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[140px] bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-xl">
                <Flag className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total</p>
                <p className="text-2xl font-semibold text-white">{totalTasks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Task Section */}
        <div className="mb-8">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-4 bg-slate-900/50 border border-dashed border-slate-700 rounded-2xl text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-slate-900/70 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Add a new task...
            </button>
          ) : (
            <form onSubmit={handleAddTask} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none mb-4"
                autoFocus
              />
              <div className="flex flex-wrap gap-3 items-center">
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <input
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                />
                <div className="flex-1"></div>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewTaskTitle('');
                    setNewTaskPriority('medium');
                    setNewTaskDueDate('');
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Task
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'today', label: 'Today' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'completed', label: 'Completed' }
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                filter === f.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900/50 text-gray-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {f.label}
              {f.key === 'all' && totalTasks > 0 && (
                <span className="ml-2 opacity-60">({totalTasks})</span>
              )}
              {f.key === 'completed' && completedTasks > 0 && (
                <span className="ml-2 opacity-60">({completedTasks})</span>
              )}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-400 mb-2">
                {filter === 'completed' ? 'No completed tasks yet' : 'No tasks found'}
              </h3>
              <p className="text-gray-500">
                {filter === 'completed' 
                  ? "Complete some tasks to see them here." 
                  : "Add your first task to get started!"}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                  task.completed
                    ? 'bg-slate-900/20 border-slate-800/50 opacity-60'
                    : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="flex-shrink-0 transition-transform hover:scale-105 cursor-pointer"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-600 group-hover:text-blue-500 transition-colors" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <p className={`text-base font-medium truncate ${
                    task.completed ? 'text-gray-500 line-through' : 'text-white'
                  }`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                      <Flag className="w-3 h-3" />
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Productivity Summary */}
        {totalTasks > 0 && (
          <div className="mt-8 p-5 bg-slate-900/30 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Today's Progress</span>
              <span className="text-white font-medium">
                {todayTasks > 0 ? Math.round((completedTasks / Math.max(todayTasks, 1)) * 100) : 0}% complete
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-500"
                style={{ 
                  width: `${todayTasks > 0 ? Math.min((completedTasks / Math.max(todayTasks, 1)) * 100, 100) : 0}%` 
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoDashboard;

