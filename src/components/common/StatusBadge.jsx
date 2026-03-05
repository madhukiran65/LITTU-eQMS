const colors = {
  draft: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
  in_review: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  approved: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  effective: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  training_period: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  superseded: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  obsolete: 'bg-red-500/15 text-red-400 border-red-500/30',
  archived: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
  active: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  open: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  closed: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
  completed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  in_progress: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  scheduled: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  planning: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  containment: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  root_cause_analysis: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  root_cause: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  corrective_action: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  effectiveness_check: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  closure: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  investigation: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  resolution: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  impact_assessment: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  approval: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  implementation: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  review: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  critical: 'bg-red-500/15 text-red-400 border-red-500/30',
  high: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  medium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  low: 'bg-green-500/15 text-green-400 border-green-500/30',
  major: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  minor: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  conditional: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  under_review: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  mitigated: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  maintenance: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  overdue: 'bg-red-500/15 text-red-400 border-red-500/30',
  due_soon: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  current: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
};

export default function StatusBadge({ status, className = '' }) {
  const label = (status || 'unknown').replace(/_/g, ' ');
  const color = colors[status] || 'bg-gray-500/15 text-gray-400 border-gray-500/30';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${color} ${className}`}>
      {label}
    </span>
  );
}
