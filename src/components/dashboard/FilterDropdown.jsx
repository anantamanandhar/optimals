import { ChevronDown } from 'lucide-react';

export function FilterDropdown({ label, options, value, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <span className="text-xs text-gray-500 mr-1.5 shrink-0">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            appearance-none pl-3 pr-8 py-1.5 text-sm font-medium
            bg-white border border-gray-300 rounded-full
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
            text-teal-700 cursor-pointer hover:border-teal-400 transition-colors
          "
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={12}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
}
