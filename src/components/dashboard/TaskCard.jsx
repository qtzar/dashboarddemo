import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from '@headlessui/react'
import { Phone, Mail, Receipt, FileText, MoreVertical, CheckCircle2, X, Clock, AlertCircle } from 'lucide-react'
import Badge from '../shared/Badge'
import { formatDate, getDueDateStatus } from '../../utils/dateHelpers'
import { getFileById, getClientById, getVendorById } from '../../mockData'
import TaskActionModal from '../tasks/TaskActionModal'

const taskTypeIcons = {
  call: Phone,
  email: Mail,
  voucher: Receipt,
  letter: FileText
}

export default function TaskCard({ task }) {
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [actionType, setActionType] = useState(null)

  const file = getFileById(task.fileId)
  const client = file ? getClientById(file.clientId) : null
  const vendor = task.vendorId ? getVendorById(task.vendorId) : null
  const dueDateStatus = getDueDateStatus(task.dueDate)
  const TaskTypeIcon = taskTypeIcons[task.taskType]

  const openActionModal = (type) => {
    setActionType(type)
    setIsActionModalOpen(true)
  }

  const getActionButtons = () => {
    switch (task.taskType) {
      case 'call':
        return [
          { label: 'Attempted', action: () => openActionModal('call_attempted') },
          { label: 'Completed', action: () => openActionModal('call_completed') }
        ]
      case 'email':
        return [
          { label: 'Send Email', action: () => openActionModal('email_send') }
        ]
      case 'voucher':
        return [
          { label: 'Create Voucher', action: () => openActionModal('voucher_create') }
        ]
      case 'letter':
        return [
          { label: 'Send Letter', action: () => openActionModal('letter_send') }
        ]
      default:
        return []
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2 rounded-lg ${
                dueDateStatus.status === 'overdue' ? 'bg-danger-100' :
                dueDateStatus.status === 'today' ? 'bg-warning-100' :
                'bg-primary-100'
              }`}>
                <TaskTypeIcon className={`h-5 w-5 ${
                  dueDateStatus.status === 'overdue' ? 'text-danger-600' :
                  dueDateStatus.status === 'today' ? 'text-warning-600' :
                  'text-primary-600'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {task.taskName}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {task.taskText}
                </p>

                {/* File and Client Info */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                  {file && (
                    <Link
                      to={`/files/${file.id}`}
                      className="hover:text-primary-600 font-medium"
                    >
                      {file.fileNumber}
                    </Link>
                  )}
                  {client && (
                    <span>{client.clientName}</span>
                  )}
                  {file && (
                    <span>
                      {file.employeeFirstName} {file.employeeLastName}
                      {file.isVip && (
                        <Badge variant="warning" className="ml-2">VIP</Badge>
                      )}
                    </span>
                  )}
                  {vendor && (
                    <span className="flex items-center">
                      <span className="text-gray-500 mr-1">Vendor:</span>
                      {vendor.name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant={task.status}>{task.status.replace('_', ' ')}</Badge>
              <Badge variant={task.taskType}>{task.taskType}</Badge>
              <Badge variant={task.priority}>{task.priority}</Badge>
              {task.service && (
                <Badge variant="neutral">{task.service.replace('_', ' ')}</Badge>
              )}
            </div>

            {/* Dates */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center">
                {dueDateStatus.status === 'overdue' ? (
                  <AlertCircle className="h-4 w-4 text-danger-600 mr-1" />
                ) : (
                  <Clock className="h-4 w-4 text-gray-500 mr-1" />
                )}
                <span className={`font-medium ${
                  dueDateStatus.status === 'overdue' ? 'text-danger-600' :
                  dueDateStatus.status === 'today' ? 'text-warning-600' :
                  'text-gray-700'
                }`}>
                  Due: {formatDate(task.dueDate)}
                  {dueDateStatus.status === 'overdue' && ' (Overdue)'}
                  {dueDateStatus.status === 'today' && ' (Today)'}
                </span>
              </div>

              {task.firstAttemptDate && (
                <span className="text-gray-600">
                  First attempt: {formatDate(task.firstAttemptDate)}
                </span>
              )}

              {task.completedDate && (
                <span className="text-success-600 flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Completed: {formatDate(task.completedDate)}
                </span>
              )}
            </div>
          </div>

          {/* Actions Menu */}
          {task.status !== 'completed' && task.status !== 'cancelled' && (
            <Menu as="div" className="relative ml-4">
              <Menu.Button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  {getActionButtons().map((button, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <button
                          onClick={button.action}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                        >
                          {button.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>

                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => alert('Task completed!')}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } group flex w-full items-center px-4 py-2 text-sm text-success-700`}
                      >
                        <CheckCircle2 className="mr-3 h-4 w-4" />
                        Complete Task
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => alert('Task cancelled!')}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } group flex w-full items-center px-4 py-2 text-sm text-danger-700`}
                      >
                        <X className="mr-3 h-4 w-4" />
                        Cancel Task
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          )}
        </div>
      </div>

      {isActionModalOpen && (
        <TaskActionModal
          task={task}
          actionType={actionType}
          isOpen={isActionModalOpen}
          onClose={() => setIsActionModalOpen(false)}
        />
      )}
    </>
  )
}
