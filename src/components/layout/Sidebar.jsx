import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, Settings } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Files', href: '/files', icon: FileText },
  { name: 'Task Rules', href: '/task-rules', icon: Settings }
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-primary-700 text-white flex flex-col">
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) => `
              flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
              ${isActive
                ? 'bg-primary-500 text-white'
                : 'text-primary-100 hover:bg-primary-600 hover:text-white'
              }
            `}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-primary-600">
        <p className="text-xs text-primary-200">
          ReloSource Dashboard v1.0
        </p>
      </div>
    </aside>
  )
}
