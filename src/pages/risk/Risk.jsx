import React, { useState } from 'react';
import { riskAssessments } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';
import { AlertTriangle, TrendingDown, CheckCircle, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function Risk() {
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Calculate statistics
  const totalRisks = riskAssessments.length;
  const openRisks = riskAssessments.filter(r => r.status === 'open').length;
  const mitigatedRisks = riskAssessments.filter(r => r.status === 'mitigated').length;
  const highRPNItems = riskAssessments.filter(r => r.rpn >= 150).length;

  // Get unique categories
  const categories = ['all', ...new Set(riskAssessments.map(r => r.category))];

  // Filter risks
  const filteredRisks = riskAssessments.filter(risk => {
    const matchesSearch = risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         String(risk.id).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || risk.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get risks for risk matrix
  const getRisksForCell = (probability, severity) => {
    return riskAssessments.filter(r => r.probability === probability && r.severity === severity);
  };

  // Color mapping for risk matrix
  const getCellColor = (probability, severity) => {
    const rpn = probability * severity;
    if (probability >= 4 && severity >= 4) return 'bg-red-900/40 border-red-700';
    if (rpn >= 12 || probability >= 4 || severity >= 4) return 'bg-orange-900/40 border-orange-700';
    if (rpn >= 6) return 'bg-yellow-900/40 border-yellow-700';
    return 'bg-green-900/40 border-green-700';
  };

  const getCellTextColor = (probability, severity) => {
    const rpn = probability * severity;
    if (probability >= 4 && severity >= 4) return 'text-red-400';
    if (rpn >= 12 || probability >= 4 || severity >= 4) return 'text-orange-400';
    if (rpn >= 6) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getSeverityColor = (severity) => {
    if (severity === 1) return 'bg-green-900 text-green-200 border-green-700';
    if (severity === 2) return 'bg-blue-900 text-blue-200 border-blue-700';
    if (severity === 3) return 'bg-yellow-900 text-yellow-200 border-yellow-700';
    if (severity === 4) return 'bg-orange-900 text-orange-200 border-orange-700';
    return 'bg-red-900 text-red-200 border-red-700';
  };

  const getProbabilityColor = (probability) => {
    if (probability === 1) return 'bg-green-900 text-green-200 border-green-700';
    if (probability === 2) return 'bg-blue-900 text-blue-200 border-blue-700';
    if (probability === 3) return 'bg-yellow-900 text-yellow-200 border-yellow-700';
    if (probability === 4) return 'bg-orange-900 text-orange-200 border-orange-700';
    return 'bg-red-900 text-red-200 border-red-700';
  };

  const getRPNColor = (rpn) => {
    if (rpn >= 16) return 'text-red-400 font-bold';
    if (rpn >= 12) return 'text-orange-400 font-semibold';
    if (rpn >= 6) return 'text-yellow-400 font-medium';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-eqms-text">Risk Management (ISO 14971)</h1>
        <button className="flex items-center gap-2 bg-eqms-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
          <Plus size={20} />
          Add Risk Assessment
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">Total Risks</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{totalRisks}</p>
            </div>
            <AlertTriangle size={40} className="text-eqms-accent opacity-20" />
          </div>
        </div>

        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">Open</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{openRisks}</p>
            </div>
            <ArrowUpRight size={40} className="text-red-500 opacity-20" />
          </div>
        </div>

        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">Mitigated</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{mitigatedRisks}</p>
            </div>
            <CheckCircle size={40} className="text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">High RPN</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{highRPNItems}</p>
            </div>
            <TrendingDown size={40} className="text-orange-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Risk Matrix */}
      <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-eqms-text mb-6">5x5 Risk Matrix</h2>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Header Row */}
            <div className="flex">
              <div className="w-24 h-24"></div>
              {[1, 2, 3, 4, 5].map(severity => (
                <div key={`header-${severity}`} className="w-20 h-20 flex items-center justify-center border border-eqms-border">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-eqms-text">Severity</p>
                    <p className="text-lg font-bold text-eqms-text">{severity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Matrix Rows */}
            {[5, 4, 3, 2, 1].map(probability => (
              <div key={`row-${probability}`} className="flex">
                <div className="w-24 h-20 flex items-center justify-center border border-eqms-border bg-eqms-dark">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-eqms-text">Prob</p>
                    <p className="text-lg font-bold text-eqms-text">{probability}</p>
                  </div>
                </div>

                {[1, 2, 3, 4, 5].map(severity => {
                  const cellRisks = getRisksForCell(probability, severity);
                  return (
                    <div
                      key={`cell-${probability}-${severity}`}
                      className={`w-20 h-20 flex flex-col items-center justify-center border ${getCellColor(probability, severity)}`}
                    >
                      {cellRisks.map((risk, idx) => (
                        <div
                          key={risk.id}
                          className="w-2 h-2 bg-eqms-accent rounded-full cursor-pointer hover:w-3 hover:h-3 transition"
                          onClick={() => setSelectedRisk(risk)}
                          title={risk.id}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-900/40 border border-green-700 rounded"></div>
            <span className="text-eqms-text-secondary">Acceptable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-900/40 border border-yellow-700 rounded"></div>
            <span className="text-eqms-text-secondary">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-900/40 border border-orange-700 rounded"></div>
            <span className="text-eqms-text-secondary">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-900/40 border border-red-700 rounded"></div>
            <span className="text-eqms-text-secondary">Critical</span>
          </div>
        </div>
      </div>

      {/* Risk Register Table */}
      <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-eqms-text">Risk Register</h2>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-eqms-dark border border-eqms-border rounded px-3 py-1 text-sm text-eqms-text focus:outline-none focus:border-eqms-accent"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Search risks by ID or title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-eqms-dark border border-eqms-border rounded px-3 py-2 text-eqms-text placeholder-eqms-text-secondary text-sm mb-4 focus:outline-none focus:border-eqms-accent"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-eqms-border">
                <th className="text-left py-3 px-4 text-eqms-text-secondary font-semibold">Risk ID</th>
                <th className="text-left py-3 px-4 text-eqms-text-secondary font-semibold">Title</th>
                <th className="text-center py-3 px-4 text-eqms-text-secondary font-semibold">Severity</th>
                <th className="text-center py-3 px-4 text-eqms-text-secondary font-semibold">Probability</th>
                <th className="text-center py-3 px-4 text-eqms-text-secondary font-semibold">RPN</th>
                <th className="text-center py-3 px-4 text-eqms-text-secondary font-semibold">Status</th>
                <th className="text-left py-3 px-4 text-eqms-text-secondary font-semibold">Category</th>
                <th className="text-left py-3 px-4 text-eqms-text-secondary font-semibold">Controls</th>
              </tr>
            </thead>
            <tbody>
              {filteredRisks.map(risk => (
                <tr
                  key={risk.id}
                  className="border-b border-eqms-border hover:bg-eqms-dark/50 transition cursor-pointer"
                  onClick={() => setSelectedRisk(risk)}
                >
                  <td className="py-3 px-4 font-mono text-eqms-accent">{risk.id}</td>
                  <td className="py-3 px-4 text-eqms-text">{risk.title}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-xs font-semibold px-2 py-1 rounded border ${getSeverityColor(risk.severity)}`}>
                      {risk.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-xs font-semibold px-2 py-1 rounded border ${getProbabilityColor(risk.probability)}`}>
                      {risk.probability}
                    </span>
                  </td>
                  <td className={`py-3 px-4 text-center font-semibold ${getRPNColor(risk.rpn)}`}>
                    {risk.rpn}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={risk.status} />
                  </td>
                  <td className="py-3 px-4 text-eqms-text-secondary">{risk.category}</td>
                  <td className="py-3 px-4 text-eqms-text-secondary text-xs">{risk.controls?.length || 0} controls</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRisks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-eqms-text-secondary">No risks found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Risk Details Panel */}
      {selectedRisk && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-eqms-card border border-eqms-border rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-eqms-border flex justify-between items-start">
              <div>
                <p className="text-sm font-mono text-eqms-accent mb-1">{selectedRisk.id}</p>
                <h3 className="text-2xl font-bold text-eqms-text">{selectedRisk.title}</h3>
              </div>
              <button
                onClick={() => setSelectedRisk(null)}
                className="text-eqms-text-secondary hover:text-eqms-text transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-eqms-text-secondary">{selectedRisk.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-eqms-text-secondary mb-1">Severity / Probability</p>
                  <p className="text-lg font-semibold text-eqms-text">{selectedRisk.severity} / {selectedRisk.probability}</p>
                </div>
                <div>
                  <p className="text-xs text-eqms-text-secondary mb-1">RPN</p>
                  <p className={`text-lg font-semibold ${getRPNColor(selectedRisk.rpn)}`}>{selectedRisk.rpn}</p>
                </div>
              </div>

              {selectedRisk.controls && selectedRisk.controls.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-eqms-text mb-2">Controls:</p>
                  <ul className="space-y-1">
                    {selectedRisk.controls.map((control, idx) => (
                      <li key={idx} className="text-sm text-eqms-text-secondary flex items-start gap-2">
                        <span className="text-eqms-accent mt-1">•</span>
                        <span>{control}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button className="w-full mt-4 bg-eqms-accent hover:bg-blue-600 text-white py-2 rounded-lg transition font-medium">
                Edit Risk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
