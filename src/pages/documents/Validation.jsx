import { useState } from 'react';
import { CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { validationDocs } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';

export default function Validation() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Protocols', count: validationDocs.length },
    {
      id: 'IQ',
      label: 'Installation Qualification (IQ)',
      count: validationDocs.filter((d) => d.type === 'IQ').length,
    },
    {
      id: 'OQ',
      label: 'Operational Qualification (OQ)',
      count: validationDocs.filter((d) => d.type === 'OQ').length,
    },
    {
      id: 'PQ',
      label: 'Performance Qualification (PQ)',
      count: validationDocs.filter((d) => d.type === 'PQ').length,
    },
  ];

  const filteredDocs =
    selectedCategory === 'all' ? validationDocs : validationDocs.filter((d) => d.type === selectedCategory);

  const getTypeColor = (type) => {
    const colors = {
      IQ: 'bg-blue-500/20 text-blue-400',
      OQ: 'bg-purple-500/20 text-purple-400',
      PQ: 'bg-green-500/20 text-green-400',
    };
    return colors[type] || colors.IQ;
  };

  const getStatusIcon = (status) => {
    if (status === 'approved') return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (status === 'in_review') return <AlertCircle className="w-5 h-5 text-yellow-400" />;
    return <FileText className="w-5 h-5 text-eqms-text-secondary" />;
  };

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eqms-text mb-2">Validation Documentation</h1>
          <p className="text-eqms-text-secondary">
            Manage IQ/OQ/PQ protocols and validation reports
          </p>
        </div>

        {/* Category Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg border transition-all ${
                selectedCategory === category.id
                  ? 'bg-eqms-accent border-eqms-accent text-white'
                  : 'bg-eqms-card border-eqms-border text-eqms-text hover:border-eqms-accent'
              }`}
            >
              <h3 className="font-semibold text-sm mb-1">{category.label}</h3>
              <p className="text-2xl font-bold">{category.count}</p>
            </button>
          ))}
        </div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-eqms-card rounded-lg border border-eqms-border p-6 hover:border-eqms-accent transition-all hover:shadow-lg"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-eqms-text font-semibold text-lg mb-1">{doc.title}</h3>
                    <p className="text-eqms-text-secondary text-sm">{doc.equipment}</p>
                  </div>
                  {getStatusIcon(doc.status)}
                </div>

                {/* Type Badge */}
                <div className="mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getTypeColor(doc.type)}`}>
                    {doc.type} Protocol
                  </span>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <StatusBadge status={doc.status} />
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4 text-sm">
                  <div>
                    <p className="text-eqms-text-secondary text-xs mb-1">Document ID</p>
                    <p className="text-eqms-accent font-medium">{doc.docId}</p>
                  </div>
                  <div>
                    <p className="text-eqms-text-secondary text-xs mb-1">Validation Date</p>
                    <p className="text-eqms-text">
                      {new Date(doc.validationDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-eqms-text-secondary text-xs mb-1">Responsible Department</p>
                    <p className="text-eqms-text">{doc.department}</p>
                  </div>
                </div>

                {/* Progress */}
                {doc.completeness && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-eqms-text-secondary text-xs">Completion</p>
                      <p className="text-eqms-text text-xs font-medium">{doc.completeness}%</p>
                    </div>
                    <div className="w-full bg-eqms-border rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${doc.completeness}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="pt-4 border-t border-eqms-border">
                  <p className="text-eqms-text-secondary text-xs">
                    Version {doc.version} • Last updated{' '}
                    {new Date(doc.lastUpdated).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-eqms-card rounded-lg border border-eqms-border p-12 text-center">
              <FileText className="w-12 h-12 text-eqms-text-secondary mx-auto mb-4 opacity-50" />
              <p className="text-eqms-text-secondary">No validation documents found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
