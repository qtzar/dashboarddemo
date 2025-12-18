import React, { useState } from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'
import { getFileById } from '../../mockData'

export default function CallActionForm({ task, actionType, onClose }) {
  const [notes, setNotes] = useState('')
  const [contactPerson, setContactPerson] = useState('')

  const file = getFileById(task.fileId)
  const isCompleted = actionType === 'call_completed'

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock action - in real app would make API call
    const action = isCompleted ? 'completed' : 'attempted'
    alert(`Call ${action}! Note has been recorded for this task.`)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Task and File Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">{task.taskName}</h4>
        <p className="text-sm text-gray-600 mb-2">{task.taskText}</p>
        {file && (
          <div className="text-sm text-gray-600">
            <p><span className="font-medium">File:</span> {file.fileNumber}</p>
            <p><span className="font-medium">Employee:</span> {file.employeeFirstName} {file.employeeLastName}</p>
            <p><span className="font-medium">Phone:</span> {file.employeePhone}</p>
            {file.employeeEmail && (
              <p><span className="font-medium">Email:</span> {file.employeeEmail}</p>
            )}
          </div>
        )}
      </div>

      {/* Form Fields */}
      <Input
        label="Contact Person"
        value={contactPerson}
        onChange={setContactPerson}
        placeholder="Who did you speak with?"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Call Notes *
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required
          rows={5}
          placeholder={isCompleted ? "Describe the call and outcomes..." : "Describe the attempt and next steps..."}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2 px-3 border"
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
        <p className="font-medium mb-1">Note will be created:</p>
        <p>Subject: {isCompleted ? 'Completed' : 'Attempted'} {task.taskName}</p>
        <p>Linked to: Task #{task.id}</p>
        <p>Timestamp: {new Date().toLocaleString()}</p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="secondary" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {isCompleted ? 'Complete Call' : 'Record Attempt'}
        </Button>
      </div>
    </form>
  )
}
