import React, { useState, useMemo } from 'react';
import { Search, Plus, AlertCircle, TrendingUp } from 'lucide-react';
import { capas } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';

const Capa = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const phases = [
    'initiation',
    'containment',
    'root_cause_analysis',
    'corrective_action',
    'preventive_action',
    'effectiveness_check',
    'closure',
  ];

  const priorities = ['Critical', 'High', 'Medium', 'Low'];

  const filteredCAPAs = useMemo(() => {
    return capas.filter((capa) => {
      const matchesSearch =
        (capa.capa_id || String(capa.id)).toLowerCase().includes(searchTerm.toLowerCase()) ||
        capa.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPhase = phaseFilter === 'all' || capa.phase === phaseFilter;
      const matchesPriority = priorityFilter === 'all' || capa.priority.toLowerCase() === priorityFilter.toLowerCase();
      return matchesSearch && matchesPhase && matchesPriority;
    });
  }, [searchTerm, phaseFilter, priorityFilter]);

  const stats = {
    totalOpen: capas.filter((c) => c.phase !== 'closure').length,
    inInvestigation: capas.filter((c) => c.phase === 'root_cause_analysis').length,
    overdue: capas.filter((c) => new Date(c.dueDate) < new Date()).length,
    avgDaysToClose: Math.round(
      capas.reduce((sum, c) => sum + (c.daysToClose || 0), 0) / capas.length
    ),
  };

  const isOverdue = (dueDate) => new Date(dueDate) < new Date();

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eqms-text mb-2">CAPA Management</h1>
          <p className="text-eqms-text-secondary">Manage corrective and preventive actions</p>
        </div>

        {/* Phase Lifecycle Visual */}
        <div className="mb-8 bg-eqms-card border border-eqms-border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-eqms-text mb-4">CAPA Lifecycle</h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {phases.map((phase, index) => (
              <React.Fragment key={phase}>
                <div className="flex flex-col items-center min-w-max">
                  <div className="w-8 h-8 rounded-full bg-eqms-accent flex items-center justify-center text-xs font-bold text-eqms-dark">
                    {index + 1}
                  </div>
                  <span className="text-xs text-eqms-text-secondary mt-2 max-w-[80px] text-center">
                    {phase.replace(/_/g, ' ')}
                  </span>
                </div>
                {index < phases.length - 1 && (
                  <div className="h-0.5 bg-eqms-border flex-1 mb-4 min-w-[20px]" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2">Total Open</p>
            <p className="text-3xl font-bold text-eqms-text">{stats.totalOpen}</p>
          </div>
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2">In Investigation</p>
            <p className="text-3xl font-bold text-eqms-text">{stats.inInvestigation}</p>
          </div>
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500" />
              Overdue
            </p>
            <p className="text-3xl font-bold text-red-500">{stats.overdue}</p>
          </div>
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2 flex items-center gap-2">
              <TrendingUp size={16} className="text-eqms-accent" />
              Avg Days to Close
            </p>
            <p className="text-3xl font-bold text-eqms-text">{stats.avgDaysToClose}</p>
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
                placeholder="Search CAPA ID or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-eqms-dark border border-eqms-border rounded text-eqms-text placeholder-eqms-text-secondary focus:outline-none focus:border-eqms-accent"
              />
            </div>
            <select
              value={phaseFilter}
              onChange={(e) => setPhaseFilter(e.target.value)}
              className="px-4 py-2 bg-eqms-dark border border-eqms-border rounded text-eqms-text focus:outline-none focus:border-eqms-accent"
            >
              <option value="all">All Phases</option>
              {phases.map((phase) => (
                <option key={phase} value={phase}>
                  {phase.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 bg-eqms-dark border border-eqms-border rounded text-eqms-text focus:outline-none focus:border-eqms-accent"
            >
              <option value="all">All Priorities</option>
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <button className="px-4 py-2 bg-eqms-accent text-eqms-dark font-semibold rounded hover:bg-opacity-90 transition flex items-center justify-center gap-2">
              <Plus size={18} />
              New CAPA
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
                    CAPA ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Phase
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Source
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
                {filteredCAPAs.map((capa) => (
                  <tr
                    key={capa.id}
                    className={`border-b border-eqms-border hover:bg-eqms-dark/50 transition ${
                      isOverdue(capa.dueDate) ? 'border-l-4 border-l-red-500' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-eqms-accent">
                      {capa.capa_id || capa.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-eqms-text">{capa.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge
                        status={capa.phase}
                        label={capa.phase.replace(/_/g, ' ')}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge
                        status={capa.priority.toLowerCase()}
                        label={capa.priority}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-eqms-text-secondary">
                      {capa.source}
                    </td>
                    <td className="px-6 py-4 text-sm text-eqms-text">{capa.assignee}</td>
                    <td
                      className={`px-6 py-4 text-sm ${
                        isOverdue(capa.dueDate)
                          ? 'text-red-500 font-medium'
                          : 'text-eqms-text-secondary'
                      }`}
                    >
                      {new Date(capa.dueDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCAPAs.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-eqms-text-secondary">No CAPAs found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-eqms-text-secondary">
          Showing {filteredCAPAs.length} of {capas.length} CAPAs
        </div>
      </div>
    </div>
  );
};

export default Capa;
