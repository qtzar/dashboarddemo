import React from 'react'
import { AlertCircle, Calendar, CheckCircle2, ListTodo } from 'lucide-react'
import { isOverdue, isDueToday } from '../../utils/dateHelpers'

export default function DashboardStats({ tasks }) {
  const activeTasks = tasks.filter(t => t.status === 'active' || t.status === 'in_progress')
  const overdueTasks = activeTasks.filter(t => isOverdue(t.dueDate))
  const dueTodayTasks = activeTasks.filter(t => isDueToday(t.dueDate))

  const completedThisWeek = tasks.filter(t => {
    if (t.status !== 'completed' || !t.completedDate) return false
    const completedDate = new Date(t.completedDate)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return completedDate >= weekAgo
  }).length

  const stats = [
    {
      name: 'Active Tasks',
      value: activeTasks.length,
      icon: ListTodo,
      color: 'bg-primary-500',
      textColor: 'text-primary-600'
    },
    {
      name: 'Due Today',
      value: dueTodayTasks.length,
      icon: Calendar,
      color: 'bg-warning-500',
      textColor: 'text-warning-600'
    },
    {
      name: 'Overdue',
      value: overdueTasks.length,
      icon: AlertCircle,
      color: 'bg-danger-500',
      textColor: 'text-danger-600'
    },
    {
      name: 'Completed This Week',
      value: completedThisWeek,
      icon: CheckCircle2,
      color: 'bg-success-500',
      textColor: 'text-success-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className={`text-3xl font-bold mt-2 ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
