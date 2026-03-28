"use client";

import { useMemo, useState } from "react"; import { useRouter } from "next/navigation";

type BusinessType = "transport" | "warehouse" | "hybrid" | "tpl";

type DriverKey =
  | "profitability"
  | "pricing"
  | "dispatch"
  | "asset_utilization"
  | "warehouse_productivity"
  | "visibility"
  | "execution";

type Question = {
  id: string;
  section: string;
  text: string;
  driver: DriverKey;
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    section: "事業構造",
    text: "売上の大半は定期便・固定契約で構成されている",
    driver: "profitability",
  },
  {
    id: "q2",
    section: "事業構造",
    text: "特定顧客への依存度が高い（上位顧客で売上の30%以上）",
    driver: "profitability",
  },
  {
    id: "q3",
    section: "事業構造",
    text: "運送・倉庫・附帯業務の収益構造が明確に分かれている",
    driver: "visibility",
  },
  {
    id: "q4",
    section: "事業構造",
    text: "スポット案件と定期案件のバランスが適切に管理されている",
    driver: "profitability",
  },

  {
    id: "q5",
    section: "売上・採算構造",
    text: "案件（顧客・路線）ごとの粗利が把握できている",
    driver: "profitability",
  },
  {
    id: "q6",
    section: "売上・採算構造",
    text: "赤字案件がどれか明確に把握できている",
    driver: "profitability",
  },
  {
    id: "q7",
    section: "売上・採算構造",
    text: "赤字案件に対して改善または撤退の判断ができている",
    driver: "profitability",
  },
  {
    id: "q8",
    section: "売上・採算構造",
    text: "燃料費や人件費の上昇を価格に転嫁できている",
    driver: "pricing",
  },
  {
    id: "q9",
    section: "売上・採算構造",
    text: "附帯作業（待機・荷役など）を適切に請求できている",
    driver: "pricing",
  },
  {
    id: "q10",
    section: "売上・採算構造",
    text: "定期的に価格見直し（値上げ交渉）を行っている",
    driver: "pricing",
  },
  {
    id: "q11",
    section: "売上・採算構造",
    text: "顧客ごとの収益性に応じた取引条件の調整ができている",
    driver: "profitability",
  },

  {
    id: "q12",
    section: "運送オペレーション",
    text: "実車率（積載して走っている割合）が高い",
    driver: "dispatch",
  },
  {
    id: "q13",
    section: "運送オペレーション",
    text: "空車回送が最小化されている",
    driver: "dispatch",
  },
  {
    id: "q14",
    section: "運送オペレーション",
    text: "積載率（積み残し・空きスペース）が最適化されている",
    driver: "dispatch",
  },
  {
    id: "q15",
    section: "運送オペレーション",
    text: "配車は属人ではなくルール・システムで最適化されている",
    driver: "dispatch",
  },
  {
    id: "q16",
    section: "運送オペレーション",
    text: "待機時間（荷待ち・荷役待ち）が管理・削減されている",
    driver: "asset_utilization",
  },
  {
    id: "q17",
    section: "運送オペレーション",
    text: "ドライバーの拘束時間が適切に管理されている",
    driver: "asset_utilization",
  },
  {
    id: "q18",
    section: "運送オペレーション",
    text: "ドライバーごとの生産性の差が把握されている",
    driver: "asset_utilization",
  },

  {
    id: "q19",
    section: "倉庫オペレーション",
    text: "倉庫の坪効率（売上/坪）が最適化されている",
    driver: "warehouse_productivity",
  },
  {
    id: "q20",
    section: "倉庫オペレーション",
    text: "保管回転率が適切に管理されている",
    driver: "warehouse_productivity",
  },
  {
    id: "q21",
    section: "倉庫オペレーション",
    text: "入出庫作業の生産性（人時）が把握されている",
    driver: "warehouse_productivity",
  },
  {
    id: "q22",
    section: "倉庫オペレーション",
    text: "人員配置が物量に応じて最適化されている",
    driver: "warehouse_productivity",
  },
  {
    id: "q23",
    section: "倉庫オペレーション",
    text: "誤出荷やミスが低水準で抑えられている",
    driver: "warehouse_productivity",
  },

  {
    id: "q24",
    section: "可視化・管理基盤",
    text: "日次で売上・粗利が把握できている",
    driver: "visibility",
  },
  {
    id: "q25",
    section: "可視化・管理基盤",
    text: "車両・ドライバーの稼働状況が可視化されている",
    driver: "visibility",
  },
  {
    id: "q26",
    section: "可視化・管理基盤",
    text: "倉庫KPI（生産性・在庫など）が可視化されている",
    driver: "visibility",
  },
  {
    id: "q27",
    section: "可視化・管理基盤",
    text: "定期的な改善会議が実施されている",
    driver: "visibility",
  },

  {
    id: "q28",
    section: "改善実行力",
    text: "改善施策の責任者が明確に設定されている",
    driver: "execution",
  },
  {
    id: "q29",
    section: "改善実行力",
    text: "改善テーマの優先順位付けができている",
    driver: "execution",
  },
  {
    id: "q30",
    section: "改善実行力",
    text: "現場を巻き込んだ改善が継続的に行われている",
    driver: "execution",
  },
];

const DRIVER_LABELS: Record<DriverKey, string> = {
  profitability: "案件採算",
  pricing: "価格転嫁・請求適正化",
  dispatch: "配車効率",
  asset_utilization: "車両・人員稼働",
  warehouse_productivity: "倉庫生産性",
  visibility: "可視化・管理基盤",
  execution: "改善実行力",
};

const DRIVER_COMMENTS: Record<DriverKey, string> = {
  profitability:
    "案件別の収益性が十分に把握されておらず、赤字案件や低採算案件が利益を圧迫している可能性があります。",
  pricing:
    "燃料費・人件費・附帯作業に対する価格転嫁が不十分で、本来確保できるべき利益を取りこぼしている可能性があります。",
  dispatch:
    "配車の最適化が不十分で、空車回送や低積載が発生し、売上機会の損失およびコスト増につながっている可能性があります。",
  asset_utilization:
    "ドライバーの拘束時間や待機時間の最適化が不十分で、人員・車両の稼働効率が低下している可能性があります。",
  warehouse_productivity:
    "倉庫内の作業効率や人員配置が最適化されておらず、人件費に対して十分な生産性が出ていない可能性があります。",
  visibility:
    "案件別採算や稼働状況の可視化が不十分で、改善すべきポイントが特定できていない可能性があります。",
  execution:
    "改善施策の優先順位付けや実行体制が不十分で、改善余地があっても実行に移せていない可能性があります。",
};

const PRIORITY_ACTIONS: Record<DriverKey, string> = {
  profitability:
    "まずは案件別採算の可視化と、赤字案件の切り分け・改善から着手することが重要と考えられます。",
  pricing:
    "価格転嫁および附帯作業の請求適正化を進め、単価改善による利益確保から着手することが重要と考えられます。",
  dispatch:
    "配車の見直しとルート最適化により、実車率・積載率の改善から着手することが重要と考えられます。",
  asset_utilization:
    "ドライバーの拘束時間・待機時間の見直しを行い、稼働効率の改善から着手することが重要と考えられます。",
  warehouse_productivity:
    "倉庫内の人員配置および作業動線の見直しにより、生産性向上から着手することが重要と考えられます。",
  visibility:
    "まずはKPIの可視化と日次での管理体制を構築し、改善の基盤づくりから着手することが重要と考えられます。",
  execution:
    "改善テーマの優先順位付けと実行責任の明確化により、改善を継続的に回す体制構築から着手することが重要と考えられます。",
};

const WEIGHTS: Record<BusinessType, Record<DriverKey, number>> = {
  transport: {
    profitability: 1.2,
    pricing: 1.2,
    dispatch: 1.5,
    asset_utilization: 1.5,
    warehouse_productivity: 0.5,
    visibility: 1.0,
    execution: 1.0,
  },
  warehouse: {
    profitability: 1.2,
    pricing: 1.2,
    dispatch: 0.5,
    asset_utilization: 0.8,
    warehouse_productivity: 1.5,
    visibility: 1.2,
    execution: 1.0,
  },
  hybrid: {
    profitability: 1.3,
    pricing: 1.2,
    dispatch: 1.3,
    asset_utilization: 1.3,
    warehouse_productivity: 1.3,
    visibility: 1.2,
    execution: 1.0,
  },
  tpl: {
    profitability: 1.5,
    pricing: 1.3,
    dispatch: 1.2,
    asset_utilization: 1.2,
    warehouse_productivity: 1.2,
    visibility: 1.5,
    execution: 1.3,
  },
};

const SECTION_ORDER = [
  "事業構造",
  "売上・採算構造",
  "運送オペレーション",
  "倉庫オペレーション",
  "可視化・管理基盤",
  "改善実行力",
] as const;

function getImprovementRate(score: number) {
  if (score <= -1.5) return 0.06;
  if (score <= -1.0) return 0.05;
  if (score <= -0.5) return 0.04;
  if (score <= 0) return 0.03;
  return 0.02;
}

function formatOku(amount: number) {
  return `${(amount / 100000000).toFixed(1)}億円`;
}

export default function DiagnosticPage() {
  const router = useRouter();
  const [businessType, setBusinessType] = useState<BusinessType>("transport");
  const [annualRevenueOku, setAnnualRevenueOku] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, number>>(
    Object.fromEntries(QUESTIONS.map((q) => [q.id, 0]))
  );

  const groupedQuestions = useMemo(() => {
    return SECTION_ORDER.map((section) => ({
      section,
      items: QUESTIONS.filter((q) => q.section === section),
    }));
  }, []);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    const revenueOku = Number(annualRevenueOku);
    const revenue = Number.isFinite(revenueOku) && revenueOku > 0 ? revenueOku * 100000000 : 0;

    if (!revenue) {
      alert("年商（億円）を入力してください。");
      return;
    }

    const driverQuestionMap: Record<DriverKey, number[]> = {
      profitability: [],
      pricing: [],
      dispatch: [],
      asset_utilization: [],
      warehouse_productivity: [],
      visibility: [],
      execution: [],
    };

    QUESTIONS.forEach((q) => {
      driverQuestionMap[q.driver].push(answers[q.id] ?? 0);
    });

    const weightedDriverScores = Object.entries(driverQuestionMap).map(
      ([driver, scores]) => {
        const rawAverage =
          scores.length > 0
            ? scores.reduce((sum, current) => sum + current, 0) / scores.length
            : 0;

        const weight = WEIGHTS[businessType][driver as DriverKey];
        const weightedScore = rawAverage * weight;

        return {
          key: driver as DriverKey,
          label: DRIVER_LABELS[driver as DriverKey],
          rawAverage,
          weight,
          weightedScore,
          comment: DRIVER_COMMENTS[driver as DriverKey],
        };
      }
    );

    const totalScore =
      weightedDriverScores.reduce((sum, d) => sum + d.weightedScore, 0) /
      weightedDriverScores.length;

    const improvementRate = getImprovementRate(totalScore);
    const improvementAmount = revenue * improvementRate;

    const topDrivers = [...weightedDriverScores]
      .sort((a, b) => a.weightedScore - b.weightedScore)
      .slice(0, 3);

    const priorityAction = PRIORITY_ACTIONS[topDrivers[0].key];

    const payload = {
      businessType,
      annualRevenueOku: revenueOku,
      improvementRate,
      improvementAmount,
      topDrivers,
      priorityAction,
    };

    router.push(`/result?data=${encodeURIComponent(JSON.stringify(payload))}`);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0A2643]">
      <div className="border-b-4 border-[#CEC1A1] bg-white">
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

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-10">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">
            物流事業 利益改善診断
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600">
            物流事業者の事業構造・採算構造・運送運営・倉庫運営・管理基盤をもとに、
            利益改善余地と主要論点を可視化します。
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 text-lg font-semibold">基本情報</div>

          <div className="mb-8">
            <div className="mb-3 text-sm font-semibold text-slate-700">
              主な事業形態
            </div>
            <div className="grid gap-3 md:grid-cols-4">
              {[
                { value: "transport", label: "運送中心" },
                { value: "warehouse", label: "倉庫中心" },
                { value: "hybrid", label: "運送＋倉庫" },
                { value: "tpl", label: "3PL / 一括受託" },
              ].map((item) => (
                <label
                  key={item.value}
                  className={`cursor-pointer rounded-xl border p-4 text-sm transition ${
                    businessType === item.value
                      ? "border-[#CEC1A1] bg-[#0A2643] text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-[#CEC1A1]"
                  }`}
                >
                  <input
                    type="radio"
                    name="businessType"
                    value={item.value}
                    checked={businessType === item.value}
                    onChange={() => setBusinessType(item.value as BusinessType)}
                    className="hidden"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              年商（億円）
            </label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="例：50"
              value={annualRevenueOku}
              onChange={(e) => setAnnualRevenueOku(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#0A2643]"
            />
            <div className="mt-2 text-sm text-slate-500">
              例：50 と入力した場合、年商50億円として計算します。
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {groupedQuestions.map((group) => (
            <section
              key={group.section}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 border-l-4 border-[#CEC1A1] pl-4 text-xl font-semibold">
                {group.section}
              </div>

              <div className="space-y-6">
                {group.items.map((q, index) => (
                  <div key={q.id} className="rounded-xl border border-slate-100 p-5">
                    <div className="mb-4 text-sm font-semibold text-slate-800">
                      {q.id.replace("q", "Q")}
                      {`. `}
                      {q.text}
                    </div>

                    <div className="grid gap-2 md:grid-cols-5">
                      {[
                        { label: "十分できている", value: 1 },
                        { label: "一部できている", value: 0 },
                        { label: "課題あり", value: -1 },
                        { label: "大きな課題", value: -2 },
                        { label: "不明", value: 0 },
                      ].map((option, i) => (
                        <label
                          key={`${q.id}-${i}`}
                          className={`cursor-pointer rounded-lg border px-3 py-3 text-center text-sm transition ${
                            answers[q.id] === option.value
                              ? "border-[#CEC1A1] bg-[#0A2643] text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:border-[#CEC1A1]"
                          }`}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={option.value}
                            checked={answers[q.id] === option.value}
                            onChange={() => handleAnswerChange(q.id, option.value)}
                            className="hidden"
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="sticky bottom-0 mt-10 border-t border-[#CEC1A1] bg-white/95 py-6 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <div className="text-sm leading-7 text-slate-600">
              入力完了後、利益改善ポテンシャルと主要論点を算出します。
            </div>
            <button
              onClick={handleSubmit}
              className="rounded-xl bg-[#0A2643] px-8 py-4 text-white transition hover:opacity-90"
            >
              診断結果を表示する
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
