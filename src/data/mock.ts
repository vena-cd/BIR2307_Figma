import type { Certificate, Payee, AuditEvent, AttentionItem } from '../types';

export const certificates: Certificate[] = [
  { id: 'C-2307-2026Q3-001', payee: 'Santos Trading Co., Inc.', tin: '123-456-789-000', quarter: 'Q3 2026', amountPaid: 485000, ewt: 4850, atc: 'WI010', status: 'generated', lastUpdated: 'Aug 15, 2026', billNo: 'BN-2026-0001', dateGenerated: 'Aug 15, 2026' },
  { id: 'C-2307-2026Q3-002', payee: 'ABC Cooperative', tin: '234-567-890-001', quarter: 'Q3 2026', amountPaid: 120000, ewt: 1200, atc: 'WI010', status: 'forwarded', lastUpdated: 'Aug 16, 2026', billNo: 'BN-2026-0002', dateGenerated: 'Aug 14, 2026' },
  { id: 'C-2307-2026Q3-003', payee: 'Maria Pharmacy', tin: '345-678-901-002', quarter: 'Q3 2026', amountPaid: 75000, ewt: 750, atc: 'WC160', status: 'signed', lastUpdated: 'Aug 17, 2026', billNo: 'BN-2026-0003', dateGenerated: 'Aug 12, 2026' },
  { id: 'C-2307-2026Q3-004', payee: 'XYZ Services Corporation', tin: '456-789-012-003', quarter: 'Q3 2026', amountPaid: 200000, ewt: 4000, atc: 'WC158', status: 'draft', lastUpdated: 'Aug 18, 2026', billNo: 'BN-2026-0004', issue: 'EWT mismatch: ₱4,000 vs computed ₱4,300' },
  { id: 'C-2307-2026Q3-005', payee: 'Dela Cruz Medical Supply', tin: '567-890-123-004', quarter: 'Q3 2026', amountPaid: 320000, ewt: 3200, atc: 'WI010', status: 'forwarded', lastUpdated: 'Aug 14, 2026', billNo: 'BN-2026-0005', dateGenerated: 'Aug 10, 2026' },
  { id: 'C-2307-2026Q3-006', payee: 'Philippine Eagle Transport', tin: '678-901-234-005', quarter: 'Q3 2026', amountPaid: 95000, ewt: 1900, atc: 'WC158', status: 'generated', lastUpdated: 'Aug 13, 2026', billNo: 'BN-2026-0006', dateGenerated: 'Aug 13, 2026' },
  { id: 'C-2307-2026Q3-007', payee: 'Visayas Cargo & Freight', tin: '789-012-345-006', quarter: 'Q3 2026', amountPaid: 145000, ewt: 2900, atc: 'WC158', status: 'signed', lastUpdated: 'Aug 12, 2026', billNo: 'BN-2026-0007', dateGenerated: 'Aug 8, 2026' },
  { id: 'C-2307-2026Q3-008', payee: 'Manila Textile Industries', tin: '890-123-456-007', quarter: 'Q3 2026', amountPaid: 210000, ewt: 2100, atc: 'WI010', status: 'void', lastUpdated: 'Aug 11, 2026', billNo: 'BN-2026-0008' },
  { id: 'C-2307-2026Q3-009', payee: 'Batangas Chemical Corp.', tin: '901-234-567-008', quarter: 'Q3 2026', amountPaid: 560000, ewt: 11200, atc: 'WC160', status: 'forwarded', lastUpdated: 'Aug 10, 2026', billNo: 'BN-2026-0009', dateGenerated: 'Aug 7, 2026' },
  { id: 'C-2307-2026Q3-010', payee: 'Quezon Holdings, Inc.', tin: '012-345-678-009', quarter: 'Q3 2026', amountPaid: 87500, ewt: 875, atc: 'WI011', status: 'generated', lastUpdated: 'Aug 9, 2026', billNo: 'BN-2026-0010', dateGenerated: 'Aug 9, 2026', issue: '14 ATC line items — certificate may require additional pages' },
];

export const payees: Payee[] = [
  { id: 'P-001', name: 'Santos Trading Co., Inc.', tin: '123-456-789-000', address: 'Unit 5, Santos Bldg, Ayala Ave, Makati City', certificateCount: 12, lastCertificate: 'Q3 2026', currentQuarter: 'Q3 2026', outstanding: 1, status: 'active' },
  { id: 'P-002', name: 'ABC Cooperative', tin: '234-567-890-001', address: 'Brgy. San Antonio, Quezon City', certificateCount: 8, lastCertificate: 'Q3 2026', currentQuarter: 'Q3 2026', outstanding: 0, status: 'active' },
  { id: 'P-003', name: 'Maria Pharmacy', tin: '345-678-901-002', address: '123 Rizal St., Pasig City', certificateCount: 4, lastCertificate: 'Q3 2026', currentQuarter: 'Q3 2026', outstanding: 0, status: 'active' },
  { id: 'P-004', name: 'XYZ Services Corporation', tin: '456-789-012-003', address: '88 Bonifacio Global City, Taguig', certificateCount: 6, lastCertificate: 'Q3 2026', currentQuarter: 'Q3 2026', outstanding: 1, status: 'active' },
  { id: 'P-005', name: 'Dela Cruz Medical Supply', tin: '567-890-123-004', address: 'Phase 2, Caloocan Industrial Park', certificateCount: 9, lastCertificate: 'Q3 2026', currentQuarter: 'Q3 2026', outstanding: 0, status: 'active' },
  { id: 'P-006', name: 'Philippine Eagle Transport', tin: '678-901-234-005', address: 'NAIA Complex, Parañaque City', certificateCount: 3, lastCertificate: 'Q3 2026', currentQuarter: 'Q3 2026', outstanding: 1, status: 'active' },
  { id: 'P-007', name: 'Visayas Cargo & Freight', tin: '789-012-345-006', address: 'Pier 12, North Harbor, Manila', certificateCount: 5, lastCertificate: 'Q3 2026', currentQuarter: 'Q3 2026', outstanding: 0, status: 'active' },
  { id: 'P-008', name: 'Manila Textile Industries', tin: '890-123-456-007', address: 'Valenzuela City Export Zone', certificateCount: 2, lastCertificate: 'Q2 2026', currentQuarter: 'Q3 2026', outstanding: 0, status: 'inactive' },
];

export const auditEvents: AuditEvent[] = [
  { id: 'A-001', timestamp: '2026-08-19 09:42', user: 'Maria Santos', action: 'Generated 24 certificates', record: 'Batch Q3 2026 — Aug 19', category: 'Certificate Generation', severity: 'info' },
  { id: 'A-002', timestamp: '2026-08-19 08:15', user: 'Maria Santos', action: 'Uploaded Excel workbook', record: 'transactions_Q3_2026.xlsx', category: 'Import', severity: 'info' },
  { id: 'A-003', timestamp: '2026-08-18 17:30', user: 'John Cruz', action: 'Marked as Forwarded', record: 'C-2307-2026Q3-005', category: 'Status Change', severity: 'info' },
  { id: 'A-004', timestamp: '2026-08-18 14:12', user: 'Maria Santos', action: 'Uploaded signed copy', record: 'C-2307-2026Q3-003', category: 'Document Upload', severity: 'info' },
  { id: 'A-005', timestamp: '2026-08-17 11:00', user: 'John Cruz', action: 'Edited EWT value', record: 'C-2307-2026Q3-004', category: 'Transaction Edit', severity: 'warning' },
  { id: 'A-006', timestamp: '2026-08-16 16:45', user: 'Administrator', action: 'Voided certificate', record: 'C-2307-2026Q3-008', category: 'Certificate Void', severity: 'critical' },
  { id: 'A-007', timestamp: '2026-08-15 10:05', user: 'Maria Santos', action: 'Generated certificates', record: 'Batch Q3 2026 — Aug 15', category: 'Certificate Generation', severity: 'info' },
];

export const attentionItems: AttentionItem[] = [
  { id: 'ATT-001', title: '4 transactions need review', description: '2 rows have mismatched EWT values. 2 rows have unrecognized TIN format.', cta: 'Review transactions', target: 'certificates', type: 'warning' },
  { id: 'ATT-002', title: '3 certificates missing signed copies', description: 'Certificates forwarded more than 14 days ago have not received signed copies.', cta: 'View certificates', target: 'certificates', type: 'info' },
  { id: 'ATT-003', title: 'Certificate requires review', description: 'Quezon Holdings, Inc. has 14 ATC line items. The certificate may require additional pages.', cta: 'Review certificate', target: 'certificates', type: 'warning' },
];

export const maskTin = (tin: string) => {
  const parts = tin.split('-');
  if (parts.length === 4) return `${parts[0]}-${parts[1]}-***-${parts[3]}`;
  return tin.replace(/\d(?=\d{4})/g, '*');
};

export const formatCurrency = (amount: number) =>
  `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
