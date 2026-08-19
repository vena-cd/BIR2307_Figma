import { useState } from 'react';
import { ClipboardList, Settings, Users, Shield, HardDrive, ChevronRight, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { auditEvents } from '../data/mock';
import type { AuditEvent } from '../types';

type Section = 'audit' | 'settings' | 'users' | 'security' | 'backup';

const sections: { key: Section; label: string; icon: React.ElementType; description: string }[] = [
  { key: 'audit', label: 'Audit Log', icon: ClipboardList, description: 'Complete event history' },
  { key: 'settings', label: 'Settings', icon: Settings, description: 'Organization & preferences' },
  { key: 'users', label: 'Users & Roles', icon: Users, description: 'Manage team access' },
  { key: 'security', label: 'Security', icon: Shield, description: 'Authentication & sessions' },
  { key: 'backup', label: 'Backup', icon: HardDrive, description: 'Data protection status' },
];

const severityIcon: Record<AuditEvent['severity'], React.ElementType> = {
  info: Info,
  warning: AlertTriangle,
  critical: AlertCircle,
};
const severityColor: Record<AuditEvent['severity'], string> = {
  info: 'text-blue-500 bg-blue-50',
  warning: 'text-amber-500 bg-amber-50',
  critical: 'text-red-500 bg-red-50',
};

function AuditLog() {
  const [filter, setFilter] = useState<'all' | AuditEvent['severity']>('all');

  const filtered = auditEvents.filter((e) => filter === 'all' || e.severity === filter);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {(['all', 'info', 'warning', 'critical'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`h-7 px-3 text-xs font-medium rounded-md transition-colors capitalize ${
              filter === f ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f === 'all' ? 'All Events' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm border-collapse min-w-[520px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Event</th>
              <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">User</th>
              <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Record</th>
              <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">Category</th>
              <th className="text-center px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Severity</th>
              <th className="text-right px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((event) => {
              const Icon = severityIcon[event.severity];
              return (
                <tr key={event.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <span className="text-slate-800 text-sm">{event.action}</span>
                  </td>
                  <td className="px-3 py-3 hidden sm:table-cell">
                    <span className="text-slate-600 text-xs">{event.user}</span>
                  </td>
                  <td className="px-3 py-3 hidden md:table-cell">
                    <span className="text-slate-500 tabular text-xs">{event.record}</span>
                  </td>
                  <td className="px-3 py-3 hidden lg:table-cell">
                    <span className="text-slate-500 text-xs">{event.category}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${severityColor[event.severity]}`}>
                      <Icon size={12} />
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span className="tabular text-xs text-slate-400">{event.timestamp}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="space-y-4">
      {[
        { label: 'Organization', fields: [{ k: 'Organization Name', v: 'Acme Corporation Philippines' }, { k: 'BIR RDO', v: '44 — Taguig-Pateros' }] },
        { label: 'Payor Information', fields: [{ k: 'TIN', v: '123-456-789-000' }, { k: 'Registered Address', v: 'Unit 5, Santos Bldg, Ayala Ave, Makati City' }, { k: 'Signatory', v: 'Maria Santos — Finance Officer' }] },
        { label: 'Certificate Preferences', fields: [{ k: 'Default Quarter', v: 'Current calendar quarter' }, { k: 'PDF Template', v: 'Official BIR Form 2307 (Rev. 2018)' }] },
      ].map((section) => (
        <div key={section.label} className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-display font-semibold text-slate-800">{section.label}</h3>
            <button className="text-xs text-brand hover:underline">Edit</button>
          </div>
          <div className="space-y-2">
            {section.fields.map(({ k, v }) => (
              <div key={k} className="flex items-start gap-3">
                <span className="text-xs text-slate-400 w-36 flex-shrink-0 pt-0.5">{k}</span>
                <span className="text-xs text-slate-700">{v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function UsersPanel() {
  const users = [
    { name: 'Maria Santos', email: 'maria@acme.ph', role: 'Finance Officer', lastActive: 'Today', roleColor: 'text-violet-700 bg-violet-50 border-violet-100' },
    { name: 'John Cruz', email: 'john@acme.ph', role: 'Preparer', lastActive: 'Yesterday', roleColor: 'text-blue-700 bg-blue-50 border-blue-100' },
    { name: 'Administrator', email: 'admin@acme.ph', role: 'Administrator', lastActive: 'Aug 16', roleColor: 'text-slate-700 bg-slate-100 border-slate-200' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
            <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Role</th>
            <th className="text-left px-3 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Last Active</th>
            <th className="w-16" />
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3">
                <p className="font-medium text-slate-800">{u.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{u.email}</p>
              </td>
              <td className="px-3 py-3 hidden sm:table-cell">
                <span className={`text-xs px-2 py-0.5 rounded border font-medium ${u.roleColor}`}>{u.role}</span>
              </td>
              <td className="px-3 py-3 hidden md:table-cell">
                <span className="text-xs text-slate-500">{u.lastActive}</span>
              </td>
              <td className="px-3 py-3">
                <button className="text-xs text-slate-400 hover:text-slate-700 transition-colors">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BackupPanel() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
            <HardDrive size={15} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">Backup Status</p>
            <p className="text-xs text-emerald-600 font-medium">Protected</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Last Backup', value: 'Today, 02:00 AM' },
            { label: 'Next Backup', value: 'Tomorrow, 02:00 AM' },
            { label: 'Backup Size', value: '14.2 MB' },
            { label: 'Retention', value: '90 days' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider">{label}</p>
              <p className="text-sm text-slate-700 mt-0.5">{value}</p>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full h-8 text-xs text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
          Download backup
        </button>
      </div>
    </div>
  );
}

export default function More() {
  const [activeSection, setActiveSection] = useState<Section>('audit');

  return (
    <div className="flex h-full overflow-hidden">
      {/* Side nav */}
      <div className="w-48 flex-shrink-0 border-r border-slate-200 bg-white py-3 overflow-y-auto hidden sm:block">
        {sections.map(({ key, label, icon: Icon, description }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
              activeSection === key ? 'bg-brand-50 border-r-2 border-brand text-brand' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Icon size={15} className="flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Mobile tab bar */}
      <div className="flex sm:hidden border-b border-slate-200 bg-white overflow-x-auto flex-shrink-0 absolute top-14 left-0 right-0 z-10">
        {sections.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`flex-shrink-0 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
              activeSection === key ? 'border-brand text-brand' : 'border-transparent text-slate-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 sm:pt-6 pt-14">
        <div className="max-w-4xl">
          <h1 className="text-lg font-display font-semibold text-slate-900 mb-1">
            {sections.find((s) => s.key === activeSection)?.label}
          </h1>
          <p className="text-xs text-slate-500 mb-4">
            {sections.find((s) => s.key === activeSection)?.description}
          </p>

          {activeSection === 'audit' && <AuditLog />}
          {activeSection === 'settings' && <SettingsPanel />}
          {activeSection === 'users' && <UsersPanel />}
          {activeSection === 'security' && (
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-slate-600">Security settings — session management, 2FA, and password policies.</p>
            </div>
          )}
          {activeSection === 'backup' && <BackupPanel />}
        </div>
      </div>
    </div>
  );
}
