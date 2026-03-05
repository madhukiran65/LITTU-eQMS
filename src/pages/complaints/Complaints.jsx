import React, { useState, useMemo } from 'react';
import { Search, Plus, AlertTriangle, Clock } from 'lucide-react';
import { complaints } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';

const Complaints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const statuses = ['open', 'investigating', 'resolved', 'closed'];
  const severities = ['Critical', 'High', 'Medium', 'Low'];

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesSearch =
        String(complaint.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
      const matchesSeverity =
        severityFilter === 'all' || complaint.severity === severityFilter;
      return matchesSearch && matchesStatus && matchesSeverity;
    });
  }, [searchTerm, statusFilter, severityFilter]);

  const stats = {
    open: complaints.filter((c) => c.status === 'open').length,
    underInvestigation: complaints.filter((c) => c.status === 'investigating').length,
    mdrDue: complaints.filter(
      (c) =>
        c.mdrRequired &&
        c.mdrDeadline &&
        new Date(c.mdrDeadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ).length,
    critical: complaints.filter((c) => c.severity === 'Critical').length,
  };

  const mdrAlertComplaints = complaints.filter(
    (c) =>
      c.mdrRequired &&
      c.mdrDeadline &&
      new Date(c.mdrDeadline) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  );

  const getDaysUntilDeadline = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getMDRBadgeText = (daysUntilDeadline) => {
    if (daysUntilDeadline <= 5) {
      return `MDR Due in ${Math.max(0, daysUntilDeadline)}d`;
    }
    return `MDR Due in ${daysUntilDeadline}d`;
  };

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eqms-text mb-2">Complaints & PMS</h1>
          <p className="text-eqms-text-secondary">Manage customer complaints and adverse events</p>
        </div>

        {/* MDR Alert Banner */}
        {mdrAlertComplaints.length > 0 && (
          <div className="mb-8 bg-red-900/20 border border-red-700 rounded-lg p-4 flex items-start gap-4">
            <AlertTriangle size={24} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-400 mb-1">
                FDA MDR Deadline Alert
              </h3>
              <p className="text-red-300 text-sm mb-3">
                {mdrAlertComplaints.length} complaint(s) require FDA MDR reporting within the next 3 days.
              </p>
              <div className="flex flex-wrap gap-2">
                {mdrAlertComplaints.map((c) => (
                  <span
                    key={c.id}
                    className="text-xs bg-red-800 text-red-100 px-2 py-1 rounded"
                  >
                    {c.id}: {getDaysUntilDeadline(c.mdrDeadline)}d remaining
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2">Open Complaints</p>
            <p className="text-3xl font-bold text-eqms-text">{stats.open}</p>
          </div>
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2">Under Investigation</p>
            <p className="text-3xl font-bold text-eqms-text">{stats.underInvestigation}</p>
          </div>
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2 flex items-center gap-2">
              <Clock size={16} className="text-orange-500" />
              MDR Reports Due
            </p>
            <p className="text-3xl font-bold text-orange-500">{stats.mdrDue}</p>
          </div>
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2 flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-500" />
              Critical
            </p>
            <p className="text-3xl font-bold text-red-500">{stats.critical}</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-eqms-card border border-eqms-border rounded-lg p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-eqms-text-secondary"
              />
              <input
                type="text"
                placeholder="Search complaint ID or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-eqms-dark border border-eqms-border rounded text-eqms-text placeholder-eqms-text-secondary focus:outline-none focus:border-eqms-accent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-eqms-dark border border-eqms-border rounded text-eqms-text focus:outline-none focus:border-eqms-accent"
            >
              <option value="all">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-4 py-2 bg-eqms-dark border border-eqms-border rounded text-eqms-text focus:outline-none focus:border-eqms-accent"
            >
              <option value="all">All Severities</option>
              {severities.map((severity) => (
                <option key={severity} value={severity}>
                  {severity}
                </option>
              ))}
            </select>
            <button className="px-4 py-2 bg-eqms-accent text-eqms-dark font-semibold rounded hover:bg-opacity-90 transition flex items-center justify-center gap-2">
              <Plus size={18} />
              Log Complaint
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-eqms-card border border-eqms-border rounded-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-eqms-border bg-eqms-dark/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Complaint ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Severity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Source
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    MDR Required
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint) => {
                  const daysUntilMDR = complaint.mdrRequired
                    ? getDaysUntilDeadline(complaint.mdrDeadline)
                    : null;
                  const isMDRCritical = complaint.mdrRequired && daysUntilMDR <= 5;

                  return (
                    <tr
                      key={complaint.id}
                      className="border-b border-eqms-border hover:bg-eqms-dark/50 transition"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-eqms-accent">
                        {complaint.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-eqms-text">{complaint.title}</td>
                      <td className="px-6 py-4 text-sm">
                        <StatusBadge
                          status={complaint.status}
                          label={complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <StatusBadge
                          status={complaint.severity.toLowerCase()}
                          label={complaint.severity}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-eqms-text-secondary">
                        {complaint.source}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {complaint.mdrRequired ? (
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-medium ${
                              isMDRCritical
                                ? 'bg-red-900/40 text-red-300 border border-red-700'
                                : 'bg-orange-900/40 text-orange-300 border border-orange-700'
                            }`}
                          >
                            <AlertTriangle size={14} />
                            {getMDRBadgeText(daysUntilMDR)}
                          </div>
                        ) : (
                          <span className="text-eqms-text-secondary">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-eqms-text-secondary">
                        {new Date(complaint.createdDate).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredComplaints.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-eqms-text-secondary">
                No complaints found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* FDA MDR Section */}
        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-eqms-text mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-orange-500" />
            FDA MDR Reporting Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-eqms-dark rounded p-4 border border-eqms-border">
              <p className="text-sm text-eqms-text-secondary mb-2">5-Day Deadline</p>
              <p className="text-2xl font-bold text-red-500">
                {complaints.filter(
                  (c) =>
                    c.mdrRequired &&
                    getDaysUntilDeadline(c.mdrDeadline) <= 5 &&
                    getDaysUntilDeadline(c.mdrDeadline) > 0
                ).length}
              </p>
              <p className="text-xs text-eqms-text-secondary mt-2">
                Complaints requiring urgent FDA notification
              </p>
            </div>
            <div className="bg-eqms-dark rounded p-4 border border-eqms-border">
              <p className="text-sm text-eqms-text-secondary mb-2">30-Day Deadline</p>
              <p className="text-2xl font-bold text-orange-500">
                {complaints.filter(
                  (c) =>
                    c.mdrRequired &&
                    getDaysUntilDeadline(c.mdrDeadline) > 5 &&
                    getDaysUntilDeadline(c.mdrDeadline) <= 30
                ).length}
              </p>
              <p className="text-xs text-eqms-text-secondary mt-2">
                Complaints pending 30-day notification
              </p>
            </div>
          </div>

          <div className="border-t border-eqms-border pt-6">
            <h3 className="text-sm font-semibold text-eqms-text mb-4">
              Reportable Complaints (MDR Required)
            </h3>
            {complaints.filter((c) => c.mdrRequired).length > 0 ? (
              <div className="space-y-3">
                {complaints
                  .filter((c) => c.mdrRequired)
                  .map((complaint) => {
                    const daysUntilMDR = getDaysUntilDeadline(complaint.mdrDeadline);
                    const isDue = daysUntilMDR <= 5;

                    return (
                      <div
                        key={complaint.id}
                        className={`p-4 rounded border ${
                          isDue
                            ? 'bg-red-900/20 border-red-700'
                            : 'bg-eqms-dark border-eqms-border'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-eqms-text">{complaint.id}: {complaint.title}</p>
                            <p className="text-sm text-eqms-text-secondary mt-1">
                              Severity: {complaint.severity} | Source: {complaint.source}
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-semibold ${
                                isDue ? 'text-red-400' : 'text-eqms-accent'
                              }`}
                            >
                              {daysUntilMDR}d remaining
                            </p>
                            <p className="text-xs text-eqms-text-secondary mt-1">
                              Due: {new Date(complaint.mdrDeadline).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-eqms-text-secondary text-sm">
                No complaints currently require MDR reporting.
              </p>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-eqms-text-secondary">
          Showing {filteredComplaints.length} of {complaints.length} complaints
        </div>
      </div>
    </div>
  );
};

export default Complaints;
