"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { DemoAdminGig, DemoAdminOrder, DemoAdminUser } from "@/lib/demo-features";
import { formatCurrency } from "@/lib/utils";

export function AdminDemoPanel({
  initialUsers,
  initialOrders,
  initialGigs,
  revenue,
}: {
  initialUsers: DemoAdminUser[];
  initialOrders: DemoAdminOrder[];
  initialGigs: DemoAdminGig[];
  revenue: number;
}) {
  const [users, setUsers] = useState(initialUsers);
  const [orders, setOrders] = useState(initialOrders);
  const [gigs, setGigs] = useState(initialGigs);

  const activeUsers = users.filter((user) => user.status === "Active").length;
  const bannedUsers = users.filter((user) => user.status === "Banned").length;
  const flaggedOrders = orders.filter((order) => order.flagged).length;

  function toggleUserStatus(userId: string) {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Banned" ? "Active" : "Banned",
            }
          : user,
      ),
    );
  }

  function advanceOrderStatus(orderId: string) {
    setOrders((currentOrders) =>
      currentOrders.map((order) => {
        if (order.id !== orderId) {
          return order;
        }

        if (order.status === "Pending") {
          return { ...order, status: "In Progress", flagged: false };
        }

        if (order.status === "In Progress") {
          return { ...order, status: "Completed", flagged: false };
        }

        return { ...order, status: "Pending", flagged: true };
      }),
    );
  }

  function cycleGigStatus(gigId: string) {
    setGigs((currentGigs) =>
      currentGigs.map((gig) => {
        if (gig.id !== gigId) {
          return gig;
        }

        if (gig.status === "Live") {
          return { ...gig, status: "Featured" };
        }

        if (gig.status === "Featured") {
          return { ...gig, status: "Needs Review" };
        }

        return { ...gig, status: "Live" };
      }),
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="surface p-6">
          <p className="text-sm text-slate-300">Active users</p>
          <p className="mt-2 text-4xl font-semibold text-white">{activeUsers}</p>
        </div>
        <div className="surface p-6">
          <p className="text-sm text-slate-300">Banned users</p>
          <p className="mt-2 text-4xl font-semibold text-white">{bannedUsers}</p>
        </div>
        <div className="surface p-6">
          <p className="text-sm text-slate-300">Flagged orders</p>
          <p className="mt-2 text-4xl font-semibold text-white">{flaggedOrders}</p>
        </div>
        <div className="surface p-6">
          <p className="text-sm text-slate-300">Platform revenue</p>
          <p className="mt-2 text-4xl font-semibold text-white">{formatCurrency(revenue)}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="surface space-y-5 p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">User moderation</p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-white">
              Review user health and access
            </h2>
          </div>
          <div className="space-y-4">
            {users.map((user) => (
              <article
                key={user.id}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{user.name}</p>
                    <p className="mt-1 text-sm text-slate-300">
                      {user.role} in {user.city}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-cyan-100">
                      {user.gigs} gigs listed | {user.rating}/5 rating
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
                      {user.status}
                    </span>
                    <Button type="button" variant="secondary" onClick={() => toggleUserStatus(user.id)}>
                      {user.status === "Banned" ? "Unban user" : "Ban user"}
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="surface space-y-4 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Order watchlist</p>
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{order.gigTitle}</p>
                      <p className="mt-1 text-sm text-slate-300">
                        {order.clientName} with {order.freelancerName}
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-300/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-100">
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-slate-300">
                      {formatCurrency(order.amount)} {order.flagged ? "| flagged" : "| clean"}
                    </p>
                    <Button type="button" variant="secondary" onClick={() => advanceOrderStatus(order.id)}>
                      Advance status
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface space-y-4 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Gig control</p>
            <div className="space-y-3">
              {gigs.map((gig) => (
                <div
                  key={gig.id}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
                >
                  <p className="font-semibold text-white">{gig.title}</p>
                  <p className="mt-1 text-sm text-slate-300">
                    {gig.freelancerName} | {gig.category}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
                      {gig.status}
                    </span>
                    <Button type="button" variant="secondary" onClick={() => cycleGigStatus(gig.id)}>
                      Change status
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
