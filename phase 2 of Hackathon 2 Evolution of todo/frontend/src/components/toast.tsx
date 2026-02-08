"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, duration);
    }
  };

  const clearToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{ showToast, clearToasts }}>
      {children}
      <ToastContainer toasts={toasts} setToasts={setToasts} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  setToasts: React.Dispatch<React.SetStateAction<Toast[]>>;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, setToasts }) => {
  return (
    <div className="fixed top-6 right-6 z-50 space-y-3 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} setToasts={setToasts} />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  setToasts: React.Dispatch<React.SetStateAction<Toast[]>>;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, setToasts }) => {
  const removeToast = () => {
    setToasts(prev => prev.filter(t => t.id !== toast.id));
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <Check className="w-5 h-5 text-white" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-white" />;
      case 'info':
        return <Info className="w-5 h-5 text-white" />;
      default:
        return null;
    }
  };

  const getBackgroundClass = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-black';
      case 'error':
        return 'bg-black';
      case 'info':
        return 'bg-black';
      default:
        return 'bg-black';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`${getBackgroundClass()} border border-gray-800 rounded-lg shadow-lg p-4 flex items-start gap-3 min-w-[300px]`}
    >
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="text-white text-sm font-medium">{toast.message}</p>
      </div>
      <button
        onClick={removeToast}
        className="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// Custom hook for task-related toasts
export const useToastTask = () => {
  const { showToast } = useToast();

  const showTaskSuccess = (message: string = 'Task completed successfully') => {
    showToast(message, 'success');
  };

  const showTaskError = (message: string = 'Failed to complete task') => {
    showToast(message, 'error');
  };

  const showTaskInfo = (message: string) => {
    showToast(message, 'info');
  };

  return {
    showTaskSuccess,
    showTaskError,
    showTaskInfo,
  };
};

// Example usage component
export const ToastExample = () => {
  const { showToast } = useToast();

  return (
    <div className="p-6 space-y-4">
      <button
        onClick={() => showToast('Task added successfully', 'success')}
        className="px-4 py-2 bg-white text-black rounded-md font-medium"
      >
        Show Success Toast
      </button>
      <button
        onClick={() => showToast('Failed to add task', 'error')}
        className="px-4 py-2 bg-white text-black rounded-md font-medium"
      >
        Show Error Toast
      </button>
      <button
        onClick={() => showToast('Task reminder: Due tomorrow', 'info')}
        className="px-4 py-2 bg-white text-black rounded-md font-medium"
      >
        Show Info Toast
      </button>
    </div>
  );
};

export default ToastProvider;