import { useState } from 'react';
import { Mail, Filter, Search, AlertCircle, ArrowDown, ArrowUp } from 'lucide-react';
import { correspondence } from '@/data/mockData';

export default function Correspondence() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const correspondenceTypes = ['REGULATORY', 'FDA', 'NOTIFIED_BODY', 'CUSTOMER', 'SUPPLIER', 'INTERNAL'];
  const directions = ['INBOUND', 'OUTBOUND'];

  const filteredCorrespondence = correspondence.filter((item) => {
    const matchesSearch =
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const getTypeColor = (type) => {
    const colors = {
      REGULATORY: 'bg-red-500/20 text-red-400',
      FDA: 'bg-purple-500/20 text-purple-400',
      NOTIFIED_BODY: 'bg-blue-500/20 text-blue-400',
      CUSTOMER: 'bg-green-500/20 text-green-400',
      SUPPLIER: 'bg-yellow-500/20 text-yellow-400',
      INTERNAL: 'bg-gray-500/20 text-gray-400',
    };
    return colors[type] || colors.INTERNAL;
  };

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eqms-text mb-2">Correspondence</h1>
          <p className="text-eqms-text-secondary">Manage regulatory and business correspondence</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-eqms-card rounded-lg p-4 border border-eqms-border mb-6 flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-eqms-text-secondary w-5 h-5" />
            <input
              type="text"
              placeholder="Search by subject or sender..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-eqms-dark border border-eqms-border rounded-lg text-eqms-text placeholder-eqms-text-secondary focus:outline-none focus:border-eqms-accent"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-eqms-dark border border-eqms-border rounded-lg text-eqms-text focus:outline-none focus:border-eqms-accent"
          >
            <option value="">All Types</option>
            {correspondenceTypes.map((type) => (
              <option key={type} value={type}>
                {type.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-eqms-text-secondary text-sm">
          Showing {filteredCorrespondence.length} of {correspondence.length} items
        </div>

        {/* Correspondence List */}
        <div className="space-y-4">
          {filteredCorrespondence.length > 0 ? (
            filteredCorrespondence.map((item) => (
              <div
                key={item.id}
                className="bg-eqms-card rounded-lg border border-eqms-border p-6 hover:border-eqms-accent transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Direction Icon */}
                  <div
                    className={`p-3 rounded-lg flex-shrink-0 ${
                      item.direction === 'INBOUND'
                        ? 'bg-blue-500/10'
                        : 'bg-green-500/10'
                    }`}
                  >
                    {item.direction === 'INBOUND' ? (
                      <ArrowDown className={`w-5 h-5 ${item.direction === 'INBOUND' ? 'text-blue-400' : 'text-green-400'}`} />
                    ) : (
                      <ArrowUp className="w-5 h-5 text-green-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2 gap-4">
                      <div className="flex-1">
                        <h3 className="text-eqms-text font-semibold text-lg mb-1">{item.subject}</h3>
                        <p className="text-eqms-text-secondary text-sm">From: {item.sender}</p>
                      </div>
                      {isOverdue(item.responseDeadline) && (
                        <div className="flex-shrink-0 bg-red-500/20 rounded-lg p-2">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        </div>
                      )}
                    </div>

                    {/* Tags and Details */}
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getTypeColor(item.type)}`}>
                        {item.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-500/20 text-gray-400">
                        {item.direction}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          item.priority === 'HIGH'
                            ? 'bg-red-500/20 text-red-400'
                            : item.priority === 'MEDIUM'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {item.priority} Priority
                      </span>
                      <span className="text-xs text-eqms-text-secondary ml-auto">{formatDate(item.receivedDate)}</span>
                    </div>

                    {/* Deadline Warning */}
                    {isOverdue(item.responseDeadline) && (
                      <div className="mt-3 text-xs text-red-400">
                        Response overdue as of {new Date(item.responseDeadline).toLocaleDateString()}
                      </div>
                    )}
                    {!isOverdue(item.responseDeadline) && (
                      <div className="mt-3 text-xs text-yellow-400">
                        Response due {new Date(item.responseDeadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-eqms-card rounded-lg border border-eqms-border p-12 text-center">
              <Mail className="w-12 h-12 text-eqms-text-secondary mx-auto mb-4 opacity-50" />
              <p className="text-eqms-text-secondary">No correspondence found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
