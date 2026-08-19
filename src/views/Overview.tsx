import { AlertTriangle, Info, ArrowRight, Clock, FileCheck, Upload, CheckCircle2 } from 'lucide-react';
import { attentionItems, auditEvents, formatCurrency } from '../data/mock';
import type { View, AttentionItem } from '../types';

const kpis = [
  { label: 'Generated', value: 42, sub: 'This quarter', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100' },
  { label: 'For Review', value: 7, sub: 'Require attention', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100' },
  { label: 'Forwarded', value: 18, sub: 'Sent to payees', color: 'text-violet-700', bg: 'bg-violet-50', border: 'border-violet-100' },
  { label: 'Completed', value: 12, sub: 'Signed copies received', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { label: 'Exceptions', value: 3, sub: 'Need resolution', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
];

const workflowStages = [
  { label: 'Imported', count: 2438, active: true },
  { label: 'Validated', count: 2401, active: true },
  { label: 'Generated', count: 42, active: true },
  { label: 'Forwarded', count: 18, active: true },
  { label: 'Signed', count: 12, active: false },
];

const recentActivity = [
  { id: 1, user: 'Maria Santos', action: 'generated 24 certificates', object: 'Batch Q3 2026 — Aug 19', time: '2h ago', icon: FileCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 2, user: 'John Cruz', action: 'marked as Forwarded', object: 'C-2307-2026Q3-005 · Dela Cruz Medical', time: '5h ago', icon: ArrowRight, color: 'text-violet-600', bg: 'bg-violet-50' },
  { id: 3, user: 'Maria Santos', action: 'uploaded signed copy', object: 'C-2307-2026Q3-003 · Maria Pharmacy', time: 'Yesterday', icon: Upload, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 4, user: 'John Cruz', action: 'edited EWT value', object: 'C-2307-2026Q3-004 · XYZ Services', time: 'Yesterday', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 5, user: 'Maria Santos', action: 'uploaded workbook', object: 'transactions_Q3_2026.xlsx · 2,438 rows', time: 'Aug 19', icon: Upload, color: 'text-slate-500', bg: 'bg-slate-100' },
];

interface Props {
  onNavigate: (view: View) => void;
  onNewImport: () => void;
}

function AttentionCard({ item, onNavigate, onNewImport }: { item: AttentionItem; onNavigate: (v: View) => void; onNewImport: () => void }) {
  const isWarning = item.type === 'warning';
  const isError = item.type === 'error';
  const borderColor = isError ? 'border-red-200' : isWarning ? 'border-amber-200' : 'border-blue-200';
  const bgColor = isError ? 'bg-red-50' : isWarning ? 'bg-amber-50' : 'bg-blue-50';
  const iconColor = isError ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-blue-500';
  const Icon = isError || isWarning ? AlertTriangle : Info;

  const handleCta = () => {
    if (item.target === 'import') { onNewImport(); return; }
    onNavigate(item.target as View);
  };

  return (
    <div className={`flex items-start gap-3 p-3.5 rounded-lg border ${borderColor} ${bgColor}`}>
      <Icon size={16} className={`${iconColor} flex-shrink-0 mt-0.5`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium font-display text-slate-800">{item.title}</p>
        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.description}</p>
      </div>
      <button
        onClick={handleCta}
        className="flex-shrink-0 text-xs font-medium text-slate-700 hover:text-brand underline underline-offset-2 transition-colors whitespace-nowrap"
      >
        {item.cta}
      </button>
    </div>
  );
}

export default function Overview({ onNavigate, onNewImport }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-display font-semibold text-slate-900">Good morning, Maria.</h1>
        <p className="text-sm text-slate-500 mt-0.5">Here&apos;s what needs your attention this quarter.</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className={`p-4 rounded-lg border ${kpi.border} ${kpi.bg} cursor-pointer hover:shadow-sm transition-shadow`}
            onClick={() => onNavigate('certificates')}
          >
            <p className={`text-2xl font-display font-bold tabular ${kpi.color}`}>{kpi.value}</p>
            <p className="text-sm font-medium text-slate-700 mt-0.5">{kpi.label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Workflow progress */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Q3 2026 Workflow Progress</p>
        <div className="flex items-center gap-0 overflow-x-auto pb-1">
          {workflowStages.map((stage, i) => (
            <div key={stage.label} className="flex items-center flex-1 min-w-0">
              <button
                onClick={() => onNavigate('certificates')}
                className={`flex flex-col items-center gap-1 flex-1 min-w-0 py-2 px-1 rounded transition-colors hover:bg-slate-50 ${
                  stage.active ? '' : 'opacity-50'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 ${
                  stage.active ? 'bg-brand text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {stage.count > 99 ? stage.count > 999 ? '2k+' : stage.count : stage.count}
                </div>
                <span className="text-xs text-slate-600 truncate max-w-full">{stage.label}</span>
              </button>
              {i < workflowStages.length - 1 && (
                <div className="w-4 h-px bg-slate-200 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Needs attention */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-display font-semibold text-slate-800">Needs Your Attention</h2>
            <span className="text-xs text-slate-500">{attentionItems.length} items</span>
          </div>
          <div className="space-y-2">
            {attentionItems.map((item) => (
              <AttentionCard
                key={item.id}
                item={item}
                onNavigate={onNavigate}
                onNewImport={onNewImport}
              />
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-display font-semibold text-slate-800">Recent Activity</h2>
            <button
              onClick={() => onNavigate('more')}
              className="text-xs text-brand hover:underline"
            >
              View audit log
            </button>
          </div>
          <div className="space-y-0">
            {recentActivity.map((event, i) => {
              const Icon = event.icon;
              return (
                <div
                  key={event.id}
                  className={`flex items-start gap-3 py-2.5 ${
                    i < recentActivity.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full ${event.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon size={13} className={event.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 leading-snug">
                      <span className="font-medium">{event.user}</span> {event.action}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{event.object}</p>
                  </div>
                  <span className="text-xs text-slate-400 flex-shrink-0 tabular">{event.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quarter summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Q3 2026 Summary</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Certificates', value: '42', sub: 'this quarter' },
            { label: 'Total Payees', value: '38', sub: 'unique payees' },
            { label: 'Total Amount Paid', value: formatCurrency(2197500), sub: 'across all certs' },
            { label: 'Total EWT', value: formatCurrency(33075), sub: 'withheld' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-lg font-display font-semibold tabular text-slate-900">{stat.value}</p>
              <p className="text-xs font-medium text-slate-700">{stat.label}</p>
              <p className="text-xs text-slate-400">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
