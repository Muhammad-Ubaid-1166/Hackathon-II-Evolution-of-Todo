'use client'
import { useState, useEffect, useCallback } from 'react';
import Greetings from '../../components/Greetings'
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
  X,
  MoreHorizontal
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

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

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

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const todayTasks = tasks.filter(task => {
    const today = new Date();
    const taskDate = new Date(task.dueDate);
    return taskDate.toDateString() === today.toDateString();
  }).length;

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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return priority;
    }
  };

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
      showToast('Task added', 'success');
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

  const toggleTaskCompletion = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      await taskAPI.toggleTask(id);
      showToast(task.completed ? 'Task reopened' : 'Task completed', 'success');
      await fetchTasks();
    } catch (error) {
      console.error('Failed to toggle task:', error);
      showToast('Failed to update task', 'error');
    }
  };

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
      showToast('Task updated', 'success');
      setEditingTask(null);
      await fetchTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
      showToast('Failed to update task', 'error');
    }
  };

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {toast && (
        <div className="fixed top-20 right-4 z-50 px-4 py-3 bg-[#111] border border-white/10 rounded-md shadow-lg">
          <p className="text-sm text-white">{toast.message}</p>
        </div>
      )}

      <EditTaskModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={saveEditedTask}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Greetings />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Tasks</h2>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-white text-black rounded-md hover:bg-white/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  New task
                </button>
              </div>

              {showAddForm && (
                <form onSubmit={handleAddTask} className="mb-4 p-4 bg-[#111] border border-white/10 rounded-lg">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Task title..."
                    className="w-full mb-3 px-0 py-2 bg-transparent text-white placeholder:text-gray-500 border-0 border-b border-white/10 focus:outline-none focus:border-white/20"
                    autoFocus
                  />
                  <div className="flex flex-wrap gap-3 items-center">
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                      className="px-3 py-1.5 bg-[#0a0a0a] border border-white/10 rounded-md text-sm text-white cursor-pointer"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <input
                      type="date"
                      value={newTaskDueDate}
                      onChange={(e) => setNewTaskDueDate(e.target.value)}
                      className="px-3 py-1.5 bg-[#0a0a0a] border border-white/10 rounded-md text-sm text-white cursor-pointer"
                    />
                    <div className="flex-1"></div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setNewTaskTitle('');
                      }}
                      className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-4 py-1.5 bg-white text-black text-sm font-medium rounded-md hover:bg-white/90 transition-colors disabled:opacity-50"
                    >
                      {submitting ? 'Adding...' : 'Add task'}
                    </button>
                  </div>
                </form>
              )}

              <div className="flex gap-2 mb-4 overflow-x-auto">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'today', label: 'Today' },
                  { key: 'upcoming', label: 'Upcoming' },
                  { key: 'completed', label: 'Completed' }
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key as typeof filter)}
                    className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap transition-colors ${
                      filter === f.key
                        ? 'bg-white text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {filteredTasks.length === 0 ? (
                  <div className="text-center py-12 bg-[#111] border border-white/10 rounded-lg">
                    <p className="text-sm text-gray-400">No tasks found</p>
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`group flex items-center gap-3 p-4 bg-[#111] border border-white/10 rounded-lg hover:border-white/20 transition-colors ${
                        task.completed ? 'opacity-50' : ''
                      }`}
                    >
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="flex-shrink-0"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${
                          task.completed ? 'text-gray-400 line-through' : 'text-white'
                        }`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500">
                            {getPriorityLabel(task.priority)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(task.dueDate)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingTask(task)}
                          className="p-1.5 text-gray-400 hover:text-white transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1.5 text-gray-400 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#111] border border-white/10 rounded-lg">
              <h3 className="text-sm font-medium text-white mb-4">Overview</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-400">Total</span>
                    <span className="text-lg font-semibold text-white">{totalTasks}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-400">Completed</span>
                    <span className="text-lg font-semibold text-white">{completedTasks}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-400">Pending</span>
                    <span className="text-lg font-semibold text-white">{pendingTasks}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-400">Today</span>
                    <span className="text-lg font-semibold text-white">{todayTasks}</span>
                  </div>
                </div>
              </div>
            </div>

            {totalTasks > 0 && (
              <div className="p-4 bg-[#111] border border-white/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm font-medium text-white">
                    {Math.round((completedTasks / totalTasks) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDashboard;