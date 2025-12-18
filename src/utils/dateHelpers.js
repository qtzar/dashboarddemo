import { format, formatDistance, isToday, isPast, isFuture, parseISO, differenceInDays } from 'date-fns'

export const formatDate = (date) => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'MMM d, yyyy')
}

export const formatDateTime = (date) => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'MMM d, yyyy h:mm a')
}

export const formatRelativeDate = (date) => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return formatDistance(dateObj, new Date(), { addSuffix: true })
}

export const isOverdue = (dueDate) => {
  if (!dueDate) return false
  const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate
  return isPast(dateObj) && !isToday(dateObj)
}

export const isDueToday = (dueDate) => {
  if (!dueDate) return false
  const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate
  return isToday(dateObj)
}

export const getDueDateStatus = (dueDate) => {
  if (!dueDate) return { status: 'none', color: 'gray' }

  const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate
  const daysUntil = differenceInDays(dateObj, new Date())

  if (daysUntil < 0) {
    return { status: 'overdue', color: 'red', label: 'Overdue' }
  } else if (daysUntil === 0) {
    return { status: 'today', color: 'yellow', label: 'Due today' }
  } else if (daysUntil <= 3) {
    return { status: 'soon', color: 'orange', label: 'Due soon' }
  } else {
    return { status: 'upcoming', color: 'green', label: 'Upcoming' }
  }
}
