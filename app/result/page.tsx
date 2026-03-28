import { Suspense } from "react";
import { ResultContent } from "./result-content";

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F8FAFC] p-10 text-[#0A2643]">
          <div className="mx-auto max-w-4xl text-slate-600">読み込み中…</div>
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
