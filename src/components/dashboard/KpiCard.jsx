import { TrendingUp, TrendingDown } from 'lucide-react';

export function KpiCard({ title, value, subtitle, trend, trendDirection }) {
  const isUp = trendDirection === 'up';
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <p className="text-sm text-gray-500 font-medium mb-3">{title}</p>
      <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      {trend && (
        <div className={`flex items-center gap-1 mt-3 text-xs font-medium ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trend} vs prior year
        </div>
      )}
    </div>
  );
}
