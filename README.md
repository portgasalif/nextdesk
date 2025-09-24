# 🎫 NextDesk - IT Help Desk System

Sistem IT Help Desk yang dibangun dengan Next.js untuk mengelola tiket dan permintaan layanan IT.

## 📋 Fitur

### 👥 Employee (Karyawan)
- Submit tiket request baru
- Track status tiket yang sudah dibuat
- View history semua tiket
- Dashboard statistik personal

### 🔧 Admin
- Dashboard overview semua tiket
- Manage dan assign tiket ke teknisi
- Update status tiket (open, in progress, resolved, closed)
- View statistik keseluruhan

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **UI Components**: Custom components dengan Tailwind

## 📝 User Flow

1. **Landing Page**: Pilih login sebagai Admin atau User
2. **Employee Path**:
   - Submit request → Track tiket → View history
3. **Admin Path**:
   - Dashboard overview → Manage semua tiket → Update status

## 🔧 Development

Project ini menggunakan Next.js App Router dengan route groups untuk memisahkan area employee dan admin. Setiap area memiliki layout dan komponen yang berbeda sesuai kebutuhan role.