import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  ScatterChart, Scatter, ReferenceLine, ReferenceArea, ZAxis, Cell,
  LineChart, Line, Legend,
} from 'recharts';
import { TrendingDown, Zap, Target, DollarSign, ChevronUp, ChevronDown as ChevDn } from 'lucide-react';
import {
  aiOptKpi, savingsByCategory, optimizationOpps,
  effortImpactHigh, effortImpactMedium, effortImpactLow,
  modelRightSizing, idleServices, monthlyWasteTrend, roadmapQuarters,
} from '../../data/aiOptimisationData';

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtM  = (n) => n >= 1_000_000 ? `$${(n/1_000_000).toFixed(2)}m`
                   : n >= 1_000     ? `$${(n/1_000).toFixed(0)}k`
                   : `$${n}`;
const tickFmt = (v) => v >= 1_000_000 ? `$${(v/1_000_000).toFixed(1)}m`
                     : v >= 1_000     ? `$${(v/1_000).toFixed(0)}k`
                     : `$${v}`;

const PRIORITY_BADGE = {
  High:   'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low:    'bg-gray-100 text-gray-600',
};
const STATUS_BADGE = {
  'Open':        'bg-blue-100 text-blue-700',
  'In Progress': 'bg-teal-100 text-teal-700',
  'Implemented': 'bg-green-100 text-green-700',
  'Deferred':    'bg-gray-100 text-gray-500',
};
const EFFORT_BADGE = {
  Low:    'bg-green-100 text-green-700',
  Medium: 'bg-amber-100 text-amber-700',
  High:   'bg-red-100 text-red-700',
};
const CAT_COLORS = {
  'Model Right-sizing': '#1E3A5F',
  'Batch Processing':   '#2563EB',
  'Response Caching':   '#0D9488',
  'Idle Services':      '#DC2626',
  'Token Optimization': '#F59E0B',
  'Reserved Capacity':  '#7C3AED',
  'Cross-subsidiary':   '#EC4899',
};

// ── Panel ─────────────────────────────────────────────────────────────────────
function Panel({ title, children, className = '' }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden ${className}`}>
      {title && <div className="px-4 py-3 border-b border-gray-50"><h3 className="text-sm font-semibold text-gray-800">{title}</h3></div>}
      <div className="p-4">{children}</div>
    </div>
  );
}

// ── KPI Row ───────────────────────────────────────────────────────────────────
function KpiRow() {
  const cards = [
    { icon: DollarSign, label: 'Potential Annual Savings', value: fmtM(aiOptKpi.potentialAnnualSavings), sub: 'across all 20 opportunities',  bg: 'bg-teal-600',   iconBg: 'bg-teal-500' },
    { icon: Target,     label: 'Opportunities Found',      value: aiOptKpi.opportunitiesFound,            sub: `${aiOptKpi.quickWins} quick wins`, bg: 'bg-blue-600',   iconBg: 'bg-blue-500' },
    { icon: Zap,        label: 'Quick Wins (Low Effort)',  value: aiOptKpi.quickWins,                    sub: 'can be done in <1 month',      bg: 'bg-amber-500',  iconBg: 'bg-amber-400' },
    { icon: TrendingDown, label: 'Estimated 12-month ROI', value: `${aiOptKpi.estimatedRoi}%`,           sub: `impl. cost ${fmtM(aiOptKpi.implementationCost)}`, bg: 'bg-purple-600', iconBg: 'bg-purple-500' },
  ];
  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {cards.map((c, i) => (
        <div key={i} className={`rounded-xl p-4 text-white ${c.bg} flex items-start gap-3`}>
          <div className={`${c.iconBg} p-2 rounded-lg shrink-0`}>
            <c.icon size={18} />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight">{c.value}</div>
            <div className="text-xs font-medium opacity-90 mt-0.5">{c.label}</div>
            <div className="text-[10px] opacity-70 mt-0.5">{c.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Savings by Category ───────────────────────────────────────────────────────
function SavingsByCategoryChart() {
  const sorted = [...savingsByCategory].sort((a, b) => b.savings - a.savings);
  const max = sorted[0].savings;
  return (
    <Panel title="Potential Annual Savings by Category">
      <div className="space-y-3">
        {sorted.map((d, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
                {d.category}
              </span>
              <span className="font-semibold text-gray-900">{fmtM(d.savings)}</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${(d.savings / max) * 100}%`, backgroundColor: d.color }}
              />
            </div>
          </div>
        ))}
        <div className="pt-2 border-t border-gray-100 flex justify-between text-xs font-bold text-gray-800">
          <span>Total</span>
          <span>{fmtM(savingsByCategory.reduce((s, d) => s + d.savings, 0))}</span>
        </div>
      </div>
    </Panel>
  );
}

// ── Effort vs Impact Scatter ──────────────────────────────────────────────────
const EFFORT_LABEL = { 1: 'Low', 2: 'Medium', 3: 'High' };

function EffortImpactChart() {
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-2 shadow text-[10px] max-w-[200px]">
        <p className="font-semibold text-gray-800 mb-0.5">Opp #{d.id}</p>
        <p className="text-gray-600 leading-tight">{d.name.substring(0, 60)}...</p>
        <p className="text-teal-600 font-medium mt-1">Monthly savings: {fmtM(d.y)}</p>
        <p className="text-gray-500">Effort: {EFFORT_LABEL[d.x]}</p>
      </div>
    );
  };

  return (
    <Panel title="Effort vs Impact Matrix">
      {/* Quadrant labels */}
      <div className="relative">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 text-[9px] font-semibold pointer-events-none z-10"
          style={{ top: 8, left: 40, right: 8, bottom: 28 }}>
          <div className="flex items-start justify-start pl-2 pt-1 text-green-600 opacity-60">◆ Quick Wins</div>
          <div className="flex items-start justify-end pr-2 pt-1 text-blue-600 opacity-60">Major Projects ◆</div>
          <div className="flex items-end justify-start pl-2 pb-1 text-gray-400 opacity-60">◆ Fill-ins</div>
          <div className="flex items-end justify-end pr-2 pb-1 text-orange-400 opacity-60">Reconsider ◆</div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <ScatterChart margin={{ top: 8, right: 8, bottom: 28, left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis type="number" dataKey="x" domain={[0.5, 3.5]} ticks={[1, 2, 3]}
              tickFormatter={v => EFFORT_LABEL[v] ?? ''} tick={{ fontSize: 10 }}
              label={{ value: 'Implementation Effort', position: 'insideBottom', offset: -18, fontSize: 10, fill: '#9CA3AF' }} />
            <YAxis type="number" dataKey="y" tickFormatter={tickFmt} tick={{ fontSize: 9 }} width={44}
              label={{ value: 'Monthly Savings', angle: -90, position: 'insideLeft', offset: 8, fontSize: 9, fill: '#9CA3AF' }} />
            <ReferenceLine x={1.5} stroke="#e5e7eb" strokeDasharray="5 3" />
            <ReferenceLine x={2.5} stroke="#e5e7eb" strokeDasharray="5 3" />
            <ReferenceLine y={15000} stroke="#e5e7eb" strokeDasharray="5 3" />
            <ZAxis range={[60, 60]} />
            <Tooltip content={<CustomTooltip />} />
            <Scatter name="High"   data={effortImpactHigh}   fill="#DC2626" opacity={0.85} />
            <Scatter name="Medium" data={effortImpactMedium} fill="#F59E0B" opacity={0.85} />
            <Scatter name="Low"    data={effortImpactLow}    fill="#9CA3AF" opacity={0.85} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-1">
        {[['High priority', '#DC2626'], ['Medium priority', '#F59E0B'], ['Low priority', '#9CA3AF']].map(([l, c]) => (
          <span key={l} className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />{l}
          </span>
        ))}
      </div>
    </Panel>
  );
}

// ── Opportunities Table ───────────────────────────────────────────────────────
const ALL = 'All';
const CATEGORIES = [ALL, ...Object.keys(CAT_COLORS)];
const PRIORITIES = [ALL, 'High', 'Medium', 'Low'];
const STATUSES   = [ALL, 'Open', 'In Progress', 'Deferred'];

function OpportunitiesTable() {
  const [filterCat, setFilterCat] = useState(ALL);
  const [filterPri, setFilterPri] = useState(ALL);
  const [filterSta, setFilterSta] = useState(ALL);
  const [sortAsc,   setSortAsc]   = useState(false);

  const filtered = useMemo(() => {
    let rows = optimizationOpps;
    if (filterCat !== ALL) rows = rows.filter(r => r.category  === filterCat);
    if (filterPri !== ALL) rows = rows.filter(r => r.priority  === filterPri);
    if (filterSta !== ALL) rows = rows.filter(r => r.status    === filterSta);
    return [...rows].sort((a, b) => sortAsc ? a.monthlySavings - b.monthlySavings : b.monthlySavings - a.monthlySavings);
  }, [filterCat, filterPri, filterSta, sortAsc]);

  const totalSavings = filtered.reduce((s, r) => s + r.annualSavings, 0);

  const Sel = ({ value, onChange, options }) => (
    <select
      value={value} onChange={e => onChange(e.target.value)}
      className="text-[11px] border border-gray-200 rounded px-2 py-1 text-gray-600 bg-white focus:outline-none focus:border-teal-400 cursor-pointer"
    >
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );

  return (
    <Panel title="Optimization Opportunities" className="mb-4">
      {/* Filters */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="text-xs text-gray-500">Filter:</span>
        <Sel value={filterCat} onChange={setFilterCat} options={CATEGORIES} />
        <Sel value={filterPri} onChange={setFilterPri} options={PRIORITIES} />
        <Sel value={filterSta} onChange={setFilterSta} options={STATUSES}   />
        <span className="ml-auto text-xs text-gray-500">
          {filtered.length} opportunities · <span className="font-semibold text-gray-800">{fmtM(totalSavings)}</span> potential annual savings
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 text-left">
              <th className="pb-2 pr-2 w-5 font-normal">#</th>
              <th className="pb-2 pr-2 font-normal w-14">Priority</th>
              <th className="pb-2 pr-2 font-normal">Category</th>
              <th className="pb-2 pr-3 font-normal max-w-[340px]">Description</th>
              <th className="pb-2 pr-2 font-normal">Subsidiary</th>
              <th className="pb-2 pr-2 font-normal">
                <button
                  onClick={() => setSortAsc(a => !a)}
                  className="flex items-center gap-0.5 hover:text-gray-800"
                >
                  Annual Savings {sortAsc ? <ChevronUp size={11} /> : <ChevDn size={11} />}
                </button>
              </th>
              <th className="pb-2 pr-2 font-normal">Effort</th>
              <th className="pb-2 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={row.id} className={`border-b border-gray-50 hover:bg-gray-50 ${i % 2 === 1 ? 'bg-gray-50/40' : ''}`}>
                <td className="py-2 pr-2 text-gray-400">{row.id}</td>
                <td className="py-2 pr-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${PRIORITY_BADGE[row.priority]}`}>
                    {row.priority}
                  </span>
                </td>
                <td className="py-2 pr-2 whitespace-nowrap">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: CAT_COLORS[row.category] }} />
                    <span className="text-gray-700">{row.category}</span>
                  </span>
                </td>
                <td className="py-2 pr-3 text-gray-600 max-w-[340px]">{row.desc}</td>
                <td className="py-2 pr-2 text-gray-700 whitespace-nowrap">{row.subsidiary}</td>
                <td className="py-2 pr-2 font-semibold text-teal-700 whitespace-nowrap">{fmtM(row.annualSavings)}</td>
                <td className="py-2 pr-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${EFFORT_BADGE[row.effort]}`}>
                    {row.effort}
                  </span>
                </td>
                <td className="py-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${STATUS_BADGE[row.status]}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-200 bg-gray-50 font-semibold text-gray-700">
              <td colSpan={5} className="py-2 text-xs">Total ({filtered.length} items)</td>
              <td className="py-2 text-teal-700 text-xs">{fmtM(totalSavings)}</td>
              <td colSpan={2} />
            </tr>
          </tfoot>
        </table>
      </div>
    </Panel>
  );
}

// ── Model Right-sizing ────────────────────────────────────────────────────────
function ModelRightSizingTable() {
  return (
    <Panel title="Model Right-sizing Recommendations">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100 text-gray-500 text-left">
            <th className="pb-2 pr-2 font-normal">Current Model</th>
            <th className="pb-2 pr-2 font-normal">Recommended</th>
            <th className="pb-2 pr-2 font-normal">Use Case</th>
            <th className="pb-2 pr-2 font-normal">Subsidiary</th>
            <th className="pb-2 pr-2 font-normal text-right">Current/mo</th>
            <th className="pb-2 pr-2 font-normal text-right">Target/mo</th>
            <th className="pb-2 font-normal text-right">Saves/mo</th>
          </tr>
        </thead>
        <tbody>
          {modelRightSizing.map((r, i) => (
            <tr key={r.id} className={`border-b border-gray-50 hover:bg-gray-50 ${i % 2 === 1 ? 'bg-gray-50/40' : ''}`}>
              <td className="py-2 pr-2">
                <span className="px-1.5 py-0.5 bg-red-50 text-red-700 rounded text-[10px] font-mono">{r.current}</span>
              </td>
              <td className="py-2 pr-2">
                <span className="px-1.5 py-0.5 bg-teal-50 text-teal-700 rounded text-[10px] font-mono">→ {r.recommended}</span>
              </td>
              <td className="py-2 pr-2 text-gray-600">{r.useCase}</td>
              <td className="py-2 pr-2 text-gray-700">{r.subsidiary}</td>
              <td className="py-2 pr-2 text-right text-red-600 font-medium">{fmtM(r.currentCost)}</td>
              <td className="py-2 pr-2 text-right text-teal-600 font-medium">{fmtM(r.recommendedCost)}</td>
              <td className="py-2 text-right font-bold text-green-600">{fmtM(r.savings)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200 bg-gray-50 font-semibold text-gray-700 text-xs">
            <td colSpan={4} className="py-2">Total</td>
            <td className="py-2 text-right text-red-600">{fmtM(modelRightSizing.reduce((s,r)=>s+r.currentCost,0))}</td>
            <td className="py-2 text-right text-teal-600">{fmtM(modelRightSizing.reduce((s,r)=>s+r.recommendedCost,0))}</td>
            <td className="py-2 text-right text-green-600">{fmtM(modelRightSizing.reduce((s,r)=>s+r.savings,0))}</td>
          </tr>
        </tfoot>
      </table>
    </Panel>
  );
}

// ── Idle & Underutilized Services ─────────────────────────────────────────────
function IdleServicesTable() {
  return (
    <Panel title="Idle & Underutilized AI Services">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100 text-gray-500 text-left">
            <th className="pb-2 pr-2 font-normal">Service</th>
            <th className="pb-2 pr-2 font-normal">Subsidiary</th>
            <th className="pb-2 pr-2 font-normal">Utilization</th>
            <th className="pb-2 pr-2 font-normal text-right">Cost/mo</th>
            <th className="pb-2 pr-2 font-normal text-right">Waste/mo</th>
            <th className="pb-2 pr-2 font-normal">Last Active</th>
            <th className="pb-2 font-normal">Action</th>
          </tr>
        </thead>
        <tbody>
          {idleServices.map((r, i) => (
            <tr key={r.id} className={`border-b border-gray-50 hover:bg-gray-50 ${i % 2 === 1 ? 'bg-gray-50/40' : ''}`}>
              <td className="py-2 pr-2 font-mono text-[10px] text-gray-600 max-w-[160px] truncate">{r.service}</td>
              <td className="py-2 pr-2 text-gray-700">{r.subsidiary}</td>
              <td className="py-2 pr-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-red-400" style={{ width: `${r.utilization}%` }} />
                  </div>
                  <span className="text-red-600 font-medium">{r.utilization}%</span>
                </div>
              </td>
              <td className="py-2 pr-2 text-right text-gray-700">{fmtM(r.monthlyCost)}</td>
              <td className="py-2 pr-2 text-right font-semibold text-red-600">{fmtM(r.wastage)}</td>
              <td className="py-2 pr-2 text-gray-500 whitespace-nowrap">{r.lastActive}</td>
              <td className="py-2">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                  r.action === 'Decommission'  ? 'bg-red-100 text-red-700'  :
                  r.action === 'Stop Instance' ? 'bg-orange-100 text-orange-700' :
                  'bg-amber-100 text-amber-700'
                }`}>{r.action}</span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200 bg-gray-50 font-semibold text-gray-700 text-xs">
            <td colSpan={4} className="py-2">Total Monthly Waste</td>
            <td className="py-2 text-right text-red-600">{fmtM(idleServices.reduce((s,r)=>s+r.wastage,0))}</td>
            <td colSpan={2} />
          </tr>
        </tfoot>
      </table>
    </Panel>
  );
}

// ── Monthly Waste Trend ───────────────────────────────────────────────────────
function WasteTrendChart() {
  return (
    <Panel title="Monthly Waste Identified vs Avoided (2025)" className="mb-4">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={monthlyWasteTrend} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
          <YAxis tickFormatter={tickFmt} tick={{ fontSize: 9 }} width={48} />
          <Tooltip formatter={(v, name) => [fmtM(v), name]} contentStyle={{ fontSize: 11, borderRadius: 6 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="identified" name="Identified Waste"  fill="#FCA5A5" radius={[2,2,0,0]} stackId="a" />
          <Bar dataKey="avoided"    name="Avoided (Savings)" fill="#0D9488"  radius={[2,2,0,0]} stackId="b" />
        </BarChart>
      </ResponsiveContainer>
    </Panel>
  );
}

// ── Roadmap ───────────────────────────────────────────────────────────────────
function Roadmap() {
  const max = Math.max(...roadmapQuarters.map(r => r.cumulativeSavings));
  return (
    <Panel title="Implementation Roadmap — Cumulative Savings Projection">
      <div className="grid grid-cols-4 gap-3">
        {roadmapQuarters.map((q, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-3">
            <div className="text-xs font-bold text-gray-800 mb-2">{q.quarter}</div>
            <div className="text-[10px] text-gray-500 mb-2">{q.items} optimizations</div>
            {/* Progress to max savings */}
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-teal-500 rounded-full"
                style={{ width: `${(q.cumulativeSavings / max) * 100}%` }} />
            </div>
            <div className="text-sm font-bold text-teal-700">{fmtM(q.cumulativeSavings)}</div>
            <div className="text-[10px] text-gray-500">cumulative saved</div>
            <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between text-[10px]">
              <span className="text-gray-500">Impl. cost</span>
              <span className="text-red-500">{fmtM(q.effort)}</span>
            </div>
            <div className="flex justify-between text-[10px] mt-0.5">
              <span className="text-gray-500">ROI</span>
              <span className="text-green-600 font-semibold">{q.roi}%</span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ── Status Summary ────────────────────────────────────────────────────────────
function StatusSummary() {
  const counts = optimizationOpps.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});
  const total = optimizationOpps.length;

  return (
    <Panel title="Status Overview">
      <div className="space-y-3">
        {Object.entries(counts).map(([status, count]) => {
          const pct = Math.round((count / total) * 100);
          const color = {
            'Open': '#2563EB', 'In Progress': '#0D9488',
            'Implemented': '#16A34A', 'Deferred': '#9CA3AF',
          }[status] ?? '#94A3B8';
          return (
            <div key={status}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-700">{status}</span>
                <span className="font-semibold text-gray-900">{count} <span className="text-gray-400 font-normal">({pct}%)</span></span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="text-[10px] text-gray-500 mb-2 font-medium uppercase tracking-wide">Opportunities by Priority</div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {['High', 'Medium', 'Low'].map(p => {
            const n = optimizationOpps.filter(o => o.priority === p).length;
            return (
              <div key={p} className="rounded-lg bg-gray-50 p-2">
                <div className={`text-lg font-bold ${p === 'High' ? 'text-red-600' : p === 'Medium' ? 'text-amber-600' : 'text-gray-500'}`}>{n}</div>
                <div className="text-[10px] text-gray-500">{p}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function AIOptimisationPage() {
  return (
    <div>
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-0.5">Optimisation Hub / Products / AI</p>
        <h1 className="text-2xl font-bold text-gray-900">AI Optimisation</h1>
        <p className="text-xs text-gray-500 mt-0.5">Identified savings opportunities across Alphabet AI workloads</p>
      </div>

      {/* KPI Row */}
      <KpiRow />

      {/* Row 2: Savings by Category + Effort vs Impact */}
      <div className="grid grid-cols-[2fr_3fr] gap-4 mb-4">
        <SavingsByCategoryChart />
        <EffortImpactChart />
      </div>

      {/* Opportunities Table */}
      <OpportunitiesTable />

      {/* Row 3: Model Right-sizing + Idle Services */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <ModelRightSizingTable />
        <IdleServicesTable />
      </div>

      {/* Row 4: Waste Trend + Status Summary */}
      <div className="grid grid-cols-[3fr_1fr] gap-4">
        <WasteTrendChart />
        <StatusSummary />
      </div>

      {/* Roadmap */}
      <Roadmap />
    </div>
  );
}
