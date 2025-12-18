import React, { useState } from 'react'
import Button from '../shared/Button'
import Select from '../shared/Select'
import { getFileById } from '../../mockData'

export default function LetterActionForm({ task, onClose }) {
  const file = getFileById(task.fileId)

  const [template, setTemplate] = useState('1')
  const [sendViaEmail, setSendViaEmail] = useState(true)

  const templatePreview = `Dear ${file?.employeeFirstName || '[Employee]'},

This letter is regarding your upcoming relocation...

${task.taskText}

Please contact us if you have any questions.

Best regards,
TRC Relocation Services`

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock action - in real app would send letter
    const method = sendViaEmail ? 'via email' : 'for printing'
    alert(`Letter sent ${method}!`)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Task Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">{task.taskName}</h4>
        <p className="text-sm text-gray-600">{task.taskText}</p>
        {file && (
          <div className="text-sm text-gray-600 mt-2">
            <p><span className="font-medium">File:</span> {file.fileNumber}</p>
            <p><span className="font-medium">Recipient:</span> {file.employeeFirstName} {file.employeeLastName}</p>
          </div>
        )}
      </div>

      {/* Template Selection */}
      <Select
        label="Letter Template *"
        value={template}
        onChange={setTemplate}
        options={[
          { value: '1', label: 'Welcome Letter' },
          { value: '2', label: 'Move Confirmation' },
          { value: '3', label: 'VIP Services Letter' },
          { value: '4', label: 'Destination Services Introduction' }
        ]}
      />

      {/* Template Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Letter Preview
        </label>
        <div className="border border-gray-300 rounded-md p-4 bg-white">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
            {templatePreview}
          </pre>
        </div>
      </div>

      {/* Send Options */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="sendViaEmail"
          checked={sendViaEmail}
          onChange={(e) => setSendViaEmail(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="sendViaEmail" className="ml-2 block text-sm text-gray-700">
          Send via email
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="secondary" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {sendViaEmail ? 'Send Letter' : 'Prepare for Print'}
        </Button>
      </div>
    </form>
  )
}
