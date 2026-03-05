import React, { useState } from 'react';
import { managementReviews } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';
import { Plus, Calendar, CheckCircle2, ClipboardList, TrendingUp } from 'lucide-react';

export default function ManagementReview() {
  const [reviews] = useState(managementReviews);

  const nextReviewDate = reviews.length > 0
    ? new Date(reviews.sort((a, b) => new Date(a.date) - new Date(b.date))[0].date).toLocaleDateString()
    : 'Not scheduled';

  const stats = [
    {
      label: 'Next Review',
      value: nextReviewDate,
      icon: Calendar,
      color: 'text-blue-400'
    },
    {
      label: 'Open Actions',
      value: reviews.reduce((sum, r) => sum + (r.openActions || 0), 0),
      icon: ClipboardList,
      color: 'text-yellow-400'
    },
    {
      label: 'Completed Reviews',
      value: reviews.filter(r => r.status === 'completed').length,
      icon: CheckCircle2,
      color: 'text-green-400'
    },
    {
      label: 'Avg Score',
      value: (reviews.reduce((sum, r) => sum + (r.score || 0), 0) / (reviews.length || 1)).toFixed(1),
      icon: TrendingUp,
      color: 'text-purple-400'
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-eqms-text mb-2">Management Review</h1>
            <p className="text-eqms-text-secondary">Track management reviews and KPI metrics</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={20} />
            Schedule Review
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
                    <p className="text-2xl font-bold text-eqms-text">{stat.value}</p>
                  </div>
                  <Icon className={`${stat.color}`} size={24} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-eqms-card border border-eqms-border rounded-lg p-6 hover:border-eqms-accent transition-colors">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-eqms-text">{review.title}</h3>
                  <p className="text-sm text-eqms-text-secondary mt-1">{new Date(review.date).toLocaleDateString()}</p>
                </div>
                <StatusBadge status={review.status} />
              </div>

              {/* Score */}
              {review.score && (
                <div className="mb-4 p-3 bg-eqms-dark rounded-lg border border-eqms-border/50">
                  <p className="text-eqms-text-secondary text-xs mb-2">Overall Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-bold ${getScoreColor(review.score)}`}>{review.score}</span>
                    <span className="text-eqms-text-secondary">/100</span>
                  </div>
                </div>
              )}

              {/* Topics */}
              <div className="mb-4">
                <p className="text-eqms-text-secondary text-xs mb-2">Topics Reviewed</p>
                <div className="space-y-2">
                  {review.topics && review.topics.map((topic, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                      <span className="text-eqms-text">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-eqms-border pt-4">
                <div className="flex items-center justify-between">
                  {review.openActions && review.openActions > 0 && (
                    <span className="text-sm text-yellow-400">
                      {review.openActions} action{review.openActions !== 1 ? 's' : ''} open
                    </span>
                  )}
                  {(!review.openActions || review.openActions === 0) && (
                    <span className="text-sm text-green-400">All actions closed</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* KPI Dashboard */}
        <div className="bg-eqms-card border border-eqms-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-eqms-text mb-6">Quality Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'On-Time Delivery', value: '94%', color: 'text-green-400' },
              { label: 'First Pass Yield', value: '91.5%', color: 'text-green-400' },
              { label: 'Customer Satisfaction', value: '4.7/5', color: 'text-blue-400' },
              { label: 'Audit Findings', value: '2', color: 'text-yellow-400' }
            ].map((metric, index) => (
              <div key={index} className="bg-eqms-dark rounded-lg p-4 border border-eqms-border/50">
                <p className="text-eqms-text-secondary text-xs mb-2">{metric.label}</p>
                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* No Reviews Message */}
        {reviews.length === 0 && (
          <div className="bg-eqms-card border border-eqms-border rounded-lg p-12 text-center mt-8">
            <Calendar size={48} className="text-eqms-text-secondary mx-auto mb-4 opacity-50" />
            <p className="text-eqms-text-secondary">No management reviews scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}
