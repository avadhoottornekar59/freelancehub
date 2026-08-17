import Link from "next/link";

import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="space-y-5">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Welcome back</p>
        <h1 className="font-heading text-5xl font-semibold text-white">
          Sign in to manage work, clients, and gigs.
        </h1>
        <p className="text-lg leading-8 text-slate-300">
          Pick up where you left off with the marketplace dashboard built for your role.
        </p>
        <p className="text-sm text-slate-400">
          Need an account?{" "}
          <Link href="/auth/register" className="text-cyan-200 underline-offset-4 hover:underline">
            Create one here
          </Link>
        </p>
      </div>
      <AuthForm mode="login" />
    </div>
  );
}
