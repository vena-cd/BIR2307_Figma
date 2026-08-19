import { useState } from 'react';
import { Download, FileText, Table, ChevronDown, BarChart3 } from 'lucide-react';
import { formatCurrency } from '../data/mock';

const quarters = ['Q3 2026', 'Q2 2026', 'Q1 2026', 'Q4 2025'];

const quarterData: Record<string, { certs: number; payees: number; amountPaid: number; ewt: number; signed: number; forwarded: number; generated: number; draft: number }> = {
  'Q3 2026': { certs: 42, payees: 38, amountPaid: 2197500, ewt: 33075, signed: 12, forwarded: 18, generated: 10, draft: 2 },
  'Q2 2026': { certs: 38, payees: 35, amountPaid: 1980000, ewt: 29700, signed: 38, forwarded: 0, generated: 0, draft: 0 },
  'Q1 2026': { certs: 41, payees: 37, amountPaid: 2140000, ewt: 32100, signed: 41, forwarded: 0, generated: 0, draft: 0 },
  'Q4 2025': { certs: 35, payees: 32, amountPaid: 1820000, ewt: 27300, signed: 35, forwarded: 0, generated: 0, draft: 0 },
};

export default function Reports() {
  const [selectedQuarter, setSelectedQuarter] = useState('Q3 2026');
  const [quarterDropOpen, setQuarterDropOpen] = useState(false);
  const data = quarterData[selectedQuarter];

  const statusBars = [
    { label: 'Signed', count: data.signed, total: data.certs, color: 'bg-emerald-500' },
    { label: 'Forwarded', count: data.forwarded, total: data.certs, color: 'bg-violet-500' },
    { label: 'Generated', count: data.generated, total: data.certs, color: 'bg-blue-500' },
    { label: 'Draft', count: data.draft, total: data.certs, color: 'bg-slate-300' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-display font-semibold text-slate-900">Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">Quarterly summaries, filing packets, and data exports.</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setQuarterDropOpen(!quarterDropOpen)}
            className="flex items-center gap-2 h-8 px-3 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
          >
            {selectedQuarter}
            <ChevronDown size={13} className="text-slate-400" />
          </button>
          {quarterDropOpen && (
            <div className="absolute right-0 top-9 w-32 bg-white rounded-md border border-slate-200 shadow-lg z-50 py-1">
              {quarters.map((q) => (
                <button
                  key={q}
                  onClick={() => { setSelectedQuarter(q); setQuarterDropOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-50 transition-colors ${q === selectedQuarter ? 'text-brand font-medium' : 'text-slate-700'}`}
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quarterly summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={15} className="text-slate-400" />
          <h2 className="text-sm font-display font-semibold text-slate-800">Quarterly Summary — {selectedQuarter}</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Certificates', value: String(data.certs), mono: false },
            { label: 'Payees', value: String(data.payees), mono: false },
            { label: 'Total Amount Paid', value: formatCurrency(data.amountPaid), mono: true },
            { label: 'Total EWT', value: formatCurrency(data.ewt), mono: true },
          ].map(({ label, value, mono }) => (
            <div key={label} className="p-3 bg-slate-50 rounded-lg">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider">{label}</p>
              <p className={`text-lg font-display font-bold text-slate-900 mt-1 ${mono ? 'tabular' : ''}`}>{value}</p>
            </div>
          ))}
        </div>

        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Status Distribution</p>
        <div className="space-y-2">
          {statusBars.map(({ label, count, total, color }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xs text-slate-600 w-20 flex-shrink-0">{label}</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full transition-all duration-500`}
                  style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
                />
              </div>
              <span className="text-xs tabular text-slate-500 w-10 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Filing Packet */}
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-1">
            <FileText size={15} className="text-slate-400" />
            <h2 className="text-sm font-display font-semibold text-slate-800">Filing Packet</h2>
          </div>
          <p className="text-xs text-slate-500 mb-4">Generate a complete filing packet for submission.</p>

          <div className="space-y-3 mb-4">
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Quarter</label>
              <select className="w-full h-8 px-2.5 text-sm border border-slate-200 rounded-md bg-slate-50 text-slate-700 outline-none focus:border-brand transition-colors">
                {quarters.map((q) => <option key={q}>{q}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Certificate Status</label>
              <select className="w-full h-8 px-2.5 text-sm border border-slate-200 rounded-md bg-slate-50 text-slate-700 outline-none focus:border-brand transition-colors">
                <option>All certificates</option>
                <option>Signed only</option>
                <option>Generated and above</option>
              </select>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2">
            <button className="w-full flex items-center justify-center gap-2 h-8 bg-brand text-white text-sm font-medium rounded-md hover:bg-brand-700 transition-colors">
              <Download size={13} />
              Download PDF Packet
            </button>
            <button className="w-full flex items-center justify-center gap-2 h-8 text-slate-700 border border-slate-200 text-sm rounded-md hover:bg-slate-50 transition-colors">
              <Table size={13} />
              Export Excel
            </button>
          </div>
        </div>

        {/* Data Export */}
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-1">
            <Download size={15} className="text-slate-400" />
            <h2 className="text-sm font-display font-semibold text-slate-800">Data Export</h2>
          </div>
          <p className="text-xs text-slate-500 mb-4">Export raw certificate and transaction data.</p>

          <div className="space-y-2">
            {[
              { label: 'Certificates — CSV', sub: 'All fields, current quarter', icon: Table, format: 'CSV' },
              { label: 'Certificates — Excel', sub: 'Formatted workbook', icon: Table, format: 'XLSX' },
              { label: 'Transactions — CSV', sub: 'All transaction rows', icon: Table, format: 'CSV' },
              { label: 'Payees — CSV', sub: 'Payee master list', icon: Table, format: 'CSV' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 py-2.5 border-b border-slate-100">
                  <Icon size={14} className="text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.sub}</p>
                  </div>
                  <button className="h-6 px-2.5 text-xs text-brand border border-brand-100 bg-brand-50 rounded hover:bg-brand-100 transition-colors">
                    Export
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
