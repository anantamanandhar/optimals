import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell,
} from 'recharts';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  aiYtd, aiSpendByCloud, aiCloudTotals,
  aiMonthlyByService, aiMonthlyByCloud,
  aiTopServices, aiUsageByMonth,
  aiModelPie, aiBySubsidiary, aiEfficiencyKpi,
  aiUseCases, aiBreakdownRows,
  AI_CHART_MONTHS, AI_TABLE_MONTHS,
} from '../../data/aiUsageData';

// ── Formatters ────────────────────────────────────────────────────────────────
const fmtM    = (n) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}m`
                     : n >= 1_000     ? `$${(n / 1_000).toFixed(0)}k`
                     : `$${n}`;
const tickFmt = (v) => v >= 1_000_000 ? `$${(v/1_000_000).toFixed(0)}m`
                     : v >= 1_000     ? `$${(v/1_000).toFixed(0)}k`
                     : `$${v}`;
const fmtFull = (n) => `$${n.toLocaleString('en-US')}`;

// ── Service / cloud colours ───────────────────────────────────────────────────
const SERVICE_COLORS = {
  'Vertex AI':       '#1E3A5F',
  'Document AI':     '#2563EB',
  'Vision AI':       '#0D9488',
  'Azure OpenAI':    '#7C3AED',
  'Azure Cognitive': '#A78BFA',
  'Bedrock Claude':  '#F59E0B',
  'SageMaker':       '#FCD34D',
};
const CLOUD_COLORS = { GCP: '#0D9488', Azure: '#2563EB', AWS: '#F59E0B' };
const SUB_COLORS = {
  YouTube: '#1E3A5F', DeepMind: '#2563EB', Verily: '#0D9488', Other: '#94A3B8',
};
const MODEL_COLORS = {
  'Gemini 1.5 Pro':    '#0D9488',
  'GPT-4o':            '#2563EB',
  'Claude 3.5 Sonnet': '#7C3AED',
  'Claude 3 Haiku':    '#A78BFA',
  'GPT-4 Turbo':       '#60A5FA',
  'Other':             '#94A3B8',
};

// ── Filter Bar ────────────────────────────────────────────────────────────────
const FILTERS = [
  { label: 'Cost Date', active: true, value: 'is in the year 2024 or 2025' },
  { label: 'Bill To',         value: 'is any value' },
  { label: 'Subsidiary',      value: 'is any value' },
  { label: 'Department',      value: 'is any value' },
  { label: 'Cloud Vendor',    value: 'is any value' },
  { label: 'AI Service',      value: 'is any value' },
  { label: 'Model Name',      value: 'is any value' },
  { label: 'Region',          value: 'is any value' },
];

function FilterBar() {
  return (
    <div className="flex flex-wrap gap-3 mb-5 p-3 bg-white border border-gray-100 rounded-xl shadow-sm text-xs">
      {FILTERS.map(f => (
        <div key={f.label} className="flex flex-col gap-0.5">
          <span className="text-[10px] text-gray-500">{f.label}</span>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded border cursor-pointer min-w-[110px] ${
            f.active ? 'bg-[#1E3A5F] text-white border-transparent' : 'border-gray-300 text-gray-600 hover:border-gray-400'
          }`}>
            <span className="flex-1 truncate text-[11px]">{f.value}</span>
            <ChevronDown size={10} className="shrink-0 opacity-70" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Panel wrapper ─────────────────────────────────────────────────────────────
function Panel({ title, children, className = '' }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 pt-3 pb-2 border-b border-gray-50">
          <h3 className="text-xs font-semibold text-gray-700 text-center">{title}</h3>
        </div>
      )}
      <div className="p-3">{children}</div>
    </div>
  );
}

// ── YTD + Spend by Cloud ──────────────────────────────────────────────────────
function LeftColumn() {
  return (
    <div className="flex flex-col gap-3">
      {/* YTD Card */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 text-center">
        <div className="text-3xl font-bold text-gray-900 tracking-tight">
          {fmtFull(aiYtd)}
        </div>
        <div className="text-xs text-teal-600 font-medium mt-1">YTD Spend</div>
        <div className="flex gap-2 mt-3 text-[10px] text-gray-500 justify-center flex-wrap">
          {Object.entries(aiCloudTotals).map(([k, v]) => (
            <span key={k} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: CLOUD_COLORS[k] }} />
              {k}: {fmtM(v)}
            </span>
          ))}
        </div>
      </div>

      {/* Spend by Cloud */}
      <Panel title="Spend by Cloud">
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={aiSpendByCloud} barGap={2} barCategoryGap="25%"
            margin={{ top: 10, right: 4, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="cloud" tick={{ fontSize: 10 }} />
            <YAxis tickFormatter={tickFmt} tick={{ fontSize: 9 }} width={44} />
            <Tooltip formatter={(v, name) => [fmtM(v), name]} contentStyle={{ fontSize: 10, borderRadius: 6 }} />
            {['YouTube', 'DeepMind', 'Verily', 'Other'].map(k => (
              <Bar key={k} dataKey={k} fill={SUB_COLORS[k]} radius={[2, 2, 0, 0]}
                label={{ position: 'top', fontSize: 8, formatter: v => v ? fmtM(v) : '' }} />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-2 mt-1">
          {['YouTube', 'DeepMind', 'Verily', 'Other'].map(k => (
            <span key={k} className="flex items-center gap-1 text-[10px] text-gray-500">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: SUB_COLORS[k] }} />
              {k}
            </span>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ── Monthly by AI Service ─────────────────────────────────────────────────────
function MonthlyByService() {
  return (
    <Panel title="Monthly by AI Service">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={aiMonthlyByService} margin={{ top: 4, right: 4, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 9 }} interval={2} angle={-25} textAnchor="end" />
          <YAxis tickFormatter={tickFmt} tick={{ fontSize: 9 }} width={50} />
          <Tooltip formatter={(v, name) => [fmtM(v), name]} contentStyle={{ fontSize: 10, borderRadius: 6 }} />
          {Object.keys(SERVICE_COLORS).map(k => (
            <Bar key={k} dataKey={k} stackId="a" fill={SERVICE_COLORS[k]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
        {Object.entries(SERVICE_COLORS).map(([k, c]) => (
          <span key={k} className="flex items-center gap-1 text-[10px] text-gray-500">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />{k}
          </span>
        ))}
      </div>
    </Panel>
  );
}

// ── Monthly by Cloud ─────────────────────────────────────────────────────────
function MonthlyByCloud() {
  return (
    <Panel title="Monthly by Cloud Provider">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={aiMonthlyByCloud} margin={{ top: 4, right: 4, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 9 }} interval={2} angle={-25} textAnchor="end" />
          <YAxis tickFormatter={tickFmt} tick={{ fontSize: 9 }} width={50} />
          <Tooltip formatter={(v, name) => [fmtM(v), name]} contentStyle={{ fontSize: 10, borderRadius: 6 }} />
          {Object.entries(CLOUD_COLORS).map(([k, c]) => (
            <Bar key={k} dataKey={k} stackId="a" fill={c} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-3 mt-1">
        {Object.entries(CLOUD_COLORS).map(([k, c]) => (
          <span key={k} className="flex items-center gap-1 text-[10px] text-gray-500">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />{k}
          </span>
        ))}
      </div>
    </Panel>
  );
}

// ── Top AI Services ───────────────────────────────────────────────────────────
function TopServicesChart() {
  return (
    <Panel title="Top AI Services">
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={aiTopServices} margin={{ top: 4, right: 8, left: 0, bottom: 100 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-40} textAnchor="end" interval={0} />
          <YAxis tickFormatter={tickFmt} tick={{ fontSize: 9 }} width={52} />
          <Tooltip formatter={(v) => [fmtM(v), 'Cost']} contentStyle={{ fontSize: 11, borderRadius: 6 }} />
          <Bar dataKey="cost" fill="#1E3A5F" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Panel>
  );
}

// ── AI Model Usage by Month ───────────────────────────────────────────────────
function AIUsageByMonth() {
  return (
    <Panel title="AI Usage by Month (Model)">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={aiUsageByMonth} margin={{ top: 4, right: 4, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 9 }} interval={2} angle={-25} textAnchor="end" />
          <YAxis tickFormatter={tickFmt} tick={{ fontSize: 9 }} width={50} />
          <Tooltip formatter={(v, name) => [fmtM(v), name]} contentStyle={{ fontSize: 10, borderRadius: 6 }} />
          {Object.keys(MODEL_COLORS).map(k => (
            <Bar key={k} dataKey={k} stackId="a" fill={MODEL_COLORS[k]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
        {Object.entries(MODEL_COLORS).map(([k, c]) => (
          <span key={k} className="flex items-center gap-1 text-[10px] text-gray-500">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />{k}
          </span>
        ))}
      </div>
    </Panel>
  );
}

// ── [Extra] AI Model Distribution ────────────────────────────────────────────
function ModelDistributionDonut() {
  return (
    <Panel title="AI Model Distribution">
      <div className="flex items-start gap-3">
        <div className="shrink-0" style={{ width: 140, height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={aiModelPie} cx="50%" cy="50%"
                innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={2}>
                {aiModelPie.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v.toFixed(1)}%`, '']} contentStyle={{ fontSize: 10, borderRadius: 6 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-1.5 pt-1">
          {aiModelPie.map((d, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[10px] text-gray-600">
              <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
              <span className="flex-1">{d.name}</span>
              <span className="font-medium">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ── [Extra] AI Adoption by Subsidiary ────────────────────────────────────────
function AdoptionBySubsidiary() {
  const max = Math.max(...aiBySubsidiary.map(r => r.cost));
  return (
    <Panel title="AI Spend by Subsidiary">
      <div className="space-y-2 mt-1">
        {aiBySubsidiary.map((r, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-24 shrink-0 text-gray-600 truncate">{r.name}</span>
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-[#1E3A5F]"
                style={{ width: `${(r.cost / max) * 100}%` }} />
            </div>
            <span className="w-14 text-right text-gray-700 font-medium shrink-0">{fmtM(r.cost)}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ── [Extra] Efficiency KPIs ───────────────────────────────────────────────────
function EfficiencyKpis() {
  const kpis = [
    { label: 'Avg Cost / 1M Tokens', value: aiEfficiencyKpi.costPer1MTokens, unit: 'USD', color: 'text-teal-600' },
    { label: 'Total API Calls',       value: `${aiEfficiencyKpi.totalApiCallsM}M`, unit: 'requests', color: 'text-blue-600' },
    { label: 'MoM Cost Growth',       value: `+${aiEfficiencyKpi.momGrowthPct}%`, unit: '',         color: 'text-amber-600' },
    { label: 'Active AI Users',       value: aiEfficiencyKpi.activeUsers.toLocaleString(), unit: '', color: 'text-purple-600' },
  ];
  return (
    <Panel title="Efficiency Metrics">
      <div className="grid grid-cols-2 gap-3 mt-1">
        {kpis.map((k, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
            <div className={`text-xl font-bold ${k.color}`}>{k.value}</div>
            <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{k.label}</div>
            {k.unit && <div className="text-[9px] text-gray-400">{k.unit}</div>}
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ── [Extra] AI Use Cases Table ────────────────────────────────────────────────
const STATUS_STYLE = {
  Production: 'bg-teal-100 text-teal-700',
  Pilot:      'bg-amber-100 text-amber-700',
  Research:   'bg-purple-100 text-purple-700',
};

function UseCasesTable() {
  return (
    <Panel title="AI Use Cases by Department">
      <table className="w-full text-xs mt-1">
        <thead>
          <tr className="border-b border-gray-100 text-gray-500 text-left">
            <th className="pb-2 font-normal">#</th>
            <th className="pb-2 font-normal">Subsidiary</th>
            <th className="pb-2 font-normal">Dept</th>
            <th className="pb-2 font-normal">Use Case</th>
            <th className="pb-2 font-normal">Model</th>
            <th className="pb-2 font-normal text-right">Monthly Cost</th>
            <th className="pb-2 font-normal text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {aiUseCases.map((r, i) => (
            <tr key={i} className={`border-b border-gray-50 ${i % 2 === 1 ? 'bg-gray-50/50' : ''}`}>
              <td className="py-1.5 text-gray-400">{i + 1}</td>
              <td className="py-1.5 text-blue-600 font-medium">{r.subsidiary}</td>
              <td className="py-1.5 text-gray-500">{r.dept}</td>
              <td className="py-1.5 text-gray-700">{r.useCase}</td>
              <td className="py-1.5 text-gray-600 font-mono text-[10px]">{r.model}</td>
              <td className="py-1.5 text-right text-gray-700 font-medium">{fmtM(r.monthlyCost)}</td>
              <td className="py-1.5 text-center">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${STATUS_STYLE[r.status]}`}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

// ── [Extra] Budget vs Actual ──────────────────────────────────────────────────
const BUDGET_DATA = aiBySubsidiary.map(r => ({
  name: r.name,
  Budget: Math.round(r.cost * 1.15),
  Actual: r.cost,
}));

function BudgetVsActual() {
  return (
    <Panel title="AI Budget vs Actual (YTD)">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={BUDGET_DATA} layout="vertical"
          margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
          <XAxis type="number" tickFormatter={tickFmt} tick={{ fontSize: 9 }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={80} />
          <Tooltip formatter={(v, name) => [fmtM(v), name]} contentStyle={{ fontSize: 10, borderRadius: 6 }} />
          <Bar dataKey="Budget" fill="#CBD5E1" radius={[0, 2, 2, 0]} />
          <Bar dataKey="Actual" fill="#1E3A5F" radius={[0, 2, 2, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-1">
        {[['Budget', '#CBD5E1'], ['Actual', '#1E3A5F']].map(([k, c]) => (
          <span key={k} className="flex items-center gap-1 text-[10px] text-gray-500">
            <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: c }} />{k}
          </span>
        ))}
      </div>
    </Panel>
  );
}

// ── Monthly Breakdown Table ───────────────────────────────────────────────────
function MonthlyBreakdownTable() {
  const [collapsed, setCollapsed] = useState(false);

  const colTotals = AI_TABLE_MONTHS.map((_, mi) =>
    aiBreakdownRows.reduce((s, r) => s + (r.months[mi] ?? 0), 0)
  );
  const grandTotal = aiBreakdownRows.reduce(
    (s, r) => s + r.months.reduce((rs, v) => rs + (v ?? 0), 0), 0
  );

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mt-4">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800 text-center">AI Cost – Monthly Breakdown</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="text-xs" style={{ minWidth: collapsed ? 500 : 1800 }}>
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-gray-500">
              <th className="sticky left-0 z-20 bg-gray-50 px-2 py-2 text-left font-normal w-6">#</th>
              <th className="sticky left-6 z-20 bg-gray-50 px-2 py-2 text-left font-normal min-w-[100px]">
                fo_initiative
              </th>
              <th className="sticky left-[106px] z-20 bg-gray-50 px-2 py-2 text-left font-normal min-w-[52px]">
                cloud_vendor
              </th>
              <th className="sticky left-[158px] z-20 bg-gray-50 px-2 py-2 text-left font-normal min-w-[130px]">
                subscription
              </th>
              <th className="sticky left-[288px] z-20 bg-gray-50 px-2 py-2 text-left font-normal min-w-[90px]">
                <button
                  onClick={() => setCollapsed(c => !c)}
                  className="flex items-center gap-0.5 hover:text-gray-700 font-normal"
                >
                  Cost D▼
                  <ChevronRight size={11} className={`transition-transform ${collapsed ? '' : 'rotate-90'}`} />
                </button>
              </th>
              {!collapsed && AI_TABLE_MONTHS.map(m => (
                <th key={m} className="px-2 py-2 text-center font-normal whitespace-nowrap">{m}</th>
              ))}
              <th className="px-2 py-2 text-right font-normal whitespace-nowrap">Total ▼</th>
            </tr>
            {!collapsed && (
              <tr className="border-b border-gray-100 text-gray-400">
                <th colSpan={5} className="sticky left-0 z-20 bg-white px-2 py-1 text-left font-normal">Supplier</th>
                {AI_TABLE_MONTHS.map(m => (
                  <th key={m} className="px-2 py-1 text-center font-normal text-[10px]">Cost ($)</th>
                ))}
                <th className="px-2 py-1 text-right font-normal text-[10px]">Cost ($)</th>
              </tr>
            )}
          </thead>
          <tbody>
            {aiBreakdownRows.map((row, ri) => {
              const rowTotal = row.months.reduce((s, v) => s + (v ?? 0), 0);
              return (
                <tr key={row.id}
                  className={`border-b border-gray-50 hover:bg-blue-50/20 ${ri % 2 === 1 ? 'bg-gray-50/30' : ''}`}>
                  <td className="sticky left-0 z-10 bg-inherit px-2 py-1.5 text-gray-400">{row.id}</td>
                  <td className="sticky left-6 z-10 bg-inherit px-2 py-1.5 text-blue-600 font-medium whitespace-nowrap">
                    {row.subsidiary}
                  </td>
                  <td className="sticky left-[106px] z-10 bg-inherit px-2 py-1.5 text-gray-500">{row.cloud}</td>
                  <td className="sticky left-[158px] z-10 bg-inherit px-2 py-1.5 text-gray-500 font-mono text-[10px]">
                    {row.service}
                  </td>
                  <td className="sticky left-[288px] z-10 bg-inherit px-2 py-1.5 text-gray-500">{row.driver}</td>
                  {!collapsed && row.months.map((v, mi) => (
                    <td key={mi} className="px-2 py-1.5 text-right whitespace-nowrap">
                      {v === null || v === 0
                        ? <span className="text-gray-300">∅</span>
                        : <span className="text-gray-700">{fmtFull(v)}</span>}
                    </td>
                  ))}
                  <td className="px-2 py-1.5 text-right text-gray-700 font-medium whitespace-nowrap">
                    {fmtFull(rowTotal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-200 bg-gray-50 font-semibold text-gray-700">
              <td colSpan={5} className="sticky left-0 z-10 bg-gray-50 px-2 py-2">Totals</td>
              {!collapsed && colTotals.map((t, i) => (
                <td key={i} className="px-2 py-2 text-right whitespace-nowrap">
                  {t > 0 ? fmtFull(t) : <span className="text-gray-300 font-normal">∅</span>}
                </td>
              ))}
              <td className="px-2 py-2 text-right whitespace-nowrap">{fmtFull(grandTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function AIUsagePage() {
  return (
    <div>
      <div className="mb-1">
        <p className="text-xs text-gray-400">Optimisation Hub / Products / AI</p>
        <h1 className="text-2xl font-bold text-gray-900">AI Usage – Overview</h1>
      </div>

      <FilterBar />

      {/* Row 1: YTD + Monthly by Service + Monthly by Cloud */}
      <div className="grid grid-cols-[3fr_5fr_5fr] gap-3 mb-3">
        <LeftColumn />
        <MonthlyByService />
        <MonthlyByCloud />
      </div>

      {/* Row 2: Top AI Services + AI Model Usage by Month */}
      <div className="grid grid-cols-[6fr_5fr] gap-3 mb-3">
        <TopServicesChart />
        <AIUsageByMonth />
      </div>

      {/* Row 3 [Imagined]: Model Distribution + Adoption + Efficiency KPIs */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <ModelDistributionDonut />
        <AdoptionBySubsidiary />
        <EfficiencyKpis />
      </div>

      {/* Row 4 [Imagined]: Use Cases + Budget vs Actual */}
      <div className="grid grid-cols-[3fr_2fr] gap-3">
        <UseCasesTable />
        <BudgetVsActual />
      </div>

      {/* Row 5: Monthly Breakdown */}
      <MonthlyBreakdownTable />
    </div>
  );
}
