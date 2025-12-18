import React from 'react'
import { useParams } from 'react-router-dom'
import { getFileById, getClientById, getUserById, getTasksByFileId } from '../mockData'
import Badge from '../components/shared/Badge'
import { formatDate } from '../utils/dateHelpers'

export default function FileDetail() {
  const { fileId } = useParams()
  const file = getFileById(fileId)
  const client = file ? getClientById(file.clientId) : null
  const rc = file ? getUserById(file.rcUserId) : null
  const fileTasks = file ? getTasksByFileId(file.id) : []

  if (!file) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">File not found</h2>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* File Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{file.fileNumber}</h1>
            <p className="text-gray-600 mt-1">{client?.clientName}</p>
          </div>
          <Badge variant={file.fileStatus}>{file.fileStatus}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Employee Information</h3>
            <p className="text-gray-600">
              {file.employeeFirstName} {file.employeeLastName}
              {file.isVip && <Badge variant="warning" className="ml-2">VIP</Badge>}
            </p>
            <p className="text-gray-600">{file.employeeEmail}</p>
            <p className="text-gray-600">{file.employeePhone}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Move Details</h3>
            <p className="text-gray-600">
              From: {file.originCity}, {file.originState}
            </p>
            <p className="text-gray-600">
              To: {file.destinationCity}, {file.destinationState}
            </p>
            <p className="text-gray-600">
              Est. Final Move: {formatDate(file.estimatedFinalMoveDate)}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Assigned RC</h3>
            <p className="text-gray-600">
              {rc?.firstName} {rc?.lastName}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Budget</h3>
            <p className="text-gray-600">
              Allowance: ${file.totalAllowance?.toLocaleString()}
            </p>
            <p className="text-gray-600">
              Expenses: ${file.expensesToDate?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tasks ({fileTasks.length})</h2>
        {fileTasks.length === 0 ? (
          <p className="text-gray-600">No tasks for this file yet.</p>
        ) : (
          <div className="space-y-2">
            {fileTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium text-gray-900">{task.taskName}</p>
                  <p className="text-sm text-gray-600">Due: {formatDate(task.dueDate)}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={task.status}>{task.status}</Badge>
                  <Badge variant={task.taskType}>{task.taskType}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
