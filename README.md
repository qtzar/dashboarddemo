# ReloSource Task Dashboard - Frontend Mockup

An interactive React prototype for the TRC ReloSource task management dashboard.

## Overview

This mockup demonstrates the UI/UX for a task management system designed for Relocation Counselors (RCs) managing employee relocation files. The system allows RCs to view, filter, and take action on tasks across their assigned files.

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Headless UI** - Accessible UI components
- **Lucide React** - Icons
- **date-fns** - Date formatting

## Features Implemented

### 1. RC Dashboard
- **Dashboard Statistics**: Cards showing active tasks, tasks due today, overdue tasks, and completed tasks this week
- **Task Filters**: Multi-dimensional filtering by status, task type, service, priority, and search
- **Task List**: Comprehensive task cards with all relevant information
- **Task Cards**: Display task name, description, file info, employee details, vendor info (if applicable), due dates, status badges, and priority indicators

### 2. Task Actions
Four types of task actions with dedicated modal forms:
- **Call Actions**: Record attempted/completed calls with notes
- **Email Actions**: Send emails with pre-filled recipient info
- **Voucher Actions**: Create payment vouchers for vendors or employees
- **Letter Actions**: Send templated letters with previews

### 3. File Detail Page
- File header with employee and move information
- Client and RC assignment details
- Budget and expense tracking
- List of all tasks associated with the file

### 4. Task Rules Management
- View all active and inactive task rules
- See SQL trigger logic for each rule
- Rule categorization by service, task type, and priority
- Actions to edit, test, or deactivate rules

## Mock Data

The application includes comprehensive mock data:
- **12 Files**: Employee relocation files with various statuses and dates
- **40 Tasks**: Tasks in different states (active, overdue, due today, completed, cancelled)
- **13 Task Rules**: Automated rules for task creation
- **6 Users**: RC users and admins
- **10 Vendors**: Moving companies, real estate agencies, storage facilities, etc.
- **5 Clients**: Corporate clients

## Running the Application

### Development Server
```bash
npm run dev
```
Then open http://localhost:3000/ in your browser.

### Build for Production
```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # AppLayout, Header, Sidebar
│   ├── dashboard/       # Dashboard components (Stats, Filters, TaskCard, TaskList)
│   ├── tasks/           # Task action forms (Call, Email, Voucher, Letter)
│   └── shared/          # Reusable components (Button, Badge, Modal, etc.)
├── pages/               # Page components (Dashboard, FileDetail, TaskRules)
├── mockData/            # Mock data files
├── utils/               # Helper functions (date formatting, task filtering)
├── App.jsx              # Main app with routing
└── main.jsx             # Entry point
```

## Key Pages

### Dashboard (`/dashboard`)
Main RC interface showing all assigned tasks with comprehensive filtering.

### File Detail (`/files/:fileId`)
View individual file details and associated tasks. Example: `/files/1`

### Task Rules (`/task-rules`)
Admin interface for managing automated task creation rules.

## Design Decisions

### TRC Corporate Color Scheme
The application uses TRC's official corporate colors:
- **Primary/Teal** (#15585e) - Main brand color, navigation, active states, primary buttons
- **Dark Gray** (#2c2c2c) - Sidebar background, headers
- **Medium Green** (#4d8766) - Success states, completed tasks
- **Light Green** (#67a783) - Success accents and highlights
- **Gold** (#ba8a00) - Warnings, due soon indicators
- **Red-Orange** (#de3f18) - Danger, overdue tasks, urgent items

### Task Status Colors
- **Active**: Teal (#15585e)
- **In Progress**: Dark teal
- **Completed**: Green (#4d8766)
- **Cancelled**: Red-orange (#de3f18)
- **Overdue**: Red-orange with warning icon

### Priority Levels
- **Urgent**: Red-orange badge
- **High**: Gold badge
- **Normal**: Teal badge
- **Low**: Gray badge

### Task Type Colors
- **Call**: Teal
- **Email**: Green
- **Voucher**: Gold
- **Letter**: Teal

## Interactive Features

- ✅ Real-time task filtering
- ✅ Task action modals with forms
- ✅ Task status updates
- ✅ Navigation between pages
- ✅ Responsive design (mobile and desktop)
- ✅ Professional UI with proper loading and empty states
- ✅ Accessible components using Headless UI

## Current User

The mockup is configured with Sarah Johnson (sarah.johnson@trc.com) as the logged-in RC. Tasks are filtered to show only tasks assigned to her.

## Future Enhancements (Not in Mockup)

- Backend API integration
- Real authentication/authorization
- Database persistence
- Task rule evaluation engine
- Email sending functionality
- Real-time notifications via SSE/WebSockets
- Reporting and analytics
- User management
- Advanced file management features

## Notes

This is a **frontend mockup only**. All data is stored in memory and will reset on page refresh. Actions (completing tasks, sending emails, etc.) show success messages but don't persist data or communicate with a backend.
