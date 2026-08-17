import Link from "next/link";
import type { Session } from "next-auth";

import { SignOutButton } from "@/components/layout/sign-out-button";
import { DASHBOARD_ROUTES } from "@/lib/constants";

export function Navbar({ session }: { session: Session | null }) {
  const dashboardHref = session?.user?.role
    ? DASHBOARD_ROUTES[session.user.role]
    : "/dashboard";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-heading text-2xl font-semibold tracking-tight text-white">
            FreelanceHub
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/gigs" className="transition hover:text-white">
              Browse gigs
            </Link>
            <Link href="/skill-test" className="transition hover:text-white">
              Skill test
            </Link>
            <Link href="/availability" className="transition hover:text-white">
              Availability
            </Link>
            <Link href="/estimator" className="transition hover:text-white">
              Estimator
            </Link>
            <Link href="/messages" className="transition hover:text-white">
              Messages
            </Link>
            <Link href="/reviews" className="transition hover:text-white">
              Reviews
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <Link
                href={dashboardHref}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
              >
                {session.user.name?.split(" ")[0] ?? "Dashboard"}
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-300 hover:text-cyan-100"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
              >
                Join now
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
