import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export function SidebarSection({ title, icon: Icon, children, isOpen, defaultOpen = false }) {
  const [expanded, setExpanded] = useState(defaultOpen);

  return (
    <div className="mb-1">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-2 py-2 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
      >
        {Icon && <Icon size={16} className="shrink-0" />}
        {isOpen && (
          <>
            <span className="flex-1 text-left font-medium truncate">{title}</span>
            <ChevronRight
              size={14}
              className={`transition-transform ${expanded ? 'rotate-90' : ''}`}
            />
          </>
        )}
      </button>
      {isOpen && expanded && (
        <div className="mt-1">
          {children}
        </div>
      )}
    </div>
  );
}
