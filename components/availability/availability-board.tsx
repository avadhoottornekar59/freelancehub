"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function sameMonth(date: Date, month: Date) {
  return date.getMonth() === month.getMonth() && date.getFullYear() === month.getFullYear();
}

function buildMonthCells(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const prefix = first.getDay();
  const cells: Array<Date | null> = [];

  for (let index = 0; index < prefix; index += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= lastDay; day += 1) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

export function AvailabilityBoard({
  freelancerName,
  subtitle,
  initialDates,
  editable = false,
  storageKey,
}: {
  freelancerName: string;
  subtitle: string;
  initialDates: string[];
  editable?: boolean;
  storageKey?: string;
}) {
  const [month, setMonth] = useState(new Date(2026, 3, 1));
  const [selectedDates, setSelectedDates] = useState<string[]>(initialDates);

  useEffect(() => {
    if (!editable || !storageKey) {
      return;
    }

    const stored = window.localStorage.getItem(storageKey);

    if (stored) {
      setSelectedDates(JSON.parse(stored) as string[]);
    }
  }, [editable, storageKey]);

  useEffect(() => {
    if (!editable || !storageKey) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(selectedDates));
  }, [editable, selectedDates, storageKey]);

  const visibleDates = selectedDates
    .map((item) => new Date(item))
    .filter((date) => sameMonth(date, month))
    .map((date) => toIsoDate(date));

  const cells = buildMonthCells(month);

  function toggleDate(date: Date) {
    if (!editable) {
      return;
    }

    const key = toIsoDate(date);

    setSelectedDates((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key].sort(),
    );
  }

  return (
    <div className="surface space-y-5 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{freelancerName}</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-white">
            Availability calendar
          </h2>
          <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          >
            Prev
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.2em] text-slate-400">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {cells.map((cell, index) => {
          if (!cell) {
            return <div key={`empty-${index}`} className="aspect-square rounded-2xl bg-white/[0.03]" />;
          }

          const key = toIsoDate(cell);
          const active = visibleDates.includes(key);

          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleDate(cell)}
              className={cn(
                "aspect-square rounded-2xl border text-sm transition",
                active
                  ? "border-cyan-300 bg-cyan-300/15 text-cyan-50"
                  : "border-white/10 bg-white/[0.03] text-slate-300",
                editable ? "hover:border-cyan-300/50" : "cursor-default",
              )}
            >
              {cell.getDate()}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-sm text-slate-200">
        {editable
          ? "Click any date to mark yourself available or unavailable in this demo planner. The selection is stored in this browser only."
          : "Highlighted dates show when this freelancer is available in the current demo schedule."}
      </div>
    </div>
  );
}
