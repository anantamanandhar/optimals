import { kpiData } from '../../data/kpiData';
import { KpiCard } from './KpiCard';

export function KpiRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {kpiData.map((card) => (
        <KpiCard key={card.id} {...card} />
      ))}
    </div>
  );
}
