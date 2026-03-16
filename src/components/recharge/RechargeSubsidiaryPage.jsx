import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronRight, ArrowDownUp } from 'lucide-react';
import {
  subsidiaryKpi, supplierPie, supplierCosts,
  MONTHS, monthlyRows,
} from '../../data/rechargeSubsidiaryData';

// ── Formatters ────────────────────────────────────────────────────────────────
const fmtM  = (n) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}m`
                   : n >= 1_000     ? `$${(n / 1_000).toFixed(2)}k`
                   : `$${n}`;
const fmtFull = (n) => `$${n.toLocaleString('en-US')}`;

// ── Filter Bar ────────────────────────────────────────────────────────────────
const YEARS = ['is 2022', 'is 2023', 'is 2024', 'is 2025'];

function FilterBar() {
  const [year, setYear] = useState('is 2024');
  return (
    <div className="flex items-end gap-4 flex-wrap mb-5 p-4 bg-white border border-gray-100 rounded-xl shadow-sm text-xs">
      {/* Fiscal Year toggle pills */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-gray-500 font-medium">
          Fiscal Year <span className="text-red-500">*</span>
        </span>
        <div className="flex items-center rounded overflow-hidden border border-gray-300">
          {YEARS.map(y => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                year === y
                  ? 'bg-[#1E3A5F] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
      {/* Supplier + Bill To dropdowns */}
      {['Supplier', 'Bill To'].map(label => (
        <div key={label} className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-500 font-medium">{label}</span>
          <div className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 rounded text-gray-600 bg-white cursor-pointer hover:border-gray-400 min-w-[120px]">
            <span className="flex-1">is any value</span>
            <ChevronDown size={11} className="text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── KPI Row ───────────────────────────────────────────────────────────────────
function KpiRow() {
  const cards = [
    { label: 'Total cost',       value: fmtM(subsidiaryKpi.totalCost), large: true, blue: true },
    { label: `${subsidiaryKpi.top1.name}  (Top 1)`, value: fmtM(subsidiaryKpi.top1.cost) },
    { label: `${subsidiaryKpi.top2.name}  (Top 2)`, value: fmtM(subsidiaryKpi.top2.cost) },
    { label: `${subsidiaryKpi.top3.name}  (Top 3)`, value: fmtM(subsidiaryKpi.top3.cost) },
  ];
  return (
    <div className="flex gap-0 mb-5 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden divide-x divide-gray-100">
      {cards.map((c, i) => (
        <div
          key={i}
          className={`flex-1 px-6 py-5 flex flex-col items-center justify-center text-center ${c.large ? 'flex-[1.6]' : ''}`}
        >
          <div className={`text-3xl font-bold tracking-tight ${c.blue ? 'text-blue-700' : 'text-gray-800'}`}>
            {c.value}
          </div>
          <div className="text-xs text-teal-600 font-medium mt-1">{c.label}</div>
        </div>
      ))}
      {/* ∅ / ? placeholder card */}
      <div className="px-6 py-5 flex items-center justify-center">
        <span className="text-2xl font-bold text-red-400">?</span>
      </div>
    </div>
  );
}

// ── Supplier Pie + Legend ─────────────────────────────────────────────────────
function SupplierPie() {
  const pieData = supplierPie.map(d => ({ name: d.name, value: d.pct, color: d.color }));
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
      <div className="flex items-start gap-4">
        {/* Donut */}
        <div className="shrink-0" style={{ width: 220, height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={100}
                dataKey="value"
                paddingAngle={1}
                startAngle={90}
                endAngle={-270}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [`${v.toFixed(2)}%`, '']}
                contentStyle={{ fontSize: 11, borderRadius: 6 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="flex flex-col gap-1.5 pt-2">
          {supplierPie.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span>{d.name} {d.pct.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Cost by Supplier Table ────────────────────────────────────────────────────
function CostBySupplierTable() {
  const [sortAsc, setSortAsc] = useState(false);
  const maxCost = Math.max(...supplierCosts.map(r => r.cost));
  const totalCost = supplierCosts.reduce((s, r) => s + r.cost, 0);
  const totalPct  = supplierCosts.reduce((s, r) => s + r.pct, 0);

  const sorted = [...supplierCosts].sort((a, b) => sortAsc ? a.cost - b.cost : b.cost - a.cost);

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">Cost by Supplier</h3>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100 text-gray-500 text-left">
            <th className="px-3 py-2 w-6 font-normal" />
            <th className="px-3 py-2 font-normal">Supplier</th>
            <th className="px-3 py-2 font-normal">Recharge Type</th>
            <th className="px-3 py-2 font-normal text-right">
              <button
                onClick={() => setSortAsc(a => !a)}
                className="inline-flex items-center gap-1 hover:text-gray-700"
              >
                Cost ($) <ArrowDownUp size={11} />
              </button>
            </th>
            <th className="px-3 py-2 font-normal w-24" />
            <th className="px-3 py-2 font-normal text-right">Cost (%)</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => {
            const barPct = (row.cost / maxCost) * 100;
            return (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-1.5 text-gray-400">{row.id}</td>
                <td className="px-3 py-1.5 text-blue-600 font-medium cursor-pointer hover:underline">
                  {row.name}
                  <span className="ml-1 px-1 py-0.5 text-[9px] bg-gray-100 text-gray-400 rounded">···</span>
                </td>
                <td className={`px-3 py-1.5 font-medium ${row.type === 'Annual in Advance' ? 'text-teal-600' : 'text-indigo-600'}`}>
                  {row.type}
                </td>
                <td className="px-3 py-1.5 text-right text-gray-800 font-medium whitespace-nowrap">
                  {fmtM(row.cost)}
                </td>
                <td className="px-3 py-1.5">
                  {barPct > 1 && (
                    <div className="h-3 bg-blue-500 rounded-sm" style={{ width: `${Math.min(barPct, 100)}%` }} />
                  )}
                </td>
                <td className="px-3 py-1.5 text-right text-gray-600">{row.pct.toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200 bg-gray-50 font-semibold text-gray-700">
            <td className="px-3 py-2" colSpan={3}>Totals</td>
            <td className="px-3 py-2 text-right whitespace-nowrap">{fmtM(totalCost)}</td>
            <td />
            <td className="px-3 py-2 text-right">{totalPct.toFixed(2)}%</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ── Monthly Breakdown Table ───────────────────────────────────────────────────
function MonthlyBreakdown() {
  const [collapsed, setCollapsed] = useState(false);

  // Column totals
  const colTotals = MONTHS.map((_, mi) =>
    monthlyRows.reduce((s, row) => s + (row.months[mi] ?? 0), 0)
  );
  const grandTotal = monthlyRows.reduce(
    (s, row) => s + row.months.reduce((rs, v) => rs + (v ?? 0), 0), 0
  );

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mt-5">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">Monthly Breakdown</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="text-xs" style={{ minWidth: collapsed ? 400 : 1400 }}>
          <thead>
            {/* Invoice Month header row */}
            <tr className="border-b border-gray-100 bg-gray-50 text-gray-500">
              <th className="sticky left-0 z-20 bg-gray-50 px-3 py-2 text-left font-normal w-8">#</th>
              <th className="sticky left-8 z-20 bg-gray-50 px-3 py-2 text-left font-normal min-w-[160px]">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCollapsed(c => !c)}
                    className="hover:text-gray-700 flex items-center gap-0.5"
                  >
                    Invoice Month
                    <ChevronRight
                      size={12}
                      className={`transition-transform ${collapsed ? '' : 'rotate-90'}`}
                    />
                  </button>
                </div>
              </th>
              {!collapsed && MONTHS.map(m => (
                <th key={m} className="px-3 py-2 text-center font-normal whitespace-nowrap">{m}</th>
              ))}
              <th className="px-3 py-2 text-right font-normal whitespace-nowrap">
                Total <ArrowDownUp size={10} className="inline ml-0.5" />
              </th>
            </tr>
            {/* "Supplier / Cost ($)" sub-header */}
            {!collapsed && (
              <tr className="border-b border-gray-100 text-gray-400 bg-white">
                <th className="sticky left-0 z-20 bg-white px-3 py-1.5" />
                <th className="sticky left-8 z-20 bg-white px-3 py-1.5 text-left font-normal">Supplier</th>
                {MONTHS.map(m => (
                  <th key={m} className="px-3 py-1.5 text-center font-normal text-[10px]">Cost ($)</th>
                ))}
                <th className="px-3 py-1.5 text-right font-normal text-[10px]">Cost ($) ▼</th>
              </tr>
            )}
          </thead>
          <tbody>
            {monthlyRows.map((row, ri) => {
              const rowTotal = row.months.reduce((s, v) => s + (v ?? 0), 0);
              if (rowTotal === 0) return null;
              return (
                <tr key={row.id} className={`border-b border-gray-50 hover:bg-blue-50/30 ${ri % 2 === 1 ? 'bg-gray-50/40' : ''}`}>
                  <td className="sticky left-0 z-10 bg-inherit px-3 py-1.5 text-gray-400">{row.id}</td>
                  <td className="sticky left-8 z-10 bg-inherit px-3 py-1.5 text-blue-600 font-medium cursor-pointer hover:underline whitespace-nowrap">
                    {row.name}
                    <span className="ml-1 px-1 py-0.5 text-[9px] bg-gray-100 text-gray-400 rounded">···</span>
                  </td>
                  {!collapsed && row.months.map((v, mi) => (
                    <td key={mi} className="px-3 py-1.5 text-right whitespace-nowrap">
                      {v === null ? (
                        <span className="text-gray-300">∅</span>
                      ) : v === 0 ? (
                        <span className="text-gray-300">∅</span>
                      ) : (
                        <span className="text-gray-700">{fmtFull(v)}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-3 py-1.5 text-right text-gray-700 font-medium whitespace-nowrap">
                    {fmtFull(rowTotal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-200 bg-gray-50 font-semibold text-gray-700">
              <td className="sticky left-0 z-10 bg-gray-50 px-3 py-2" colSpan={2}>Totals</td>
              {!collapsed && colTotals.map((t, i) => (
                <td key={i} className="px-3 py-2 text-right whitespace-nowrap text-gray-700">
                  {t > 0 ? fmtFull(t) : <span className="text-gray-300">∅</span>}
                </td>
              ))}
              <td className="px-3 py-2 text-right whitespace-nowrap">{fmtFull(grandTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function RechargeSubsidiaryPage() {
  return (
    <div>
      {/* Breadcrumb + Title */}
      <div className="mb-1">
        <p className="text-xs text-gray-400">Recharge · Summary</p>
        <h1 className="text-2xl font-bold text-gray-900">Recharge Summary (Subsidiary)</h1>
      </div>

      <FilterBar />
      <KpiRow />

      {/* Two-column: pie | table */}
      <div className="grid grid-cols-[5fr_7fr] gap-4 mb-0">
        <SupplierPie />
        <CostBySupplierTable />
      </div>

      <MonthlyBreakdown />
    </div>
  );
}
