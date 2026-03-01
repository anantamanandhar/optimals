import { useState, useMemo } from 'react';
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { Heart, Copy, RefreshCw, SlidersHorizontal, MoreVertical, ChevronRight, ChevronDown } from 'lucide-react';
import {
  forecastSummary,
  forecastBySupplier,
  forecastPieData,
  rechargeForecast,
  rechargeProducts,
} from '../../data/forecastData';
import { filterConfig } from '../../data/filterOptions';
import { IconButton } from '../ui/IconButton';

// ─── helpers ────────────────────────────────────────────────────────────────
const fmt = (n) => {
  if (!n) return '$0';
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}m`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
  return `$${n}`;
};
const fmtLarge = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

// ─── Filter bar ─────────────────────────────────────────────────────────────
function ForecastFilterBar({ year, onYearChange }) {
  const years = filterConfig.find((f) => f.key === 'fiscalYear').options;
  return (
    <div className="flex items-center gap-3 mb-6 flex-wrap">
      {/* Year */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500">Year</span>
        <div className="flex items-center gap-1 border border-teal-500 rounded px-2 py-1 text-sm text-teal-700 font-medium bg-white">
          <select
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
            className="appearance-none bg-transparent focus:outline-none"
          >
            {years.map((y) => <option key={y} value={y}>{y.replace('is ', '')}</option>)}
          </select>
          <span
            className="ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={() => onYearChange('is 2025')}
          >✕</span>
        </div>
      </div>
      {/* Supplier */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500">Supplier</span>
        <div className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-600 bg-white">
          is any value
        </div>
      </div>
      {/* Bill To */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500">Bill To</span>
        <div className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-600 bg-white">
          is any value
        </div>
      </div>
      {/* Forecast Generated Month */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500">Forecast Generated Month</span>
        <div className="flex items-center gap-1 border border-teal-500 rounded px-2 py-1 text-sm text-teal-700 font-medium bg-white">
          <span>latest</span>
          <span className="ml-1 text-gray-400">✕</span>
        </div>
      </div>
    </div>
  );
}

// ─── Top summary cards ───────────────────────────────────────────────────────
function SummaryCards() {
  return (
    <div className="grid grid-cols-12 gap-4 mb-6">
      {/* Total forecast */}
      <div className="col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
        <p className="text-4xl font-bold text-gray-900">{forecastSummary.totalForecast}</p>
        <p className="text-sm text-gray-500 mt-2">Total Forecast</p>
      </div>

      {/* Sub-metrics */}
      <div className="col-span-3 grid grid-rows-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-3xl font-bold text-gray-900">{forecastSummary.totalSuppliers}</p>
          <p className="text-xs text-gray-500 mt-1">Total Suppliers</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-3xl font-bold text-gray-900">{forecastSummary.totalBillTo}</p>
          <p className="text-xs text-gray-500 mt-1">Total Bill To</p>
        </div>
      </div>

      {/* Methodology note */}
      <div className="col-span-4 bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-xs text-gray-600 leading-relaxed">
        <p className="mb-2">The projected forecast below is primarily based upon the trend/spend in the first six months of 2024 and the supplier negotiated values in 2024.</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>It does not factor in Agencies' forecasted growth in usage of these services.</li>
          <li>It does not factor any contingencies.</li>
          <li>It does not factor any showback spend as these are covered by Alphabet IT.</li>
        </ul>
        <p className="mt-2">We advise the Agencies to consider their usage growth and contingencies on top of the numbers forecasted below.</p>
      </div>

      {/* Generated Month */}
      <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col items-center justify-center text-center">
        <p className="text-xl font-bold text-gray-900">{forecastSummary.generatedMonth}</p>
        <p className="text-xs text-gray-500 mt-2">Generated Month</p>
      </div>
    </div>
  );
}

// ─── Forecast By Supplier table ──────────────────────────────────────────────
function ForecastBySupplierTable() {
  const [expanded, setExpanded] = useState(null);

  const totals = {
    forecast2024: forecastBySupplier.reduce((s, r) => s + r.forecast2024, 0),
    forecast2025: forecastBySupplier.reduce((s, r) => s + r.forecast2025, 0),
  };
  const totalChange = ((totals.forecast2025 - totals.forecast2024) / totals.forecast2024) * 100;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700">Forecast By Supplier</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Sub-header */}
      <div className="grid grid-cols-[2rem_8rem_6rem_6rem_7rem_7rem_6rem_1fr] text-xs text-gray-500 font-medium px-3 py-2 border-b border-gray-100 bg-gray-50">
        <span></span>
        <span>Supplier</span>
        <span>Supplier Status</span>
        <span>Supplier Type</span>
        <span>2024<br/>Forecast</span>
        <span className="flex items-center gap-1">2025<br/>Forecast <ChevronDown size={12} /></span>
        <span>Change %</span>
        <span>Forecasting comments (Alphabet Group level)</span>
      </div>

      {forecastBySupplier.map((row) => (
        <div key={row.id} className="border-b border-gray-50 last:border-0">
          <div
            className="grid grid-cols-[2rem_8rem_6rem_6rem_7rem_7rem_6rem_1fr] text-sm px-3 py-2.5 hover:bg-gray-50 cursor-pointer"
            onClick={() => setExpanded(expanded === row.id ? null : row.id)}
          >
            <span className="text-gray-400 text-xs">{row.id}</span>
            <span className="font-medium text-gray-800 flex items-center gap-1">
              {row.name}
              <span className="text-[10px] bg-gray-100 text-gray-400 px-1 rounded">···</span>
            </span>
            <span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                {row.status}
              </span>
            </span>
            <span className="text-gray-600 text-xs">{row.type}</span>
            <span className="text-gray-700 font-medium">{fmt(row.forecast2024)}</span>
            <span className="font-semibold text-gray-900">{fmt(row.forecast2025)}</span>
            <span className={`font-medium ${row.changePct > 0 ? 'text-emerald-600' : row.changePct < 0 ? 'text-red-500' : 'text-gray-500'}`}>
              {row.changePct >= 0 ? '+' : ''}{row.changePct.toFixed(2)}%
            </span>
            <span className="text-gray-500 text-xs leading-relaxed line-clamp-2">{row.comments}</span>
          </div>
          {expanded === row.id && (
            <div className="bg-blue-50 px-10 py-3 text-xs text-gray-600 leading-relaxed border-t border-blue-100">
              {row.comments}
            </div>
          )}
        </div>
      ))}

      {/* Totals */}
      <div className="grid grid-cols-[2rem_8rem_6rem_6rem_7rem_7rem_6rem_1fr] text-sm px-3 py-2.5 bg-gray-50 border-t-2 border-gray-200 font-semibold text-gray-800">
        <span></span>
        <span>Totals</span>
        <span></span>
        <span></span>
        <span>{fmt(totals.forecast2024)}</span>
        <span>{fmt(totals.forecast2025)}</span>
        <span className="text-emerald-600">+{totalChange.toFixed(2)}%</span>
        <span></span>
      </div>
    </div>
  );
}

// ─── YoY bar chart ───────────────────────────────────────────────────────────
const yoyData = [
  { year: '2024', value: forecastSummary.yoy2024 },
  { year: '2025', value: forecastSummary.yoy2025 },
];

function ForecastYoY() {
  const CustomLabel = ({ x, y, width, value, index }) => {
    if (index !== 1) return null;
    return (
      <text x={x + width / 2} y={y + 40} textAnchor="middle" fill="white" fontSize={13} fontWeight="bold">
        {forecastSummary.yoyPct}%
      </text>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-1">Forecast YoY %</h3>
      <p className="text-xs text-right text-gray-500 font-medium mb-2">{fmtLarge(forecastSummary.yoy2025)}</p>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={yoyData} barCategoryGap="30%">
            <XAxis dataKey="year" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              tickFormatter={(v) => `$${(v / 1_000_000).toFixed(0)}M`}
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip formatter={(v) => fmtLarge(v)} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} label={<CustomLabel />}>
              <Cell fill="#1E3A5F" />
              <Cell fill="#1E3A5F" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── % By Supplier pie ───────────────────────────────────────────────────────
function ForecastPie() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">% By Supplier</h3>
      <div className="flex gap-3">
        <div style={{ height: 200, width: 160, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={forecastPieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={0}
                paddingAngle={1}
                startAngle={90}
                endAngle={-270}
              >
                {forecastPieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="white" strokeWidth={1} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-1 justify-center text-xs overflow-auto">
          {forecastPieData.map((entry) => (
            <div key={entry.name} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-700">{entry.name}</span>
              <span className="text-gray-500 ml-auto pl-2">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Recharge Forecast table ─────────────────────────────────────────────────
function RechargeForecastTable() {
  const totals = useMemo(() => {
    const t = { total: 0 };
    rechargeProducts.forEach((p) => { t[p] = 0; });
    rechargeForecast.forEach((row) => {
      t.total += row.total;
      rechargeProducts.forEach((p) => { t[p] = (t[p] || 0) + (row.products[p] || 0); });
    });
    return t;
  }, []);

  const fmtCell = (v) => {
    if (!v) return <span className="text-gray-300">$0</span>;
    if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}m`;
    if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}k`;
    return `$${v}`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm mt-6">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700">Recharge Forecast</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="text-xs w-full" style={{ minWidth: 1400 }}>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="sticky left-0 bg-gray-50 text-left py-2 px-3 text-gray-500 font-medium w-8">#</th>
              <th className="sticky left-8 bg-gray-50 text-left py-2 px-3 text-gray-500 font-medium w-36">Supplier</th>
              <th className="text-right py-2 px-3 text-gray-500 font-medium whitespace-nowrap">Total<br/>Forecast</th>
              {rechargeProducts.map((p) => (
                <th key={p} className="text-right py-2 px-2 text-gray-500 font-medium whitespace-nowrap">
                  {p}<br/>Forecast
                </th>
              ))}
            </tr>
            <tr className="border-b border-gray-200">
              <th className="sticky left-0 bg-white py-1 px-3 text-left text-gray-500 font-medium"></th>
              <th className="sticky left-8 bg-white py-1 px-3 text-left text-gray-500 font-medium">Bill To<br/><span className="text-gray-400 font-normal">Forecast ↓</span></th>
              <th className="py-1 px-3"></th>
              {rechargeProducts.map((p) => <th key={p} className="py-1 px-2"></th>)}
            </tr>
          </thead>
          <tbody>
            {rechargeForecast.map((row) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="sticky left-0 bg-inherit py-2 px-3 text-gray-400">{row.id}</td>
                <td className="sticky left-8 bg-inherit py-2 px-3 font-medium text-gray-800 whitespace-nowrap">{row.name}</td>
                <td className="py-2 px-3 text-right font-semibold text-gray-800">{fmt(row.total)}</td>
                {rechargeProducts.map((p) => (
                  <td key={p} className="py-2 px-2 text-right text-gray-600">{fmtCell(row.products[p])}</td>
                ))}
              </tr>
            ))}
            {/* Totals */}
            <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold text-gray-800">
              <td className="sticky left-0 bg-gray-50 py-2 px-3"></td>
              <td className="sticky left-8 bg-gray-50 py-2 px-3">Totals</td>
              <td className="py-2 px-3 text-right">{fmt(totals.total)}</td>
              {rechargeProducts.map((p) => (
                <td key={p} className="py-2 px-2 text-right">{fmtCell(totals[p])}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Page root ───────────────────────────────────────────────────────────────
export function ForecastPage() {
  const [year, setYear] = useState('is 2025');
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="max-w-screen-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-2">
        <span className="hover:text-gray-700 cursor-pointer">Recharge</span>
        <span className="mx-1">›</span>
        <span className="text-gray-800 font-medium">Summary</span>
      </nav>

      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900">
            Forecast FY{year.replace('is ', '')} - Alphabet
          </h1>
          <button onClick={() => setFavorited((f) => !f)} className="p-1 rounded hover:bg-gray-100">
            <Heart size={18} className={favorited ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <Copy size={16} className="text-gray-400" />
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>2m ago</span>
          <IconButton icon={RefreshCw} label="Refresh" />
          <IconButton icon={SlidersHorizontal} label="Filters" />
          <IconButton icon={MoreVertical} label="More" />
        </div>
      </div>

      <ForecastFilterBar year={year} onYearChange={setYear} />
      <SummaryCards />

      {/* Middle: table left, charts right */}
      <div className="grid grid-cols-3 gap-6 mb-0">
        <div className="col-span-2">
          <ForecastBySupplierTable />
        </div>
        <div className="flex flex-col gap-4">
          <ForecastYoY />
          <ForecastPie />
        </div>
      </div>

      <RechargeForecastTable />
    </div>
  );
}
