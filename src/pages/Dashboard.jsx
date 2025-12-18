import React, { useState, useMemo } from 'react'
import DashboardStats from '../components/dashboard/DashboardStats'
import TaskFilters from '../components/dashboard/TaskFilters'
import TaskList from '../components/dashboard/TaskList'
import { tasks, currentUser } from '../mockData'
import { filterTasks, sortTasks } from '../utils/taskHelpers'

export default function Dashboard() {
  const [filters, setFilters] = useState({
    status: ['active', 'in_progress'],
    taskType: [],
    service: '',
    priority: [],
    search: '',
    dueDateFrom: '',
    dueDateTo: ''
  })

  // Filter tasks for current user
  const userTasks = useMemo(() => {
    return tasks.filter(task => task.assignedToUserId === currentUser.id)
  }, [])

  // Apply filters
  const filteredTasks = useMemo(() => {
    const filtered = filterTasks(userTasks, filters)
    return sortTasks(filtered, 'dueDate', 'asc')
  }, [userTasks, filters])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-600 mt-1">
          Manage and track your assigned relocation tasks
        </p>
      </div>

      <DashboardStats tasks={userTasks} />

      <TaskFilters filters={filters} onFiltersChange={setFilters} />

      <TaskList tasks={filteredTasks} />
    </div>
  )
}
