import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { ChevronDown, TrendingDown, TrendingUp, HelpCircle, Calendar } from 'lucide-react';
import {
  CHART_MONTHS, TABLE_MONTHS, CHART_SERIES,
  monthlyChartData, changeChartData, usageKpi,
  tableProducts, monthlyTotals,
  USAGE_MONTHS, usageRows,
} from '../../data/o365UsageData';
import { countryMapData } from '../../data/o365Data';

// ── helpers ───────────────────────────────────────────────────────────────────
const fmt$ = (n) =>
  `$${n?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) ?? 0}`;
const fmtM = (n) => {
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
};

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const ISO_NUM_TO_ALPHA3 = {
  '840':'USA','826':'GBR','276':'DEU','156':'CHN','784':'ARE','356':'IND',
  '528':'NLD','076':'BRA','250':'FRA','484':'MEX','458':'MYS','344':'HKG',
  '702':'SGP','724':'ESP','124':'CAN','380':'ITA','036':'AUS','616':'POL',
  '620':'PRT','170':'COL','410':'KOR','056':'BEL','360':'IDN',
};
const maxMapCount = Math.max(...Object.values(countryMapData));
const mapColor = (count) => {
  if (!count) return '#e2e8f0';
  const t = count / maxMapCount;
  if (t > 0.8) return '#1E3A5F';
  if (t > 0.5) return '#2563EB';
  if (t > 0.2) return '#60A5FA';
  return '#BAE6FD';
};

// ── FilterBar ─────────────────────────────────────────────────────────────────
function FilterBar() {
  return (
    <div className="flex items-end gap-3 flex-wrap mb-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm text-xs">
      {/* Date Range */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-gray-500">Date Range</span>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 border border-gray-300 rounded text-gray-700 bg-white cursor-pointer hover:border-gray-400">
          <Calendar size={11} className="text-gray-400" />
          <span>2023/11/01 – 2025/10/31</span>
          <ChevronDown size={11} className="text-gray-400 ml-1" />
        </div>
      </div>

      {/* Standard dropdowns */}
      {[
        ['M365 E5 Suite (Yes/No)', 'is any value'],
        ['Bill To',                'is any value'],
        ['Product Name',           'is any value'],
        ['Tenant Name',            'is any value'],
        ['Active Users (Yes / No)','is any value'],
        ['BFC Name',               'is any value'],
      ].map(([label, val]) => (
        <div key={label} className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-500">{label}</span>
          <div className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 rounded text-gray-600 bg-white cursor-pointer hover:border-gray-400 min-w-[100px]">
            <span className="flex-1">{val}</span>
            <ChevronDown size={11} className="text-gray-400" />
          </div>
        </div>
      ))}

      {/* Pivot – highlighted */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-gray-500">Pivot</span>
        <div className="flex items-center gap-1 px-2.5 py-1.5 border border-teal-500 rounded text-teal-700 bg-teal-50 cursor-pointer min-w-[120px]">
          <span className="flex-1 font-medium">Product Name</span>
          <ChevronDown size={11} />
        </div>
      </div>

      {/* Metric – highlighted */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-gray-500">Metric</span>
        <div className="flex items-center gap-1 px-2.5 py-1.5 border border-teal-500 rounded text-teal-700 bg-teal-50 cursor-pointer min-w-[130px]">
          <span className="flex-1 font-medium">Total Cost ($)</span>
          <ChevronDown size={11} />
        </div>
      </div>

      {/* More filters badge */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-transparent">_</span>
        <div className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 rounded text-gray-500 bg-white cursor-pointer hover:border-gray-400">
          <span>More +5</span>
        </div>
      </div>
    </div>
  );
}

// ── KPI cards ─────────────────────────────────────────────────────────────────
function KpiCard({ label, value, accent = false, isChange = false }) {
  if (isChange) {
    const isNeg = value < 0;
    const Icon  = isNeg ? TrendingDown : TrendingUp;
    const color = isNeg ? 'text-orange-500' : 'text-red-500';
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col gap-1">
        <span className="text-[10px] text-gray-400">{label}</span>
        <div className={`flex items-center gap-1.5 text-xl font-bold ${color}`}>
          <Icon size={18} />
          {Math.abs(value).toLocaleString()}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col gap-1">
      <span className="text-[10px] text-gray-400">{label}</span>
      {value == null
        ? <span className="text-2xl font-light text-gray-300">∅</span>
        : <span className={`text-xl font-bold ${accent ? 'text-gray-800' : 'text-gray-800'}`}>
            {fmt$(value)}
          </span>
      }
    </div>
  );
}

// ── Stacked bar chart ─────────────────────────────────────────────────────────
function StackedBarChart({ data, title }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 70 }} barCategoryGap="18%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 9 }}
            angle={-45}
            textAnchor="end"
            height={70}
            interval={0}
          />
          <YAxis
            tickFormatter={(v) => v >= 1_000_000 ? `${(v/1_000_000).toFixed(0)}M` : `${(v/1_000).toFixed(0)}K`}
            tick={{ fontSize: 9 }}
            width={38}
          />
          <Tooltip
            formatter={(v, name) => [fmt$(v), name]}
            wrapperStyle={{ fontSize: 11 }}
          />
          <Legend
            wrapperStyle={{ fontSize: 9, paddingTop: 4 }}
            iconSize={8}
            iconType="square"
          />
          {CHART_SERIES.map(s => (
            <Bar key={s.name} dataKey={s.name} stackId="a" fill={s.color} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Monthly Breakdown section (left panel) ────────────────────────────────────
function MonthlyBreakdownPanel() {
  return (
    <div>
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Monthly Breakdown: Current Month vs Previous Month
      </h2>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <KpiCard label="Current month Metric" value={null} />
        <KpiCard label="Previous month Metric" value={null} />
        <KpiCard label="Change in Metric since last month" value={usageKpi.changeFromPrev} isChange />
      </div>
      <StackedBarChart data={monthlyChartData} title="Monthly Breakdown" />
    </div>
  );
}

// ── Monthly Comparison section (right panel) ──────────────────────────────────
function MonthlyComparisonPanel() {
  return (
    <div>
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Monthly Comparison: Current Month vs Baseline
      </h2>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <KpiCard label="Current month Metric" value={null} />
        <KpiCard label="Baseline month Metric" value={usageKpi.baselineMetric} accent />
        <KpiCard label="Change in Metric since Baseline" value={usageKpi.changeFromBaseline} isChange />
      </div>
      <StackedBarChart data={changeChartData} title="Change from Baseline" />
    </div>
  );
}

// ── Monthly Breakdown Table ───────────────────────────────────────────────────
function MonthlyBreakdownTable() {
  const grandTotal = monthlyTotals.reduce((s, v) => s + v, 0);
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm mb-4">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">Monthly Breakdown Table</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="text-xs" style={{ minWidth: `${48 + TABLE_MONTHS.length * 110 + 110}px` }}>
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 text-left">
              <th className="sticky left-0 bg-gray-50 px-3 py-2 font-medium min-w-[220px] z-20">
                Product Name ↕
              </th>
              {TABLE_MONTHS.map(m => (
                <th key={m} className="px-2 py-2 font-medium text-right whitespace-nowrap min-w-[100px]">
                  {m}<br /><span className="font-normal text-gray-400">Total Cost ($)</span>
                </th>
              ))}
              <th className="px-2 py-2 font-medium text-right min-w-[110px] bg-gray-100">Total</th>
            </tr>
          </thead>
          <tbody>
            {tableProducts.map((p, ri) => (
              <tr
                key={p.name}
                className={`border-b border-gray-50 hover:bg-blue-50/30 ${ri % 2 === 1 ? 'bg-gray-50/40' : ''}`}
              >
                <td className={`sticky left-0 px-3 py-1.5 font-medium text-gray-700 truncate max-w-[220px] z-10 ${ri % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
                  {p.name}
                </td>
                {p.months.map((v, ci) => (
                  <td key={ci} className="px-2 py-1.5 text-right text-gray-600 tabular-nums">
                    {v > 0 ? fmt$(v) : '—'}
                  </td>
                ))}
                <td className="px-2 py-1.5 text-right font-semibold text-gray-700 tabular-nums bg-gray-50/60">
                  {fmt$(p.total)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-200 bg-gray-100 font-semibold text-gray-700">
              <td className="sticky left-0 bg-gray-100 px-3 py-2 z-10">Totals</td>
              {monthlyTotals.map((v, i) => (
                <td key={i} className="px-2 py-2 text-right tabular-nums">{fmt$(v)}</td>
              ))}
              <td className="px-2 py-2 text-right tabular-nums bg-gray-200">{fmt$(grandTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ── BFC Country section ───────────────────────────────────────────────────────
function BFCCountrySection() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {/* Left: table (no results) */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Current month cost by BFC Country</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 text-left">
                <th className="px-3 py-2 font-normal">BFC Country</th>
                <th className="px-3 py-2 font-normal text-right">Total Cost ($)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2} className="px-3 py-16 text-center text-gray-400 text-sm">
                  No Results
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-200 bg-gray-50 text-gray-500 text-xs">
                <td className="px-3 py-2">Totals</td>
                <td className="px-3 py-2 text-right">—</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Right: world map */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Current month cost by BFC Country</h3>
        <ComposableMap projectionConfig={{ scale: 120 }} style={{ width: '100%', height: 220 }}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const numId  = geo.id?.toString().padStart(3, '0');
                const alpha3 = ISO_NUM_TO_ALPHA3[numId];
                const count  = countryMapData[alpha3] ?? 0;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={mapColor(count)}
                    stroke="#fff"
                    strokeWidth={0.4}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}

// ── Monthly Usage Tracking table ──────────────────────────────────────────────
function UsageTrackingTable() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">Monthly usage tracking</h3>
      </div>
      <div className="overflow-x-auto">
        <table
          className="text-xs"
          style={{ minWidth: `${280 + USAGE_MONTHS.length * 180}px` }}
        >
          <thead>
            {/* Top header: Month spanning pairs */}
            <tr className="border-b border-gray-100 bg-gray-50 text-gray-500">
              <th className="sticky left-0 bg-gray-50 px-2 py-1.5 z-20 min-w-[90px] font-normal" rowSpan={2}>Bill To</th>
              <th className="px-2 py-1.5 font-normal min-w-[160px]" rowSpan={2}>Product Name</th>
              <th className="px-2 py-1.5 font-normal min-w-[110px]" rowSpan={2}>Tenant Name</th>
              <th className="px-2 py-1.5 font-normal text-center" rowSpan={2}>M365 E5<br />Suite (Yes/No)</th>
              <th className="px-2 py-1.5 font-normal text-right" rowSpan={2}>Unit Price</th>
              <th className="px-2 py-1.5 font-normal text-center" rowSpan={2}>Annual is<br />advance</th>
              {USAGE_MONTHS.map(m => (
                <th key={m} colSpan={2} className="px-2 py-1.5 font-medium text-center border-l border-gray-200">
                  {m}
                </th>
              ))}
            </tr>
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-400">
              {USAGE_MONTHS.map(m => (
                <>
                  <th key={`${m}-n`} className="px-2 py-1 font-normal text-right border-l border-gray-200 whitespace-nowrap">No. of Licenses</th>
                  <th key={`${m}-c`} className="px-2 py-1 font-normal text-right whitespace-nowrap">Total Cost ($)</th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {usageRows.map((row, ri) => (
              <tr key={ri} className={`border-b border-gray-50 hover:bg-gray-50 ${ri % 2 === 1 ? 'bg-gray-50/40' : ''}`}>
                <td className={`sticky left-0 px-2 py-1.5 font-medium text-gray-700 z-10 ${ri % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
                  {row.billTo}
                </td>
                <td className="px-2 py-1.5 text-gray-600 max-w-[160px] truncate">{row.product}</td>
                <td className="px-2 py-1.5 text-gray-500">{row.tenant}</td>
                <td className="px-2 py-1.5 text-center text-gray-600">{row.suite}</td>
                <td className="px-2 py-1.5 text-right text-gray-600 tabular-nums">{row.price}</td>
                <td className="px-2 py-1.5 text-center">
                  {row.advance
                    ? <span className="text-teal-600 font-bold">✓</span>
                    : <span className="text-gray-300">—</span>}
                </td>
                {USAGE_MONTHS.map(m => (
                  <>
                    <td key={`${m}-n`} className="px-2 py-1.5 text-center text-gray-300 border-l border-gray-100">∅</td>
                    <td key={`${m}-c`} className="px-2 py-1.5 text-center text-gray-300">∅</td>
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function O365UsagePage() {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div>
      {/* Page title */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide">Optimisation Hub / Products / O365</p>
        <h1 className="text-xl font-bold text-gray-900 mt-0.5">O365 – Usage</h1>
      </div>

      <FilterBar />

      {/* Info banner + section tabs */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="text-xs text-gray-500 border border-gray-200 rounded-lg px-4 py-2 bg-white flex-1">
          <span className="font-medium text-gray-700">Current Month usage is provisional until the month is completed.</span>
          <span className="ml-2 text-teal-600 font-medium cursor-pointer hover:underline">
            Monthly Breakdown: Current Month vs Previous Month
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {['Variance Analysis', 'User Details'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(t => t === tab ? null : tab)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                activeTab === tab
                  ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
          <button className="p-1.5 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg ml-1">
            <HelpCircle size={14} />
          </button>
        </div>
      </div>

      {/* Charts section: two equal panels side by side */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <MonthlyBreakdownPanel />
        <MonthlyComparisonPanel />
      </div>

      {/* Monthly Breakdown Table */}
      <MonthlyBreakdownTable />

      {/* BFC Country section */}
      <BFCCountrySection />

      {/* Monthly Usage Tracking */}
      <UsageTrackingTable />
    </div>
  );
}
