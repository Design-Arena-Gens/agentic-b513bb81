import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design Arena Tournament Explorer",
  description:
    "Dive into the Design Arena tournament: inspect prompts, compare model generations, and review head-to-head rankings."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
