import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { files, currentUser } from '../mockData'
import { getClientById } from '../mockData'
import Badge from '../components/shared/Badge'
import { formatDate } from '../utils/dateHelpers'
import { FileText, Search } from 'lucide-react'

export default function Files() {
  const [search, setSearch] = useState('')

  // Filter files for current user
  const userFiles = files.filter(f => f.rcUserId === currentUser.id)

  // Apply search filter
  const filteredFiles = userFiles.filter(file => {
    if (!search) return true
    const searchLower = search.toLowerCase()
    return (
      file.fileNumber.toLowerCase().includes(searchLower) ||
      file.employeeFirstName.toLowerCase().includes(searchLower) ||
      file.employeeLastName.toLowerCase().includes(searchLower) ||
      getClientById(file.clientId)?.clientName.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Files</h1>
          <p className="text-gray-600 mt-1">
            {userFiles.length} relocation files assigned to you
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search files by number, employee name, or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm py-2 px-3 border"
          />
        </div>
      </div>

      {/* Files List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredFiles.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
            <p className="text-gray-600">
              Try adjusting your search term
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Move Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Est. Final Move
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFiles.map(file => {
                  const client = getClientById(file.clientId)
                  return (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/files/${file.id}`}
                          className="text-primary-600 hover:text-primary-800 font-medium"
                        >
                          {file.fileNumber}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {file.employeeFirstName} {file.employeeLastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {file.employeeEmail}
                            </div>
                          </div>
                          {file.isVip && (
                            <Badge variant="warning" className="ml-2">VIP</Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {client?.clientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.originCity}, {file.originState} → {file.destinationCity}, {file.destinationState}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(file.estimatedFinalMoveDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={file.fileStatus}>
                          {file.fileStatus}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
