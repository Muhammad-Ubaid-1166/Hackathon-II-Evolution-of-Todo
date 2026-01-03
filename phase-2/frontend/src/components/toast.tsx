'use client'
import { useState } from 'react'

type Priority = 'low' | 'medium' | 'high'
type ToastType = 'success' | 'error'

export function useToastTask() {
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'medium' as Priority,
    dueDate: '',
  })

  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)

  const handleAddTask = (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!newTask.title.trim()) {
      setToast({ message: 'Task title is required', type: 'error' })
      return false
    }

    setToast({ message: 'Task added successfully', type: 'success' })
    return true
  }

  return {
    newTask,
    setNewTask,
    toast,
    setToast,
    handleAddTask,
  }
}
