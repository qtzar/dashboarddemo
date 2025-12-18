import React from 'react'
import { taskRules } from '../mockData'
import Badge from '../components/shared/Badge'
import Button from '../components/shared/Button'
import { Plus } from 'lucide-react'

export default function TaskRules() {
  const activeRules = taskRules.filter(r => r.isActive)
  const inactiveRules = taskRules.filter(r => !r.isActive)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Rules</h1>
          <p className="text-gray-600 mt-1">
            Manage automated task creation rules
          </p>
        </div>
        <Button variant="primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Rule
        </Button>
      </div>

      {/* Active Rules */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Active Rules ({activeRules.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {activeRules.map(rule => (
            <div key={rule.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {rule.taskName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {rule.taskText}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant={rule.taskType}>{rule.taskType}</Badge>
                    <Badge variant={rule.priority}>{rule.priority}</Badge>
                    <Badge variant="neutral">{rule.service}</Badge>
                    {rule.subservice && (
                      <Badge variant="neutral">{rule.subservice}</Badge>
                    )}
                  </div>

                  <div className="bg-gray-100 rounded p-3 text-sm font-mono text-gray-700">
                    {rule.sqlTriggerLogic}
                  </div>
                </div>

                <div className="ml-4 flex flex-col gap-2">
                  <Button variant="secondary" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    Test
                  </Button>
                  <Button variant="danger" size="sm">
                    Deactivate
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inactive Rules */}
      {inactiveRules.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-500">
              Inactive Rules ({inactiveRules.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {inactiveRules.map(rule => (
              <div key={rule.id} className="p-6 opacity-60">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  {rule.taskName}
                </h3>
                <Badge variant="neutral">Inactive</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
