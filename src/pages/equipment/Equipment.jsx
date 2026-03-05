import React, { useState } from 'react';
import { equipment } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';
import { Plus, Calendar, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Equipment() {
  const [equipmentList] = useState(equipment);

  const stats = [
    {
      label: 'Total Equipment',
      value: equipmentList.length,
      icon: Zap,
      color: 'text-blue-400'
    },
    {
      label: 'Active',
      value: equipmentList.filter(e => e.status === 'active').length,
      icon: CheckCircle2,
      color: 'text-green-400'
    },
    {
      label: 'Due Calibration',
      value: equipmentList.filter(e => e.calibrationStatus === 'due_soon').length,
      icon: Calendar,
      color: 'text-yellow-400'
    },
    {
      label: 'Overdue',
      value: equipmentList.filter(e => e.calibrationStatus === 'overdue').length,
      icon: AlertCircle,
      color: 'text-red-400'
    }
  ];

  const getCalibrationColor = (status) => {
    switch (status) {
      case 'current':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'due_soon':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'overdue':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCalibrationLabel = (status) => {
    switch (status) {
      case 'current':
        return 'Current';
      case 'due_soon':
        return 'Due Soon';
      case 'overdue':
        return 'Overdue';
      default:
        return 'Unknown';
    }
  };

  const upcomingCalibrations = equipmentList
    .filter(e => e.nextCalibrationDate)
    .sort((a, b) => new Date(a.nextCalibrationDate) - new Date(b.nextCalibrationDate))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-eqms-text mb-2">Equipment & Calibration</h1>
            <p className="text-eqms-text-secondary">Manage equipment inventory and calibration schedules</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={20} />
            Add Equipment
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

        {/* Equipment Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-eqms-text mb-4">Equipment Inventory</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {equipmentList.map((item) => (
              <div key={item.id} className="bg-eqms-card border border-eqms-border rounded-lg p-6 hover:border-eqms-accent transition-colors">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-eqms-text">{item.name}</h3>
                    <p className="text-sm text-eqms-text-secondary">{item.type}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-eqms-text-secondary text-sm">Location</span>
                    <span className="text-eqms-text font-medium">{item.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-eqms-text-secondary text-sm">Calibration</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCalibrationColor(item.calibrationStatus)}`}>
                      {getCalibrationLabel(item.calibrationStatus)}
                    </span>
                  </div>
                </div>

                {/* Dates */}
                <div className="border-t border-eqms-border pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-eqms-text-secondary">Last Calibration</span>
                    <span className="text-eqms-text">{new Date(item.lastCalibrationDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-eqms-text-secondary">Next Due</span>
                    <span className="text-eqms-text font-medium">{new Date(item.nextCalibrationDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calibration Timeline */}
        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-eqms-text mb-4">Upcoming Calibrations</h2>
          <div className="space-y-3">
            {upcomingCalibrations.length > 0 ? (
              upcomingCalibrations.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-eqms-dark rounded-lg border border-eqms-border/50">
                  <Calendar size={20} className="text-blue-400 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-eqms-text font-medium">{item.name}</p>
                    <p className="text-sm text-eqms-text-secondary">{item.location}</p>
                  </div>
                  <span className="text-sm font-medium text-eqms-text whitespace-nowrap">
                    {new Date(item.nextCalibrationDate).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-eqms-text-secondary text-center py-8">No upcoming calibrations</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
