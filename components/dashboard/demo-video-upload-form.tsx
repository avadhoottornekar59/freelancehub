"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function DemoVideoUploadForm() {
  const [fileName, setFileName] = useState("");
  const [showToast, setShowToast] = useState(false);

  function handleUpload() {
    if (!fileName) {
      return;
    }

    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2400);
  }

  return (
    <div className="relative space-y-6">
      {showToast ? (
        <div className="fixed right-4 top-4 z-50 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm font-medium text-emerald-100 shadow-glow">
          Video uploaded successfully!
        </div>
      ) : null}

      <div className="surface space-y-5 p-6 sm:p-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Video intro</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-white">
            Add a freelancer intro video
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            This is a visual-only demo. Choose any local video file and trigger the upload toast to preview the future workflow.
          </p>
        </div>

        <label className="block space-y-3">
          <span className="text-sm text-slate-200">Select a video file</span>
          <input
            type="file"
            accept="video/*"
            onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
            className="block w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950"
          />
        </label>

        <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-sm text-slate-300">
          {fileName ? `Selected file: ${fileName}` : "No file selected yet."}
        </div>

        <Button type="button" onClick={handleUpload} disabled={!fileName}>
          Upload Video
        </Button>
      </div>
    </div>
  );
}
