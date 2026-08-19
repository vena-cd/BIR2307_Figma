export type View = 'overview' | 'certificates' | 'payees' | 'reports' | 'more';
export type CertificateStatus = 'draft' | 'generated' | 'forwarded' | 'signed' | 'void';

export interface Certificate {
  id: string;
  payee: string;
  tin: string;
  quarter: string;
  amountPaid: number;
  ewt: number;
  atc: string;
  status: CertificateStatus;
  lastUpdated: string;
  issue?: string;
  billNo: string;
  dateGenerated?: string;
}

export interface Payee {
  id: string;
  name: string;
  tin: string;
  address: string;
  certificateCount: number;
  lastCertificate: string;
  currentQuarter: string;
  outstanding: number;
  status: 'active' | 'inactive';
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  record: string;
  category: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface AttentionItem {
  id: string;
  title: string;
  description: string;
  cta: string;
  target: View | 'import';
  type: 'warning' | 'info' | 'error';
}
