import Link from "next/link";

import { AuthForm } from "@/components/auth/auth-form";

export default function RegisterPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="space-y-5">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Join the marketplace</p>
        <h1 className="font-heading text-5xl font-semibold text-white">
          Create your FreelanceHub account and choose your side.
        </h1>
        <p className="text-lg leading-8 text-slate-300">
          Clients can browse curated gigs, freelancers can publish offers, and admins can use invite-based access.
        </p>
        <p className="text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-cyan-200 underline-offset-4 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
      <AuthForm mode="register" />
    </div>
  );
}
