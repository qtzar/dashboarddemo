import React from 'react'
import TaskCard from './TaskCard'
import { FileQuestion } from 'lucide-react'

export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <FileQuestion className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-600">
          Try adjusting your filters to see more tasks
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
        </h3>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
