import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  MoreHorizontal,
  Settings,
  HelpCircle,
  UserCircle,
  ChevronLeft,
  X,
} from 'lucide-react';
import type { View } from '../types';

interface NavItem { view: View; label: string; icon: React.ElementType; }

const navItems: NavItem[] = [
  { view: 'overview',     label: 'Overview',      icon: LayoutDashboard },
  { view: 'certificates', label: 'Certificates',  icon: FileText },
  { view: 'payees',       label: 'Payees',         icon: Users },
  { view: 'reports',      label: 'Reports',        icon: BarChart3 },
  { view: 'more',         label: 'More',           icon: MoreHorizontal },
];

interface Props {
  activeView: View;
  onNavigate: (view: View) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ activeView, onNavigate, collapsed, onToggleCollapse, mobileOpen, onMobileClose }: Props) {
  const width = collapsed ? 'w-16' : 'w-56';

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-sidebar text-slate-400 ${width} flex-shrink-0 transition-all duration-200 ease-in-out overflow-hidden`}
      >
        <SidebarContent
          activeView={activeView}
          onNavigate={onNavigate}
          collapsed={collapsed}
          onToggleCollapse={onToggleCollapse}
        />
      </aside>

      {/* Mobile sidebar overlay */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-slate-400 w-64 transform transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="text-white font-display font-bold text-lg tracking-tight">2307</span>
            <span className="text-slate-400 text-xs font-sans">BIR 2307 Generator</span>
          </div>
          <button onClick={onMobileClose} className="text-slate-400 hover:text-white p-1">
            <X size={18} />
          </button>
        </div>
        <SidebarContent
          activeView={activeView}
          onNavigate={(v) => { onNavigate(v); onMobileClose(); }}
          collapsed={false}
          onToggleCollapse={() => {}}
          hideLogo
        />
      </aside>
    </>
  );
}

function SidebarContent({
  activeView,
  onNavigate,
  collapsed,
  onToggleCollapse,
  hideLogo,
}: {
  activeView: View;
  onNavigate: (view: View) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  hideLogo?: boolean;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      {!hideLogo && (
        <div className="flex items-center px-4 h-14 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 bg-brand rounded flex items-center justify-center flex-shrink-0">
              <span className="text-white font-display font-bold text-sm">2307</span>
            </div>
            {!collapsed && (
              <span className="text-slate-300 text-xs font-sans leading-tight truncate">
                BIR 2307<br />
                <span className="text-slate-500">Generator</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map(({ view, label, icon: Icon }) => {
          const active = activeView === view;
          return (
            <button
              key={view}
              onClick={() => onNavigate(view)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center gap-3 px-2.5 py-2 rounded text-sm font-sans transition-colors ${
                active
                  ? 'bg-brand text-white'
                  : 'text-slate-400 hover:bg-sidebar-hover hover:text-slate-200'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom items */}
      <div className="border-t border-slate-800 py-3 px-2 space-y-0.5">
        {[
          { label: 'Settings', icon: Settings },
          { label: 'Help',     icon: HelpCircle },
        ].map(({ label, icon: Icon }) => (
          <button
            key={label}
            title={collapsed ? label : undefined}
            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded text-sm text-slate-500 hover:bg-sidebar-hover hover:text-slate-300 transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <Icon size={16} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}

        <div
          className={`flex items-center gap-2.5 px-2.5 py-2 mt-1 rounded hover:bg-sidebar-hover cursor-pointer transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-brand-700 flex items-center justify-center flex-shrink-0">
            <UserCircle size={14} className="text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-slate-300 text-xs font-medium truncate">Maria Santos</p>
              <p className="text-slate-600 text-[10px] truncate">Finance Officer</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse toggle (desktop only) */}
      <button
        onClick={onToggleCollapse}
        className="hidden lg:flex items-center justify-center py-2 border-t border-slate-800 text-slate-600 hover:text-slate-400 transition-colors"
      >
        <ChevronLeft
          size={14}
          className={`transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  );
}
