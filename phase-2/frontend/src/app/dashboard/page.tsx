'use client'
import { useState } from 'react';
import {
  Check,
  X,
  Plus,
  Calendar,
  Flag,
  Edit2,
  Trash2,
  ChevronDown,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import Greetings from '../../components/Greetings'
import { useToastTask }  from '../../components/toast'

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};



const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    completed: false,
    priority: 'high',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Schedule team meeting',
    completed: true,
    priority: 'medium',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Review documentation',
    completed: false,
    priority: 'low',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const TodoDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium' as 'low' | 'medium' | 'high', dueDate: '' });
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'completed' | 'highPriority'>('all');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

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
      case 'highPriority':
        return task.priority === 'high';
      default:
        return true;
    }
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      setToast({ message: 'Task title is required', type: 'error' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        completed: false,
        priority: newTask.priority,
        dueDate: newTask.dueDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
      };

      setTasks([task, ...tasks]);
      setNewTask({ title: '', priority: 'medium', dueDate: '' });
      setLoading(false);
      setToast({ message: 'Task added successfully', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    }, 500);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    const task = tasks.find(t => t.id === id);
    if (task) {
      setToast({
        message: task.completed ? 'Task marked as incomplete' : 'Task marked as complete',
        type: 'success'
      });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    setToast({ message: 'Task deleted', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg text-white transition-all duration-300 backdrop-blur-md border ${
          toast.type === 'success' 
            ? 'bg-green-500/90 border-green-400/50' 
            : 'bg-red-500/90 border-red-400/50'
        }`}>
          {toast.message}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto p-4 md:p-8">
        {/* Welcome */}
       <Greetings/>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Tasks', value: totalTasks, icon: Check, color: 'blue' },
            { label: 'Completed', value: completedTasks, icon: Check, color: 'green' },
            { label: 'Pending', value: pendingTasks, icon: X, color: 'yellow' },
            { label: "Today's Tasks", value: todayTasks, icon: Calendar, color: 'purple' }
          ].map((stat, idx) => (
            <div key={idx} className="group p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                  <stat.icon className="text-blue-400 w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-1 space-y-6">
            {/* Add Task */}
            <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-400" />
                Add New Task
              </h2>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
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
                        onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white flex justify-between items-center"
                      >
                        <span className="capitalize">{newTask.priority}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {showPriorityDropdown && (
                        <div className="absolute z-10 mt-2 w-full bg-slate-900 border border-blue-500/30 rounded-xl shadow-lg overflow-hidden">
                          {(['low', 'medium', 'high'] as const).map(priority => (
                            <button
                              key={priority}
                              type="button"
                              onClick={() => {
                                setNewTask({ ...newTask, priority });
                                setShowPriorityDropdown(false);
                              }}
                              className={`block w-full text-left px-4 py-3 hover:bg-blue-500/20 transition-colors ${
                                priority === newTask.priority ? 'bg-blue-500/20' : ''
                              }`}
                            >
                              <span className={`capitalize ${
                                priority === 'high' ? 'text-red-400' :
                                priority === 'medium' ? 'text-yellow-400' :
                                'text-green-400'
                              }`}>
                                {priority}
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
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddTask}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 shadow-lg shadow-blue-500/30"
                >
                  {loading ? (
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
              </div>
            </div>

            {/* Productivity */}
            <div className="p-6 bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border border-cyan-500/20 rounded-2xl backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Productivity
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">Today's Completion</span>
                    <span className="text-sm font-medium text-cyan-400">
                      {todayTasks > 0 ? Math.round((completedTasks / todayTasks) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-900/50 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${todayTasks > 0 ? Math.round((completedTasks / todayTasks) * 100) : 0}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{completedTasks} of {todayTasks} tasks completed today</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm mb-6">
              <div className="flex flex-wrap gap-3">
                {(['all', 'today', 'upcoming', 'completed', 'highPriority'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      filter === f
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-blue-500/10 text-gray-300 hover:bg-blue-500/20 border border-blue-500/20'
                    }`}
                  >
                    {f === 'all' && 'All Tasks'}
                    {f === 'today' && 'Today'}
                    {f === 'upcoming' && 'Upcoming'}
                    {f === 'completed' && 'Completed'}
                    {f === 'highPriority' && 'High Priority'}
                  </button>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-6">
                {filter === 'all' && 'All Tasks'}
                {filter === 'today' && "Today's Tasks"}
                {filter === 'upcoming' && 'Upcoming Tasks'}
                {filter === 'completed' && 'Completed Tasks'}
                {filter === 'highPriority' && 'High Priority Tasks'}
                <span className="text-gray-400 text-base ml-2">({filteredTasks.length})</span>
              </h2>

              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Check className="text-blue-400 w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No tasks found</h3>
                  <p className="text-gray-400 mb-6">
                    {filter === 'completed' ? "You haven't completed any tasks yet." : "Add your first task to get started!"}
                  </p>
                  <button
                    onClick={() => setFilter('all')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/30"
                  >
                    View All Tasks
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTasks.map((task) => (
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
                          onChange={() => toggleTaskCompletion(task.id)}
                          className="mt-1 h-5 w-5 rounded border-blue-500/50 bg-slate-900/50 text-blue-600 focus:ring-blue-500"
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
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 text-gray-400 hover:text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteTask(task.id)}
                                className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDashboard;