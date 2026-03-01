import { useState } from 'react';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {
  ChevronDown, ChevronRight, ChevronUp, ChevronsUpDown,
  ExternalLink, Info,
} from 'lucide-react';
import {
  o365Alerts, idleByBillTo, billToPieColors, idleByCountry,
  idleByProduct, productPieData, countryMapData,
} from '../../data/o365Data';

// ─── helpers ─────────────────────────────────────────────────────────────────
const fmtN  = (n) => n?.toLocaleString('en-US') ?? '0';
const fmt$  = (n) => `$${n?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) ?? 0}`;

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// country ISO-3 → count lookup (for map colouring)
const maxCount = Math.max(...Object.values(countryMapData));
const mapColor = (count) => {
  if (!count) return '#e2e8f0';
  const intensity = count / maxCount;
  if (intensity > 0.8) return '#1E3A5F';
  if (intensity > 0.5) return '#2563EB';
  if (intensity > 0.2) return '#60A5FA';
  return '#BAE6FD';
};

// ISO numeric → alpha3 mapping for countries we care about (top 25)
const ISO_NUM_TO_ALPHA3 = {
  '840': 'USA', '826': 'GBR', '276': 'DEU', '156': 'CHN',
  '784': 'ARE', '356': 'IND', '528': 'NLD', '076': 'BRA',
  '250': 'FRA', '484': 'MEX', '458': 'MYS', '344': 'HKG',
  '702': 'SGP', '724': 'ESP', '124': 'CAN', '380': 'ITA',
  '036': 'AUS', '616': 'POL', '620': 'PRT', '170': 'COL',
  '410': 'KOR', '056': 'BEL', '360': 'IDN',
};

// ─── Filter bar ───────────────────────────────────────────────────────────────
function FilterBar() {
  return (
    <div className="flex items-end gap-4 flex-wrap mb-5 p-4 bg-white border border-gray-100 rounded-xl shadow-sm text-xs">
      {[['Bill To', 'is any value'], ['License Type', 'is any value'], ['User Principal Name', 'is any value']].map(([label, val]) => (
        <div key={label} className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-500">{label}</span>
          <div className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 rounded text-gray-600 bg-white cursor-pointer hover:border-gray-400 min-w-[110px]">
            <span className="flex-1">{val}</span>
            <ChevronDown size={11} className="text-gray-400" />
          </div>
        </div>
      ))}
      {/* Is E5 User License */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-gray-500">Is E5 User License (Yes / No)</span>
        <div className="flex items-center gap-2 px-2.5 py-1.5 border border-gray-300 rounded bg-white">
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" defaultChecked className="accent-teal-600" />
            <span className="text-gray-600">Yes</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" className="accent-teal-600" />
            <span className="text-gray-600">No</span>
          </label>
        </div>
      </div>
      {/* Okta Status Change */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-gray-500">Okta Status Change</span>
        <div className="flex items-center gap-1 px-2.5 py-1.5 border border-teal-500 rounded text-teal-700 bg-teal-50 font-medium cursor-pointer min-w-[80px]">
          <span className="flex-1">All</span>
          <ChevronDown size={11} className="text-teal-500" />
        </div>
      </div>
      {/* Idle License Criteria */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-[10px] text-gray-500">
          Idle License Criteria <Info size={11} className="text-gray-400" />
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1.5 border border-teal-500 rounded text-teal-700 bg-teal-50 font-medium cursor-pointer">
          <span>is DEPROVISIONED or UNAVAILABLE</span>
          <ChevronDown size={11} className="text-teal-500 ml-1" />
        </div>
      </div>
    </div>
  );
}

// ─── Alert cards ──────────────────────────────────────────────────────────────
function AlertCards() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-5">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-6 shadow-sm">
        <p className="text-4xl font-bold">${o365Alerts.wastage.toLocaleString()}</p>
        <p className="text-red-100 mt-2 text-sm font-medium">Idle Licenses Wastage</p>
      </div>
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl p-6 shadow-sm">
        <p className="text-4xl font-bold">{o365Alerts.idleCount.toLocaleString()}</p>
        <p className="text-orange-100 mt-2 text-sm font-medium">Idle Licenses Count</p>
      </div>
    </div>
  );
}

// ─── Inline bar ───────────────────────────────────────────────────────────────
function InlineBar({ value, max, color = '#1E3A5F' }) {
  return (
    <div className="w-full h-4 bg-gray-100 rounded overflow-hidden">
      <div className="h-full rounded" style={{ width: `${(value / max) * 100}%`, backgroundColor: color }} />
    </div>
  );
}

// ─── Custom donut legend ──────────────────────────────────────────────────────
function DonutLegend({ data, colors }) {
  return (
    <div className="flex flex-col gap-1 text-xs overflow-y-auto max-h-[300px]">
      {data.map((entry, i) => (
        <div key={entry.name} className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: colors[i] ?? '#94A3B8' }} />
          <span className="text-gray-700 truncate">{entry.name}</span>
          <span className="ml-auto text-gray-500 pl-2 font-medium shrink-0">{entry.pct?.toFixed(2) ?? entry.value}%</span>
        </div>
      ))}
    </div>
  );
}

// ─── Idle Licenses By Bill To ─────────────────────────────────────────────────
function IdleByBillToSection() {
  const maxCount = Math.max(...idleByBillTo.map((r) => r.count));
  const maxCost  = Math.max(...idleByBillTo.map((r) => r.cost));
  const totalCount = idleByBillTo.reduce((s, r) => s + r.count, 0);
  const totalCost  = idleByBillTo.reduce((s, r) => s + r.cost, 0);

  const pieData = idleByBillTo.map((r) => ({ name: r.name, value: r.pct, pct: r.pct }));

  return (
    <div className="grid grid-cols-3 gap-5 mb-5">
      {/* Table */}
      <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700">Idle Licenses By Bill To</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-3 text-left text-gray-500 font-medium w-8">#</th>
                <th className="py-2 px-3 text-left text-gray-500 font-medium">Fo Bill To</th>
                <th className="py-2 px-3 text-left text-gray-500 font-medium w-52">
                  <div className="flex items-center gap-1">Idle License Count <ChevronDown size={11} /></div>
                </th>
                <th className="py-2 px-3 text-left text-gray-500 font-medium w-52">
                  <div className="flex items-center gap-1">Idle Cost (Annualised) <ChevronDown size={11} /></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {idleByBillTo.map((row) => (
                <tr key={row.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-400">{row.id}</td>
                  <td className="py-2 px-3 font-medium text-gray-800">{row.name}</td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1"><InlineBar value={row.count} max={maxCount} color="#1E3A5F" /></div>
                      <span className="text-gray-700 w-14 text-right font-medium">{fmtN(row.count)}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1"><InlineBar value={row.cost} max={maxCost} color="#0D9488" /></div>
                      <span className="text-gray-700 w-20 text-right font-medium">{fmt$(row.cost)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-gray-50 font-semibold text-xs">
                <td colSpan={2} className="py-2.5 px-3 text-gray-700">Totals</td>
                <td className="py-2.5 px-3 text-right text-gray-800 pr-6">{fmtN(totalCount)}</td>
                <td className="py-2.5 px-3 text-right text-gray-800 pr-4">{fmt$(totalCost)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Donut chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Idle Licenses By Bill To %</h3>
        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={48} paddingAngle={1} startAngle={90} endAngle={-270}>
                {pieData.map((_, i) => <Cell key={i} fill={billToPieColors[i % billToPieColors.length]} stroke="white" strokeWidth={1} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 overflow-hidden mt-2">
          <DonutLegend data={pieData} colors={billToPieColors} />
        </div>
      </div>
    </div>
  );
}

// ─── Idle Licenses By Country ─────────────────────────────────────────────────
function IdleByCountrySection() {
  const maxCount = Math.max(...idleByCountry.filter((r) => r.iso).map((r) => r.count));
  const totalCount = idleByCountry.reduce((s, r) => s + r.count, 0);
  const totalCost  = idleByCountry.reduce((s, r) => s + r.cost, 0);

  return (
    <div className="grid grid-cols-3 gap-5 mb-5">
      {/* Table */}
      <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700">Idle Licenses By Country Table</h3>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: 460 }}>
          <table className="w-full text-xs">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="py-2 px-3 text-left text-gray-500 font-medium w-8">#</th>
                <th className="py-2 px-3 text-left text-gray-500 font-medium">BFC Country</th>
                <th className="py-2 px-3 text-left text-gray-500 font-medium w-52">
                  <div className="flex items-center gap-1">License Count <ChevronDown size={11} /></div>
                </th>
                <th className="py-2 px-3 text-right text-gray-500 font-medium">Cost (Annualised)</th>
              </tr>
            </thead>
            <tbody>
              {idleByCountry.map((row) => (
                <tr key={row.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-400">{row.id}</td>
                  <td className="py-2 px-3 font-medium text-gray-700">{row.country}</td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1"><InlineBar value={row.count} max={maxCount} color="#1E3A5F" /></div>
                      <span className="text-gray-700 w-14 text-right font-medium">{fmtN(row.count)}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-right font-medium text-gray-700">{fmt$(row.cost)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-gray-50 font-semibold text-xs">
                <td colSpan={2} className="py-2.5 px-3 text-gray-700">Totals</td>
                <td className="py-2.5 px-3 text-right text-gray-800 pr-6">{fmtN(totalCount)}</td>
                <td className="py-2.5 px-3 text-right text-gray-800">{fmt$(totalCost)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* World map */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Idle Licenses By Country</h3>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 100, center: [10, 20] }}
          style={{ width: '100%', height: 260 }}
        >
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
                    stroke="white"
                    strokeWidth={0.4}
                    style={{
                      default: { outline: 'none' },
                      hover:   { fill: '#F59E0B', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        {/* Map legend */}
        <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-500">
          <span className="w-3 h-2 rounded" style={{ backgroundColor: '#e2e8f0' }} />Low
          <span className="w-3 h-2 rounded" style={{ backgroundColor: '#BAE6FD' }} />
          <span className="w-3 h-2 rounded" style={{ backgroundColor: '#60A5FA' }} />
          <span className="w-3 h-2 rounded" style={{ backgroundColor: '#2563EB' }} />
          <span className="w-3 h-2 rounded" style={{ backgroundColor: '#1E3A5F' }} />High
        </div>
      </div>
    </div>
  );
}

// ─── Idle Licenses By Product ─────────────────────────────────────────────────
function IdleByProductSection() {
  const [expanded, setExpanded] = useState(new Set());
  const toggle = (id) => setExpanded((prev) => {
    const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next;
  });

  const totalCount = idleByProduct.reduce((s, r) => s + r.count, 0);
  const totalCost  = idleByProduct.reduce((s, r) => s + r.cost, 0);

  return (
    <div className="grid grid-cols-3 gap-5 mb-5">
      {/* Table */}
      <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700">Idle Licenses By Product</h3>
        </div>
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-3 text-left text-gray-500 font-medium">
                <div className="flex items-center gap-1">Product Display Name <ChevronUp size={11} /></div>
              </th>
              <th className="py-2 px-3 text-left text-gray-500 font-medium">Fo Bill To</th>
              <th className="py-2 px-3 text-left text-gray-500 font-medium">
                <div className="flex items-center gap-1">License Count <ChevronDown size={11} /></div>
              </th>
              <th className="py-2 px-3 text-right text-gray-500 font-medium">Cost (Annualised)</th>
            </tr>
          </thead>
          <tbody>
            {idleByProduct.map((row) => (
              <React.Fragment key={row.id}>
                {/* Parent row */}
                <tr
                  className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggle(row.id)}
                >
                  <td className="py-2.5 px-3 font-medium text-gray-800">
                    <div className="flex items-center gap-2">
                      <ChevronRight size={13} className={`text-gray-400 transition-transform ${expanded.has(row.id) ? 'rotate-90' : ''}`} />
                      {row.name} ({row.tier})
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-gray-500">—</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-800">{fmtN(row.count)}</td>
                  <td className="py-2.5 px-3 text-right font-semibold text-gray-800">{fmt$(row.cost)}</td>
                </tr>
                {/* Child rows */}
                {expanded.has(row.id) && row.children.map((child, ci) => (
                  <tr key={ci} className="border-t border-gray-50 bg-blue-50">
                    <td className="py-2 px-3 pl-10 text-gray-500">{row.name}</td>
                    <td className="py-2 px-3 text-gray-600 font-medium">{child.name}</td>
                    <td className="py-2 px-3 text-gray-700">{fmtN(child.count)}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{fmt$(child.cost)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-200 bg-gray-50 font-semibold text-xs">
              <td colSpan={2} className="py-2.5 px-3 text-gray-700">Totals</td>
              <td className="py-2.5 px-3 text-gray-800">{fmtN(totalCount)}</td>
              <td className="py-2.5 px-3 text-right text-gray-800">{fmt$(totalCost)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Product donut */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Idle Licenses By Product %</h3>
        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={productPieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={52} paddingAngle={1} startAngle={90} endAngle={-270}>
                {productPieData.map((entry) => <Cell key={entry.name} fill={entry.color} stroke="white" strokeWidth={1} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 space-y-2">
          {productPieData.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-700">{entry.name}</span>
              <span className="ml-auto font-medium text-gray-500">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────
export function O365Page() {
  return (
    <div className="max-w-screen-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-1">
        <span className="hover:text-gray-700 cursor-pointer">Optimisation</span>
        <span className="mx-1">›</span>
        <span className="text-gray-800 font-medium">O365 - Idle Licenses</span>
      </nav>

      {/* Title + explore link */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">O365 – Idle Licenses (Alphabet)</h1>
        <a href="#" className="flex items-center gap-1.5 text-sm text-teal-600 font-medium hover:underline">
          Explore Idle User License Details <ExternalLink size={14} />
        </a>
      </div>

      <FilterBar />
      <AlertCards />

      {/* Note */}
      <p className="text-xs text-gray-500 mb-5 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2.5">
        <strong>Note:</strong> "Idle" users are identified based on Okta status and can be controlled by Idle license criteria filter.
      </p>

      <IdleByBillToSection />
      <IdleByCountrySection />
      <IdleByProductSection />
    </div>
  );
}
