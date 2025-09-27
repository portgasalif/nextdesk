import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextDesk - IT Help Desk",
  description: "Sistem IT Help Desk untuk mengelola tiket dan permintaan layanan IT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
