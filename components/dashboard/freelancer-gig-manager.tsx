"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { GIG_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface GigItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  deliveryTime: number;
  images: string[];
}

interface GigFormState {
  title: string;
  description: string;
  category: string;
  price: string;
  deliveryTime: string;
  images: string;
}

const emptyForm: GigFormState = {
  title: "",
  description: "",
  category: GIG_CATEGORIES[0],
  price: "1500",
  deliveryTime: "3",
  images: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
};

export function FreelancerGigManager({ gigs }: { gigs: GigItem[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingGigId, setEditingGigId] = useState<string | null>(null);
  const [formState, setFormState] = useState<GigFormState>(emptyForm);

  const sortedGigs = useMemo(() => gigs, [gigs]);

  function startEditing(gig: GigItem) {
    setEditingGigId(gig._id);
    setFormState({
      title: gig.title,
      description: gig.description,
      category: gig.category,
      price: String(gig.price),
      deliveryTime: String(gig.deliveryTime),
      images: gig.images.join("\n"),
    });
  }

  function resetForm() {
    setEditingGigId(null);
    setFormState(emptyForm);
    setError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formState,
        images: formState.images
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const endpoint = editingGigId ? `/api/gigs/${editingGigId}` : "/api/gigs";
      const method = editingGigId ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to save gig.");
      }

      resetForm();
      router.refresh();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to save gig.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(gigId: string) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/gigs/${gigId}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to delete gig.");
      }

      if (editingGigId === gigId) {
        resetForm();
      }

      router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={handleSubmit} className="surface space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
              Gig Studio
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-white">
              {editingGigId ? "Edit your gig" : "Create a new gig"}
            </h2>
          </div>
          {editingGigId ? (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white"
            >
              Cancel
            </button>
          ) : null}
        </div>

        <label className="block space-y-2">
          <span className="text-sm text-slate-200">Title</span>
          <input
            required
            value={formState.title}
            onChange={(event) =>
              setFormState((current) => ({ ...current, title: event.target.value }))
            }
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-slate-200">Description</span>
          <textarea
            required
            rows={5}
            value={formState.description}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="space-y-2">
            <span className="text-sm text-slate-200">Category</span>
            <select
              value={formState.category}
              onChange={(event) =>
                setFormState((current) => ({ ...current, category: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            >
              {GIG_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-200">Price (INR)</span>
            <input
              type="number"
              min="500"
              value={formState.price}
              onChange={(event) =>
                setFormState((current) => ({ ...current, price: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-200">Delivery days</span>
            <input
              type="number"
              min="1"
              value={formState.deliveryTime}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  deliveryTime: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm text-slate-200">Image URLs</span>
          <textarea
            rows={4}
            value={formState.images}
            onChange={(event) =>
              setFormState((current) => ({ ...current, images: event.target.value }))
            }
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          />
          <p className="text-xs text-slate-400">Use one URL per line.</p>
        </label>

        {error ? (
          <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : editingGigId ? "Update gig" : "Publish gig"}
        </Button>
      </form>

      <div className="space-y-4">
        <div className="surface p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            Your published gigs
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-white">
            Manage your offers
          </h2>
        </div>

        {sortedGigs.length === 0 ? (
          <div className="surface p-6 text-slate-300">
            You have not published a gig yet. Create one to start getting discovered.
          </div>
        ) : (
          sortedGigs.map((gig) => (
            <div key={gig._id} className="surface p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <h3 className="font-heading text-2xl font-semibold text-white">
                    {gig.title}
                  </h3>
                  <p className="text-sm text-slate-300">{gig.category}</p>
                  <p className="max-w-2xl text-sm leading-7 text-slate-300">
                    {gig.description}
                  </p>
                </div>
                <div className="space-y-3 text-left md:text-right">
                  <p className="text-lg font-semibold text-white">
                    {formatCurrency(gig.price)}
                  </p>
                  <p className="text-sm text-slate-300">{gig.deliveryTime} day delivery</p>
                  <div className="flex gap-3 md:justify-end">
                    <button
                      type="button"
                      onClick={() => startEditing(gig)}
                      className="rounded-full border border-white/15 px-4 py-2 text-sm text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleDelete(gig._id)}
                      className="rounded-full border border-rose-400/30 px-4 py-2 text-sm text-rose-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
