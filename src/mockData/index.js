export { users, currentUser } from './users'
export { vendors } from './vendors'
export { clients } from './clients'
export { files } from './files'
export { tasks } from './tasks'
export { taskRules } from './taskRules'

import { files } from './files'
import { clients } from './clients'
import { users } from './users'
import { vendors } from './vendors'
import { tasks } from './tasks'

// Helper functions to get related data
export const getFileById = (fileId) => {
  return files.find(f => f.id === parseInt(fileId))
}

export const getClientById = (clientId) => {
  return clients.find(c => c.id === clientId)
}

export const getUserById = (userId) => {
  return users.find(u => u.id === userId)
}

export const getVendorById = (vendorId) => {
  return vendors.find(v => v.id === vendorId)
}

export const getTasksByFileId = (fileId) => {
  return tasks.filter(t => t.fileId === parseInt(fileId))
}

export const getTasksByUserId = (userId) => {
  return tasks.filter(t => t.assignedToUserId === parseInt(userId))
}
