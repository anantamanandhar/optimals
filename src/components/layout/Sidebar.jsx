import { useState } from 'react';
import {
  LayoutDashboard, TrendingUp, Zap, Package,
  PanelLeft, Plus, Building2, Users, Landmark,
  FileSpreadsheet, Cloud, HardDrive, Box, Calendar,
  ChevronRight, Ghost, Layers, Brain,
} from 'lucide-react';
import { SidebarSection } from './SidebarSection';
import { SidebarNavItem } from './SidebarNavItem';

function SidebarSubGroup({ label, icon: Icon, subItems, isOpen, activePage, onNavigate }) {
  const hasActive = subItems.some(i => i.pageKey === activePage);
  const [expanded, setExpanded] = useState(hasActive);
  return (
    <div>
      <button
        onClick={() => isOpen && setExpanded(e => !e)}
        className={`
          w-full flex items-center gap-3 py-2 pl-8 pr-3 rounded-lg text-sm transition-colors
          ${hasActive ? 'text-teal-700 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
        `}
      >
        {Icon && <Icon size={16} className="shrink-0" />}
        {isOpen && (
          <>
            <span className="flex-1 text-left truncate">{label}</span>
            <ChevronRight size={12} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </>
        )}
      </button>
      {isOpen && expanded && (
        <div>
          {subItems.map(item => (
            <SidebarNavItem
              key={item.pageKey}
              label={item.label}
              icon={item.icon}
              depth={2}
              isOpen={isOpen}
              active={activePage === item.pageKey}
              onClick={() => onNavigate(item.pageKey)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const NAV = [
  {
    title: 'Recharge Hub',
    icon: LayoutDashboard,
    defaultOpen: true,
    items: [
      { label: 'Alphabet',    icon: Building2, pageKey: 'recharge/alphabet' },
      { label: 'Subsidiary',  icon: Landmark,  pageKey: 'recharge/subsidiary' },
      { label: 'Departments', icon: Users,     pageKey: 'recharge/departments' },
    ],
  },
  {
    title: 'Forecast Hub',
    icon: TrendingUp,
    items: [
      { label: 'Alphabet',    icon: Building2, pageKey: 'forecast/alphabet' },
      { label: 'Subsidiary',  icon: Landmark,  pageKey: 'forecast/subsidiary' },
      { label: 'Departments', icon: Users,     pageKey: 'forecast/departments' },
    ],
  },
  {
    title: 'Optimisation Hub',
    icon: Zap,
    items: [
      { label: 'Alphabet',    icon: Building2,    pageKey: 'optimisation/alphabet' },
      { label: 'Subsidiary',  icon: Landmark,     pageKey: 'optimisation/subsidiary' },
      { label: 'Departments', icon: Users,        pageKey: 'optimisation/departments' },
      { divider: 'Products' },
      { label: 'O365', icon: FileSpreadsheet, subItems: [
        { label: 'Ghost accounts',      icon: Ghost,           pageKey: 'optimisation/o365' },
        { label: 'Duplicate Licences',  icon: FileSpreadsheet, pageKey: 'optimisation/o365/duplicate' },
        { label: 'O365 Usage',          icon: TrendingUp,      pageKey: 'optimisation/o365/usage' },
      ]},
      { label: 'Sharepoint',  icon: FileSpreadsheet, pageKey: 'optimisation/sharepoint' },
      { label: 'AI', icon: Brain, subItems: [
        { label: 'AI Usage',         icon: TrendingUp, pageKey: 'optimisation/ai/usage' },
        { label: 'AI Optimisation',  icon: Zap,        pageKey: 'optimisation/ai/optimisation' },
      ]},
      { label: 'Adobe', icon: Layers, subItems: [
        { label: 'Adobe Usage',           icon: TrendingUp,      pageKey: 'optimisation/adobe/usage' },
        { label: 'Adobe Ghost Licences',  icon: Ghost,           pageKey: 'optimisation/adobe/ghost' },
        { label: 'Adobe Duplicate',       icon: FileSpreadsheet, pageKey: 'optimisation/adobe/duplicate' },
      ]},
    ],
  },
  {
    title: 'Product and Services View',
    icon: Package,
    items: [
      { label: 'O365',             icon: FileSpreadsheet, pageKey: 'products/o365' },
      { label: 'Sharepoint',       icon: FileSpreadsheet, pageKey: 'products/sharepoint' },
      { label: 'Adobe',            icon: FileSpreadsheet, pageKey: 'products/adobe' },
      { label: 'Google Cloud',     icon: Cloud,           pageKey: 'products/gcp' },
      { label: 'AWS',              icon: Cloud,           pageKey: 'products/aws' },
      { label: 'Azure',            icon: Cloud,           pageKey: 'products/azure' },
      { label: 'Google Workspace', icon: HardDrive,       pageKey: 'products/gworkspace' },
      { label: 'Box',              icon: Box,             pageKey: 'products/box' },
      { label: 'Monday',           icon: Calendar,        pageKey: 'products/monday' },
    ],
  },
];

export function Sidebar({ isOpen, onToggle, activePage, onNavigate }) {
  return (
    <aside
      className={`
        flex flex-col bg-white border-r border-gray-200 h-screen
        transition-all duration-300 ease-in-out shrink-0
        ${isOpen ? 'w-64' : 'w-14'}
      `}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center h-14 px-3 border-b border-gray-200 gap-2">
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
          title="Toggle sidebar"
        >
          <PanelLeft size={20} className="text-teal-600" />
        </button>
        {isOpen && (
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            <span className="text-teal-600">◎</span> Optimals
          </span>
        )}
      </div>

      {/* Create button */}
      <div className="px-3 py-3 border-b border-gray-100">
        <button className={`
          flex items-center gap-2 rounded-lg border-2 border-dashed border-gray-300
          hover:border-teal-400 hover:bg-teal-50 transition-colors text-sm font-medium text-gray-600 hover:text-teal-700
          ${isOpen ? 'w-full px-3 py-2' : 'p-2 justify-center w-full'}
        `}>
          <Plus size={16} />
          {isOpen && 'Create'}
        </button>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {NAV.map((section) => (
          <SidebarSection
            key={section.title}
            title={section.title}
            icon={section.icon}
            isOpen={isOpen}
            defaultOpen={section.defaultOpen ?? false}
          >
            {section.items.map((item, idx) =>
              item.divider ? (
                isOpen && (
                  <div key={idx} className="flex items-center gap-2 px-3 pt-3 pb-1">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{item.divider}</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )
              ) : item.subItems ? (
                <SidebarSubGroup
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  subItems={item.subItems}
                  isOpen={isOpen}
                  activePage={activePage}
                  onNavigate={onNavigate}
                />
              ) : (
                <SidebarNavItem
                  key={item.pageKey}
                  label={item.label}
                  icon={item.icon}
                  depth={1}
                  isOpen={isOpen}
                  active={activePage === item.pageKey}
                  onClick={() => onNavigate(item.pageKey)}
                />
              )
            )}
          </SidebarSection>
        ))}
      </div>
    </aside>
  );
}
