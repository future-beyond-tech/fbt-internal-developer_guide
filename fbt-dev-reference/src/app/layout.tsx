import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FBT Partner — Developer Reference",
  description: "Complete backend & frontend development reference for FBT Partner. Patterns, standards, and best practices for .NET, Python, Rust, React, Next.js 15, and TypeScript.",
  keywords: ["FBT", "development", "reference", "backend", "frontend", "Next.js", ".NET", "Python", "Rust", "TypeScript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
