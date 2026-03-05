import React, { useState } from 'react';
import { audits } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';
import { CheckCircle, Calendar, AlertCircle, Clipboard, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Audits() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2)); // March 2026
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate statistics
  const scheduled = audits.filter(a => a.status === 'scheduled').length;
  const inProgress = audits.filter(a => a.status === 'in_progress').length;
  const completed = audits.filter(a => a.status === 'completed').length;
  const findingsOpen = audits.reduce((acc, audit) =>
    acc + (typeof audit.findings === 'number' ? audit.findings : (Array.isArray(audit.findings) ? audit.findings.filter(f => f.status === 'open').length : 0)), 0
  );

  // Filter audits
  const filteredAudits = audits.filter(audit =>
    audit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (audit.auditLead || audit.lead || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calendar logic
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Get audits for a specific day
  const getAuditsForDay = (day) => {
    if (!day) return [];
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return audits.filter(audit => (audit.scheduledDate || audit.startDate || '').startsWith(dateStr));
  };

  const getTypeColor = (type) => {
    const colors = {
      internal: 'bg-blue-900 text-blue-200 border-blue-700',
      external: 'bg-orange-900 text-orange-200 border-orange-700',
      management: 'bg-purple-900 text-purple-200 border-purple-700',
      compliance: 'bg-red-900 text-red-200 border-red-700'
    };
    return colors[type] || colors.internal;
  };

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-eqms-text">Audit Management</h1>
        <button className="flex items-center gap-2 bg-eqms-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
          <Plus size={20} />
          Schedule Audit
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">Scheduled</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{scheduled}</p>
            </div>
            <Calendar size={40} className="text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{inProgress}</p>
            </div>
            <Clipboard size={40} className="text-yellow-500 opacity-20" />
          </div>
        </div>

        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{completed}</p>
            </div>
            <CheckCircle size={40} className="text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">Open Findings</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{findingsOpen}</p>
            </div>
            <AlertCircle size={40} className="text-red-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-eqms-text">{monthName}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-1 hover:bg-eqms-dark rounded transition"
                >
                  <ChevronLeft size={20} className="text-eqms-text-secondary" />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-1 hover:bg-eqms-dark rounded transition"
                >
                  <ChevronRight size={20} className="text-eqms-text-secondary" />
                </button>
              </div>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-eqms-text-secondary py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, idx) => {
                const dayAudits = day ? getAuditsForDay(day) : [];
                return (
                  <div
                    key={idx}
                    className={`aspect-square flex flex-col items-center justify-center rounded border text-sm transition ${
                      day
                        ? 'bg-eqms-dark border-eqms-border hover:border-eqms-accent cursor-pointer'
                        : 'bg-transparent border-transparent'
                    }`}
                  >
                    {day && (
                      <>
                        <span className="font-semibold text-eqms-text">{day}</span>
                        {dayAudits.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {dayAudits.slice(0, 2).map((_, i) => (
                              <div key={i} className="w-1.5 h-1.5 bg-eqms-accent rounded-full" />
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Audits List */}
        <div className="lg:col-span-2 space-y-4">
          <input
            type="text"
            placeholder="Search audits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-eqms-card border border-eqms-border rounded-lg px-4 py-2 text-eqms-text placeholder-eqms-text-secondary focus:outline-none focus:border-eqms-accent"
          />

          {filteredAudits.map(audit => (
            <div key={audit.id} className="bg-eqms-card border border-eqms-border rounded-lg p-6 hover:border-eqms-accent transition">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-eqms-text">{audit.title}</h3>
                  <p className="text-sm text-eqms-text-secondary mt-1">Lead: {audit.auditLead || audit.lead}</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className={`text-xs font-semibold px-3 py-1 rounded border ${getTypeColor(audit.type.toLowerCase())}`}>
                    {audit.type.charAt(0).toUpperCase() + audit.type.slice(1).toLowerCase()}
                  </span>
                  <StatusBadge status={audit.status} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-eqms-text-secondary mb-1">Scheduled</p>
                  <p className="text-sm font-medium text-eqms-text">{audit.scheduledDate || audit.startDate}</p>
                </div>
                {(audit.completedDate || audit.endDate) && (
                  <div>
                    <p className="text-xs text-eqms-text-secondary mb-1">End Date</p>
                    <p className="text-sm font-medium text-eqms-text">{audit.completedDate || audit.endDate}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4 border-t border-eqms-border text-sm">
                <div>
                  <span className="text-eqms-text-secondary">Findings:</span>
                  <span className="ml-2 font-medium text-eqms-text">{typeof audit.findings === 'number' ? audit.findings : (audit.findings?.length || 0)}</span>
                </div>
                <div>
                  <span className="text-eqms-text-secondary">Observations:</span>
                  <span className="ml-2 font-medium text-eqms-text">{typeof audit.observations === 'number' ? audit.observations : (audit.observations?.length || 0)}</span>
                </div>
              </div>

              <button className="w-full mt-4 border border-eqms-accent hover:bg-eqms-accent/10 text-eqms-accent py-2 rounded-lg transition text-sm font-medium">
                View Details
              </button>
            </div>
          ))}

          {filteredAudits.length === 0 && (
            <div className="text-center py-12">
              <p className="text-eqms-text-secondary">No audits found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
