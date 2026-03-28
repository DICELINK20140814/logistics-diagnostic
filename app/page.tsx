import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#0A2643]">
      <div className="border-b-4 border-[#CEC1A1]">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <img
            src="/logo.png"
            alt="ダイスリンク株式会社"
            className="h-10 w-auto"
          />
          <div className="text-sm font-medium tracking-wide">
            ダイスリンク株式会社
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-3xl">
          <div className="mb-4 inline-block rounded-full border border-[#CEC1A1] px-4 py-1 text-sm text-[#0A2643]">
            Logistics Profit Diagnostic
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            物流事業 利益改善診断
          </h1>
          <p className="mb-10 text-lg leading-8 text-slate-600">
            運送・倉庫・3PL事業の現状をもとに、
            利益改善ポテンシャルと主要な改善論点を可視化します。
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/diagnostic"
              className="rounded-xl bg-[#0A2643] px-8 py-4 text-white transition hover:opacity-90"
            >
              診断を開始する
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-[#CEC1A1]">
              対象
            </div>
            <div className="text-base leading-7 text-slate-700">
              運送会社 / 倉庫会社 / 複合会社 / 3PL
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-[#CEC1A1]">
              出力
            </div>
            <div className="text-base leading-7 text-slate-700">
              利益改善余地、改善論点TOP3、優先アクション
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-[#CEC1A1]">
              用途
            </div>
            <div className="text-base leading-7 text-slate-700">
              営業ヒアリング、初回提案、経営層対話
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
