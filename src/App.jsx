import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { ForecastPage } from './components/forecast/ForecastPage';
import { OptimisationPage } from './components/optimisation/OptimisationPage';
import { useSidebar } from './hooks/useSidebar';

function renderPage(page) {
  switch (page) {
    case 'forecast/alphabet':         return <ForecastPage />;
    case 'optimisation/alphabet':     return <OptimisationPage defaultView="alphabet" />;
    case 'optimisation/subsidiary':   return <OptimisationPage defaultView="subsidiary" />;
    case 'optimisation/departments':  return <OptimisationPage defaultView="department" />;
    default: return <DashboardPage />;
  }
}

export default function App() {
  const { isOpen, toggle } = useSidebar();
  const [activePage, setActivePage] = useState('recharge/alphabet');

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={isOpen}
        onToggle={toggle}
        activePage={activePage}
        onNavigate={setActivePage}
      />
      <div className="flex flex-col flex-1 min-w-0">
        <TopHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage(activePage)}
        </main>
      </div>
    </div>
  );
}
