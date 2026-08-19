import { useState } from 'react';
import { Search, Bell, Plus, ChevronDown, Menu } from 'lucide-react';
import type { View } from '../types';

const quarters = ['Q3 2026', 'Q2 2026', 'Q1 2026', 'Q4 2025', 'Q3 2025'];

interface Props {
  onMenuClick: () => void;
  onNewImport: () => void;
  onNavigate: (view: View) => void;
}

export default function TopBar({ onMenuClick, onNewImport }: Props) {
  const [quarter, setQuarter] = useState('Q3 2026');
  const [quarterOpen, setQuarterOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center gap-3 px-4 flex-shrink-0">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
      >
        <Menu size={18} />
      </button>

      {/* Mobile logo */}
      <div className="lg:hidden flex items-center gap-2 mr-2">
        <div className="w-6 h-6 bg-brand rounded flex items-center justify-center">
          <span className="text-white font-display font-bold text-[10px]">2307</span>
        </div>
      </div>

      {/* Search */}
      <div className={`flex-1 max-w-md relative`}>
        <div
          className={`flex items-center gap-2 h-8 px-3 rounded-md border transition-colors ${
            searchFocused ? 'border-brand ring-2 ring-brand-100 bg-white' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <Search size={14} className="text-slate-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search payees, TIN, certificate…"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 text-sm bg-transparent outline-none text-slate-800 placeholder-slate-400 min-w-0"
          />
          <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Quarter selector */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setQuarterOpen(!quarterOpen)}
            className="flex items-center gap-1.5 h-8 px-3 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 transition-colors"
          >
            <span>{quarter}</span>
            <ChevronDown size={12} className="text-slate-400" />
          </button>
          {quarterOpen && (
            <div className="absolute right-0 top-9 w-32 bg-white rounded-md border border-slate-200 shadow-lg z-50 py-1">
              {quarters.map((q) => (
                <button
                  key={q}
                  onClick={() => { setQuarter(q); setQuarterOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-50 transition-colors ${
                    q === quarter ? 'text-brand font-medium' : 'text-slate-700'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* New Import CTA */}
        <button
          onClick={onNewImport}
          className="flex items-center gap-1.5 h-8 px-3 bg-brand text-white text-sm font-medium rounded-md hover:bg-brand-700 transition-colors"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">New Import</span>
        </button>
      </div>
    </header>
  );
}
