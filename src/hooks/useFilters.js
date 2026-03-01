import { useState } from 'react';
import { defaultFilters } from '../data/filterOptions';

export function useFilters() {
  const [filters, setFilters] = useState(defaultFilters);
  const setFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));
  const resetFilters = () => setFilters(defaultFilters);
  return { filters, setFilter, resetFilters };
}
