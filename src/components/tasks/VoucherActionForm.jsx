import React, { useState } from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'
import Select from '../shared/Select'
import { getFileById, getVendorById } from '../../mockData'

export default function VoucherActionForm({ task, onClose }) {
  const file = getFileById(task.fileId)
  const vendor = task.vendorId ? getVendorById(task.vendorId) : null

  const defaultPayTo = vendor ? vendor.name : (file ? `${file.employeeFirstName} ${file.employeeLastName}` : '')

  const [payTo, setPayTo] = useState(defaultPayTo)
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock action - in real app would create voucher
    alert(`Voucher created for ${payTo} - $${amount}`)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Task Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">{task.taskName}</h4>
        <p className="text-sm text-gray-600 mb-2">{task.taskText}</p>
        {file && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">File:</span> {file.fileNumber}
          </p>
        )}
      </div>

      {/* Voucher Fields */}
      <Input
        label="Pay To *"
        value={payTo}
        onChange={setPayTo}
        required
        placeholder="Payee name"
      />

      <Input
        label="Amount *"
        type="number"
        value={amount}
        onChange={setAmount}
        required
        placeholder="0.00"
      />

      <Select
        label="Category *"
        value={category}
        onChange={setCategory}
        options={[
          { value: '', label: 'Select category...' },
          { value: 'moving', label: 'Moving Services' },
          { value: 'storage', label: 'Storage' },
          { value: 'temp_housing', label: 'Temporary Housing' },
          { value: 'travel', label: 'Travel' },
          { value: 'home_sale', label: 'Home Sale' },
          { value: 'misc', label: 'Miscellaneous' }
        ]}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          placeholder="Describe the expense..."
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2 px-3 border"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="secondary" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Create Voucher
        </Button>
      </div>
    </form>
  )
}
