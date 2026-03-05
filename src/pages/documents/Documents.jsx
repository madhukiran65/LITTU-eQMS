import { useState } from 'react';
import { Search, Plus, Filter, ChevronDown } from 'lucide-react';
import { documents } from '@/data/mockData';
import StatusBadge from '@/components/common/StatusBadge';

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const documentTypes = ['SOP', 'Work Instruction', 'Form', 'Record', 'Policy', 'Procedure'];
  const statusOptions = [
    'draft',
    'in_review',
    'approved',
    'effective',
    'training_period',
    'superseded',
    'obsolete',
    'archived',
    'cancelled',
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.docId || doc.document_id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || doc.status === statusFilter;
    const matchesType = !typeFilter || doc.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-eqms-text mb-2">Documents</h1>
            <p className="text-eqms-text-secondary">Manage your controlled documents and records</p>
          </div>
          <button className="bg-eqms-accent hover:bg-eqms-accent/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-5 h-5" />
            New Document
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-eqms-card rounded-lg p-4 border border-eqms-border mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-eqms-text-secondary w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, ID, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-eqms-dark border border-eqms-border rounded-lg text-eqms-text placeholder-eqms-text-secondary focus:outline-none focus:border-eqms-accent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowStatusDropdown(!showStatusDropdown);
                  setShowTypeDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-eqms-dark border border-eqms-border rounded-lg text-eqms-text hover:border-eqms-accent transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Status</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showStatusDropdown && (
                <div className="absolute top-full mt-2 right-0 bg-eqms-card border border-eqms-border rounded-lg shadow-lg z-10 min-w-48">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setStatusFilter('');
                        setShowStatusDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        !statusFilter ? 'bg-eqms-accent text-white' : 'text-eqms-text hover:bg-eqms-dark'
                      }`}
                    >
                      All Statuses
                    </button>
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setStatusFilter(status);
                          setShowStatusDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors capitalize ${
                          statusFilter === status
                            ? 'bg-eqms-accent text-white'
                            : 'text-eqms-text hover:bg-eqms-dark'
                        }`}
                      >
                        {status.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Type Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowTypeDropdown(!showTypeDropdown);
                  setShowStatusDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-eqms-dark border border-eqms-border rounded-lg text-eqms-text hover:border-eqms-accent transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Type</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showTypeDropdown && (
                <div className="absolute top-full mt-2 right-0 bg-eqms-card border border-eqms-border rounded-lg shadow-lg z-10 min-w-48">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setTypeFilter('');
                        setShowTypeDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        !typeFilter ? 'bg-eqms-accent text-white' : 'text-eqms-text hover:bg-eqms-dark'
                      }`}
                    >
                      All Types
                    </button>
                    {documentTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setTypeFilter(type);
                          setShowTypeDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          typeFilter === type
                            ? 'bg-eqms-accent text-white'
                            : 'text-eqms-text hover:bg-eqms-dark'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-eqms-text-secondary text-sm">
          Showing {filteredDocuments.length} of {documents.length} documents
        </div>

        {/* Table */}
        <div className="bg-eqms-card rounded-lg border border-eqms-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-eqms-dark border-b border-eqms-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                    Doc ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                    Version
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-eqms-text-secondary uppercase tracking-wider">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-eqms-border">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-eqms-dark/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-eqms-accent">{doc.docId || doc.document_id}</td>
                      <td className="px-6 py-4 text-sm text-eqms-text">{doc.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-eqms-text">{doc.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <StatusBadge status={doc.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-eqms-text">{doc.version}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-eqms-text">{doc.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-eqms-text">{doc.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-eqms-text-secondary">
                        {formatDate(doc.lastUpdated || doc.updated)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-eqms-text-secondary">
                      No documents found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
