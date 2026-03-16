import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { ChevronDown, Info } from 'lucide-react';
import {
  dupSummary, dupNormByBillTo, dupDenormByBillTo,
  dupNormByTenant, dupDenormByTenant,
  dupByCountry, dupCountryMapData,
  dupByProduct, dupProductPie,
} from '../../data/o365DuplicateData';

// ── helpers ───────────────────────────────────────────────────────────────────
const fmtN = (n) => n?.toLocaleString('en-US') ?? '0';
const fmt$ = (n) => `$${n?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) ?? 0}`;

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ISO-numeric → alpha-3 for the map countries we have data for
const ISO_NUM_TO_ALPHA3 = {
  '840': 'USA', '076': 'BRA', '356': 'IND', '826': 'GBR', '392': 'JPN',
  '156': 'CHN', '276': 'DEU', '484': 'MEX', '702': 'SGP', '620': 'PRT',
  '704': 'VNM', '764': 'THA', '203': 'CZE', '036': 'AUS', '124': 'CAN',
  '250': 'FRA', '344': 'HKG', '724': 'ESP', '710': 'ZAF', '410': 'KOR',
  '032': 'ARG', '608': 'PHL', '380': 'ITA', '528': 'NLD', '792': 'TUR',
  '404': 'KEN', '170': 'COL', '246': 'FIN', '784': 'ARE', '642': 'ROU',
  '752': 'SWE', '208': 'DNK', '050': 'BGD', '360': 'IDN',
};

const maxMapCount = Math.max(...Object.values(dupCountryMapData));
const mapColor = (count) => {
  if (!count) return '#e2e8f0';
  const t = count / maxMapCount;
  if (t > 0.8) return '#1E3A5F';
  if (t > 0.5) return '#2563EB';
  if (t > 0.2) return '#60A5FA';
  return '#BAE6FD';
};

// ── InlineBar ─────────────────────────────────────────────────────────────────
function InlineBar({ value, max, color = '#0D9488' }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-1.5 min-w-[80px]">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

// ── FilterBar ─────────────────────────────────────────────────────────────────
function FilterBar() {
  const [e5Yes, setE5Yes] = useState(true);
  const [e5No,  setE5No]  = useState(false);
  return (
    <div className="flex items-end gap-4 flex-wrap mb-5 p-4 bg-white border border-gray-100 rounded-xl shadow-sm text-xs">
      {[['Bill To', 'is any value'], ['License Type', 'is any value'], ['User name', 'is any value']].map(([label, val]) => (
        <div key={label} className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-500">{label}</span>
          <div className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 rounded text-gray-600 bg-white cursor-pointer hover:border-gray-400 min-w-[120px]">
            <span className="flex-1">{val}</span>
            <ChevronDown size={11} className="text-gray-400" />
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-gray-500">Is E5 User License (Yes / No)</span>
        <div className="flex items-center gap-3 px-2.5 py-1.5 border border-gray-300 rounded bg-white">
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" checked={e5Yes} onChange={e => setE5Yes(e.target.checked)} className="accent-teal-600" />
            <span className="text-gray-600">Yes</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" checked={e5No} onChange={e => setE5No(e.target.checked)} className="accent-teal-600" />
            <span className="text-gray-600">No</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ── BillToTable (shared for norm + denorm) ─────────────────────────────────────
function BillToTable({ title, rows, countLabel = 'License Count', showInfo }) {
  const maxCount = Math.max(...rows.map(r => r.count));
  const maxCost  = Math.max(...rows.map(r => r.cost));
  const totalCount = rows.reduce((s, r) => s + r.count, 0);
  const totalCost  = rows.reduce((s, r) => s + r.cost, 0);
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-4">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        {showInfo && <Info size={14} className="text-gray-400 cursor-pointer" />}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 text-left">
              <th className="px-3 py-2 w-6 font-normal">#</th>
              <th className="px-3 py-2 font-normal">Bill To</th>
              <th className="px-3 py-2 font-normal text-right">{countLabel}</th>
              <th className="px-3 py-2 font-normal"></th>
              <th className="px-3 py-2 font-normal text-right">Annual Cost</th>
              <th className="px-3 py-2 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-1.5 text-gray-400">{row.id}</td>
                <td className="px-3 py-1.5 text-gray-700 font-medium truncate max-w-[120px]">{row.name}</td>
                <td className="px-3 py-1.5 text-right text-gray-700">{fmtN(row.count)}</td>
                <td className="px-3 py-1.5 w-20"><InlineBar value={row.count} max={maxCount} color="#ef4444" /></td>
                <td className="px-3 py-1.5 text-right text-gray-700">{fmt$(row.cost)}</td>
                <td className="px-3 py-1.5 w-20"><InlineBar value={row.cost} max={maxCost} color="#0D9488" /></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-200 bg-gray-50 font-semibold text-gray-700">
              <td className="px-3 py-2" colSpan={2}>Totals</td>
              <td className="px-3 py-2 text-right">{fmtN(totalCount)}</td>
              <td />
              <td className="px-3 py-2 text-right">{fmt$(totalCost)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ── TenantTable ───────────────────────────────────────────────────────────────
function TenantTable({ title, rows, isDenorm }) {
  const countKey  = isDenorm ? 'duplicates' : 'count';
  const countLabel = isDenorm ? 'Duplicate Licenses' : 'License Count';
  const maxCount = Math.max(...rows.map(r => r[countKey]));
  const maxCost  = Math.max(...rows.map(r => r.cost));
  const totalCount = rows.reduce((s, r) => s + r[countKey], 0);
  const totalCost  = rows.reduce((s, r) => s + r.cost, 0);
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-4">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 text-left">
              <th className="px-3 py-2 w-6 font-normal">#</th>
              <th className="px-3 py-2 font-normal">Tenant Name</th>
              <th className="px-3 py-2 font-normal text-right">{countLabel}</th>
              <th className="px-3 py-2 font-normal"></th>
              <th className="px-3 py-2 font-normal text-right">Annual Cost</th>
              <th className="px-3 py-2 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-1.5 text-gray-400">{row.id}</td>
                <td className="px-3 py-1.5 text-gray-700 font-medium truncate max-w-[140px]">{row.name}</td>
                <td className="px-3 py-1.5 text-right text-gray-700">{fmtN(row[countKey])}</td>
                <td className="px-3 py-1.5 w-20"><InlineBar value={row[countKey]} max={maxCount} color="#ef4444" /></td>
                <td className="px-3 py-1.5 text-right text-gray-700">{fmt$(row.cost)}</td>
                <td className="px-3 py-1.5 w-20"><InlineBar value={row.cost} max={maxCost} color="#0D9488" /></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-200 bg-gray-50 font-semibold text-gray-700">
              <td className="px-3 py-2" colSpan={2}>Totals</td>
              <td className="px-3 py-2 text-right">{fmtN(totalCount)}</td>
              <td />
              <td className="px-3 py-2 text-right">{fmt$(totalCost)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ── ProductTable ──────────────────────────────────────────────────────────────
function ProductTable() {
  const maxCount = Math.max(...dupByProduct.map(r => r.count));
  const maxCost  = Math.max(...dupByProduct.map(r => r.cost));
  const totalCount = dupByProduct.reduce((s, r) => s + r.count, 0);
  const totalCost  = dupByProduct.reduce((s, r) => s + r.cost, 0);
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">License Cost Wastage By Product (Normalised)</h3>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100 text-gray-500 text-left">
            <th className="px-3 py-2 w-6 font-normal">#</th>
            <th className="px-3 py-2 font-normal">Product Display Name</th>
            <th className="px-3 py-2 font-normal text-right">License Count</th>
            <th className="px-3 py-2 font-normal"></th>
            <th className="px-3 py-2 font-normal text-right">Annual Cost</th>
            <th className="px-3 py-2 font-normal"></th>
          </tr>
        </thead>
        <tbody>
          {dupByProduct.map((row) => (
            <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="px-3 py-1.5 text-gray-400">{row.id}</td>
              <td className="px-3 py-1.5 text-gray-700 font-medium">{row.name}</td>
              <td className="px-3 py-1.5 text-right text-gray-700">{fmtN(row.count)}</td>
              <td className="px-3 py-1.5 w-24"><InlineBar value={row.count} max={maxCount} color="#ef4444" /></td>
              <td className="px-3 py-1.5 text-right text-gray-700">{fmt$(row.cost)}</td>
              <td className="px-3 py-1.5 w-24"><InlineBar value={row.cost} max={maxCost} color="#0D9488" /></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200 bg-gray-50 font-semibold text-gray-700">
            <td className="px-3 py-2" colSpan={2}>Totals</td>
            <td className="px-3 py-2 text-right">{fmtN(totalCount)}</td>
            <td />
            <td className="px-3 py-2 text-right">{fmt$(totalCost)}</td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ── CountryTable ──────────────────────────────────────────────────────────────
function CountryTable() {
  const maxCost  = Math.max(...dupByCountry.filter(r => r.iso3).map(r => r.cost));
  const maxCount = Math.max(...dupByCountry.filter(r => r.iso3).map(r => r.count));
  const totalCost  = dupByCountry.reduce((s, r) => s + r.cost, 0);
  const totalCount = dupByCountry.reduce((s, r) => s + r.count, 0);
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">License Cost Wastage By Country Table (Normalised)</h3>
      </div>
      <div className="overflow-y-auto max-h-72">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-gray-100 text-gray-500 text-left">
              <th className="px-3 py-2 w-6 font-normal">#</th>
              <th className="px-3 py-2 font-normal">Country</th>
              <th className="px-3 py-2 font-normal text-right">Annual Cost</th>
              <th className="px-3 py-2 font-normal"></th>
              <th className="px-3 py-2 font-normal text-right">License Count</th>
              <th className="px-3 py-2 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {dupByCountry.map((row) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-1 text-gray-400">{row.id}</td>
                <td className="px-3 py-1 text-gray-700 font-medium">{row.country}</td>
                <td className="px-3 py-1 text-right text-gray-700">{fmt$(row.cost)}</td>
                <td className="px-3 py-1 w-16"><InlineBar value={row.cost} max={maxCost} color="#0D9488" /></td>
                <td className="px-3 py-1 text-right text-gray-700">{fmtN(row.count)}</td>
                <td className="px-3 py-1 w-16"><InlineBar value={row.count} max={maxCount} color="#ef4444" /></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-200 bg-gray-50 font-semibold text-gray-700 sticky bottom-0">
              <td className="px-3 py-2" colSpan={2}>Totals</td>
              <td className="px-3 py-2 text-right">{fmt$(totalCost)}</td>
              <td />
              <td className="px-3 py-2 text-right">{fmtN(totalCount)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ── ProductDonut ──────────────────────────────────────────────────────────────
const renderDonutLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
  if (value < 1) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="600">
      {value}%
    </text>
  );
};

function ProductDonut() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">License Cost Wastage By Product % (Normalised)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={dupProductPie}
            cx="40%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            dataKey="value"
            labelLine={false}
            label={renderDonutLabel}
          >
            {dupProductPie.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `${v}%`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-1.5 mt-1">
        {dupProductPie.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs text-gray-600">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
            <span>{entry.name} {entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── WorldMap ──────────────────────────────────────────────────────────────────
function WorldMap() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">License Cost Wastage By Country (Normalised)</h3>
      <ComposableMap projectionConfig={{ scale: 120 }} style={{ width: '100%', height: 160 }}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const numId = geo.id?.toString().padStart(3, '0');
              const alpha3 = ISO_NUM_TO_ALPHA3[numId];
              const count = dupCountryMapData[alpha3] ?? 0;
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
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function O365DuplicatePage() {
  const [countryGrouping, setCountryGrouping] = useState(true);

  return (
    <div>
      {/* Page title */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide">Optimisation Hub / Products / O365</p>
        <h1 className="text-xl font-bold text-gray-900 mt-0.5">O365 – Duplicate Licences</h1>
      </div>

      <FilterBar />

      {/* 3-column grid */}
      <div className="grid grid-cols-[5fr_5fr_6fr] gap-4 items-start">

        {/* ── LEFT: Normalised ────────────────────────────────────────────── */}
        <div>
          <div className="flex items-start gap-2 mb-3 p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
            <span className="mt-0.5 shrink-0">ℹ</span>
            <span>In the table below, duplicate licenses are assigned to only one opco to avoid double accounting in savings.</span>
          </div>
          <BillToTable
            title="Duplication – Normalised"
            rows={dupNormByBillTo}
          />
          <TenantTable
            title="Normalised View By Tenant"
            rows={dupNormByTenant}
            isDenorm={false}
          />
          <ProductTable />
        </div>

        {/* ── MIDDLE: De-normalised ────────────────────────────────────────── */}
        <div>
          <div className="flex items-start gap-2 mb-3 p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs text-amber-700">
            <span className="mt-0.5 shrink-0">ℹ</span>
            <span>The table below will show a higher number of duplicate licenses as the duplicates have been added to both the affected 'Bill to' entities.</span>
          </div>
          <BillToTable
            title="Duplication – De-normalised"
            rows={dupDenormByBillTo}
            showInfo
          />
          <TenantTable
            title="De-normalised View By Tenant"
            rows={dupDenormByTenant}
            isDenorm={true}
          />
        </div>

        {/* ── RIGHT: KPIs + Map + Country + Donut ─────────────────────────── */}
        <div>
          {/* Country grouping toggle */}
          <div className="flex rounded-lg overflow-hidden border border-gray-200 mb-4 text-xs font-medium">
            <button
              onClick={() => setCountryGrouping(false)}
              className={`flex-1 py-2 transition-colors ${!countryGrouping ? 'bg-[#1E3A5F] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              Without Country Grouping
            </button>
            <button
              onClick={() => setCountryGrouping(true)}
              className={`flex-1 py-2 transition-colors ${countryGrouping ? 'bg-[#1E3A5F] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              With Country Grouping
            </button>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl p-4 text-white" style={{ background: 'linear-gradient(135deg, #b91c1c, #ef4444)' }}>
              <div className="text-xl font-bold">{fmt$(dupSummary.normalisedWastage)}</div>
              <div className="text-xs mt-1 opacity-90 flex items-center gap-1">
                Normalised Wastage (Annualised)
                <span className="opacity-70 cursor-pointer">ⓘ</span>
              </div>
            </div>
            <div className="rounded-xl p-4 text-white" style={{ background: 'linear-gradient(135deg, #b91c1c, #ef4444)' }}>
              <div className="text-xl font-bold">{fmtN(dupSummary.normalisedCount)}</div>
              <div className="text-xs mt-1 opacity-90 flex items-center gap-1">
                Normalised License Count
                <span className="opacity-70 cursor-pointer">ⓘ</span>
              </div>
            </div>
          </div>

          <WorldMap />
          <CountryTable />
          <div className="mt-4">
            <ProductDonut />
          </div>
        </div>

      </div>
    </div>
  );
}
