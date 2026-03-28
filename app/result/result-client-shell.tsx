"use client";

import dynamic from "next/dynamic";

const ResultContent = dynamic(
  () =>
    import("./result-content").then((m) => ({ default: m.ResultContent })),
  {
    ssr: false,
    loading: () => (
      <main className="min-h-screen bg-[#F8FAFC] p-10 text-[#0A2643]">
        <div className="mx-auto max-w-4xl text-slate-600">読み込み中…</div>
      </main>
    ),
  }
);

export function ResultClientShell() {
  return <ResultContent />;
}
