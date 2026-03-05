import React, { useState, useMemo } from 'react';
import { Search, Plus, AlertCircle } from 'lucide-react';
import { deviations } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';

const Deviations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const stages = ['draft', 'investigation', 'review', 'implementation', 'closed'];
  const severities = ['Critical', 'High', 'Medium', 'Low'];

  const filteredDeviations = useMemo(() => {
    return deviations.filter((dev) => {
      const matchesSearch =
        String(dev.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStage = stageFilter === 'all' || dev.stage === stageFilter;
      const matchesSeverity = severityFilter === 'all' || dev.severity === severityFilter;
      return matchesSearch && matchesStage && matchesSeverity;
    });
  }, [searchTerm, stageFilter, severityFilter]);

  const stats = {
    open: deviations.filter((d) => d.stage !== 'closed').length,
    underInvestigation: deviations.filter((d) => d.stage === 'investigation').length,
    critical: deviations.filter((d) => d.severity === 'Critical').length,
    closedThisMonth: deviations.filter((d) => {
      if (d.stage !== 'closed') return false;
      const closedDate = new Date(d.closedDate);
      const now = new Date();
      return (
        closedDate.getMonth() === now.getMonth() &&
        closedDate.getFullYear() === now.getFullYear()
      );
    }).length,
  };

  const isCritical = (severity) => severity === 'Critical';

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eqms-text mb-2">Deviations</h1>
          <p className="text-eqms-text-secondary">Track and manage process deviations</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2">Open</p>
            <p className="text-3xl font-bold text-eqms-text">{stats.open}</p>
          </div>
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2">Under Investigation</p>
            <p className="text-3xl font-bold text-eqms-text">{stats.underInvestigation}</p>
          </div>
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500" />
              Critical
            </p>
            <p className="text-3xl font-bold text-red-500">{stats.critical}</p>
          </div>
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2">Closed This Month</p>
            <p className="text-3xl font-bold text-eqms-text">{stats.closedThisMonth}</p>
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
                placeholder="Search deviation ID or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-eqms-dark border border-eqms-border rounded text-eqms-text placeholder-eqms-text-secondary focus:outline-none focus:border-eqms-accent"
              />
            </div>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="px-4 py-2 bg-eqms-dark border border-eqms-border rounded text-eqms-text focus:outline-none focus:border-eqms-accent"
            >
              <option value="all">All Stages</option>
              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage.charAt(0).toUpperCase() + stage.slice(1)}
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
              Report Deviation
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-eqms-card border border-eqms-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-eqms-border bg-eqms-dark/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Deviation ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Stage
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Severity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Assignee
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDeviations.map((dev) => (
                  <tr
                    key={dev.id}
                    className={`border-b border-eqms-border hover:bg-eqms-dark/50 transition ${
                      isCritical(dev.severity) ? 'border-l-4 border-l-red-500' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-eqms-accent">
                      {dev.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-eqms-text">{dev.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge
                        status={dev.stage}
                        label={dev.stage.charAt(0).toUpperCase() + dev.stage.slice(1)}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {isCritical(dev.severity) && (
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                        )}
                        <StatusBadge
                          status={dev.severity.toLowerCase()}
                          label={dev.severity}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-eqms-text-secondary">
                      {dev.department}
                    </td>
                    <td className="px-6 py-4 text-sm text-eqms-text">{dev.assignee}</td>
                    <td className="px-6 py-4 text-sm text-eqms-text-secondary">
                      {new Date(dev.dueDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredDeviations.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-eqms-text-secondary">
                No deviations found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-eqms-text-secondary">
          Showing {filteredDeviations.length} of {deviations.length} deviations
        </div>
      </div>
    </div>
  );
};

export default Deviations;
