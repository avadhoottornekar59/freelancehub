import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { SessionProvider } from "@/components/providers/session-provider";
import { auth } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "FreelanceHub",
  description:
    "A modern full-stack freelancer marketplace for clients, freelancers, and admins.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-ink text-white antialiased">
        <SessionProvider session={session}>
          <div className="relative isolate min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(12,188,212,0.22),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(250,176,5,0.2),_transparent_30%),linear-gradient(180deg,_#06111f_0%,_#09192b_55%,_#050b14_100%)]" />
            <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
            <Navbar session={session} />
            <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
