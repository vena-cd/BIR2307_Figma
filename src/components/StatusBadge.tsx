import type { CertificateStatus } from '../types';

const configs: Record<CertificateStatus, { label: string; classes: string }> = {
  draft:     { label: 'Draft',     classes: 'bg-slate-100 text-slate-600 border-slate-200' },
  generated: { label: 'Generated', classes: 'bg-blue-50 text-blue-700 border-blue-100' },
  forwarded: { label: 'Forwarded', classes: 'bg-violet-50 text-violet-700 border-violet-100' },
  signed:    { label: 'Signed',    classes: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  void:      { label: 'Void',     classes: 'bg-slate-100 text-slate-400 border-slate-200 line-through' },
};

interface Props {
  status: CertificateStatus;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'sm' }: Props) {
  const { label, classes } = configs[status];
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';
  return (
    <span className={`inline-flex items-center rounded border font-medium font-display ${padding} ${classes}`}>
      {label}
    </span>
  );
}
