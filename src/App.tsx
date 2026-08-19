import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Overview from './views/Overview';
import Certificates from './views/Certificates';
import Payees from './views/Payees';
import Reports from './views/Reports';
import More from './views/More';
import ImportWizard from './workflows/ImportWizard';
import type { View } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<View>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [importWizardOpen, setImportWizardOpen] = useState(false);

  const navigateTo = (view: View) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        activeView={activeView}
        onNavigate={navigateTo}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar
          onMenuClick={() => setMobileMenuOpen(true)}
          onNewImport={() => setImportWizardOpen(true)}
          onNavigate={navigateTo}
        />

        <main className="flex-1 overflow-hidden relative">
          {activeView === 'overview' && (
            <div className="h-full overflow-y-auto">
              <Overview onNavigate={navigateTo} onNewImport={() => setImportWizardOpen(true)} />
            </div>
          )}
          {activeView === 'certificates' && (
            <div className="h-full flex flex-col overflow-hidden">
              <Certificates onNewImport={() => setImportWizardOpen(true)} />
            </div>
          )}
          {activeView === 'payees' && (
            <div className="h-full flex flex-col overflow-hidden">
              <Payees />
            </div>
          )}
          {activeView === 'reports' && (
            <div className="h-full overflow-y-auto">
              <Reports />
            </div>
          )}
          {activeView === 'more' && (
            <div className="h-full flex overflow-hidden">
              <More />
            </div>
          )}
        </main>
      </div>

      {importWizardOpen && (
        <ImportWizard onClose={() => setImportWizardOpen(false)} />
      )}
    </div>
  );
}
