import React, { useState, useMemo } from 'react';
import { Search, Plus, CheckCircle } from 'lucide-react';
import { changeControls } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';

const ChangeControls = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const stages = [
    'request',
    'assessment',
    'approval',
    'implementation',
    'verification',
    'closure',
  ];

  const priorities = ['Critical', 'High', 'Medium', 'Low'];

  const filteredChanges = useMemo(() => {
    return changeControls.filter((cc) => {
      const matchesSearch =
        String(cc.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
        cc.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStage = stageFilter === 'all' || cc.stage === stageFilter;
      const matchesPriority = priorityFilter === 'all' || cc.priority === priorityFilter;
      return matchesSearch && matchesStage && matchesPriority;
    });
  }, [searchTerm, stageFilter, priorityFilter]);

  const stats = {
    open: changeControls.filter((cc) => cc.stage !== 'closure').length,
    awaitingApproval: changeControls.filter((cc) => cc.stage === 'approval').length,
    inImplementation: changeControls.filter((cc) => cc.stage === 'implementation').length,
    completed: changeControls.filter((cc) => cc.stage === 'closure').length,
  };

  const workflowStages = [
    'request',
    'assessment',
    'approval',
    'implementation',
    'verification',
    'closure',
  ];

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eqms-text mb-2">Change Control</h1>
          <p className="text-eqms-text-secondary">Manage and track change requests</p>
        </div>

        {/* Workflow Visual */}
        <div className="mb-8 bg-eqms-card border border-eqms-border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-eqms-text mb-4">Change Control Workflow</h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {workflowStages.map((stage, index) => (
              <React.Fragment key={stage}>
                <div className="flex flex-col items-center min-w-max">
                  <div className="w-8 h-8 rounded-full bg-eqms-accent flex items-center justify-center text-xs font-bold text-eqms-dark">
                    {index + 1}
                  </div>
                  <span className="text-xs text-eqms-text-secondary mt-2 max-w-[70px] text-center">
                    {stage.charAt(0).toUpperCase() + stage.slice(1)}
                  </span>
                </div>
                {index < workflowStages.length - 1 && (
                  <div className="h-0.5 bg-eqms-border flex-1 mb-4 min-w-[20px]" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2">Open Changes</p>
            <p className="text-3xl font-bold text-eqms-text">{stats.open}</p>
          </div>
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2">Awaiting Approval</p>
            <p className="text-3xl font-bold text-eqms-text">{stats.awaitingApproval}</p>
          </div>
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2">In Implementation</p>
            <p className="text-3xl font-bold text-eqms-text">{stats.inImplementation}</p>
          </div>
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
            <p className="text-eqms-text-secondary text-sm mb-2 flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              Completed
            </p>
            <p className="text-3xl font-bold text-green-500">{stats.completed}</p>
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
                placeholder="Search change control ID..."
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
              Initiate Change
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
                    CC ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Stage
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Requestor
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-eqms-text">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredChanges.map((cc) => (
                  <tr
                    key={cc.id}
                    className="border-b border-eqms-border hover:bg-eqms-dark/50 transition"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-eqms-accent">
                      {cc.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-eqms-text">{cc.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge
                        status={cc.stage}
                        label={cc.stage.charAt(0).toUpperCase() + cc.stage.slice(1)}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-eqms-text-secondary">
                      {cc.type}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge
                        status={cc.priority.toLowerCase()}
                        label={cc.priority}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-eqms-text">{cc.requestor}</td>
                    <td className="px-6 py-4 text-sm text-eqms-text-secondary">
                      {new Date(cc.dueDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredChanges.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-eqms-text-secondary">
                No change controls found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-eqms-text-secondary">
          Showing {filteredChanges.length} of {changeControls.length} change controls
        </div>
      </div>
    </div>
  );
};

export default ChangeControls;
