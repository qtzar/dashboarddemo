import React from 'react'
import { Search, X } from 'lucide-react'
import Select from '../shared/Select'
import Button from '../shared/Button'

export default function TaskFilters({ filters, onFiltersChange }) {
  const updateFilter = (key, value) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key, value) => {
    const current = filters[key] || []
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    onFiltersChange({ ...filters, [key]: updated })
  }

  const clearFilters = () => {
    onFiltersChange({
      status: ['active', 'in_progress'],
      taskType: [],
      service: '',
      priority: [],
      search: '',
      dueDateFrom: '',
      dueDateTo: ''
    })
  }

  const hasActiveFilters = filters.taskType.length > 0 ||
    filters.service !== '' ||
    filters.priority.length > 0 ||
    filters.search !== '' ||
    filters.dueDateFrom !== '' ||
    filters.dueDateTo !== ''

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm py-2 px-3 border"
            />
          </div>
        </div>

        {/* Service Filter */}
        <Select
          label="Service"
          value={filters.service}
          onChange={(value) => updateFilter('service', value)}
          options={[
            { value: '', label: 'All Services' },
            { value: 'household_goods', label: 'Household Goods' },
            { value: 'home_sale', label: 'Home Sale' },
            { value: 'destination_services', label: 'Destination Services' },
            { value: 'expense_management', label: 'Expense Management' },
            { value: 'temp_housing', label: 'Temp Housing' }
          ]}
        />

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <div className="flex flex-wrap gap-2">
            {['urgent', 'high', 'normal', 'low'].map((priority) => (
              <button
                key={priority}
                onClick={() => toggleArrayFilter('priority', priority)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.priority.includes(priority)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <div className="flex flex-wrap gap-2">
            {['active', 'in_progress', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => toggleArrayFilter('status', status)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.status.includes(status)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Task Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Task Type</label>
          <div className="flex flex-wrap gap-2">
            {['call', 'email', 'voucher', 'letter'].map((type) => (
              <button
                key={type}
                onClick={() => toggleArrayFilter('taskType', type)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.taskType.includes(type)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
