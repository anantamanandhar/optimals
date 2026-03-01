import { ChevronRight } from 'lucide-react';

export function Breadcrumb({ segments }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 mb-2">
      {segments.map((seg, i) => (
        <span key={seg.label} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={14} className="text-gray-400" />}
          {seg.href ? (
            <a href={seg.href} className="hover:text-gray-800 transition-colors">
              {seg.label}
            </a>
          ) : (
            <span className="text-gray-800 font-medium">{seg.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
