# 🎫 NextDesk - IT Help Desk System

Modern IT help desk ticketing system for managing support requests and leave approvals. Built with Next.js 15, TypeScript, and PostgreSQL.

## 📋 Features

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
- **UI Components**: Custom components with Tailwind

## 🚀 Setup

### Prerequisites
- Node.js 18+
- PostgreSQL

### Installation

```bash
# Clone repo
git clone https://github.com/portgasalif/nextdesk.git
cd nextdesk

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database URL

# Run database migrations
npx prisma migrate dev

# Start dev server
npm run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nextdesk"
```

## 📝 User Flow

1. **Landing Page**: Login as Admin or Employee
2. **Employee Path**:
   - Submit requests → Track tickets → View history → Manage leave
3. **Admin Path**:
   - Dashboard overview → Manage all tickets → Update status → Approve leaves

## ☁️ Cloud Deployment

NextDesk is deployed on **[Vercel](https://vercel.com)** and is live at [https://nextdesk-cyan.vercel.app](https://nextdesk-cyan.vercel.app).

### Cloud Capabilities

| Capability | Provider | Details |
|---|---|---|
| **Hosting & CDN** | Vercel | Global edge network, automatic HTTPS, zero-config deploys |
| **Serverless API** | Vercel Functions | Next.js API routes (`/api/*`) run as serverless functions |
| **Database** | PostgreSQL (cloud) | Managed PostgreSQL; configure via `DATABASE_URL` and `DIRECT_URL` |
| **CI/CD** | Vercel + GitHub | Automatic preview and production deployments on every push |

### Environment Variables for Cloud

Set the following environment variables in your Vercel project settings:

```env
DATABASE_URL="postgresql://user:password@host:5432/nextdesk?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/nextdesk"
```

> `DATABASE_URL` is used by Prisma at runtime (supports connection pooling via PgBouncer).
> `DIRECT_URL` is used by Prisma for migrations and schema pushes.

## 🔧 Development

This project uses Next.js App Router with route groups to separate employee and admin areas. Each area has its own layout and components based on role requirements.

---
