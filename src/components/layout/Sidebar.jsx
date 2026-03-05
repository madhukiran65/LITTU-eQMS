import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, AlertTriangle, AlertOctagon, RefreshCw,
  MessageSquareWarning, GraduationCap, ClipboardCheck, Truck, Shield,
  Wrench, Factory, BarChart3, Settings, ChevronDown, ChevronRight,
  BookOpen, FileCheck, Mail, Layers, Users, Beaker
} from 'lucide-react';
import { useState } from 'react';

const modules = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  {
    label: 'Document Control', icon: FileText, children: [
      { path: '/documents', label: 'All Documents' },
      { path: '/documents/dmr', label: 'Device Master Records' },
      { path: '/documents/correspondence', label: 'Correspondence' },
      { path: '/documents/validation', label: 'Validation Docs' },
      { path: '/documents/management', label: 'Reviews & Copies' },
      { path: '/documents/labeling', label: 'Labeling' },
    ]
  },
  {
    label: 'Quality Events', icon: AlertTriangle, children: [
      { path: '/capa', label: 'CAPA' },
      { path: '/deviations', label: 'Deviations' },
      { path: '/change-controls', label: 'Change Controls' },
      { path: '/complaints', label: 'Complaints & PMS' },
    ]
  },
  { path: '/training', label: 'Training', icon: GraduationCap },
  { path: '/audits', label: 'Audit Management', icon: ClipboardCheck },
  { path: '/suppliers', label: 'Supplier Quality', icon: Truck },
  { path: '/risk', label: 'Risk Management', icon: Shield },
  { path: '/equipment', label: 'Equipment', icon: Wrench },
  { path: '/production', label: 'Production & QA', icon: Factory },
  { path: '/management-review', label: 'Management Review', icon: BarChart3 },
  { path: '/admin', label: 'Administration', icon: Settings },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState({});
  const location = useLocation();

  const toggle = (label) => setExpanded(p => ({ ...p, [label]: !p[label] }));

  const linkClass = (path) => {
    const active = location.pathname === path || location.pathname.startsWith(path + '/');
    return `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
      active ? 'bg-eqms-accent/15 text-eqms-accent font-medium' : 'text-eqms-text-dim hover:bg-eqms-card-hover hover:text-eqms-text'
    }`;
  };

  return (
    <aside className="w-64 h-screen bg-eqms-darker border-r border-eqms-border flex flex-col fixed left-0 top-0 z-30">
      <div className="px-5 py-5 border-b border-eqms-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-eqms-accent to-eqms-purple flex items-center justify-center">
            <Beaker className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Arni eQMS</h1>
            <p className="text-[10px] text-eqms-text-muted uppercase tracking-widest">eQMS Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
        {modules.map((mod) => {
          if (mod.children) {
            const isOpen = expanded[mod.label] || mod.children.some(c => location.pathname.startsWith(c.path));
            const Icon = mod.icon;
            return (
              <div key={mod.label}>
                <button onClick={() => toggle(mod.label)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-eqms-text-dim hover:bg-eqms-card-hover hover:text-eqms-text w-full transition-all">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">{mod.label}</span>
                  {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
                {isOpen && (
                  <div className="ml-7 mt-0.5 space-y-0.5 border-l border-eqms-border pl-3">
                    {mod.children.map(child => (
                      <NavLink key={child.path} to={child.path} className={linkClass(child.path)}>
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          const Icon = mod.icon;
          return (
            <NavLink key={mod.path} to={mod.path} className={linkClass(mod.path)}>
              <Icon className="w-4 h-4 shrink-0" />
              {mod.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-4 py-3 border-t border-eqms-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-eqms-accent/20 flex items-center justify-center text-xs font-bold text-eqms-accent">MK</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-eqms-text truncate">MK Parvathaneni</p>
            <p className="text-[11px] text-eqms-text-muted">Quality Director</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
