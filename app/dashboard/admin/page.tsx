import { redirect } from "next/navigation";

import { requireUser } from "@/lib/access";
import { connectToDatabase } from "@/lib/db";
import { demoAdminStats } from "@/lib/demo-data";
import { isDatabaseConfigured } from "@/lib/env";
import Gig from "@/models/Gig";
import Order from "@/models/Order";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const user = await requireUser(["admin"]);

  if (!user) {
    redirect("/dashboard");
  }

  let userCount = demoAdminStats.users;
  let gigCount = demoAdminStats.gigs;
  let orderCount = demoAdminStats.orders;

  if (isDatabaseConfigured()) {
    await connectToDatabase();
    [userCount, gigCount, orderCount] = await Promise.all([
      User.countDocuments(),
      Gig.countDocuments(),
      Order.countDocuments(),
    ]);
  }

  return (
    <div className="space-y-8">
      <section className="surface space-y-4 p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Admin dashboard</p>
        <h1 className="font-heading text-4xl font-semibold text-white">
          Control tower for FreelanceHub
        </h1>
        <p className="max-w-3xl text-slate-300">
          Today’s batch focuses on auth and the core gig flow, so this admin view is a lightweight summary until moderation and analytics land next.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="surface p-6">
          <p className="text-sm text-slate-300">Users</p>
          <p className="mt-2 text-4xl font-semibold text-white">{userCount}</p>
        </div>
        <div className="surface p-6">
          <p className="text-sm text-slate-300">Gigs</p>
          <p className="mt-2 text-4xl font-semibold text-white">{gigCount}</p>
        </div>
        <div className="surface p-6">
          <p className="text-sm text-slate-300">Orders</p>
          <p className="mt-2 text-4xl font-semibold text-white">{orderCount}</p>
        </div>
      </div>
    </div>
  );
}
