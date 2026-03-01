import { useFilters } from '../../hooks/useFilters';
import { Breadcrumb } from './Breadcrumb';
import { DashboardTitle } from './DashboardTitle';
import { FilterBar } from './FilterBar';
import { KpiRow } from './KpiRow';
import { MiddleSection } from './MiddleSection';
import { MonthlyBreakdown } from './MonthlyBreakdown';

const BREADCRUMBS = [
  { label: 'Recharge', href: '#' },
  { label: 'Summary' },
];

export function DashboardPage() {
  const { filters, setFilter } = useFilters();

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Breadcrumb segments={BREADCRUMBS} />
      <DashboardTitle title="Recharge Summary (Alphabet)" />
      <FilterBar filters={filters} onFilterChange={setFilter} />
      <KpiRow />
      <MiddleSection />
      <MonthlyBreakdown />
    </div>
  );
}
