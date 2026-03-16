import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { ForecastPage } from './components/forecast/ForecastPage';
import { OptimisationPage } from './components/optimisation/OptimisationPage';
import { SharepointPage } from './components/optimisation/SharepointPage';
import { O365Page } from './components/optimisation/O365Page';
import { O365DuplicatePage } from './components/optimisation/O365DuplicatePage';
import { O365UsagePage } from './components/optimisation/O365UsagePage';
import { AdobeUsagePage } from './components/optimisation/AdobeUsagePage';
import { AdobeGhostPage } from './components/optimisation/AdobeGhostPage';
import { AdobeDuplicatePage } from './components/optimisation/AdobeDuplicatePage';
import { AIUsagePage } from './components/optimisation/AIUsagePage';
import { AIOptimisationPage } from './components/optimisation/AIOptimisationPage';
import { RechargeSubsidiaryPage } from './components/recharge/RechargeSubsidiaryPage';
import { useSidebar } from './hooks/useSidebar';

function renderPage(page) {
  switch (page) {
    case 'recharge/subsidiary':       return <RechargeSubsidiaryPage />;
    case 'forecast/alphabet':         return <ForecastPage />;
    case 'optimisation/alphabet':     return <OptimisationPage defaultView="alphabet" />;
    case 'optimisation/subsidiary':   return <OptimisationPage defaultView="subsidiary" />;
    case 'optimisation/departments':  return <OptimisationPage defaultView="department" />;
    case 'optimisation/o365':           return <O365Page />;
    case 'optimisation/o365/duplicate': return <O365DuplicatePage />;
    case 'optimisation/o365/usage':     return <O365UsagePage />;
    case 'optimisation/adobe/usage':    return <AdobeUsagePage />;
    case 'optimisation/adobe/ghost':      return <AdobeGhostPage />;
    case 'optimisation/adobe/duplicate':  return <AdobeDuplicatePage />;
    case 'optimisation/ai/usage':         return <AIUsagePage />;
    case 'optimisation/ai/optimisation':  return <AIOptimisationPage />;
    case 'optimisation/sharepoint':   return <SharepointPage />;
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
