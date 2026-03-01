import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

export function SortIcon({ direction }) {
  if (direction === 'asc') return <ChevronUp size={14} className="text-teal-600" />;
  if (direction === 'desc') return <ChevronDown size={14} className="text-teal-600" />;
  return <ChevronsUpDown size={14} className="text-gray-400" />;
}
