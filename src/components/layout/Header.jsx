import React from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDown, User, LogOut } from 'lucide-react'
import { currentUser } from '../../mockData'

export default function Header() {
  return (
    <header className="bg-white border-b border-primary-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={`${import.meta.env.BASE_URL}trc-logo.svg`}
            alt="TRC Global Mobility"
            className="h-12"
          />
          <div className="border-l border-gray-300 pl-4">
            <h1 className="text-2xl font-bold text-primary-600">ReloSource</h1>
            <p className="text-sm text-gray-600">Task Management Dashboard</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white font-medium">
                {currentUser.firstName[0]}{currentUser.lastName[0]}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {currentUser.firstName} {currentUser.lastName}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-gray-900">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </header>
  )
}
