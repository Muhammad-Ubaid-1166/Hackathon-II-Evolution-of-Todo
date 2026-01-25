'use client'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Priority = 'low' | 'medium' | 'high'
type ToastType = 'success' | 'error'

export function useToastTask() {
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'medium' as Priority,
    dueDate: '',
  })

  const addSuccessToast = () => toast.success('Task added successfully', {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const addErrorToast = (message: string) => toast.error(message, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const handleAddTask = (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!newTask.title.trim()) {
      addErrorToast('Task title is required')
      return false
    }

    addSuccessToast()
    return true
  }

  return {
    newTask,
    setNewTask,
    handleAddTask,
  }
}

const ToastWrapper = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

export default ToastWrapper

