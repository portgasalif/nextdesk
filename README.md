# 🎫 NextDesk - IT Help Desk System

Sistem IT Help Desk yang dibangun dengan Next.js untuk mengelola tiket dan permintaan layanan IT.

## 📋 Fitur

### 👥 Employee
- Submit new IT support tickets
- Track ticket status
- View ticket history
- Personal dashboard statistics
- Submit and track leave requests

### 🔧 Admin
- Dashboard overview of all tickets
- Manage and assign tickets to technicians
- Update ticket status (open, in progress, resolved, closed)
- View overall statistics
- Approve/reject leave requests

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **UI Components**: Custom components dengan Tailwind

## 📝 User Flow

1. **Landing Page**: Login as Admin or Employee
2. **Employee Path**:
   - Submit requests → Track tickets → View history → Manage leave
3. **Admin Path**:
   - Dashboard overview → Manage all tickets → Update status → Approve leaves

## 🔧 Development

This project uses Next.js App Router with route groups to separate employee and admin areas. Each area has its own layout and components based on role requirements.