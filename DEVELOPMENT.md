# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NextDesk is an IT Help Desk System built with Next.js for managing IT service tickets and employee leave requests. The system has two primary user roles: **Employee** (karyawan) and **Admin**.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Prisma commands
npx prisma generate          # Generate Prisma client (required after schema changes)
npx prisma db push           # Push schema changes to database
npx prisma db seed           # Seed database with initial data
npx prisma studio            # Open Prisma Studio GUI
```

**Important:** Always run `npx prisma generate` after modifying `prisma/schema.prisma` to regenerate the Prisma client. This prevents TypeScript errors about missing models.

## Architecture

### Tech Stack
- **Framework**: Next.js 15.5.4 with App Router and Turbopack
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS 4
- **Authentication**: bcryptjs for password hashing, localStorage for session management
- **UI Libraries**: react-hot-toast (notifications), react-spinners (loading states)

### Route Structure

The app uses Next.js route groups to separate employee and admin areas:

```
src/app/
├── (admin)/              # Admin-only routes
│   └── dashboardAdmin/   # Admin dashboard and pages
├── (employee)/           # Employee-only routes
│   ├── dashboardEmployee/   # Employee dashboard
│   ├── leaveRequest/        # Leave request management
│   └── profileEmployee/     # Employee profile
├── api/                  # API routes
│   ├── auth/            # Authentication endpoints
│   ├── requests/        # IT ticket endpoints
│   ├── leaves/          # Leave request endpoints
│   └── user/            # User management endpoints
├── auth/                # Public auth pages
└── page.tsx            # Login page (root)
```

Each route group has its own `layout.tsx` with role-specific navigation.

### Database Models

The system has three main Prisma models:

1. **User** - Stores user accounts with role-based access (admin/employee)
2. **Request** - IT help desk tickets submitted by employees
3. **Leave** - Leave/vacation requests with approval workflow

Key relationships:
- User → Request (1:many) - Users create tickets
- User → Request (admin assignment) - Admins are assigned tickets
- User → Leave (1:many) - Users submit leave requests
- User → Leave (approver) - Admins approve leaves

### Authentication Flow

- Users log in via `/` (login page) → redirected to role-specific dashboard
- User data stored in `localStorage` with key `"user"`
- All protected pages check `localStorage.getItem("user")` on mount
- No JWT or session tokens - simple localStorage-based auth

### API Conventions

All API routes follow RESTful patterns:

- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/register` - User registration
- **GET** `/api/requests?userId=X` - Fetch user's requests (with optional userId filter)
- **POST** `/api/requests` - Create new request
- **PATCH** `/api/requests/[id]` - Update request status
- **GET** `/api/leaves?userId=X` - Fetch leaves (with optional userId filter)
- **POST** `/api/leaves` - Create new leave request
- **POST** `/api/user/change-password` - Change user password

Query parameters are used for filtering (e.g., `?userId=123`). All endpoints return JSON with consistent structure:
- Success: `{ status: "success", data: {...} }`
- Error: `{ message: "error description" }` with appropriate HTTP status code

### Error Handling Patterns

Frontend pages use this standard error handling pattern:

```typescript
try {
  const response = await fetch('/api/endpoint', {...});
  const data = await response.json();

  if (response.ok) {
    toast.success("Success message");
    // Handle success
  } else {
    toast.error(data.message || "Fallback error message");
  }
} catch (error) {
  toast.error("An error occurred. Please try again.");
  console.error("Error context:", error);
} finally {
  setLoading(false);
}
```

Always show user-friendly toast notifications using `react-hot-toast`. Avoid exposing technical error details to users.

### Styling Conventions

The project uses consistent Tailwind utility classes:

- **Buttons**: `bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-950 hover:to-blue-900`
- **Cards**: `bg-white rounded-xl shadow-xl border border-slate-200`
- **Form inputs**: `px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500`
- **Tables**: Gradient header `bg-gradient-to-r from-slate-800 to-slate-900`, alternating rows with `even:bg-slate-50`
- **Status badges**: Color-coded with `bg-{color}-100 text-{color}-800 px-3 py-1.5 rounded-full`

### Date Formatting

Use this helper function for consistent Indonesian date formatting:

```typescript
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};
```

This formats dates as "24 Nov 2025" instead of raw ISO strings.

### Prisma Client Usage

Import the singleton Prisma client from `src/lib/prisma.ts`:

```typescript
import prisma from '@/lib/prisma';
```

This ensures a single Prisma client instance is used across the application, preventing connection pool exhaustion during development.

## Feature Areas

### IT Request System
- Employees submit tickets with subject, description, and category
- Admins view all tickets, assign them, and update status (pending → in progress → resolved → closed)
- Status tracking with color-coded badges

### Leave Request System
- Employees submit leave requests with type, date range, and reason
- Leave types: Annual Leave, Sick Leave, Emergency Leave, Other
- Admins can approve or reject requests (approval workflow)
- Tracks `approvedBy` field to record which admin approved the leave

### User Management
- Role-based access: `admin` or `employee` (default)
- Each employee has `annualLeaveQuota` (default: 12 days)
- Password changes via dedicated endpoint
- User profiles show name, department, and role

## Database Setup

The project requires PostgreSQL. Set environment variables:

```
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

After setting up the database, run migrations and seed data:

```bash
npx prisma db push
npx prisma db seed
```

The seed file (`prisma/seed.ts`) creates initial admin and employee users for testing.
