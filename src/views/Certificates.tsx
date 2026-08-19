import { useState } from 'react';
import {
  Search, ChevronDown, Filter, Download, Send, Trash2,
  X, Upload, Printer, ExternalLink, AlertTriangle, CheckCircle2,
  Clock, FileText,
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { certificates, maskTin, formatCurrency } from '../data/mock';
import type { Certificate, CertificateStatus } from '../types';

const statusOptions: { value: CertificateStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'generated', label: 'Generated' },
  { value: 'forwarded', label: 'Forwarded' },
  { value: 'signed', label: 'Signed' },
  { value: 'void', label: 'Void' },
];

function CertDetailDrawer({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'summary' | 'timeline' | 'signed'>('summary');

  const timeline = [
    { stage: 'Generated', date: cert.dateGenerated, by: 'Maria Santos', done: !!cert.dateGenerated },
    { stage: 'Forwarded', date: cert.status === 'forwarded' || cert.status === 'signed' ? 'Aug 20, 2026' : undefined, by: 'John Cruz', done: cert.status === 'forwarded' || cert.status === 'signed' },
    { stage: 'Signed Copy Received', date: cert.status === 'signed' ? 'Aug 24, 2026' : undefined, by: 'Maria Santos', done: cert.status === 'signed' },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Drawer header */}
      <div className="px-5 py-4 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display font-semibold text-slate-900 text-base leading-snug">{cert.payee}</h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs tabular text-slate-500">{cert.id}</span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">{cert.quarter}</span>
              <span className="text-slate-300">·</span>
              <StatusBadge status={cert.status} />
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors flex-shrink-0">
            <X size={16} />
          </button>
        </div>

        {cert.issue && (
          <div className="mt-3 flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-md">
            <AlertTriangle size={13} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">{cert.issue}</p>
          </div>
        )}

        <div className="flex items-center gap-2 mt-3">
          <button className="flex items-center gap-1.5 h-7 px-3 bg-brand text-white text-xs font-medium rounded hover:bg-brand-700 transition-colors">
            <ExternalLink size={12} />
            Open Certificate
          </button>
          <button className="h-7 px-2.5 text-xs text-slate-600 border border-slate-200 rounded hover:bg-slate-50 transition-colors flex items-center gap-1.5">
            <Download size={12} />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button className="h-7 px-2.5 text-xs text-slate-600 border border-slate-200 rounded hover:bg-slate-50 transition-colors flex items-center gap-1.5">
            <Printer size={12} />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button className="h-7 px-2.5 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors flex items-center gap-1.5 ml-auto">
            <Trash2 size={12} />
            Void
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 flex-shrink-0 px-5">
        {(['summary', 'timeline', 'signed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2.5 px-1 mr-5 text-xs font-medium border-b-2 transition-colors capitalize ${
              activeTab === tab
                ? 'border-brand text-brand'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab === 'signed' ? 'Signed Copy' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {[
                { label: 'Amount Paid', value: formatCurrency(cert.amountPaid), mono: true },
                { label: 'Tax Base', value: formatCurrency(cert.amountPaid), mono: true },
                { label: 'EWT Withheld', value: formatCurrency(cert.ewt), mono: true },
                { label: 'ATC Code', value: cert.atc, mono: false },
                { label: 'Bill No.', value: cert.billNo, mono: true },
                { label: 'Quarter', value: cert.quarter, mono: false },
                { label: 'Date Generated', value: cert.dateGenerated || '—', mono: false },
                { label: 'Last Updated', value: cert.lastUpdated, mono: false },
              ].map(({ label, value, mono }) => (
                <div key={label}>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider">{label}</p>
                  <p className={`text-sm text-slate-800 mt-0.5 font-medium ${mono ? 'tabular' : ''}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Certificate preview placeholder */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex items-center gap-2">
                <FileText size={13} className="text-slate-400" />
                <span className="text-xs text-slate-500">Official BIR Form 2307 Template</span>
              </div>
              <div className="p-4 bg-white">
                <div className="border-2 border-dashed border-slate-200 rounded-lg py-10 flex flex-col items-center gap-2">
                  <FileText size={24} className="text-slate-300" />
                  <p className="text-xs text-slate-400">PDF preview available</p>
                  <button className="text-xs text-brand hover:underline mt-1 flex items-center gap-1">
                    <ExternalLink size={11} />
                    Open certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-0">
            {timeline.map((step, i) => (
              <div key={step.stage} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    step.done
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'bg-white border-slate-300'
                  }`}>
                    {step.done && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className={`w-px flex-1 my-1 ${step.done ? 'bg-emerald-300' : 'bg-slate-200'}`} style={{ minHeight: 32 }} />
                  )}
                </div>
                <div className="pb-5 min-w-0">
                  <p className={`text-sm font-medium font-display ${step.done ? 'text-slate-800' : 'text-slate-400'}`}>
                    {step.stage}
                  </p>
                  {step.done && step.date ? (
                    <div className="mt-0.5 space-y-0.5">
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock size={10} /> {step.date}
                      </p>
                      <p className="text-xs text-slate-400">By {step.by}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 mt-0.5">Pending</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'signed' && (
          <div>
            {cert.status === 'signed' ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-emerald-800">Signed copy received</span>
                </div>
                <div className="grid grid-cols-2 gap-y-3">
                  {[
                    { label: 'Received Date', value: 'Aug 24, 2026' },
                    { label: 'Uploaded By', value: 'Maria Santos' },
                    { label: 'File Name', value: 'signed_2307_003.pdf' },
                    { label: 'File Size', value: '284 KB' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider">{label}</p>
                      <p className="text-sm text-slate-800 mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full h-8 text-xs font-medium text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5">
                  <ExternalLink size={12} />
                  View signed copy
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center py-8 gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <Upload size={20} className="text-slate-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-700">Signed copy not received</p>
                  <p className="text-xs text-slate-400 mt-0.5">Upload the signed copy once received from the payee.</p>
                </div>
                <button className="flex items-center gap-1.5 h-8 px-4 bg-brand text-white text-xs font-medium rounded-md hover:bg-brand-700 transition-colors">
                  <Upload size={12} />
                  Upload Signed Copy
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface Props {
  onNewImport: () => void;
}

export default function Certificates({ onNewImport }: Props) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CertificateStatus | 'all'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [drawerCert, setDrawerCert] = useState<Certificate | null>(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const filtered = certificates.filter((c) => {
    const matchSearch = !search || c.payee.toLowerCase().includes(search.toLowerCase()) || c.tin.includes(search) || c.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filtered.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((c) => c.id)));
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main panel */}
      <div className={`flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-200 ${drawerCert ? 'lg:mr-[480px]' : ''}`}>
        {/* Page header */}
        <div className="px-4 sm:px-6 py-4 border-b border-slate-200 bg-white flex-shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-display font-semibold text-slate-900">Certificates</h1>
              <p className="text-xs text-slate-500 mt-0.5">Prepare, review, and track BIR 2307 certificates.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="hidden sm:flex items-center gap-1.5 h-8 px-3 text-sm text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
                <Download size={13} />
                Export
              </button>
              <button
                onClick={onNewImport}
                className="flex items-center gap-1.5 h-8 px-3 bg-brand text-white text-sm font-medium rounded-md hover:bg-brand-700 transition-colors"
              >
                + New Import
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <div className="relative flex-1 min-w-[160px] max-w-xs">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search certificates…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-8 pl-8 pr-3 text-sm bg-slate-50 border border-slate-200 rounded-md outline-none focus:border-brand focus:ring-1 focus:ring-brand-100 transition-colors"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                className="flex items-center gap-1.5 h-8 px-3 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 transition-colors"
              >
                {statusOptions.find((s) => s.value === statusFilter)?.label}
                <ChevronDown size={12} className="text-slate-400" />
              </button>
              {statusDropdownOpen && (
                <div className="absolute top-9 left-0 w-36 bg-white rounded-md border border-slate-200 shadow-lg z-50 py-1">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setStatusFilter(opt.value as CertificateStatus | 'all'); setStatusDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-50 transition-colors ${
                        opt.value === statusFilter ? 'text-brand font-medium' : 'text-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="flex items-center gap-1.5 h-8 px-3 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 transition-colors">
              <Filter size={12} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Bulk action bar */}
        {selectedIds.size > 0 && (
          <div className="bg-brand-50 border-b border-brand-100 px-4 sm:px-6 py-2 flex items-center gap-3 flex-shrink-0">
            <span className="text-sm font-medium text-brand">{selectedIds.size} selected</span>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 h-7 px-2.5 text-xs text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors">
                <Send size={11} />
                <span className="hidden sm:inline">Mark Forwarded</span>
              </button>
              <button className="flex items-center gap-1 h-7 px-2.5 text-xs text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors">
                <Download size={11} />
                <span className="hidden sm:inline">Download</span>
              </button>
              <button className="flex items-center gap-1 h-7 px-2.5 text-xs text-red-600 bg-white border border-red-200 rounded hover:bg-red-50 transition-colors">
                <Trash2 size={11} />
                Void
              </button>
            </div>
            <button onClick={() => setSelectedIds(new Set())} className="ml-auto text-slate-400 hover:text-slate-600 transition-colors">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm border-collapse min-w-[640px]">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="w-10 px-4 py-2.5">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="rounded border-slate-300 accent-brand"
                  />
                </th>
                <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Payee</th>
                <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">TIN</th>
                <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Quarter</th>
                <th className="text-right px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Amount Paid</th>
                <th className="text-right px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">EWT</th>
                <th className="text-center px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden xl:table-cell">Updated</th>
                <th className="w-16 px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((cert) => {
                const selected = selectedIds.has(cert.id);
                const active = drawerCert?.id === cert.id;
                return (
                  <tr
                    key={cert.id}
                    onClick={() => setDrawerCert(active ? null : cert)}
                    className={`border-b border-slate-100 cursor-pointer transition-colors ${
                      active ? 'bg-brand-50' : selected ? 'bg-slate-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="w-10 px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleSelect(cert.id)}
                        className="rounded border-slate-300 accent-brand"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-slate-800 leading-snug">{cert.payee}</div>
                      {cert.issue && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <AlertTriangle size={10} className="text-amber-500" />
                          <span className="text-[11px] text-amber-700 truncate max-w-[180px]">{cert.issue.split(':')[0]}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-3 hidden md:table-cell">
                      <span className="text-slate-500 tabular text-xs">{maskTin(cert.tin)}</span>
                    </td>
                    <td className="px-3 py-3 hidden sm:table-cell">
                      <span className="text-slate-600 text-xs">{cert.quarter}</span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className="tabular text-slate-800">{formatCurrency(cert.amountPaid)}</span>
                    </td>
                    <td className="px-3 py-3 text-right hidden lg:table-cell">
                      <span className="tabular text-slate-600">{formatCurrency(cert.ewt)}</span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <StatusBadge status={cert.status} />
                    </td>
                    <td className="px-3 py-3 text-slate-400 text-xs hidden xl:table-cell tabular">
                      {cert.lastUpdated}
                    </td>
                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => setDrawerCert(cert)}
                          className="h-6 w-6 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors flex items-center justify-center"
                          title="View details"
                        >
                          <ExternalLink size={12} />
                        </button>
                        <button className="h-6 w-6 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors flex items-center justify-center" title="Download">
                          <Download size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-16 gap-2 text-center">
              <FileText size={32} className="text-slate-300" />
              <p className="text-sm font-medium text-slate-500">No certificates found</p>
              <p className="text-xs text-slate-400">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-3 border-t border-slate-200 bg-white flex items-center justify-between flex-shrink-0">
          <p className="text-xs text-slate-500">Showing {filtered.length} of 42 certificates</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                className={`w-7 h-7 text-xs rounded transition-colors ${
                  p === 1 ? 'bg-brand text-white' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {drawerCert && (
        <>
          {/* Mobile overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-30 lg:hidden"
            onClick={() => setDrawerCert(null)}
          />
          <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white border-l border-slate-200 shadow-xl z-40 flex flex-col">
            <CertDetailDrawer cert={drawerCert} onClose={() => setDrawerCert(null)} />
          </div>
        </>
      )}
    </div>
  );
}
