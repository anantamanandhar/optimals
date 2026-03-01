import { useState, useMemo } from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import {
  Heart, Copy, RefreshCw, SlidersHorizontal, MoreVertical,
  ChevronDown, ChevronUp, ChevronsUpDown, Info,
} from 'lucide-react';
import {
  spKpi, spAlerts, activityBands, treemapData,
  allSites, oktaOwner, oktaMember, inactiveSites,
} from '../../data/sharepointData';
import { IconButton } from '../ui/IconButton';

// ─── helpers ─────────────────────────────────────────────────────────────────
const fmt$ = (n) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}m`;
  if (n >= 1_000)     return `$${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  return `$${n.toFixed(2)}`;
};
const fmtN = (n) => n.toLocaleString('en-US');

// ─── Filter bar ───────────────────────────────────────────────────────────────
const FILTERS = [
  { label: 'Bill To',             defaultVal: 'is any value' },
  { label: 'Site URL',            defaultVal: 'is any value' },
  { label: 'Site Template Name',  defaultVal: 'is any value' },
  { label: 'Is Strategic Tenant?',defaultVal: 'No',   options: ['No', 'Yes'] },
  { label: 'Tenant Name',         defaultVal: 'is any value' },
  { label: 'Site Owners',         defaultVal: 'is any value' },
  { label: 'Last Activity Period',defaultVal: 'is any value' },
];

function FilterChip({ label, value }) {
  const isActive = value !== 'is any value';
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] text-gray-500">{label}</span>
      <div className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded border cursor-pointer
        ${isActive ? 'border-teal-500 text-teal-700 bg-teal-50 font-medium' : 'border-gray-300 text-gray-600 bg-white hover:border-gray-400'}`}>
        {value}
        {isActive && <span className="ml-1 text-gray-400 hover:text-gray-600">✕</span>}
        <ChevronDown size={11} className="text-gray-400 ml-1" />
      </div>
    </div>
  );
}

// ─── KPI cards (top row) ──────────────────────────────────────────────────────
function KpiStrip() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      <div className="bg-[#1E3A5F] text-white rounded-xl p-5 shadow-sm">
        <p className="text-3xl font-bold">{fmt$(spKpi.totalCost)}</p>
        <p className="text-sm text-blue-200 mt-1">Total Cost ($)</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
        <p className="text-3xl font-bold text-gray-900">{fmtN(spKpi.totalStorage)}</p>
        <p className="text-sm text-gray-500 mt-1">Total Storage (GB)</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
        <p className="text-3xl font-bold text-gray-900">{fmtN(spKpi.siteCount)}</p>
        <p className="text-sm text-gray-500 mt-1">Site Count</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
        <p className="text-2xl font-bold text-teal-600">{spKpi.lastUpdated}</p>
        <p className="text-sm text-gray-500 mt-1">Last updated</p>
      </div>
    </div>
  );
}

// ─── Alert cards ──────────────────────────────────────────────────────────────
function AlertCards() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-5">
      <div className="bg-red-500 text-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-3xl font-bold">${spAlerts.inactiveSites.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="flex items-center gap-1.5 text-red-100 text-sm">
          <span>Inactive Sites (&gt; 6 Months) ($)</span>
          <Info size={13} />
        </div>
      </div>
      <div className="bg-red-400 text-white rounded-xl p-5 shadow-sm">
        <p className="text-3xl font-bold">${spAlerts.inactiveUsers.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        <div className="flex items-center gap-1.5 text-red-100 text-sm mt-2">
          <span>Inactive Users ($)</span>
          <Info size={13} />
        </div>
      </div>
    </div>
  );
}

// ─── Custom Treemap cell ──────────────────────────────────────────────────────
function TreemapCell(props) {
  const { x, y, width, height, name, color } = props;
  if (width < 30 || height < 20) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={color} stroke="white" strokeWidth={2} rx={4} />
      {width > 80 && height > 30 && (
        <text x={x + 8} y={y + 18} fill="white" fontSize={11} fontWeight={600}>{name}</text>
      )}
    </g>
  );
}

// ─── Activity section (table + treemap) ───────────────────────────────────────
function ActivitySection() {
  const totals = {
    cost: activityBands.reduce((s, r) => s + r.cost, 0),
    sites: activityBands.reduce((s, r) => s + r.sites, 0),
    storage: activityBands.reduce((s, r) => s + r.storage, 0),
  };

  return (
    <div className="grid grid-cols-3 gap-5 mb-5">
      {/* Table */}
      <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700">Cost by Last Site Activity</h3>
          <p className="text-xs text-gray-400 mt-0.5">The date when the last site activity occurred such as visiting a site, changing permissions, sharing documents, modifying content etc.</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-2.5 px-4 text-xs font-medium text-gray-500 flex items-center gap-1">
                Last Activity Period <ChevronDown size={12} />
              </th>
              <th className="text-right py-2.5 px-4 text-xs font-medium text-gray-500">Cost Annualised ($)</th>
              <th className="text-right py-2.5 px-4 text-xs font-medium text-gray-500">Site Count</th>
              <th className="text-right py-2.5 px-4 text-xs font-medium text-gray-500">Storage (GB)</th>
              <th className="text-right py-2.5 px-4 text-xs font-medium text-gray-500">Cost %</th>
            </tr>
          </thead>
          <tbody>
            {activityBands.map((row, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="py-2.5 px-4 text-gray-700 text-xs">
                  <div className="flex items-center gap-2">
                    <span>{i + 4}. {row.label}</span>
                    {/* inline bar */}
                    {row.pct > 0 && (
                      <div className="flex-1 max-w-[180px] h-4 rounded overflow-hidden" style={{ backgroundColor: '#e5e7eb' }}>
                        <div className="h-full rounded" style={{ width: `${row.pct}%`, backgroundColor: row.color }} />
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-2.5 px-4 text-right text-gray-700 text-xs font-medium">
                  ${row.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td className="py-2.5 px-4 text-right text-gray-600 text-xs">{fmtN(row.sites)}</td>
                <td className="py-2.5 px-4 text-right text-gray-600 text-xs">{row.storage.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td className="py-2.5 px-4 text-right text-xs font-semibold" style={{ color: row.color }}>{row.pct}%</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold text-xs">
              <td className="py-2.5 px-4 text-gray-700">Totals</td>
              <td className="py-2.5 px-4 text-right text-gray-800">${totals.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              <td className="py-2.5 px-4 text-right text-gray-800">{fmtN(totals.sites)}</td>
              <td className="py-2.5 px-4 text-right text-gray-800">{totals.storage.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              <td className="py-2.5 px-4 text-right text-gray-800">100%</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Treemap */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Cost Distribution by Last Site Activity</h3>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={treemapData}
              dataKey="size"
              aspectRatio={4 / 3}
              content={<TreemapCell />}
            >
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Cost']} />
            </Treemap>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="mt-3 space-y-1.5">
          {activityBands.slice(0, 3).map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: b.color }} />
              <span className="text-gray-600">{i + 4}. {b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── All Sites table ──────────────────────────────────────────────────────────
const SITE_COLS = [
  { key: 'days',      label: 'Days since Last Site Activity', align: 'right' },
  { key: 'cost',      label: 'Cost Annualised ($)',            align: 'right' },
  { key: 'url',       label: 'Site URL',                       align: 'left'  },
  { key: 'name',      label: 'Site Name',                      align: 'left'  },
  { key: 'strategic', label: 'Is Strategic Tenant?',           align: 'left'  },
  { key: 'tenant',    label: 'Tenant Name',                    align: 'left'  },
  { key: 'type',      label: 'Site Type',                      align: 'left'  },
  { key: 'billTo',    label: 'Bill To',                        align: 'left'  },
  { key: 'bfc',       label: 'BFC Code',                       align: 'left'  },
  { key: 'owners',    label: 'Site Owners',                    align: 'left'  },
  { key: 'members',   label: 'Site Members',                   align: 'left'  },
  { key: 'storage',   label: 'Storage (GB)',                   align: 'right' },
];

function SortTh({ col, sortKey, sortDir, onSort }) {
  const active = sortKey === col.key;
  return (
    <th
      onClick={() => onSort(col.key)}
      className={`py-2.5 px-3 text-[11px] font-medium whitespace-nowrap cursor-pointer select-none
        ${col.align === 'right' ? 'text-right' : 'text-left'}
        ${active ? 'text-teal-700 bg-teal-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
    >
      <span className="inline-flex items-center gap-1">
        {col.label}
        {active
          ? sortDir === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />
          : <ChevronsUpDown size={11} className="text-gray-300" />}
      </span>
    </th>
  );
}

function AllSitesTable() {
  const [sortKey, setSortKey] = useState('days');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (key) => {
    if (key === sortKey) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = useMemo(() => [...allSites].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  }), [sortKey, sortDir]);

  const totalCost = allSites.reduce((s, r) => s + r.cost, 0);
  const totalStorage = allSites.reduce((s, r) => s + r.storage, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-5 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700">All Sites</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Last Site Activity Date = The date when the last site activity occurred such as visiting a site, changing permissions, sharing documents, modifying content etc.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs" style={{ minWidth: 1400 }}>
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-2.5 px-3 text-left text-[11px] font-medium text-gray-500 sticky left-0 bg-gray-50">#</th>
              {SITE_COLS.map((col) => (
                <SortTh key={col.key} col={col} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-blue-50 transition-colors">
                <td className="py-2 px-3 text-gray-400 sticky left-0 bg-inherit">{row.id}</td>
                <td className="py-2 px-3 text-right text-gray-700 font-medium">{fmtN(row.days)}</td>
                <td className="py-2 px-3 text-right text-gray-600">${row.cost.toFixed(2)}</td>
                <td className="py-2 px-3 text-teal-600 underline max-w-[180px] truncate">{row.url}</td>
                <td className="py-2 px-3 text-gray-700 max-w-[160px] truncate font-medium">{row.name}</td>
                <td className="py-2 px-3">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${row.strategic === 'Yes' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                    {row.strategic}
                  </span>
                </td>
                <td className="py-2 px-3 text-gray-600 max-w-[160px] truncate">{row.tenant}</td>
                <td className="py-2 px-3 text-gray-600">{row.type}</td>
                <td className="py-2 px-3 text-gray-700 font-medium">{row.billTo}</td>
                <td className="py-2 px-3 text-gray-500">{row.bfc}</td>
                <td className="py-2 px-3 text-gray-500 max-w-[180px] truncate">{row.owners}</td>
                <td className="py-2 px-3 text-gray-500 max-w-[140px] truncate">{row.members}</td>
                <td className="py-2 px-3 text-right text-gray-600">{row.storage.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold text-xs">
              <td className="py-2.5 px-3 text-gray-700 sticky left-0 bg-gray-50">Totals</td>
              <td colSpan={2} className="py-2.5 px-3 text-right text-gray-800">${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              <td colSpan={9} />
              <td className="py-2.5 px-3 text-right text-gray-800">{totalStorage.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ─── OKTA status tables ───────────────────────────────────────────────────────
const OKTA_COLORS = { 'PARTIALLY INACTIVE': '#F59E0B', 'INACTIVE': '#EF4444', 'ACTIVE': '#10B981' };

function OktaTable({ title, rows }) {
  const total = rows.reduce((s, r) => s + r.cost, 0);
  const maxCost = Math.max(...rows.map((r) => r.cost));
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <ChevronDown size={14} className="text-gray-400 ml-auto cursor-pointer" />
      </div>
      <table className="w-full text-xs">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-2 px-3 text-gray-500 font-medium">Owner OKTA status</th>
            <th className="text-right py-2 px-3 text-gray-500 font-medium">Cost ($)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
              <td className="py-2.5 px-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: OKTA_COLORS[row.status] + '20', color: OKTA_COLORS[row.status] }}>
                    {row.status}
                  </span>
                </div>
              </td>
              <td className="py-2.5 px-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(row.cost / maxCost) * 100}%`, backgroundColor: OKTA_COLORS[row.status] }} />
                  </div>
                  <span className="font-semibold text-gray-800">${row.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-gray-200 bg-gray-50">
            <td className="py-2 px-3 text-xs font-semibold text-gray-700">Totals</td>
            <td className="py-2 px-3 text-right text-xs font-semibold text-gray-800">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ─── Inactive Sites table ─────────────────────────────────────────────────────
function InactiveSitesTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700">Inactive Sites</h3>
        <p className="text-xs text-gray-400 mt-0.5">The cost of sites where the site owners AND members are INACTIVE in OKTA</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs" style={{ minWidth: 900 }}>
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['#','Site URL','Site Name','Site Owners','Site Owner Okta Status','Site Members','Site Member Okta Status','Storage (GB)','Cost Annualised ($)'].map((h) => (
                <th key={h} className={`py-2 px-2 font-medium text-gray-500 ${h === 'Cost Annualised ($)' || h === 'Storage (GB)' ? 'text-right' : 'text-left'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inactiveSites.map((row) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-red-50 transition-colors">
                <td className="py-2 px-2 text-gray-400">{row.id}</td>
                <td className="py-2 px-2 text-teal-600 underline max-w-[140px] truncate">{row.url}</td>
                <td className="py-2 px-2 text-gray-700 max-w-[140px] truncate font-medium">{row.name}</td>
                <td className="py-2 px-2 text-gray-500 max-w-[160px] truncate">{row.owners}</td>
                <td className="py-2 px-2">
                  {row.ownerOkta && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-red-50 text-red-600">{row.ownerOkta}</span>
                  )}
                </td>
                <td className="py-2 px-2 text-gray-500 max-w-[160px] truncate">{row.members}</td>
                <td className="py-2 px-2">
                  {row.memberOkta && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-red-50 text-red-600">{row.memberOkta}</span>
                  )}
                </td>
                <td className="py-2 px-2 text-right text-gray-600">{row.storage.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td className="py-2 px-2 text-right font-semibold text-red-600">${row.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────
export function SharepointPage() {
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="max-w-screen-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-1">
        <span className="hover:text-gray-700 cursor-pointer">Recharge</span>
        <span className="mx-1">›</span>
        <span className="hover:text-gray-700 cursor-pointer">Sharepoint</span>
      </nav>

      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900">SharePoint Optimisation (Alphabet)</h1>
          <button onClick={() => setFavorited((f) => !f)} className="p-1 rounded hover:bg-gray-100">
            <Heart size={18} className={favorited ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
          </button>
          <button className="p-1 rounded hover:bg-gray-100"><Copy size={16} className="text-gray-400" /></button>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>11d ago</span>
          <IconButton icon={RefreshCw} label="Refresh" />
          <IconButton icon={SlidersHorizontal} label="Filters" />
          <IconButton icon={MoreVertical} label="More" />
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-end gap-3 flex-wrap mb-5 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
        {FILTERS.map((f) => <FilterChip key={f.label} label={f.label} value={f.defaultVal} />)}
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-gray-500">Usage Period</span>
          <div className="flex items-center gap-1 px-2.5 py-1 text-xs rounded border border-teal-500 text-teal-700 bg-teal-50 font-medium cursor-pointer">
            2024-07-29 July
            <span className="ml-1 text-gray-400">✕</span>
            <ChevronDown size={11} className="text-gray-400" />
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-gray-500">Apply Credits?</span>
          <div className="flex items-center gap-1 px-2.5 py-1 text-xs rounded border border-teal-500 text-teal-700 bg-teal-50 font-medium cursor-pointer">
            Yes
            <ChevronDown size={11} className="text-gray-400 ml-1" />
          </div>
        </div>
      </div>

      <KpiStrip />
      <AlertCards />
      <ActivitySection />
      <AllSitesTable />

      {/* Bottom 3-column */}
      <div className="grid grid-cols-3 gap-5">
        <OktaTable title="Site Owner – OKTA Status" rows={oktaOwner} />
        <OktaTable title="Site Member – OKTA Status" rows={oktaMember} />
        <InactiveSitesTable />
      </div>
    </div>
  );
}
