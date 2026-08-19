import { useState } from 'react';
import { Search, X, Users, ChevronRight, CheckCircle2 } from 'lucide-react';
import { payees, maskTin, formatCurrency } from '../data/mock';
import type { Payee } from '../types';

const quarters = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026'];
const quarterStatus: Record<string, 'completed' | 'generated' | 'not_started'> = {
  'Q1 2026': 'completed',
  'Q2 2026': 'completed',
  'Q3 2026': 'generated',
  'Q4 2026': 'not_started',
};
const qStatusLabel: Record<string, string> = {
  completed: 'Completed',
  generated: 'Generated',
  not_started: 'Not Started',
};
const qStatusColor: Record<string, string> = {
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  generated: 'bg-blue-50 text-blue-700 border-blue-100',
  not_started: 'bg-slate-50 text-slate-400 border-slate-200',
};

const TABS = ['Overview', 'Transactions', 'Certificates', 'History'] as const;

function PayeeDrawer({ payee, onClose }: { payee: Payee; onClose: () => void }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Overview');

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display font-semibold text-slate-900 text-base">{payee.name}</h2>
            <p className="text-xs tabular text-slate-500 mt-0.5">{payee.tin}</p>
            <p className="text-xs text-slate-400 mt-0.5">{payee.address}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded border font-medium ${
              payee.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}>
              {payee.status === 'active' ? 'Active' : 'Inactive'}
            </span>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <button className="h-7 px-3 text-xs font-medium text-slate-700 border border-slate-200 rounded hover:bg-slate-50 transition-colors">
            Edit
          </button>
          <button className="h-7 px-3 text-xs font-medium bg-brand text-white rounded hover:bg-brand-700 transition-colors">
            Create Certificate
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 flex-shrink-0 px-5 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`py-2.5 px-1 mr-5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              tab === t ? 'border-brand text-brand' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {tab === 'Overview' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total Certificates', value: String(payee.certificateCount) },
                { label: 'Outstanding', value: String(payee.outstanding) },
                { label: 'Last Certificate', value: payee.lastCertificate },
                { label: 'Current Quarter', value: payee.currentQuarter },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-semibold tabular text-slate-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            {/* Quarterly activity */}
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Quarterly Activity</p>
              <div className="space-y-1.5">
                {quarters.map((q) => {
                  const qs = quarterStatus[q];
                  return (
                    <div key={q} className="flex items-center gap-3 py-1.5">
                      <span className="text-sm text-slate-600 w-16 tabular">{q}</span>
                      <span className={`text-xs px-2 py-0.5 rounded border font-medium ${qStatusColor[qs]}`}>
                        {qStatusLabel[qs]}
                      </span>
                      {qs !== 'not_started' && (
                        <button className="text-xs text-brand hover:underline ml-auto">View</button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab === 'Transactions' && (
          <div className="space-y-2">
            <p className="text-xs text-slate-500 mb-3">Recent transactions for {payee.name}</p>
            {[
              { billNo: 'BN-2026-0001', amount: 485000, ewt: 4850, atc: 'WI010', date: 'Jul 15, 2026' },
              { billNo: 'BN-2026-0041', amount: 220000, ewt: 2200, atc: 'WI010', date: 'Jul 8, 2026' },
              { billNo: 'BN-2026-0032', amount: 310000, ewt: 3100, atc: 'WI010', date: 'Jun 28, 2026' },
            ].map((tx) => (
              <div key={tx.billNo} className="flex items-center gap-3 py-2.5 border-b border-slate-100">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium tabular text-slate-700">{tx.billNo}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{tx.date} · {tx.atc}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm tabular text-slate-800">{formatCurrency(tx.amount)}</p>
                  <p className="text-xs tabular text-slate-500">EWT: {formatCurrency(tx.ewt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'Certificates' && (
          <div className="space-y-2">
            {[
              { id: 'C-2307-2026Q3-001', quarter: 'Q3 2026', status: 'generated', amount: 485000 },
              { id: 'C-2307-2026Q2-001', quarter: 'Q2 2026', status: 'signed', amount: 402000 },
              { id: 'C-2307-2026Q1-001', quarter: 'Q1 2026', status: 'signed', amount: 298000 },
            ].map((c) => (
              <div key={c.id} className="flex items-center gap-3 py-2.5 border-b border-slate-100">
                <div className="flex-1">
                  <p className="text-xs tabular text-slate-600">{c.id}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{c.quarter}</p>
                </div>
                <p className="text-sm tabular text-slate-800">{formatCurrency(c.amount)}</p>
                <span className={`text-xs px-2 py-0.5 rounded border font-medium ${
                  c.status === 'signed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  c.status === 'generated' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                  'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === 'History' && (
          <div className="space-y-3">
            {[
              { date: 'Aug 15, 2026', event: 'Certificate generated', by: 'Maria Santos' },
              { date: 'May 10, 2026', event: 'Certificate generated', by: 'Maria Santos' },
              { date: 'May 18, 2026', event: 'Signed copy received', by: 'Maria Santos' },
              { date: 'Feb 9, 2026', event: 'Certificate generated', by: 'John Cruz' },
              { date: 'Feb 22, 2026', event: 'Signed copy received', by: 'Maria Santos' },
            ].map((h, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={11} className="text-slate-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-700">{h.event}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{h.date} · {h.by}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Payees() {
  const [search, setSearch] = useState('');
  const [drawerPayee, setDrawerPayee] = useState<Payee | null>(null);

  const filtered = payees.filter(
    (p) => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.tin.includes(search)
  );

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main */}
      <div className={`flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-200 ${drawerPayee ? 'lg:mr-[480px]' : ''}`}>
        <div className="px-4 sm:px-6 py-4 border-b border-slate-200 bg-white flex-shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-display font-semibold text-slate-900">Payees</h1>
              <p className="text-xs text-slate-500 mt-0.5">Recurring payee entities and their certificate history.</p>
            </div>
          </div>
          <div className="mt-3 relative max-w-xs">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search payees or TIN…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 pl-8 pr-3 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:border-brand focus:ring-1 focus:ring-brand-100 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm border-collapse min-w-[560px]">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Payee</th>
                <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">TIN</th>
                <th className="text-center px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Certificates</th>
                <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">Last Certificate</th>
                <th className="text-center px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden xl:table-cell">Outstanding</th>
                <th className="text-center px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="w-8 px-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const active = drawerPayee?.id === p.id;
                return (
                  <tr
                    key={p.id}
                    onClick={() => setDrawerPayee(active ? null : p)}
                    className={`border-b border-slate-100 cursor-pointer transition-colors ${active ? 'bg-brand-50' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold font-display text-slate-600 flex-shrink-0">
                          {p.name.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-800">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 hidden md:table-cell">
                      <span className="tabular text-xs text-slate-500">{maskTin(p.tin)}</span>
                    </td>
                    <td className="px-3 py-3 text-center hidden sm:table-cell">
                      <span className="tabular text-slate-700">{p.certificateCount}</span>
                    </td>
                    <td className="px-3 py-3 hidden lg:table-cell">
                      <span className="text-xs text-slate-500">{p.lastCertificate}</span>
                    </td>
                    <td className="px-3 py-3 text-center hidden xl:table-cell">
                      {p.outstanding > 0 ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                          {p.outstanding}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded border font-medium ${
                        p.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}>
                        {p.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <ChevronRight size={14} className="text-slate-300" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-16 gap-2">
              <Users size={32} className="text-slate-300" />
              <p className="text-sm font-medium text-slate-500">No payees found</p>
            </div>
          )}
        </div>
      </div>

      {/* Drawer */}
      {drawerPayee && (
        <>
          <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setDrawerPayee(null)} />
          <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white border-l border-slate-200 shadow-xl z-40 flex flex-col">
            <PayeeDrawer payee={drawerPayee} onClose={() => setDrawerPayee(null)} />
          </div>
        </>
      )}
    </div>
  );
}
