import { useState } from 'react';
import { ChevronDown, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { dmrs } from '@/data/mockData';

export default function DMR() {
  const [selectedDMR, setSelectedDMR] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const sections = ['DESIGN', 'MANUFACTURING', 'PACKAGING', 'TESTING', 'INSTALLATION', 'QUALITY', 'REGULATORY', 'RISK', 'VALIDATION', 'OTHER'];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const dmrDetail = selectedDMR ? dmrs.find((d) => d.id === selectedDMR) : null;

  const getCompletionColor = (percentage) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const CircularProgress = ({ percentage }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-24 h-24">
        <svg className="transform -rotate-90 w-24 h-24" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#2a2a3e" strokeWidth="4" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-bold ${getCompletionColor(percentage)}`}>{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eqms-text mb-2">Device Master Record (DMR)</h1>
          <p className="text-eqms-text-secondary">Comprehensive device information and requirements</p>
        </div>

        {!dmrDetail ? (
          // List View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dmrs.map((dmr) => (
              <div
                key={dmr.id}
                onClick={() => setSelectedDMR(dmr.id)}
                className="bg-eqms-card rounded-lg p-6 border border-eqms-border hover:border-eqms-accent cursor-pointer transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-eqms-text mb-1">{dmr.deviceName}</h3>
                    <p className="text-eqms-text-secondary text-sm">{dmr.deviceClass}</p>
                  </div>
                  {dmr.status === 'approved' && <CheckCircle className="w-5 h-5 text-green-400" />}
                  {dmr.status === 'in_progress' && <AlertCircle className="w-5 h-5 text-yellow-400" />}
                </div>

                <div className="mb-4">
                  <p className="text-eqms-text-secondary text-xs mb-2">Completeness</p>
                  <div className="w-full bg-eqms-border rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${dmr.completeness}%` }}
                    ></div>
                  </div>
                  <p className="text-eqms-text text-xs mt-2">{dmr.completeness}% complete</p>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">{dmr.version}</span>
                  <span
                    className={`px-2 py-1 rounded ${
                      dmr.status === 'approved'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {dmr.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Detail View
          <div>
            {/* Back Button */}
            <button
              onClick={() => {
                setSelectedDMR(null);
                setExpandedSections({});
              }}
              className="mb-6 px-4 py-2 text-eqms-accent hover:text-eqms-accent/80 transition-colors flex items-center gap-2"
            >
              <ChevronDown className="w-5 h-5 transform rotate-90" />
              Back to List
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              {/* Device Info Card */}
              <div className="bg-eqms-card rounded-lg p-6 border border-eqms-border">
                <h2 className="text-lg font-semibold text-eqms-text mb-4">Device Info</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-eqms-text-secondary">Name</p>
                    <p className="text-eqms-text font-medium">{dmrDetail.deviceName}</p>
                  </div>
                  <div>
                    <p className="text-eqms-text-secondary">Class</p>
                    <p className="text-eqms-text font-medium">{dmrDetail.deviceClass}</p>
                  </div>
                  <div>
                    <p className="text-eqms-text-secondary">Status</p>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${
                        dmrDetail.status === 'approved'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {dmrDetail.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <p className="text-eqms-text-secondary">Version</p>
                    <p className="text-eqms-text font-medium">{dmrDetail.version}</p>
                  </div>
                </div>
              </div>

              {/* Completeness Card */}
              <div className="bg-eqms-card rounded-lg p-6 border border-eqms-border lg:col-span-3">
                <h2 className="text-lg font-semibold text-eqms-text mb-6">Completeness Checker</h2>
                <div className="flex items-center gap-8">
                  <CircularProgress percentage={dmrDetail.completeness} />
                  <div className="flex-1">
                    <p className="text-eqms-text-secondary text-sm mb-4">Section Status</p>
                    <div className="space-y-2">
                      {sections.map((section, idx) => (
                        <div key={section} className="flex items-center justify-between text-xs">
                          <span className="text-eqms-text">{section}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-eqms-border rounded-full h-1.5">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full"
                                style={{ width: `${Math.min(80 + idx * 2, 100)}%` }}
                              ></div>
                            </div>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4">
              {sections.map((section) => (
                <div key={section} className="bg-eqms-card rounded-lg border border-eqms-border overflow-hidden">
                  <button
                    onClick={() => toggleSection(section)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-eqms-dark/50 transition-colors"
                  >
                    <h3 className="text-eqms-text font-semibold">{section}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-eqms-text-secondary transition-transform ${
                        expandedSections[section] ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedSections[section] && (
                    <div className="px-6 py-4 border-t border-eqms-border bg-eqms-dark/30">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-eqms-text-secondary text-xs mb-1">Responsible</p>
                            <p className="text-eqms-text text-sm">Engineering Team</p>
                          </div>
                          <div>
                            <p className="text-eqms-text-secondary text-xs mb-1">Completion Status</p>
                            <span className="inline-block bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                              Complete
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-eqms-text-secondary text-xs mb-2">Description</p>
                          <p className="text-eqms-text text-sm">
                            This section contains all {section.toLowerCase()} related documentation and records for
                            device compliance and regulatory requirements.
                          </p>
                        </div>
                        <div>
                          <p className="text-eqms-text-secondary text-xs mb-2">Documents</p>
                          <div className="space-y-2">
                            {[1, 2, 3].map((item) => (
                              <div key={item} className="flex items-center gap-2 p-2 bg-eqms-dark/50 rounded text-xs">
                                <FileText className="w-4 h-4 text-eqms-accent" />
                                <span className="text-eqms-text">Document-{section}-{item}.pdf</span>
                                <CheckCircle className="w-3 h-3 text-green-400 ml-auto" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
