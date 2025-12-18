import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './pages/Dashboard'
import Files from './pages/Files'
import FileDetail from './pages/FileDetail'
import TaskRules from './pages/TaskRules'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="files" element={<Files />} />
        <Route path="files/:fileId" element={<FileDetail />} />
        <Route path="task-rules" element={<TaskRules />} />
      </Route>
    </Routes>
  )
}

export default App
