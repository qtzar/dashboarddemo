export const getTaskTypeIcon = (taskType) => {
  const icons = {
    call: '📞',
    email: '📧',
    voucher: '🧾',
    letter: '📄'
  }
  return icons[taskType] || '📋'
}

export const getTaskTypeName = (taskType) => {
  const names = {
    call: 'Call',
    email: 'Email',
    voucher: 'Voucher',
    letter: 'Letter'
  }
  return names[taskType] || taskType
}

export const getStatusName = (status) => {
  const names = {
    active: 'Active',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled'
  }
  return names[status] || status
}

export const getPriorityName = (priority) => {
  const names = {
    urgent: 'Urgent',
    high: 'High',
    normal: 'Normal',
    low: 'Low'
  }
  return names[priority] || priority
}

export const filterTasks = (tasks, filters) => {
  return tasks.filter(task => {
    // Status filter
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(task.status)) return false
    }

    // Task type filter
    if (filters.taskType && filters.taskType.length > 0) {
      if (!filters.taskType.includes(task.taskType)) return false
    }

    // Service filter
    if (filters.service && filters.service !== '') {
      if (task.service !== filters.service) return false
    }

    // Priority filter
    if (filters.priority && filters.priority.length > 0) {
      if (!filters.priority.includes(task.priority)) return false
    }

    // Search filter
    if (filters.search && filters.search !== '') {
      const searchLower = filters.search.toLowerCase()
      const matchesName = task.taskName.toLowerCase().includes(searchLower)
      const matchesText = task.taskText.toLowerCase().includes(searchLower)
      if (!matchesName && !matchesText) return false
    }

    // Due date range filter
    if (filters.dueDateFrom || filters.dueDateTo) {
      const taskDate = new Date(task.dueDate)
      if (filters.dueDateFrom && taskDate < new Date(filters.dueDateFrom)) return false
      if (filters.dueDateTo && taskDate > new Date(filters.dueDateTo)) return false
    }

    return true
  })
}

export const sortTasks = (tasks, sortBy = 'dueDate', sortOrder = 'asc') => {
  return [...tasks].sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]

    if (sortBy === 'dueDate') {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
    return 0
  })
}
