import { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, AlertTriangle, AlertCircle, ChevronRight, FileSpreadsheet, ArrowRight } from 'lucide-react';

type Stage = 'upload' | 'map' | 'validate' | 'generate' | 'progress' | 'complete';

const STAGES: { key: Stage; label: string; number: number }[] = [
  { key: 'upload',   label: 'Upload',   number: 1 },
  { key: 'map',      label: 'Map',      number: 2 },
  { key: 'validate', label: 'Validate', number: 3 },
  { key: 'generate', label: 'Generate', number: 4 },
];
const STAGE_ORDER: Stage[] = ['upload', 'map', 'validate', 'generate', 'progress', 'complete'];

const mappings = [
  { excel: 'BILL NO.', system: 'Bill Number', confidence: 'auto' },
  { excel: 'TIN', system: 'Payee TIN', confidence: 'auto' },
  { excel: 'SUPPLIER NAME', system: 'Payee Name', confidence: 'auto' },
  { excel: 'AMOUNT PAID', system: 'Amount Paid', confidence: 'auto' },
  { excel: 'EWT', system: 'Tax Withheld', confidence: 'auto' },
  { excel: 'ATC', system: 'ATC Code', confidence: 'saved' },
  { excel: 'DATE', system: 'Transaction Date', confidence: 'fuzzy' },
  { excel: 'QUARTER', system: 'Quarter', confidence: 'auto' },
  { excel: 'REMARKS', system: 'Notes', confidence: 'auto' },
  { excel: 'GROSS INCOME', system: '— Unmapped —', confidence: 'attention' },
];

const confidenceStyle: Record<string, string> = {
  auto:      'text-emerald-700 bg-emerald-50 border-emerald-200',
  saved:     'text-blue-700 bg-blue-50 border-blue-100',
  fuzzy:     'text-amber-700 bg-amber-50 border-amber-200',
  attention: 'text-red-600 bg-red-50 border-red-200',
};
const confidenceLabel: Record<string, string> = {
  auto:      'Auto-matched',
  saved:     'Previously saved',
  fuzzy:     'Fuzzy match',
  attention: 'Needs attention',
};

const errors = [
  { row: 142, field: 'TIN', issue: 'Invalid TIN format: 12-345-67', value: '12-345-67' },
  { row: 287, field: 'EWT', issue: 'EWT mismatch: ₱4,250.00 vs computed ₱4,300.00', value: '₱4,250.00' },
  { row: 341, field: 'AMOUNT PAID', issue: 'Negative amount not allowed', value: '-₱15,000.00' },
];

const warnings = [
  { row: 88, field: 'TIN', issue: 'TIN not found in payee master — will create new payee' },
  { row: 154, field: 'BILL NO.', issue: 'Possible duplicate: BN-2026-0041 already exists' },
  { row: 290, field: 'ATC', issue: 'Unrecognized ATC code WI099 — defaulting to WI010' },
];

export default function ImportWizard({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<Stage>('upload');
  const [fileSelected, setFileSelected] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressItems, setProgressItems] = useState<string[]>([]);

  const stageIdx = STAGE_ORDER.indexOf(stage);
  const stageTabIdx = STAGES.findIndex((s) => s.key === stage);

  const advance = () => {
    const next = STAGE_ORDER[stageIdx + 1];
    if (next) setStage(next);
  };

  // Simulate progress
  useEffect(() => {
    if (stage !== 'progress') return;
    const payees = ['Santos Trading Co.', 'ABC Cooperative', 'Maria Pharmacy', 'XYZ Services', 'Dela Cruz Medical', 'Philippine Eagle', 'Visayas Cargo', 'Batangas Chemical', 'Quezon Holdings'];
    let i = 0;
    const interval = setInterval(() => {
      const pct = Math.min(100, Math.round(((i + 1) / 218) * 100));
      setProgress(pct);
      if (i < payees.length) {
        setProgressItems((prev) => [...prev, payees[i]]);
      }
      i += 25;
      if (i >= 218) {
        clearInterval(interval);
        setTimeout(() => setStage('complete'), 500);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:rounded-xl sm:max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 flex-shrink-0">
          <div>
            <h2 className="text-base font-display font-semibold text-slate-900">
              {stage === 'complete' ? '218 Certificates Generated' : 'New Import'}
            </h2>
            {stage !== 'complete' && stage !== 'progress' && (
              <p className="text-xs text-slate-500 mt-0.5">Import Excel transactions and generate BIR 2307 certificates.</p>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Stage tabs */}
        {stage !== 'progress' && stage !== 'complete' && (
          <div className="flex items-center px-5 py-3 border-b border-slate-200 gap-0 flex-shrink-0 overflow-x-auto">
            {STAGES.map((s, i) => {
              const done = STAGES.findIndex((x) => x.key === stage) > i;
              const current = s.key === stage;
              return (
                <div key={s.key} className="flex items-center gap-0">
                  <div className={`flex items-center gap-2 px-2 py-1 rounded ${current ? 'text-brand' : done ? 'text-emerald-600' : 'text-slate-400'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                      done ? 'bg-emerald-500 text-white' : current ? 'bg-brand text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {done ? '✓' : s.number}
                    </div>
                    <span className="text-xs font-medium whitespace-nowrap">{s.label}</span>
                  </div>
                  {i < STAGES.length - 1 && <ChevronRight size={13} className="text-slate-300 mx-1 flex-shrink-0" />}
                </div>
              );
            })}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* UPLOAD */}
          {stage === 'upload' && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); setFileSelected(true); }}
                onClick={() => setFileSelected(true)}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                  dragging ? 'border-brand bg-brand-50' : fileSelected ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 hover:border-brand hover:bg-brand-50'
                }`}
              >
                {fileSelected ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <FileSpreadsheet size={24} className="text-emerald-600" />
                    </div>
                    <p className="font-medium text-slate-800">transactions_Q3_2026.xlsx</p>
                    <p className="text-xs text-slate-500">2.4 MB · Sheet1 · 2,438 rows</p>
                    <div className="flex items-center gap-2 mt-1">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span className="text-xs text-emerald-700 font-medium">File ready</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Upload size={24} className="text-slate-400" />
                    </div>
                    <p className="font-medium text-slate-700">Drop your Excel file here</p>
                    <p className="text-xs text-slate-400">or click to browse · .xlsx and .xls supported</p>
                    <p className="text-xs text-slate-400">Max 50 MB · Up to 50,000 rows</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MAP */}
          {stage === 'map' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Match Excel columns to system fields.</p>
                <span className="text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                  9 / 10 mapped
                </span>
              </div>
              <div className="space-y-0 rounded-lg border border-slate-200 overflow-hidden">
                {mappings.map((m, i) => (
                  <div
                    key={m.excel}
                    className={`flex items-center gap-3 px-4 py-2.5 ${i < mappings.length - 1 ? 'border-b border-slate-100' : ''} ${
                      m.confidence === 'attention' ? 'bg-red-50' : ''
                    }`}
                  >
                    <span className="text-sm tabular text-slate-600 w-36 flex-shrink-0 truncate">{m.excel}</span>
                    <ArrowRight size={13} className="text-slate-300 flex-shrink-0" />
                    <span className="text-sm text-slate-800 flex-1 truncate">{m.system}</span>
                    <span className={`text-xs px-2 py-0.5 rounded border font-medium flex-shrink-0 ${confidenceStyle[m.confidence]}`}>
                      {confidenceLabel[m.confidence]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VALIDATE */}
          {stage === 'validate' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-display font-semibold text-slate-800 mb-3">Your file is ready to review</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Total rows', value: '2,438', color: 'text-slate-800' },
                    { label: 'Valid', value: '2,401', color: 'text-emerald-700' },
                    { label: 'Warnings', value: '31', color: 'text-amber-700' },
                    { label: 'Errors', value: '6', color: 'text-red-600' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="text-center p-2 bg-white rounded border border-slate-200">
                      <p className={`text-xl font-display font-bold tabular ${color}`}>{value}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={14} className="text-red-500" />
                  <span className="text-sm font-medium text-red-700">6 Errors — must resolve or skip to proceed</span>
                </div>
                <div className="rounded-lg border border-red-200 overflow-hidden">
                  {errors.map((e, i) => (
                    <div key={i} className={`flex items-start gap-3 px-4 py-3 bg-red-50 ${i < errors.length - 1 ? 'border-b border-red-100' : ''}`}>
                      <span className="text-xs tabular text-red-400 w-12 flex-shrink-0 pt-0.5">Row {e.row}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-red-800">{e.issue}</p>
                        <p className="text-xs text-red-500 mt-0.5 tabular">{e.field}: {e.value}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button className="h-6 px-2 text-xs text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors">Fix</button>
                        <button className="h-6 px-2 text-xs text-slate-400 hover:text-slate-600 transition-colors">Skip</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={14} className="text-amber-500" />
                  <span className="text-sm font-medium text-amber-700">31 Warnings — review recommended</span>
                </div>
                <div className="rounded-lg border border-amber-200 overflow-hidden">
                  {warnings.map((w, i) => (
                    <div key={i} className={`flex items-start gap-3 px-4 py-3 bg-amber-50 ${i < warnings.length - 1 ? 'border-b border-amber-100' : ''}`}>
                      <span className="text-xs tabular text-amber-400 w-12 flex-shrink-0 pt-0.5">Row {w.row}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-amber-800">{w.issue}</p>
                        <p className="text-xs text-amber-500 mt-0.5">{w.field}</p>
                      </div>
                      <button className="h-6 px-2 text-xs text-slate-400 hover:text-slate-600 flex-shrink-0 transition-colors">Ignore</button>
                    </div>
                  ))}
                  {warnings.length > 0 && (
                    <div className="px-4 py-2.5 bg-amber-50 border-t border-amber-100">
                      <button className="text-xs text-amber-700 hover:underline">Show all 31 warnings</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* GENERATE CONFIRMATION */}
          {stage === 'generate' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-display font-semibold text-slate-800 mb-4">Ready to generate certificates</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Payees', value: '245' },
                    { label: 'Certificates', value: '218' },
                    { label: 'Total Amount Paid', value: '₱12,482,500.00' },
                    { label: 'Total EWT', value: '₱187,237.50' },
                    { label: 'Valid rows', value: '2,401' },
                    { label: 'Exceptions', value: '0' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-1.5 border-b border-slate-200">
                      <span className="text-sm text-slate-500">{label}</span>
                      <span className="text-sm font-medium tabular text-slate-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <CheckCircle2 size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800">
                  Certificates will be created for 218 payee-quarter combinations. This action cannot be undone, but certificates can be voided individually.
                </p>
              </div>
            </div>
          )}

          {/* PROGRESS */}
          {stage === 'progress' && (
            <div className="py-4 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-slate-700">Generating certificates…</span>
                  <span className="text-sm tabular font-medium text-brand">{progress}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1.5 tabular">
                  {Math.round((progress / 100) * 218)} / 218 certificates
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg border border-slate-200 p-3 max-h-40 overflow-y-auto">
                <p className="text-xs font-medium text-slate-500 mb-2">Activity</p>
                {progressItems.map((name, i) => (
                  <div key={i} className="flex items-center gap-2 py-0.5">
                    <CheckCircle2 size={11} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-xs text-slate-600">{name}</span>
                  </div>
                ))}
                {progress < 100 && (
                  <div className="flex items-center gap-2 py-0.5 mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-brand border-t-transparent animate-spin flex-shrink-0" />
                    <span className="text-xs text-brand">Processing…</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* COMPLETE */}
          {stage === 'complete' && (
            <div className="py-6 flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 size={32} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-slate-900">218 Certificates Generated</h3>
                <p className="text-sm text-slate-500 mt-1">All certificates were generated successfully.</p>
              </div>
              <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                {[{ v: '218', l: 'Generated' }, { v: '245', l: 'Payees' }, { v: '0', l: 'Errors' }].map(({ v, l }) => (
                  <div key={l} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-xl font-bold font-display tabular text-slate-900">{v}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400">
                Generation complete · Q3 2026 · Aug 19, 2026 · By Maria Santos
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
          {stage === 'complete' ? (
            <div className="flex items-center gap-2 w-full flex-wrap">
              <button onClick={onClose} className="h-9 px-4 bg-brand text-white text-sm font-medium rounded-md hover:bg-brand-700 transition-colors">
                Review Certificates
              </button>
              <button className="h-9 px-4 text-slate-700 border border-slate-200 text-sm rounded-md hover:bg-slate-50 transition-colors">
                Download Filing Packet
              </button>
              <button onClick={onClose} className="h-9 px-4 text-slate-500 text-sm rounded-md hover:bg-slate-50 transition-colors ml-auto">
                Return to Overview
              </button>
            </div>
          ) : stage === 'progress' ? (
            <p className="text-xs text-slate-400">Please wait — do not close this window.</p>
          ) : (
            <>
              <button
                onClick={onClose}
                className="h-8 px-3 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (stage === 'upload' && !fileSelected) { setFileSelected(true); return; }
                  advance();
                }}
                disabled={stage === 'upload' && false}
                className={`flex items-center gap-1.5 h-9 px-4 text-sm font-medium rounded-md transition-colors ${
                  stage === 'generate'
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-brand text-white hover:bg-brand-700'
                }`}
              >
                {stage === 'upload' && 'Continue to Mapping'}
                {stage === 'map' && 'Continue to Validation'}
                {stage === 'validate' && 'Continue to Generate'}
                {stage === 'generate' && 'Generate 218 Certificates'}
                <ChevronRight size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
