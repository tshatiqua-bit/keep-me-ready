import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import NavUser from "@/components/NavUser";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keep Me Ready",
  description: "Daily bookkeeping drills to sharpen your skills.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <header className="bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link
              href="/"
              aria-label="Keep Me Ready — home"
              className="font-semibold text-base sm:text-lg tracking-tight text-indigo-600 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Keep Me Ready
            </Link>
            <nav aria-label="Main navigation" className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-slate-600">
              <Link
                href="/drill"
                className="hover:text-indigo-600 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                Drill
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-indigo-600 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                Dashboard
              </Link>
              <NavUser />
            </nav>
          </div>
        </header>

        <main id="main-content" className="flex-1">{children}</main>

        <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
          Keep Me Ready &mdash; Practice makes permanent.
        </footer>
      </body>
    </html>
  );
}
