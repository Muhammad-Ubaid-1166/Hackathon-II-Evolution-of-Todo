'use client'
import { useState, useEffect, useCallback } from 'react';
import Greetings from '../../components/Greetings'
import { useToastTask } from '../../components/toast'
import { taskAPI, type Task } from '../../lib/api'
import { 
  StatsCards, 
  AddTaskForm, 
  ProductivityCard, 
  TaskFilters, 
  TaskList, 
  EditTaskModal 
} from '../../components/dashboard'

const TodoDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'completed' | 'highPriority'>('all');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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
      case 'highPriority':
        return task.priority === 'high';
      default:
        return true;
    }
  });

  // Handle add task
  const handleAddTask = async (title: string, priority: 'low' | 'medium' | 'high', dueDate: string) => {
    if (!title.trim()) {
      showToast('Task title is required', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await taskAPI.createTask({
        title,
        priority,
        dueDate: dueDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });
      showToast('Task added successfully', 'success');
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
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

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

      {/* Edit Modal */}
      <EditTaskModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={saveEditedTask}
      />

      <div className="relative max-w-7xl mx-auto p-4 md:p-8">
        <Greetings />

        <StatsCards
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
          todayTasks={todayTasks}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <AddTaskForm onAddTask={handleAddTask} submitting={submitting} />
            <ProductivityCard completedTasks={completedTasks} todayTasks={todayTasks} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <TaskFilters currentFilter={filter} onFilterChange={setFilter} />
            <TaskList
              tasks={filteredTasks}
              filter={filter}
              onToggleComplete={toggleTaskCompletion}
              onEdit={(task) => setEditingTask(task)}
              onDelete={deleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDashboard;

