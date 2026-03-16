import { useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import {
  ghostKpi, ghostByBillTo, ghostBillToPie,
  ghostByProductSku, ghostByOktaStatus,
  ghostByConsole, ghostConsolePie, ghostAllLicenses,
} from '../../data/adobeGhostData';
import { formatCurrency } from '../../utils/format';

// ── Filter Bar ────────────────────────────────────────────────────────────────
const FILTERS = [
  { label: 'Bill To', active: false },
  { label: 'Product SKU', active: false },
  { label: 'Country', active: false },
  { label: 'Okta Status', active: false },
  { label: 'Okta Status Change', active: false },
  { label: 'Extract Date', active: false },
];

function FilterBar() {
  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {FILTERS.map(f => (
        <button
          key={f.label}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 bg-white text-xs text-gray-600 hover:border-teal-500 hover:text-teal-700 transition-colors"
        >
          {f.label}
          <svg className="w-3 h-3 ml-0.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      ))}
    </div>
  );
}

// ── KPI Card (red gradient) ───────────────────────────────────────────────────
function KpiCard({ label, value }) {
  return (
    <div className="rounded-xl p-5 text-white flex-1" style={{ background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)' }}>
      <p className="text-sm font-medium text-red-200 mb-1">{label}</p>
      <p className="text-3xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

// ── Inline bar for tables ─────────────────────────────────────────────────────
function InlineBar({ value, max, color = '#0D9488' }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs text-gray-700 w-10 text-right shrink-0">{value.toLocaleString()}</span>
    </div>
  );
}

// ── Donut chart with legend ───────────────────────────────────────────────────
function DonutWithLegend({ title, data }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 h-full">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              dataKey="value"
              paddingAngle={2}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v) => [`${v.toFixed(2)}%`, '']}
              contentStyle={{ fontSize: 11, borderRadius: 6 }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="w-full mt-2 space-y-1">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
              <span className="flex-1 truncate">{d.name}</span>
              <span className="font-medium text-gray-800">{d.value.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Bill To table + pie ───────────────────────────────────────────────────────
function BillToSection() {
  const maxLic = Math.max(...ghostByBillTo.map(r => r.licenses));
  return (
    <div className="grid grid-cols-[3fr_2fr] gap-4 mb-4">
      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Idle Licenses By Bill To</h3>
        <div className="overflow-y-auto max-h-72">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-1.5 font-semibold text-gray-500">Bill To</th>
                <th className="text-left py-1.5 font-semibold text-gray-500">Number of Licenses</th>
                <th className="text-right py-1.5 font-semibold text-gray-500">Projected Annual Cost ($)</th>
              </tr>
            </thead>
            <tbody>
              {ghostByBillTo.map((row, i) => (
                <tr key={row.id} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                  <td className="py-1.5 pr-2 text-gray-700 whitespace-nowrap">{row.name}</td>
                  <td className="py-1.5 pr-2 min-w-[160px]">
                    <InlineBar value={row.licenses} max={maxLic} />
                  </td>
                  <td className="py-1.5 text-right text-gray-700 font-medium whitespace-nowrap">
                    {formatCurrency(row.cost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Donut */}
      <DonutWithLegend title="Idle Licenses By Bill To %" data={ghostBillToPie} />
    </div>
  );
}

// ── Product SKU + Okta Status bar charts ──────────────────────────────────────
function SkuOktaSection() {
  const skuFmt = (v) => v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : `$${(v / 1_000).toFixed(0)}K`;

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {/* Product SKU */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Idle Licenses By Product SKU</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={ghostByProductSku} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="sku" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={skuFmt} tick={{ fontSize: 10 }} width={52} />
            <Tooltip formatter={(v) => [formatCurrency(v), 'Cost']} contentStyle={{ fontSize: 11, borderRadius: 6 }} />
            <Bar dataKey="cost" fill="#0D9488" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Okta Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Idle Licenses By Okta Status</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={ghostByOktaStatus} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="status" tick={{ fontSize: 10 }} />
            <YAxis tickFormatter={skuFmt} tick={{ fontSize: 10 }} width={52} />
            <Tooltip formatter={(v) => [formatCurrency(v), 'Cost']} contentStyle={{ fontSize: 11, borderRadius: 6 }} />
            <Bar dataKey="cost" fill="#3B82F6" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Console table + pie ───────────────────────────────────────────────────────
function ConsoleSection() {
  const maxLic = Math.max(...ghostByConsole.map(r => r.licenses));
  return (
    <div className="grid grid-cols-[3fr_2fr] gap-4 mb-4">
      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Idle Licenses By Console</h3>
        <div className="overflow-y-auto max-h-64">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-1.5 font-semibold text-gray-500">Console</th>
                <th className="text-right py-1.5 font-semibold text-gray-500">Users</th>
                <th className="text-left py-1.5 font-semibold text-gray-500 pl-2">Number of Licenses</th>
                <th className="text-right py-1.5 font-semibold text-gray-500">Projected Annual Cost ($)</th>
              </tr>
            </thead>
            <tbody>
              {ghostByConsole.map((row, i) => (
                <tr key={row.id} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                  <td className="py-1.5 pr-2 text-gray-700 font-mono text-[10px] whitespace-nowrap">{row.console}</td>
                  <td className="py-1.5 text-right text-gray-700">{row.users.toLocaleString()}</td>
                  <td className="py-1.5 pl-2 min-w-[140px]">
                    <InlineBar value={row.licenses} max={maxLic} color="#3B82F6" />
                  </td>
                  <td className="py-1.5 text-right text-gray-700 font-medium whitespace-nowrap">
                    {formatCurrency(row.cost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Donut */}
      <DonutWithLegend title="Idle Licenses By Console Wastage %" data={ghostConsolePie} />
    </div>
  );
}

// ── All Idle Licenses table ───────────────────────────────────────────────────
function AllLicensesTable() {
  const maxCost = Math.max(...ghostAllLicenses.map(r => r.cost));
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">All Idle Licenses</h3>
      <div className="overflow-x-auto">
        <table className="text-xs" style={{ minWidth: 1100 }}>
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-1.5 pr-3 font-semibold text-gray-500">Primary Email</th>
              <th className="text-left py-1.5 pr-3 font-semibold text-gray-500">Adobe Country</th>
              <th className="text-left py-1.5 pr-3 font-semibold text-gray-500">Product Friendly Name</th>
              <th className="text-left py-1.5 pr-3 font-semibold text-gray-500">Product SKU</th>
              <th className="text-left py-1.5 pr-3 font-semibold text-gray-500">User GUID</th>
              <th className="text-left py-1.5 pr-3 font-semibold text-gray-500">Bill To</th>
              <th className="text-right py-1.5 pr-3 font-semibold text-gray-500">Licenses</th>
              <th className="text-left py-1.5 font-semibold text-gray-500" style={{ minWidth: 180 }}>Projected Annual Cost ($)</th>
            </tr>
          </thead>
          <tbody>
            {ghostAllLicenses.map((row, i) => (
              <tr key={i} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                <td className="py-1.5 pr-3 text-gray-700 whitespace-nowrap">{row.email}</td>
                <td className="py-1.5 pr-3 text-gray-500">{row.country}</td>
                <td className="py-1.5 pr-3 text-gray-700 whitespace-nowrap">{row.productName}</td>
                <td className="py-1.5 pr-3 text-gray-500 font-mono">{row.sku}</td>
                <td className="py-1.5 pr-3 text-gray-400 font-mono text-[10px] whitespace-nowrap">{row.guid}</td>
                <td className="py-1.5 pr-3 text-gray-700 whitespace-nowrap">{row.billTo}</td>
                <td className="py-1.5 pr-3 text-right text-gray-700">{row.licenses}</td>
                <td className="py-1.5" style={{ minWidth: 180 }}>
                  <InlineBar value={row.cost} max={maxCost} color="#DC2626" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function AdobeGhostPage() {
  return (
    <div className="space-y-0">
      {/* Breadcrumb + Title */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-0.5">Optimisation Hub / Products / Adobe</p>
        <h1 className="text-xl font-bold text-gray-900">Adobe Ghost Licences</h1>
      </div>

      <FilterBar />

      {/* KPI Cards */}
      <div className="flex gap-4 mb-4">
        <KpiCard label="Idle License Count" value={ghostKpi.idleLicenseCount.toLocaleString()} />
        <KpiCard label="Idle License Wastage" value={formatCurrency(ghostKpi.idleLicenseWastage)} />
      </div>

      {/* Bill To table + pie */}
      <BillToSection />

      {/* Product SKU + Okta Status */}
      <SkuOktaSection />

      {/* Console table + pie */}
      <ConsoleSection />

      {/* All Idle Licenses */}
      <AllLicensesTable />
    </div>
  );
}
