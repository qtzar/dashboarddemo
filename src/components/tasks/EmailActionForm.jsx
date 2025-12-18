import React, { useState } from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'
import { getFileById, getVendorById } from '../../mockData'

export default function EmailActionForm({ task, onClose }) {
  const file = getFileById(task.fileId)
  const vendor = task.vendorId ? getVendorById(task.vendorId) : null

  const defaultRecipient = vendor ? vendor.contactEmail : (file?.employeeEmail || '')

  const [recipient, setRecipient] = useState(defaultRecipient)
  const [cc, setCc] = useState('')
  const [subject, setSubject] = useState(`RE: ${task.taskName}`)
  const [body, setBody] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock action - in real app would send email
    alert(`Email sent to ${recipient}!`)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Task Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">{task.taskName}</h4>
        <p className="text-sm text-gray-600">{task.taskText}</p>
      </div>

      {/* Email Fields */}
      <Input
        label="To *"
        type="email"
        value={recipient}
        onChange={setRecipient}
        required
        placeholder="recipient@example.com"
      />

      <Input
        label="CC"
        type="email"
        value={cc}
        onChange={setCc}
        placeholder="cc@example.com"
      />

      <Input
        label="Subject *"
        value={subject}
        onChange={setSubject}
        required
        placeholder="Email subject"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message *
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={8}
          placeholder="Compose your email message..."
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2 px-3 border"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="secondary" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Send Email
        </Button>
      </div>
    </form>
  )
}
