import { useState } from 'react';
import { Calendar, Copy, Tag, CheckCircle, AlertCircle } from 'lucide-react';
import { periodicReviews, controlledCopies, documentLabels } from '@/data/mockData';

export default function DocumentManagement() {
  const [activeTab, setActiveTab] = useState('reviews');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const tabs = [
    { id: 'reviews', label: 'Periodic Reviews', icon: Calendar, count: periodicReviews.length },
    { id: 'copies', label: 'Controlled Copies', icon: Copy, count: controlledCopies.length },
    { id: 'labels', label: 'Document Labels', icon: Tag, count: documentLabels.length },
  ];

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eqms-text mb-2">Document Management</h1>
          <p className="text-eqms-text-secondary">
            Manage document reviews, controlled copies, and labeling
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-eqms-border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-eqms-accent text-eqms-accent'
                    : 'border-transparent text-eqms-text-secondary hover:text-eqms-text'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span
                  className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? 'bg-eqms-accent text-white'
                      : 'bg-eqms-border text-eqms-text-secondary'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Periodic Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="bg-eqms-card rounded-lg border border-eqms-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-eqms-dark border-b border-eqms-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                      Doc ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                      Last Reviewed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                      Reviewer
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-eqms-border">
                  {periodicReviews.map((review) => (
                    <tr key={review.id} className="hover:bg-eqms-dark/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-eqms-text">{review.documentTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-eqms-accent">
                        {review.docId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-eqms-text">
                        {formatDate(review.lastReviewDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-eqms-text">
                        {formatDate(review.nextReviewDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {isOverdue(review.nextReviewDate) ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-semibold">
                            <AlertCircle className="w-3 h-3" />
                            Overdue
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-semibold">
                            <CheckCircle className="w-3 h-3" />
                            On Schedule
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-eqms-text">
                        {review.reviewer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Controlled Copies Tab */}
        {activeTab === 'copies' && (
          <div className="bg-eqms-card rounded-lg border border-eqms-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-eqms-dark border-b border-eqms-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                      Copy ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                      Recipient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                      Issue Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-eqms-border">
                  {controlledCopies.map((copy) => (
                    <tr key={copy.id} className="hover:bg-eqms-dark/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-eqms-accent">
                        {copy.copyId}
                      </td>
                      <td className="px-6 py-4 text-sm text-eqms-text">{copy.documentTitle}</td>
                      <td className="px-6 py-4 text-sm text-eqms-text">{copy.recipient}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-eqms-text">
                        {copy.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-eqms-text">
                        {formatDate(copy.issueDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            copy.status === 'active'
                              ? 'bg-green-500/20 text-green-400'
                              : copy.status === 'superseded'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {copy.status.charAt(0).toUpperCase() + copy.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Document Labels Tab */}
        {activeTab === 'labels' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentLabels.map((label) => (
              <div
                key={label.id}
                className="bg-eqms-card rounded-lg border border-eqms-border p-6 hover:border-eqms-accent transition-colors"
              >
                {/* Label Preview */}
                <div
                  className="p-4 rounded-lg mb-4 border border-eqms-border bg-eqms-dark"
                  style={{
                    borderColor: label.color || '#2a2a3e',
                  }}
                >
                  <div className="text-center">
                    <p className="text-xs font-semibold text-eqms-text-secondary mb-1">LABEL PREVIEW</p>
                    <div className="bg-white p-3 rounded text-center">
                      <p className="text-xs font-bold text-black mb-1">{label.documentId}</p>
                      <p className="text-xs text-black mb-2">{label.documentTitle}</p>
                      <p className="text-xs font-semibold text-black">REV {label.version}</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-eqms-text-secondary text-xs mb-1">Format</p>
                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-500/20 text-blue-400">
                      {label.format}
                    </span>
                  </div>
                  <div>
                    <p className="text-eqms-text-secondary text-xs mb-1">Document</p>
                    <p className="text-eqms-text font-medium">{label.documentTitle}</p>
                  </div>
                  <div>
                    <p className="text-eqms-text-secondary text-xs mb-1">Size</p>
                    <p className="text-eqms-text">{label.size}</p>
                  </div>
                  <div>
                    <p className="text-eqms-text-secondary text-xs mb-1">Created</p>
                    <p className="text-eqms-text">{formatDate(label.createdDate)}</p>
                  </div>
                </div>

                {/* Action */}
                <button className="w-full mt-4 px-3 py-2 bg-eqms-accent hover:bg-eqms-accent/90 text-white text-sm font-medium rounded transition-colors">
                  Generate Label
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
