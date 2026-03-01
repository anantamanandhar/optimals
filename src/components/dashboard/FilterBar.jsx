import { filterConfig } from '../../data/filterOptions';
import { FilterDropdown } from './FilterDropdown';

export function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="flex items-center gap-4 mb-6 flex-wrap">
      {filterConfig.map((config) => (
        <FilterDropdown
          key={config.key}
          label={config.label}
          options={config.options}
          value={filters[config.key]}
          onChange={(val) => onFilterChange(config.key, val)}
        />
      ))}
    </div>
  );
}
