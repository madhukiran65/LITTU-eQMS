import React, { useState } from 'react';
import { suppliers } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';
import { Building2, TrendingUp, AlertCircle, CheckCircle, Plus, Search, MapPin, Calendar } from 'lucide-react';

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Calculate statistics
  const totalSuppliers = suppliers.length;
  const approved = suppliers.filter(s => s.status === 'approved').length;
  const conditional = suppliers.filter(s => s.status === 'conditional').length;
  const atRisk = suppliers.filter(s => s.status === 'at_risk').length;

  // Filter suppliers
  let filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         String(supplier.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || supplier.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort suppliers
  if (sortBy === 'name') {
    filteredSuppliers.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'score') {
    filteredSuppliers.sort((a, b) => b.score - a.score);
  } else if (sortBy === 'status') {
    const statusOrder = { approved: 0, conditional: 1, at_risk: 2 };
    filteredSuppliers.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  }

  const getScoreColor = (score) => {
    if (score >= 90) return { bar: 'bg-green-500', badge: 'text-green-400' };
    if (score >= 70) return { bar: 'bg-yellow-500', badge: 'text-yellow-400' };
    return { bar: 'bg-red-500', badge: 'text-red-400' };
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-900/20 border-green-700/50';
    if (score >= 70) return 'bg-yellow-900/20 border-yellow-700/50';
    return 'bg-red-900/20 border-red-700/50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-eqms-text">Supplier Quality Management</h1>
        <button className="flex items-center gap-2 bg-eqms-accent hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
          <Plus size={20} />
          Add Supplier
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">Total Suppliers</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{totalSuppliers}</p>
            </div>
            <Building2 size={40} className="text-eqms-accent opacity-20" />
          </div>
        </div>

        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">Approved</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{approved}</p>
            </div>
            <CheckCircle size={40} className="text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">Conditional</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{conditional}</p>
            </div>
            <AlertCircle size={40} className="text-yellow-500 opacity-20" />
          </div>
        </div>

        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-eqms-text-secondary text-sm font-medium">At Risk</p>
              <p className="text-3xl font-bold text-eqms-text mt-2">{atRisk}</p>
            </div>
            <TrendingUp size={40} className="text-red-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-3 text-eqms-text-secondary" />
          <input
            type="text"
            placeholder="Search by name, ID, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-eqms-card border border-eqms-border rounded-lg pl-10 pr-4 py-2 text-eqms-text placeholder-eqms-text-secondary focus:outline-none focus:border-eqms-accent"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-eqms-card border border-eqms-border rounded-lg px-4 py-2 text-eqms-text focus:outline-none focus:border-eqms-accent"
        >
          <option value="all">All Statuses</option>
          <option value="approved">Approved</option>
          <option value="conditional">Conditional</option>
          <option value="at_risk">At Risk</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-eqms-card border border-eqms-border rounded-lg px-4 py-2 text-eqms-text focus:outline-none focus:border-eqms-accent"
        >
          <option value="name">Sort by Name</option>
          <option value="score">Sort by Score</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Suppliers Table */}
      <div className="bg-eqms-card border border-eqms-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-eqms-dark border-b border-eqms-border">
                <th className="text-left py-4 px-6 text-eqms-text-secondary font-semibold">ID</th>
                <th className="text-left py-4 px-6 text-eqms-text-secondary font-semibold">Name</th>
                <th className="text-left py-4 px-6 text-eqms-text-secondary font-semibold">Category</th>
                <th className="text-center py-4 px-6 text-eqms-text-secondary font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-eqms-text-secondary font-semibold">Score</th>
                <th className="text-left py-4 px-6 text-eqms-text-secondary font-semibold">Location</th>
                <th className="text-center py-4 px-6 text-eqms-text-secondary font-semibold">Last Audit</th>
                <th className="text-center py-4 px-6 text-eqms-text-secondary font-semibold">Next Audit</th>
                <th className="text-center py-4 px-6 text-eqms-text-secondary font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, idx) => {
                const scoreColor = getScoreColor(supplier.score);
                const scoreBg = getScoreBgColor(supplier.score);

                return (
                  <tr
                    key={supplier.id}
                    className={`border-b border-eqms-border hover:bg-eqms-dark/50 transition ${
                      idx % 2 === 0 ? 'bg-transparent' : 'bg-eqms-dark/20'
                    }`}
                  >
                    <td className="py-4 px-6 font-mono text-eqms-accent font-medium">{supplier.id}</td>

                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <p className="text-eqms-text font-medium">{supplier.name}</p>
                        <p className="text-xs text-eqms-text-secondary mt-1">{supplier.contact}</p>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="text-eqms-text-secondary">{supplier.category}</span>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <StatusBadge status={supplier.status} />
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="w-full bg-eqms-dark rounded-full h-2">
                            <div
                              className={`${scoreColor.bar} rounded-full h-2 transition`}
                              style={{ width: `${supplier.score}%` }}
                            />
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded border text-xs font-semibold ${scoreBg} ${scoreColor.badge}`}>
                          {supplier.score}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-eqms-text-secondary" />
                        <span className="text-eqms-text-secondary">{supplier.location}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2 text-eqms-text-secondary text-xs">
                        <Calendar size={14} />
                        {supplier.lastAuditDate}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2 text-eqms-text-secondary text-xs">
                        <Calendar size={14} />
                        {supplier.nextAuditDate}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <button className="text-eqms-accent hover:text-eqms-accent/80 transition font-medium text-sm">
                        Review
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12 px-6">
            <p className="text-eqms-text-secondary">No suppliers found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
        <h3 className="text-sm font-semibold text-eqms-text mb-4">Score Color Coding</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <div>
              <p className="text-sm font-medium text-eqms-text">90+</p>
              <p className="text-xs text-eqms-text-secondary">Excellent</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <div>
              <p className="text-sm font-medium text-eqms-text">70-89</p>
              <p className="text-xs text-eqms-text-secondary">Good</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm font-medium text-eqms-text">Below 70</p>
              <p className="text-xs text-eqms-text-secondary">Needs Improvement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
