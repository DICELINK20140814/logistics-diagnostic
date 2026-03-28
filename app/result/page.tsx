import { Suspense } from "react";
import { ResultContent } from "./result-content";

/** クエリ `?data=` 依存のため静的プリレンダーを避ける（Vercel ビルド安定化） */
export const dynamic = "force-dynamic";

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
