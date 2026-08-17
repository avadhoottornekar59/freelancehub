import { AdminDemoPanel } from "@/components/admin/admin-demo-panel";
import {
  demoAdminGigs,
  demoAdminOrders,
  demoAdminStatsExtended,
  demoAdminUsers,
} from "@/lib/demo-features";

export default function AdminDemoPage() {
  return (
    <div className="space-y-8">
      <section className="surface space-y-4 p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Admin Demo</p>
        <h1 className="font-heading text-4xl font-semibold text-white">
          Moderate users, gigs, and orders without a backend
        </h1>
        <p className="max-w-3xl text-slate-300">
          This page is intentionally demo-only. It shows how platform moderation can feel before you connect database-backed workflows and live audit logs.
        </p>
      </section>

      <AdminDemoPanel
        initialUsers={demoAdminUsers}
        initialOrders={demoAdminOrders}
        initialGigs={demoAdminGigs}
        revenue={demoAdminStatsExtended.revenue}
      />
    </div>
  );
}
