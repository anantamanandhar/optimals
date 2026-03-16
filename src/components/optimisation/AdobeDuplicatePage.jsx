import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { ChevronDown } from 'lucide-react';
import {
  adobeDupKpi, adobeDupNorm, adobeDupDenorm,
  adobeDupBillToPie, adobeDupByCountry, adobeDupCountryMap,
  adobeNormLicenses, adobeAllAffected,
} from '../../data/adobeDuplicateData';

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtN = (n) => n?.toLocaleString('en-US') ?? '0';
const fmt$ = (n) => `$${n?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) ?? 0}`;

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const ISO_NUM_TO_ALPHA3 = {
  '840': 'USA', '826': 'GBR', '076': 'BRA', '036': 'AUS', '276': 'DEU',
  '484': 'MEX', '124': 'CAN', '756': 'CHE', '356': 'IND', '528': 'NLD',
  '792': 'TUR', '724': 'ESP', '804': 'UKR', '392': 'JPN', '170': 'COL',
};

const maxMapVal = Math.max(...Object.values(adobeDupCountryMap));
const mapColor = (v) => {
  if (!v) return '#E2E8F0';
  const t = v / maxMapVal;
  if (t > 0.8) return '#1E3A5F';
  if (t > 0.4) return '#2563EB';
  if (t > 0.1) return '#60A5FA';
  return '#BAE6FD';
};

// ── Inline bar ────────────────────────────────────────────────────────────────
function InlineBar({ value, max, color }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-1.5 min-w-[60px]">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

// ── Filter Bar ────────────────────────────────────────────────────────────────
function FilterBar() {
  const [isLatest, setIsLatest] = useState(true);
  return (
    <div className="flex items-end gap-4 flex-wrap mb-5 p-4 bg-white border border-gray-100 rounded-xl shadow-sm text-xs">
      {['Bill To', 'Product SKU', 'Country', 'User Name'].map(label => (
        <div key={label} className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-500">{label}</span>
          <div className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 rounded text-gray-600 bg-white cursor-pointer hover:border-gray-400 min-w-[110px]">
            <span className="flex-1">is any value</span>
            <ChevronDown size={11} className="text-gray-400" />
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-gray-500">Extract Date</span>
        <div className="flex items-center rounded overflow-hidden border border-gray-300 text-xs font-medium">
          <button
            onClick={() => setIsLatest(false)}
            className={`px-3 py-1.5 transition-colors ${!isLatest ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            is any value
          </button>
          <button
            onClick={() => setIsLatest(true)}
            className={`px-3 py-1.5 transition-colors ${isLatest ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            is latest
          </button>
        </div>
      </div>
    </div>
  );
}

// ── KPI Banner ────────────────────────────────────────────────────────────────
function KpiBanner() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-5">
      <div className="rounded-xl p-6 text-white text-center" style={{ background: 'linear-gradient(135deg, #b91c1c, #ef4444)' }}>
        <div className="text-5xl font-bold tracking-tight mb-2">{fmtN(adobeDupKpi.normalisedCount)}</div>
        <div className="text-sm text-red-200 flex items-center justify-center gap-1">
          Normalised Duplicate License Count
          <span className="opacity-60 text-xs cursor-pointer">ⓘ</span>
        </div>
      </div>
      <div className="rounded-xl p-6 text-white text-center" style={{ background: 'linear-gradient(135deg, #b91c1c, #ef4444)' }}>
        <div className="text-5xl font-bold tracking-tight mb-2">{fmt$(adobeDupKpi.normalisedCost)}</div>
        <div className="text-sm text-red-200 flex items-center justify-center gap-1">
          Normalised Duplicate License Cost
          <span className="opacity-60 text-xs cursor-pointer">ⓘ</span>
        </div>
      </div>
    </div>
  );
}

// ── Normalised Bill To Table ──────────────────────────────────────────────────
function NormTable() {
  const maxCount = Math.max(...adobeDupNorm.map(r => r.count));
  const maxCost  = Math.max(...adobeDupNorm.map(r => r.cost));
  const totalCount = adobeDupNorm.reduce((s, r) => s + r.count, 0);
  const totalCost  = adobeDupNorm.reduce((s, r) => s + r.cost, 0);
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">Duplication - Normalised</h3>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100 text-gray-500 text-left">
            <th className="px-2 py-2 w-5 font-normal" />
            <th className="px-2 py-2 font-normal">Fo Bill To</th>
            <th className="px-2 py-2 font-normal text-right" colSpan={2}>Number of Licenses</th>
            <th className="px-2 py-2 font-normal text-right" colSpan={2}>Projected Annual Cost ($)</th>
          </tr>
        </thead>
        <tbody>
          {adobeDupNorm.map((row, i) => (
            <tr key={row.id} className={`border-b border-gray-50 hover:bg-gray-50 ${i % 2 === 1 ? 'bg-gray-50/50' : ''}`}>
              <td className="px-2 py-1.5 text-gray-400">{row.id}</td>
              <td className="px-2 py-1.5 text-gray-700 font-medium truncate max-w-[90px]">{row.name}</td>
              <td className="px-2 py-1.5 text-right text-gray-700 whitespace-nowrap">{fmtN(row.count)}</td>
              <td className="px-2 py-1.5 w-14"><InlineBar value={row.count} max={maxCount} color="#ef4444" /></td>
              <td className="px-2 py-1.5 text-right text-gray-700 whitespace-nowrap">{fmt$(row.cost)}</td>
              <td className="px-2 py-1.5 w-14"><InlineBar value={row.cost} max={maxCost} color="#0D9488" /></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200 bg-gray-50 font-semibold text-gray-700 text-xs">
            <td className="px-2 py-2" colSpan={2}>Totals</td>
            <td className="px-2 py-2 text-right">{fmtN(totalCount)}</td>
            <td />
            <td className="px-2 py-2 text-right">{fmt$(totalCost)}</td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ── De-normalised Bill To Table ───────────────────────────────────────────────
function DenormTable() {
  const maxCount = Math.max(...adobeDupDenorm.map(r => r.count));
  const maxCost  = Math.max(...adobeDupDenorm.map(r => r.cost));
  const totalCount = adobeDupDenorm.reduce((s, r) => s + r.count, 0);
  const totalCost  = adobeDupDenorm.reduce((s, r) => s + r.cost, 0);
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">Duplication - De-normalised</h3>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100 text-gray-500 text-left">
            <th className="px-2 py-2 w-5 font-normal" />
            <th className="px-2 py-2 font-normal">Bill To (Duplication)</th>
            <th className="px-2 py-2 font-normal text-right" colSpan={2}>License Count</th>
            <th className="px-2 py-2 font-normal text-right" colSpan={2}>License Cost (Annualised)</th>
          </tr>
        </thead>
        <tbody>
          {adobeDupDenorm.map((row, i) => (
            <tr key={row.id} className={`border-b border-gray-50 hover:bg-gray-50 ${i % 2 === 1 ? 'bg-gray-50/50' : ''}`}>
              <td className="px-2 py-1.5 text-gray-400">{row.id}</td>
              <td className="px-2 py-1.5 text-gray-700 font-medium truncate max-w-[90px]">{row.name}</td>
              <td className="px-2 py-1.5 text-right text-gray-700 whitespace-nowrap">{fmtN(row.count)}</td>
              <td className="px-2 py-1.5 w-14"><InlineBar value={row.count} max={maxCount} color="#ef4444" /></td>
              <td className="px-2 py-1.5 text-right text-gray-700 whitespace-nowrap">{fmt$(row.cost)}</td>
              <td className="px-2 py-1.5 w-14"><InlineBar value={row.cost} max={maxCost} color="#0D9488" /></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200 bg-gray-50 font-semibold text-gray-700 text-xs">
            <td className="px-2 py-2" colSpan={2}>Totals</td>
            <td className="px-2 py-2 text-right">{fmtN(totalCount)}</td>
            <td />
            <td className="px-2 py-2 text-right">{fmt$(totalCost)}</td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ── Bill To % Donut ───────────────────────────────────────────────────────────
function BillToPie() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 h-full">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Normalised Duplicate License Cost By Bill To %</h3>
      <div className="flex gap-4">
        <div className="shrink-0" style={{ width: 180, height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={adobeDupBillToPie}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={82}
                dataKey="value"
                paddingAngle={1}
              >
                {adobeDupBillToPie.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v.toFixed(2)}%`, '']} contentStyle={{ fontSize: 10, borderRadius: 6 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-0.5 overflow-y-auto" style={{ maxHeight: 200 }}>
          {adobeDupBillToPie.map((d, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[10px] text-gray-600 whitespace-nowrap">
              <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
              <span>{d.name}</span>
              <span className="text-gray-400 ml-0.5">{d.value.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Country Table ─────────────────────────────────────────────────────────────
function CountryTable() {
  const maxCount = Math.max(...adobeDupByCountry.map(r => r.count));
  const maxCost  = Math.max(...adobeDupByCountry.map(r => r.cost));
  const totalCount = adobeDupByCountry.reduce((s, r) => s + r.count, 0);
  const totalCost  = adobeDupByCountry.reduce((s, r) => s + r.cost, 0);
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">Normalised Duplicate License Cost By Country</h3>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100 text-gray-500 text-left">
            <th className="px-2 py-2 w-5 font-normal" />
            <th className="px-2 py-2 font-normal">Adobe Country</th>
            <th className="px-2 py-2 font-normal text-right" colSpan={2}>Number of Licenses</th>
            <th className="px-2 py-2 font-normal text-right" colSpan={2}>Projected Annual Cost ($)</th>
          </tr>
        </thead>
        <tbody>
          {adobeDupByCountry.map((row, i) => (
            <tr key={row.id} className={`border-b border-gray-50 hover:bg-gray-50 ${i % 2 === 1 ? 'bg-gray-50/50' : ''}`}>
              <td className="px-2 py-1.5 text-gray-400">{row.id}</td>
              <td className="px-2 py-1.5 text-gray-700 font-medium">{row.country}</td>
              <td className="px-2 py-1.5 text-right text-gray-700">{fmtN(row.count)}</td>
              <td className="px-2 py-1.5 w-16"><InlineBar value={row.count} max={maxCount} color="#ef4444" /></td>
              <td className="px-2 py-1.5 text-right text-gray-700">{fmt$(row.cost)}</td>
              <td className="px-2 py-1.5 w-16"><InlineBar value={row.cost} max={maxCost} color="#0D9488" /></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200 bg-gray-50 font-semibold text-gray-700 text-xs">
            <td className="px-2 py-2" colSpan={2}>Totals</td>
            <td className="px-2 py-2 text-right">{fmtN(totalCount)}</td>
            <td />
            <td className="px-2 py-2 text-right">{fmt$(totalCost)}</td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ── World Map ─────────────────────────────────────────────────────────────────
function WorldMap() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">Normalised Duplicate License Cost By Country</h3>
      <ComposableMap projectionConfig={{ scale: 120 }} style={{ width: '100%', height: 170 }}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const numId = geo.id?.toString().padStart(3, '0');
              const alpha3 = ISO_NUM_TO_ALPHA3[numId];
              const val = adobeDupCountryMap[alpha3] ?? 0;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={mapColor(val)}
                  stroke="#fff"
                  strokeWidth={0.4}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

// ── User Detail Table (shared for both bottom tables) ─────────────────────────
function UserTable({ title, rows }) {
  const maxCost = Math.max(...rows.map(r => r.cost));
  const totalLic  = rows.reduce((s, r) => s + r.licenses, 0);
  const totalCost = rows.reduce((s, r) => s + r.cost, 0);
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-4">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="text-xs" style={{ minWidth: 1080 }}>
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 text-left">
              <th className="px-2 py-2 w-5 font-normal" />
              <th className="px-3 py-2 font-normal">Primary Email</th>
              <th className="px-3 py-2 font-normal">Adobe Country</th>
              <th className="px-3 py-2 font-normal">Product Friendly Name</th>
              <th className="px-3 py-2 font-normal">Product SKU</th>
              <th className="px-3 py-2 font-normal">User GUID</th>
              <th className="px-3 py-2 font-normal">Bill To</th>
              <th className="px-3 py-2 font-normal text-right">Number of Licenses</th>
              <th className="px-3 py-2 font-normal" style={{ minWidth: 200 }}>Projected Annual Cost ($)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={`border-b border-gray-50 hover:bg-gray-50 ${i % 2 === 1 ? 'bg-gray-50/50' : ''}`}>
                <td className="px-2 py-1.5 text-gray-400 text-center">{i + 1}</td>
                <td className="px-3 py-1.5 text-gray-700 whitespace-nowrap">{row.email}</td>
                <td className="px-3 py-1.5 text-gray-500">{row.country}</td>
                <td className="px-3 py-1.5 text-gray-700 whitespace-nowrap">{row.product}</td>
                <td className="px-3 py-1.5 text-gray-500 font-mono">{row.sku}</td>
                <td className="px-3 py-1.5 text-gray-400 font-mono text-[10px] whitespace-nowrap max-w-[200px] truncate">{row.guid}</td>
                <td className="px-3 py-1.5 text-gray-700 whitespace-nowrap">{row.billTo}</td>
                <td className="px-3 py-1.5 text-right text-gray-700">{row.licenses}</td>
                <td className="px-3 py-1.5" style={{ minWidth: 200 }}>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-red-400" style={{ width: `${(row.cost / maxCost) * 100}%` }} />
                    </div>
                    <span className="text-gray-700 whitespace-nowrap">{fmt$(row.cost)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-200 bg-gray-50 font-semibold text-gray-700 text-xs">
              <td colSpan={7} className="px-3 py-2">Totals</td>
              <td className="px-3 py-2 text-right">{fmtN(totalLic)}</td>
              <td className="px-3 py-2">{fmt$(totalCost)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function AdobeDuplicatePage() {
  return (
    <div>
      {/* Breadcrumb + Title */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-0.5">Optimisation Hub / Products / Adobe</p>
        <h1 className="text-xl font-bold text-gray-900">Adobe – Duplicate</h1>
      </div>

      <FilterBar />
      <KpiBanner />

      {/* Three-column: Norm table | Denorm table | Pie */}
      <div className="grid grid-cols-[5fr_5fr_6fr] gap-4 items-start mb-4">
        <NormTable />
        <DenormTable />
        <BillToPie />
      </div>

      {/* Two-column: Country table | World map */}
      <div className="grid grid-cols-[3fr_2fr] gap-4 mb-4">
        <CountryTable />
        <WorldMap />
      </div>

      {/* Full-width user tables */}
      <UserTable title="Normalised Duplicate Licenses" rows={adobeNormLicenses} />
      <UserTable title="All User Licenses Affected by Duplication" rows={adobeAllAffected} />
    </div>
  );
}
