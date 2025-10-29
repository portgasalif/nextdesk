import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "NextDesk - IT Help Desk",
  description:
    "Sistem IT Help Desk untuk mengelola tiket dan permintaan layanan IT",
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
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              style: {
                background: "#dcfce7",
                color: "#166534",
                fontWeight: "600",
                borderRadius: "0.75rem",
                border: "1px solid #86efac",
              },
            },
            error: {
              style: {
                background: "#fee2e2",
                color: "#991b1b",
                fontWeight: "600",
                borderRadius: "0.75rem",
                border: "1px solid #fca5a5",
              },
            },
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
