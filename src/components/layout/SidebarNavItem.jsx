export function SidebarNavItem({ label, icon: Icon, depth = 0, active = false, isOpen, onClick }) {
  const indent = depth === 2 ? 'pl-12' : depth === 1 ? 'pl-8' : 'pl-3';
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 py-2 ${indent} pr-3 rounded-lg text-sm
        transition-colors cursor-pointer
        ${active
          ? 'bg-teal-50 text-teal-700 font-medium border-l-2 border-teal-600'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }
      `}
    >
      {Icon && <Icon size={16} className="shrink-0" />}
      {isOpen && <span className="truncate">{label}</span>}
    </button>
  );
}
