import React, { useState } from 'react';
import { batchRecords } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';
import { Plus, BarChart3, CheckCircle2, TrendingUp, Clock } from 'lucide-react';

export default function Production() {
  const [batches] = useState(batchRecords);

  const stats = [
    {
      label: 'Batches In Progress',
      value: batches.filter(b => b.status === 'in_progress').length,
      icon: Clock,
      color: 'text-blue-400'
    },
    {
      label: 'Completed This Month',
      value: batches.filter(b => b.status === 'completed').length,
      icon: CheckCircle2,
      color: 'text-green-400'
    },
    {
      label: 'Avg Yield',
      value: (batches.reduce((sum, b) => sum + b.yield, 0) / batches.length).toFixed(1) + '%',
      icon: TrendingUp,
      color: 'text-yellow-400'
    },
    {
      label: 'Under Review',
      value: batches.filter(b => b.status === 'under_review').length,
      icon: BarChart3,
      color: 'text-purple-400'
    }
  ];

  const getYieldColor = (yield_) => {
    if (yield_ >= 95) return 'bg-green-500';
    if (yield_ >= 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getYieldTextColor = (yield_) => {
    if (yield_ >= 95) return 'text-green-400';
    if (yield_ >= 90) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-eqms-text mb-2">Production & Batch Records</h1>
            <p className="text-eqms-text-secondary">Monitor batch production and yield metrics</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={20} />
            Create Batch Record
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-eqms-card border border-eqms-border rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-eqms-text-secondary text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-eqms-text">{stat.value}</p>
                  </div>
                  <Icon className={`${stat.color}`} size={24} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Batch Records Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {batches.map((batch) => (
            <div key={batch.id} className="bg-eqms-card border border-eqms-border rounded-lg p-6 hover:border-eqms-accent transition-colors">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-eqms-text">{batch.productName}</h3>
                  <p className="text-sm text-eqms-text-secondary">Lot: {batch.lotNumber}</p>
                </div>
                <StatusBadge status={batch.status} />
              </div>

              {/* Yield Section */}
              <div className="mb-4 p-3 bg-eqms-dark rounded-lg border border-eqms-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-eqms-text-secondary text-sm">Yield</span>
                  <span className={`text-sm font-bold ${getYieldTextColor(batch.yield)}`}>{batch.yield}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getYieldColor(batch.yield)} transition-all duration-300`}
                    style={{ width: `${batch.yield}%` }}
                  />
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-eqms-text-secondary text-xs mb-1">Units Produced</p>
                  <p className="text-lg font-semibold text-eqms-text">{batch.unitsProduced}</p>
                </div>
                <div>
                  <p className="text-eqms-text-secondary text-xs mb-1">Current Step</p>
                  <p className="text-lg font-semibold text-eqms-text">{batch.currentStep}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-eqms-border pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-eqms-text-secondary text-xs mb-1">Start Date</p>
                    <p className="text-sm text-eqms-text">{new Date(batch.startDate).toLocaleDateString()}</p>
                  </div>
                  {batch.completionDate && (
                    <div>
                      <p className="text-eqms-text-secondary text-xs mb-1">Completed</p>
                      <p className="text-sm text-eqms-text">{new Date(batch.completionDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Records Message */}
        {batches.length === 0 && (
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-12 text-center">
            <BarChart3 size={48} className="text-eqms-text-secondary mx-auto mb-4 opacity-50" />
            <p className="text-eqms-text-secondary">No batch records found</p>
          </div>
        )}
      </div>
    </div>
  );
}
