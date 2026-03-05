import { useState } from 'react';
import { FileText, Download, Settings } from 'lucide-react';
import { documents } from '@/data/mockData';

export default function Labeling() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('standard');
  const [labelText, setLabelText] = useState('');

  const formats = [
    {
      id: 'standard',
      name: 'Standard',
      description: 'Full label with all document information',
      preview: 'A4 size, includes revision, date, and QR code',
    },
    {
      id: 'compact',
      name: 'Compact',
      description: 'Minimal label with essential info only',
      preview: '2x3 inch, document ID and revision only',
    },
    {
      id: 'regulatory',
      name: 'Regulatory',
      description: 'Compliance-focused with regulatory details',
      preview: '3x4 inch, includes all compliance markings',
    },
  ];

  const handleDocumentSelect = (doc) => {
    setSelectedDocument(doc);
    setLabelText(`${doc.docId}\n${doc.title}\nREV ${doc.version}`);
  };

  return (
    <div className="min-h-screen bg-eqms-dark p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eqms-text mb-2">Label Generator</h1>
          <p className="text-eqms-text-secondary">
            Create and customize document labels for printing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Document & Format Selection */}
          <div className="lg:col-span-1 space-y-6">
            {/* Document Selection */}
            <div className="bg-eqms-card rounded-lg p-6 border border-eqms-border">
              <h2 className="text-lg font-semibold text-eqms-text mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-eqms-accent" />
                Select Document
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {documents.slice(0, 8).map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => handleDocumentSelect(doc)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      selectedDocument?.id === doc.id
                        ? 'bg-eqms-accent text-white'
                        : 'bg-eqms-dark border border-eqms-border text-eqms-text hover:border-eqms-accent'
                    }`}
                  >
                    <p className="text-sm font-medium">{doc.docId}</p>
                    <p className="text-xs opacity-75 truncate">{doc.title}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            <div className="bg-eqms-card rounded-lg p-6 border border-eqms-border">
              <h2 className="text-lg font-semibold text-eqms-text mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-eqms-accent" />
                Label Format
              </h2>
              <div className="space-y-3">
                {formats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedFormat === format.id
                        ? 'bg-eqms-accent border-eqms-accent'
                        : 'bg-eqms-dark border-eqms-border hover:border-eqms-accent'
                    }`}
                  >
                    <h3
                      className={`font-semibold text-sm mb-1 ${
                        selectedFormat === format.id ? 'text-white' : 'text-eqms-text'
                      }`}
                    >
                      {format.name}
                    </h3>
                    <p
                      className={`text-xs ${
                        selectedFormat === format.id ? 'text-white/80' : 'text-eqms-text-secondary'
                      }`}
                    >
                      {format.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Panel - Label Preview */}
          <div className="lg:col-span-1">
            <div className="bg-eqms-card rounded-lg p-6 border border-eqms-border sticky top-6">
              <h2 className="text-lg font-semibold text-eqms-text mb-4">Preview</h2>

              {selectedDocument ? (
                <div className="space-y-4">
                  {/* Label Preview Box */}
                  <div
                    className={`bg-white border-2 border-gray-400 rounded-lg overflow-hidden ${
                      selectedFormat === 'standard'
                        ? 'aspect-[21/29.7] p-6'
                        : selectedFormat === 'compact'
                          ? 'aspect-[3/2] p-3'
                          : 'aspect-[3/4] p-4'
                    }`}
                  >
                    <div
                      className={`text-black font-family-monospace ${
                        selectedFormat === 'standard' ? 'space-y-3' : 'space-y-2'
                      }`}
                    >
                      <div className={selectedFormat === 'standard' ? 'text-lg' : 'text-xs'}>
                        <p className="font-bold">{selectedDocument.docId}</p>
                      </div>
                      <div className={selectedFormat === 'standard' ? 'text-sm' : 'text-xs'}>
                        <p className="font-semibold line-clamp-2">{selectedDocument.title}</p>
                      </div>
                      {(selectedFormat === 'standard' || selectedFormat === 'regulatory') && (
                        <div className={selectedFormat === 'standard' ? 'text-sm' : 'text-xs'}>
                          <p>REV: {selectedDocument.version}</p>
                          <p>
                            DATE:{' '}
                            {new Date(selectedDocument.lastUpdated).toLocaleDateString('en-US', {
                              month: '2-digit',
                              day: '2-digit',
                              year: '2-digit',
                            })}
                          </p>
                        </div>
                      )}
                      {selectedFormat === 'regulatory' && (
                        <div className="text-xs border-t pt-2 mt-2">
                          <p>⚠ CONTROLLED DOCUMENT</p>
                          <p>Unauthorized copying is prohibited</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Format Details */}
                  <div className="bg-eqms-dark rounded p-3 border border-eqms-border text-xs text-eqms-text-secondary">
                    <p>
                      {formats.find((f) => f.id === selectedFormat)?.preview}
                    </p>
                  </div>

                  {/* Download Button */}
                  <button className="w-full px-4 py-3 bg-eqms-accent hover:bg-eqms-accent/90 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <Download className="w-4 h-4" />
                    Download Label
                  </button>
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center">
                  <div className="text-center text-eqms-text-secondary">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Select a document to preview label</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Label Editor */}
          <div className="lg:col-span-1">
            <div className="bg-eqms-card rounded-lg p-6 border border-eqms-border">
              <h2 className="text-lg font-semibold text-eqms-text mb-4">Customize</h2>

              {selectedDocument ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-eqms-text-secondary mb-2">
                      Label Content
                    </label>
                    <textarea
                      value={labelText}
                      onChange={(e) => setLabelText(e.target.value)}
                      className="w-full px-3 py-2 bg-eqms-dark border border-eqms-border rounded-lg text-eqms-text placeholder-eqms-text-secondary focus:outline-none focus:border-eqms-accent text-xs font-mono h-24 resize-none"
                    />
                  </div>

                  <div className="border-t border-eqms-border pt-4">
                    <p className="text-sm font-medium text-eqms-text mb-3">Quick Actions</p>
                    <div className="space-y-2">
                      <button className="w-full px-3 py-2 bg-eqms-dark border border-eqms-border rounded-lg text-eqms-text text-sm hover:bg-eqms-dark/70 transition-colors">
                        Add QR Code
                      </button>
                      <button className="w-full px-3 py-2 bg-eqms-dark border border-eqms-border rounded-lg text-eqms-text text-sm hover:bg-eqms-dark/70 transition-colors">
                        Add Barcode
                      </button>
                      <button className="w-full px-3 py-2 bg-eqms-dark border border-eqms-border rounded-lg text-eqms-text text-sm hover:bg-eqms-dark/70 transition-colors">
                        Reset to Default
                      </button>
                    </div>
                  </div>

                  <div className="bg-eqms-dark/50 rounded p-3 text-xs text-eqms-text-secondary border border-eqms-border">
                    <p className="font-semibold mb-1">Print Settings</p>
                    <p>
                      {selectedFormat === 'standard'
                        ? 'A4 (210 x 297 mm)'
                        : selectedFormat === 'compact'
                          ? '2 x 3 inches (51 x 76 mm)'
                          : '3 x 4 inches (76 x 102 mm)'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-eqms-text-secondary text-sm">
                  Select a document to customize the label
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
