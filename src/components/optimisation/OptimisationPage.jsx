import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import {
  UserX, Copy, TrendingDown, ArrowDownCircle,
  AlertTriangle, ChevronDown, ChevronRight,
  Building2, Landmark, Users, Filter, Download,
} from 'lucide-react';
import {
  issues, SUBSIDIARIES, DEPARTMENTS, getSummary,
  getSavingsByProduct, getSavingsBySubsidiary, getSavingsByDepartment,
} from '../../data/optimisationData';

// ─── helpers ────────────────────────────────────────────────────────────────
const fmtMoney = (n) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}m`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n}`;
};

const SEVERITY_STYLES = {
  high:   'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low:    'bg-blue-50 text-blue-700 border-blue-200',
};
const SEVERITY_DOT = {
  high:   'bg-red-500',
  medium: 'bg-amber-400',
  low:    'bg-blue-400',
};

const TYPE_META = {
  ghost:        { label: 'Ghost Accounts',        icon: UserX,          color: '#EF4444', bg: 'bg-red-50',    text: 'text-red-700'   },
  duplicate:    { label: 'Duplicate Licences',    icon: Copy,           color: '#F59E0B', bg: 'bg-amber-50',  text: 'text-amber-700' },
  underutilized:{ label: 'Underutilised',         icon: TrendingDown,   color: '#8B5CF6', bg: 'bg-violet-50', text: 'text-violet-700'},
  rightsizing:  { label: 'Licence Rightsizing',   icon: ArrowDownCircle,color: '#0D9488', bg: 'bg-teal-50',   text: 'text-teal-700'  },
};

const BAR_COLORS = ['#1E3A5F','#0D9488','#3B82F6','#8B5CF6','#F59E0B','#EF4444','#10B981','#6366F1'];

// ─── KPI card ────────────────────────────────────────────────────────────────
function KpiCard({ icon: Icon, label, saving, count, countLabel, color, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left w-full bg-white rounded-xl border shadow-sm p-5 transition-all
        ${active ? 'border-teal-500 ring-2 ring-teal-200' : 'border-gray-100 hover:border-gray-300'}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
        <span className="p-2 rounded-lg" style={{ backgroundColor: color + '18' }}>
          <Icon size={16} style={{ color }} />
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{fmtMoney(saving)}<span className="text-sm font-normal text-gray-400 ml-1">/yr</span></p>
      <p className="text-sm text-gray-500 mt-1">{count} {countLabel}</p>
    </button>
  );
}

// ─── Severity badge ──────────────────────────────────────────────────────────
function SeverityBadge({ severity }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full border ${SEVERITY_STYLES[severity]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${SEVERITY_DOT[severity]}`} />
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
}

// ─── Issues table rows ───────────────────────────────────────────────────────
function GhostRow({ item, expanded, onToggle }) {
  return (
    <>
      <tr
        className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
        onClick={() => onToggle(item.id)}
      >
        <td className="py-3 px-3">
          <div className="flex items-center gap-2">
            <ChevronRight size={13} className={`text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
            <span className="font-medium text-gray-800">{item.product}</span>
          </div>
        </td>
        <td className="py-3 px-3 text-gray-600 text-sm">{item.subsidiary}</td>
        <td className="py-3 px-3 text-gray-600 text-sm">{item.department}</td>
        <td className="py-3 px-3 text-gray-700 font-medium">{item.users}</td>
        <td className="py-3 px-3 text-gray-500 text-sm">{item.lastActive}</td>
        <td className="py-3 px-3 text-right font-semibold text-red-600">{fmtMoney(item.annualSaving)}</td>
        <td className="py-3 px-3"><SeverityBadge severity={item.severity} /></td>
        <td className="py-3 px-3">
          <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
            {item.action}
          </span>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-red-50 border-b border-red-100">
          <td colSpan={8} className="px-8 py-3 text-xs text-red-700">
            <strong>Recommendation:</strong> {item.action} for {item.users} departed users on <strong>{item.product}</strong> in {item.subsidiary} / {item.department}. Last activity was {item.lastActive}. Annual saving: <strong>{fmtMoney(item.annualSaving)}</strong>.
          </td>
        </tr>
      )}
    </>
  );
}

function DuplicateRow({ item, expanded, onToggle }) {
  const [a, b] = item.product.split(' + ');
  return (
    <>
      <tr
        className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
        onClick={() => onToggle(item.id)}
      >
        <td className="py-3 px-3">
          <div className="flex items-center gap-2">
            <ChevronRight size={13} className={`text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
            <div className="flex items-center gap-1">
              <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium">{a}</span>
              <span className="text-gray-400">+</span>
              <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium">{b}</span>
            </div>
          </div>
        </td>
        <td className="py-3 px-3 text-gray-600 text-sm">{item.subsidiary}</td>
        <td className="py-3 px-3 text-gray-600 text-sm">{item.department}</td>
        <td className="py-3 px-3 text-gray-700 font-medium">{item.users}</td>
        <td className="py-3 px-3 text-right font-semibold text-amber-600">{fmtMoney(item.annualSaving)}</td>
        <td className="py-3 px-3"><SeverityBadge severity={item.severity} /></td>
        <td className="py-3 px-3">
          <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
            Consolidate
          </span>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-amber-50 border-b border-amber-100">
          <td colSpan={7} className="px-8 py-3 text-xs text-amber-800">
            <strong>Overlap:</strong> {item.overlap}. Affects <strong>{item.users} users</strong> in {item.subsidiary} / {item.department}. Annual saving by removing duplicate: <strong>{fmtMoney(item.annualSaving)}</strong>.
          </td>
        </tr>
      )}
    </>
  );
}

function UnderutilizedRow({ item, expanded, onToggle }) {
  const barW = Math.max(item.usagePct, 2);
  return (
    <>
      <tr
        className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
        onClick={() => onToggle(item.id)}
      >
        <td className="py-3 px-3">
          <div className="flex items-center gap-2">
            <ChevronRight size={13} className={`text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
            <span className="font-medium text-gray-800">{item.product}</span>
          </div>
        </td>
        <td className="py-3 px-3 text-gray-600 text-sm">{item.subsidiary}</td>
        <td className="py-3 px-3 text-gray-600 text-sm">{item.department}</td>
        <td className="py-3 px-3 text-gray-700 font-medium">{item.totalLicences}</td>
        <td className="py-3 px-3">
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${item.usagePct < 10 ? 'bg-red-500' : item.usagePct < 20 ? 'bg-amber-400' : 'bg-emerald-500'}`}
                style={{ width: `${barW}%` }}
              />
            </div>
            <span className={`text-xs font-semibold ${item.usagePct < 10 ? 'text-red-600' : item.usagePct < 20 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {item.usagePct}%
            </span>
          </div>
        </td>
        <td className="py-3 px-3 text-right font-semibold text-violet-600">{fmtMoney(item.annualSaving)}</td>
        <td className="py-3 px-3"><SeverityBadge severity={item.severity} /></td>
        <td className="py-3 px-3">
          <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
            Remove or reassign
          </span>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-violet-50 border-b border-violet-100">
          <td colSpan={8} className="px-8 py-3 text-xs text-violet-800">
            <strong>Usage alert:</strong> Only <strong>{item.activeLicences} of {item.totalLicences} licences</strong> active ({item.usagePct}%) in the last 90 days in {item.subsidiary} / {item.department}. Threshold: {item.threshold}. Recommend removing or reassigning {item.totalLicences - item.activeLicences} licences. Annual saving: <strong>{fmtMoney(item.annualSaving)}</strong>.
          </td>
        </tr>
      )}
    </>
  );
}

function RightsizingRow({ item, expanded, onToggle }) {
  return (
    <>
      <tr
        className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
        onClick={() => onToggle(item.id)}
      >
        <td className="py-3 px-3">
          <div className="flex items-center gap-2">
            <ChevronRight size={13} className={`text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
            <span className="font-medium text-gray-800">{item.product}</span>
          </div>
        </td>
        <td className="py-3 px-3 text-gray-600 text-sm">{item.subsidiary}</td>
        <td className="py-3 px-3 text-gray-600 text-sm">{item.department}</td>
        <td className="py-3 px-3 text-gray-700 font-medium">{item.users}</td>
        <td className="py-3 px-3">
          <div className="flex items-center gap-1 text-xs">
            <span className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded font-medium">{item.currentTier}</span>
            <span className="text-gray-400">→</span>
            <span className="bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded font-medium">{item.recommendedTier}</span>
          </div>
        </td>
        <td className="py-3 px-3 text-right font-semibold text-teal-600">{fmtMoney(item.annualSaving)}</td>
        <td className="py-3 px-3"><SeverityBadge severity={item.severity} /></td>
        <td className="py-3 px-3">
          <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
            Downgrade
          </span>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-teal-50 border-b border-teal-100">
          <td colSpan={8} className="px-8 py-3 text-xs text-teal-800">
            <strong>Rightsizing rationale:</strong> {item.reason}. Downgrade <strong>{item.users} users</strong> from <strong>{item.currentTier}</strong> to <strong>{item.recommendedTier}</strong> in {item.subsidiary} / {item.department}. Saving: <strong>${item.monthlyPerUser}/user/mo</strong> = <strong>{fmtMoney(item.annualSaving)}/yr</strong>.
          </td>
        </tr>
      )}
    </>
  );
}

// ─── Issues panel ────────────────────────────────────────────────────────────
function IssuesPanel({ filtered, activeType, onTypeChange }) {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const toggle = (id) =>
    setExpandedRows((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const byType = filtered.filter((i) => i.type === activeType);
  const sorted = [...byType].sort((a, b) => b.annualSaving - a.annualSaving);

  const tabs = Object.entries(TYPE_META).map(([key, meta]) => ({
    key,
    ...meta,
    count: filtered.filter((i) => i.type === key).length,
  }));

  // Table headers per type
  const headers = {
    ghost:         ['Product', 'Subsidiary', 'Department', 'Users', 'Last Active', 'Annual Saving', 'Severity', 'Action'],
    duplicate:     ['Products', 'Subsidiary', 'Department', 'Users', 'Annual Saving', 'Severity', 'Action'],
    underutilized: ['Product', 'Subsidiary', 'Department', 'Licences', 'Usage Rate', 'Annual Saving', 'Severity', 'Action'],
    rightsizing:   ['Product', 'Subsidiary', 'Department', 'Users', 'Tier Change', 'Annual Saving', 'Severity', 'Action'],
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex-1">
      {/* Type tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.key === activeType;
          return (
            <button
              key={tab.key}
              onClick={() => { onTypeChange(tab.key); setExpandedRows(new Set()); }}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                ${active ? 'border-teal-600 text-teal-700 bg-teal-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            >
              <Icon size={15} />
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${active ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {headers[activeType].map((h) => (
                <th key={h} className={`py-2.5 px-3 text-xs font-medium text-gray-500 ${h === 'Annual Saving' ? 'text-right' : 'text-left'}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr><td colSpan={8} className="py-10 text-center text-sm text-gray-400">No issues found for this filter.</td></tr>
            )}
            {sorted.map((item) =>
              activeType === 'ghost'         ? <GhostRow         key={item.id} item={item} expanded={expandedRows.has(item.id)} onToggle={toggle} /> :
              activeType === 'duplicate'     ? <DuplicateRow     key={item.id} item={item} expanded={expandedRows.has(item.id)} onToggle={toggle} /> :
              activeType === 'underutilized' ? <UnderutilizedRow key={item.id} item={item} expanded={expandedRows.has(item.id)} onToggle={toggle} /> :
                                               <RightsizingRow   key={item.id} item={item} expanded={expandedRows.has(item.id)} onToggle={toggle} />
            )}
          </tbody>
        </table>
      </div>

      {/* Footer totals */}
      {sorted.length > 0 && (
        <div className="border-t border-gray-200 px-4 py-2.5 bg-gray-50 flex items-center justify-between text-sm">
          <span className="text-gray-500">{sorted.length} issues</span>
          <span className="font-semibold text-gray-800">
            Total opportunity: {fmtMoney(sorted.reduce((s, i) => s + i.annualSaving, 0))}/yr
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Sidebar charts ───────────────────────────────────────────────────────────
function ChartPanel({ filtered, breakdownView }) {
  const byProduct = getSavingsByProduct(filtered);
  const byBreakdown = breakdownView === 'department'
    ? getSavingsByDepartment(filtered)
    : getSavingsBySubsidiary(filtered);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow px-3 py-2 text-xs">
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-teal-600">{fmtMoney(payload[0].value)} / yr</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-72 shrink-0">
      {/* Savings by product */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Savings by Product</h4>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byProduct} layout="vertical" margin={{ left: 0, right: 8 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => fmtMoney(v)} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={80} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {byProduct.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Savings by breakdown */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
          Savings by {breakdownView === 'department' ? 'Department' : 'Subsidiary'}
        </h4>
        <div style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byBreakdown} layout="vertical" margin={{ left: 0, right: 8 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => fmtMoney(v)} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={90} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {byBreakdown.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Priority legend */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Issue Breakdown</h4>
        <div className="space-y-2">
          {Object.entries(TYPE_META).map(([key, meta]) => {
            const count = filtered.filter((i) => i.type === key);
            const saving = count.reduce((s, i) => s + i.annualSaving, 0);
            if (!saving) return null;
            return (
              <div key={key} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: meta.color }} />
                  <span className="text-gray-700">{meta.label}</span>
                </div>
                <span className="font-semibold text-gray-800">{fmtMoney(saving)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────
export function OptimisationPage({ defaultView = 'alphabet' }) {
  const [view, setView] = useState(defaultView); // 'alphabet' | 'subsidiary' | 'department'
  const [selectedEntity, setSelectedEntity] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [activeType, setActiveType] = useState('ghost');

  // Filter issues based on current selections
  const filtered = useMemo(() => {
    return issues.filter((item) => {
      if (view === 'subsidiary' && selectedEntity !== 'all' && item.subsidiary !== selectedEntity) return false;
      if (view === 'department' && selectedEntity !== 'all' && item.department !== selectedEntity) return false;
      if (selectedProduct !== 'all' && !item.product.includes(selectedProduct)) return false;
      return true;
    });
  }, [view, selectedEntity, selectedProduct]);

  const summary = useMemo(() => getSummary(filtered), [filtered]);

  const entityOptions = view === 'subsidiary'
    ? [{ value: 'all', label: 'All Subsidiaries' }, ...['Google LLC','YouTube','Waymo','DeepMind','Verily','Calico','X Development','GV','Wing','Fitbit'].map((s) => ({ value: s, label: s }))]
    : view === 'department'
    ? [{ value: 'all', label: 'All Departments' }, ...['Engineering','Marketing','Finance','Operations','HR','Legal','IT','Product','Data Science','Sales'].map((d) => ({ value: d, label: d }))]
    : [];

  const VIEW_TABS = [
    { key: 'alphabet',    label: 'Alphabet',    icon: Building2 },
    { key: 'subsidiary',  label: 'Subsidiary',  icon: Landmark  },
    { key: 'department',  label: 'Department',  icon: Users     },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <nav className="text-xs text-gray-500 mb-1">
            <span className="hover:text-gray-700 cursor-pointer">Optimisation Hub</span>
            <span className="mx-1">›</span>
            <span className="text-gray-800 font-medium">Licence Intelligence</span>
          </nav>
          <h1 className="text-2xl font-semibold text-gray-900">Licence Optimisation</h1>
          <p className="text-sm text-gray-500 mt-0.5">Identify and eliminate SaaS licence waste across your organisation</p>
        </div>
        <button className="flex items-center gap-2 text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
          <Download size={14} />
          Export Report
        </button>
      </div>

      {/* View switcher + filters */}
      <div className="flex items-center gap-3 mt-4 mb-5 flex-wrap">
        {/* View tabs */}
        <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
          {VIEW_TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setView(key); setSelectedEntity('all'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                ${view === key ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Entity selector (only when not in alphabet view) */}
        {view !== 'alphabet' && (
          <div className="relative">
            <select
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
            >
              {entityOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        )}

        {/* Product filter */}
        <div className="relative flex items-center gap-1.5">
          <Filter size={13} className="text-gray-400" />
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="appearance-none pl-2 pr-7 py-1.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
          >
            <option value="all">All Products</option>
            {['O365','Adobe CC','Azure','GCP','Google Workspace','Sharepoint','Box','Monday','UHuB','WithSecure'].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="ml-auto text-xs text-gray-400">
          {filtered.length} issues · Last refreshed today
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="bg-gradient-to-br from-[#1E2B3A] to-[#1E3A5F] rounded-xl p-5 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-teal-300" />
            <span className="text-xs font-medium text-teal-200 uppercase tracking-wide">Total Opportunity</span>
          </div>
          <p className="text-3xl font-bold">{fmtMoney(summary.totalSaving)}</p>
          <p className="text-sm text-blue-200 mt-1">potential annual savings</p>
        </div>
        <KpiCard
          icon={UserX}  label="Ghost Accounts"
          saving={summary.ghost.saving} count={summary.ghost.count} countLabel="departed users still licensed"
          color="#EF4444" active={activeType === 'ghost'} onClick={() => setActiveType('ghost')}
        />
        <KpiCard
          icon={Copy} label="Duplicate Licences"
          saving={summary.duplicate.saving} count={summary.duplicate.count} countLabel="users with overlapping tools"
          color="#F59E0B" active={activeType === 'duplicate'} onClick={() => setActiveType('duplicate')}
        />
        <KpiCard
          icon={TrendingDown} label="Underutilised"
          saving={summary.underutilized.saving + summary.rightsizing.saving}
          count={summary.underutilized.count + summary.rightsizing.count} countLabel="licences to review"
          color="#8B5CF6"
          active={activeType === 'underutilized' || activeType === 'rightsizing'}
          onClick={() => setActiveType('underutilized')}
        />
      </div>

      {/* Main content */}
      <div className="flex gap-4 items-start">
        <div className="flex-1 min-w-0">
          <IssuesPanel filtered={filtered} activeType={activeType} onTypeChange={setActiveType} />
        </div>
        <ChartPanel
          filtered={filtered}
          breakdownView={view === 'department' ? 'department' : 'subsidiary'}
        />
      </div>
    </div>
  );
}
