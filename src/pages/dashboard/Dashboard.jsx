import { useState } from 'react';
import {
  FileText,
  AlertCircle,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Calendar,
  Activity,
  BarChart3,
  Target,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dashboardKPIs, qualityTrend } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';

export default function Dashboard() {
  const [selectedModule, setSelectedModule] = useState(null);

  const kpiCards = [
    {
      id: 1,
      label: 'Total Documents',
      value: dashboardKPIs.totalDocuments,
      icon: FileText,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      id: 2,
      label: 'Open CAPAs',
      value: dashboardKPIs.openCAPAs,
      icon: AlertCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
    },
    {
      id: 3,
      label: 'Quality Score',
      value: `${dashboardKPIs.qualityScore}%`,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      id: 4,
      label: 'Training Compliance',
      value: `${dashboardKPIs.trainingCompliance}%`,
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      id: 5,
      label: 'Open Deviations',
      value: dashboardKPIs.openDeviations,
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      id: 6,
      label: 'Overdue Items',
      value: dashboardKPIs.overdueItems,
      icon: CheckCircle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
    },
  ];

  const modules = [
    { name: 'Document Management', progress: 85, status: 'active', docs: 234 },
    { name: 'Quality Management', progress: 72, status: 'active', docs: 156 },
    { name: 'Change Control', progress: 68, status: 'active', docs: 89 },
    { name: 'Training & Competency', progress: 91, status: 'active', docs: 203 },
    { name: 'Risk Management', progress: 78, status: 'active', docs: 112 },
    { name: 'Supplier Management', progress: 65, status: 'review', docs: 45 },
  ];

  const recentActivity = [
    { id: 1, action: 'Document Approved', item: 'SOP-2026-001', user: 'Dr. Sarah Chen', time: '2 hours ago', status: 'success' },
    { id: 2, action: 'CAPA Created', item: 'CAPA-2026-0001', user: 'James Miller', time: '4 hours ago', status: 'warning' },
    { id: 3, action: 'Deviation Logged', item: 'DEV-2026-0003', user: 'Michael Park', time: '6 hours ago', status: 'error' },
    { id: 4, action: 'Training Completed', item: 'TRN-002 (21 CFR Part 11)', user: 'Emily Rodriguez', time: '8 hours ago', status: 'success' },
    { id: 5, action: 'Audit Started', item: 'AUD-2026-001', user: 'Dr. Sarah Chen', time: '1 day ago', status: 'info' },
  ];

  const upcomingDeadlines = [
    { id: 1, item: 'CAPA-0004 Effectiveness Check', dueDate: '2026-03-05', days: 5, priority: 'high' },
    { id: 2, item: 'FDA 510(k) Response Deadline', dueDate: '2026-03-14', days: 14, priority: 'high' },
    { id: 3, item: 'Supplier Audit — ABC Reagents', dueDate: '2026-03-20', days: 20, priority: 'medium' },
    { id: 4, item: 'Q1 Management Review', dueDate: '2026-03-28', days: 28, priority: 'medium' },
  ];

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eqms-text mb-2">Dashboard</h1>
          <p className="text-eqms-text-secondary">Welcome back! Here's your compliance overview.</p>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 mb-8">
          {kpiCards.map((kpi) => {
            const IconComponent = kpi.icon;
            return (
              <div key={kpi.id} className="bg-eqms-card rounded-lg p-6 border border-eqms-border hover:border-eqms-border-hover transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${kpi.bgColor} rounded-lg p-3`}>
                    <IconComponent className={`${kpi.color} w-6 h-6`} />
                  </div>
                </div>
                <p className="text-eqms-text-secondary text-sm mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-eqms-text">{kpi.value}</p>
              </div>
            );
          })}
        </div>

        {/* Quality Trend Chart */}
        <div className="bg-eqms-card rounded-lg p-6 border border-eqms-border mb-8">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-eqms-accent" />
            <h2 className="text-lg font-semibold text-eqms-text">Quality Trend</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={qualityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
              <XAxis dataKey="month" stroke="#8b8b9a" />
              <YAxis stroke="#8b8b9a" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a2e',
                  border: '1px solid #2a2a3e',
                  borderRadius: '8px',
                  color: '#f0f0f0',
                }}
              />
              <Legend wrapperStyle={{ color: '#8b8b9a' }} />
              <Line type="monotone" dataKey="qualityScore" stroke="#3b82f6" name="Quality Score %" />
              <Line type="monotone" dataKey="capas" stroke="#ef4444" name="CAPAs" />
              <Line type="monotone" dataKey="deviations" stroke="#eab308" name="Deviations" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Activity Feed */}
          <div className="lg:col-span-2 bg-eqms-card rounded-lg p-6 border border-eqms-border">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-eqms-accent" />
              <h2 className="text-lg font-semibold text-eqms-text">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-eqms-border last:border-0">
                  <div className="w-10 h-10 rounded-full bg-eqms-dark flex items-center justify-center flex-shrink-0">
                    {item.status === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
                    {item.status === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-400" />}
                    {item.status === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
                    {item.status === 'info' && <Clock className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-eqms-text font-medium">{item.action}</p>
                    <p className="text-eqms-text-secondary text-sm">{item.item}</p>
                    <p className="text-eqms-text-secondary text-xs mt-1">
                      {item.user} • {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-eqms-card rounded-lg p-6 border border-eqms-border">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-eqms-accent" />
              <h2 className="text-lg font-semibold text-eqms-text">Deadlines</h2>
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="p-3 bg-eqms-dark rounded border border-eqms-border">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-eqms-text text-sm font-medium">{deadline.item}</p>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        deadline.priority === 'high'
                          ? 'bg-red-500/20 text-red-400'
                          : deadline.priority === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {deadline.days} days
                    </span>
                  </div>
                  <p className="text-eqms-text-secondary text-xs">{deadline.dueDate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Module Status Grid */}
        <div className="bg-eqms-card rounded-lg p-6 border border-eqms-border">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-eqms-accent" />
            <h2 className="text-lg font-semibold text-eqms-text">Module Status</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, idx) => (
              <div
                key={idx}
                className="p-4 bg-eqms-dark rounded-lg border border-eqms-border cursor-pointer hover:border-eqms-accent transition-colors"
                onClick={() => setSelectedModule(selectedModule === idx ? null : idx)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-eqms-text font-medium">{module.name}</h3>
                  <span className="text-eqms-text-secondary text-xs">{module.docs} docs</span>
                </div>
                <div className="w-full bg-eqms-border rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
                <p className="text-eqms-text-secondary text-xs mt-2">{module.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
