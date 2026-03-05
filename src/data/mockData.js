// LITTU eQMS — Mock Data for all modules
export const dashboardKPIs = {
  totalDocuments: 1247, activeDocuments: 892, pendingReviews: 34, overdueReviews: 7,
  openCAPAs: 18, closedCAPAs: 156, overdueCapas: 3,
  openDeviations: 12, closedDeviations: 89,
  openComplaints: 8, mdrReportsDue: 2,
  trainingCompliance: 94.2, overdueTraining: 11,
  openAudits: 4, findingsOpen: 23,
  supplierScore: 87.5, suppliersAtRisk: 3,
  qualityScore: 91.8, riskScore: 78.4,
  equipmentDueCalibration: 6, batchesInProgress: 14,
};

export const qualityTrend = [
  { month: 'Sep', score: 85.2, capas: 5, deviations: 8 },
  { month: 'Oct', score: 87.1, capas: 3, deviations: 6 },
  { month: 'Nov', score: 88.9, capas: 4, deviations: 5 },
  { month: 'Dec', score: 89.5, capas: 2, deviations: 4 },
  { month: 'Jan', score: 90.8, capas: 3, deviations: 3 },
  { month: 'Feb', score: 91.8, capas: 2, deviations: 2 },
];

export const documents = [
  { id: 1, document_id: 'DOC-2026-0001', title: 'Quality Manual — IVD QMS Framework', type: 'SOP', status: 'effective', version: '3.2', department: 'Quality', author: 'Dr. Sarah Chen', updated: '2026-02-28', reviewDate: '2026-08-28' },
  { id: 2, document_id: 'DOC-2026-0002', title: 'Design Control Procedure for IVD Devices', type: 'SOP', status: 'in_review', version: '2.1', department: 'R&D', author: 'James Miller', updated: '2026-03-01', reviewDate: '2026-09-01' },
  { id: 3, document_id: 'DOC-2026-0003', title: 'CAPA Management Procedure', type: 'SOP', status: 'effective', version: '4.0', department: 'Quality', author: 'Dr. Sarah Chen', updated: '2026-02-15', reviewDate: '2026-08-15' },
  { id: 4, document_id: 'DOC-2026-0004', title: 'Risk Management Plan — ISO 14971', type: 'Plan', status: 'draft', version: '1.0', department: 'R&D', author: 'Emily Rodriguez', updated: '2026-03-01', reviewDate: '2026-09-01' },
  { id: 5, document_id: 'DOC-2026-0005', title: 'Supplier Qualification Protocol', type: 'Protocol', status: 'effective', version: '2.3', department: 'Supply Chain', author: 'Michael Park', updated: '2026-02-20', reviewDate: '2026-08-20' },
  { id: 6, document_id: 'DOC-2026-0006', title: 'Equipment Calibration SOP', type: 'SOP', status: 'approved', version: '1.5', department: 'Engineering', author: 'Lisa Wang', updated: '2026-02-25', reviewDate: '2026-08-25' },
  { id: 7, document_id: 'DOC-2026-0007', title: 'Complaint Handling Procedure — FDA MDR', type: 'SOP', status: 'training_period', version: '3.1', department: 'Quality', author: 'Dr. Sarah Chen', updated: '2026-03-01', reviewDate: '2026-09-01' },
  { id: 8, document_id: 'DOC-2026-0008', title: 'IQ/OQ/PQ Validation Protocol Template', type: 'Template', status: 'effective', version: '2.0', department: 'Validation', author: 'Robert Kim', updated: '2026-01-15', reviewDate: '2026-07-15' },
];

export const capas = [
  { id: 1, capa_id: 'CAPA-2026-0001', title: 'Out-of-spec reagent concentration in Lot 2026-A', phase: 'containment', priority: 'high', source: 'Deviation', assignee: 'Dr. Sarah Chen', created: '2026-02-10', dueDate: '2026-04-10', rootCause: 'Raw material supplier changed formulation without notification' },
  { id: 2, capa_id: 'CAPA-2026-0002', title: 'Label misalignment on diagnostic kit packaging', phase: 'root_cause_analysis', priority: 'medium', source: 'Complaint', assignee: 'James Miller', created: '2026-02-15', dueDate: '2026-04-15', rootCause: 'Pending investigation' },
  { id: 3, capa_id: 'CAPA-2026-0003', title: 'Training records incomplete for production staff', phase: 'corrective_action', priority: 'high', source: 'Audit', assignee: 'Emily Rodriguez', created: '2026-01-20', dueDate: '2026-03-20', rootCause: 'LMS system migration caused data loss' },
  { id: 4, capa_id: 'CAPA-2026-0004', title: 'Temperature excursion in reagent storage area', phase: 'effectiveness_check', priority: 'critical', source: 'Environmental Monitoring', assignee: 'Michael Park', created: '2026-01-05', dueDate: '2026-03-05', rootCause: 'HVAC sensor calibration drift' },
  { id: 5, capa_id: 'CAPA-2026-0005', title: 'Software validation protocol gaps for v2.1', phase: 'closure', priority: 'medium', source: 'Internal Audit', assignee: 'Lisa Wang', created: '2025-12-01', dueDate: '2026-02-28', rootCause: 'Inadequate test coverage for edge cases' },
];

export const deviations = [
  { id: 1, deviation_id: 'DEV-2026-0001', title: 'pH out of range during buffer preparation', stage: 'investigation', severity: 'major', department: 'Production', assignee: 'Robert Kim', created: '2026-02-28', dueDate: '2026-03-14' },
  { id: 2, deviation_id: 'DEV-2026-0002', title: 'Missing batch record signature for Lot 2026-B', stage: 'root_cause', severity: 'minor', department: 'Quality', assignee: 'Dr. Sarah Chen', created: '2026-03-01', dueDate: '2026-03-15' },
  { id: 3, deviation_id: 'DEV-2026-0003', title: 'Particulate contamination detected in cleanroom', stage: 'containment', severity: 'critical', department: 'Engineering', assignee: 'Michael Park', created: '2026-03-01', dueDate: '2026-03-09' },
  { id: 4, deviation_id: 'DEV-2026-0004', title: 'Supplier delivered wrong raw material grade', stage: 'closed', severity: 'major', department: 'Supply Chain', assignee: 'Lisa Wang', created: '2026-02-10', dueDate: '2026-02-24' },
];

export const changeControls = [
  { id: 1, cc_id: 'CC-2026-0001', title: 'Update reagent formulation for improved stability', stage: 'impact_assessment', type: 'Product', priority: 'high', requestor: 'James Miller', created: '2026-02-20', dueDate: '2026-04-20' },
  { id: 2, cc_id: 'CC-2026-0002', title: 'Migrate batch record system to cloud', stage: 'approval', type: 'System', priority: 'medium', requestor: 'Emily Rodriguez', created: '2026-02-15', dueDate: '2026-05-15' },
  { id: 3, cc_id: 'CC-2026-0003', title: 'Modify labeling to comply with EU IVDR 2017/746', stage: 'implementation', type: 'Regulatory', priority: 'critical', requestor: 'Dr. Sarah Chen', created: '2026-01-10', dueDate: '2026-03-31' },
];

export const complaints = [
  { id: 1, complaint_id: 'CMP-2026-0001', title: 'False positive results reported by 3 clinical sites', status: 'investigation', severity: 'critical', source: 'Customer', isMDR: true, mdrDeadline: '2026-03-07', created: '2026-03-01' },
  { id: 2, complaint_id: 'CMP-2026-0002', title: 'Reagent kit expired before stated date', status: 'resolution', severity: 'major', source: 'Distributor', isMDR: false, created: '2026-02-25' },
  { id: 3, complaint_id: 'CMP-2026-0003', title: 'Instrument error code E-42 during sample processing', status: 'open', severity: 'minor', source: 'Customer', isMDR: false, created: '2026-03-01' },
  { id: 4, complaint_id: 'CMP-2026-0004', title: 'Patient adverse event — allergic reaction to latex component', status: 'investigation', severity: 'critical', source: 'Hospital', isMDR: true, mdrDeadline: '2026-03-05', created: '2026-02-28' },
];

export const trainingCourses = [
  { id: 1, course_id: 'TRN-001', title: 'GMP for IVD Manufacturing', type: 'classroom', status: 'active', enrolled: 45, completed: 38, passRate: 97, duration: '4 hours' },
  { id: 2, course_id: 'TRN-002', title: '21 CFR Part 11 Compliance', type: 'online', status: 'active', enrolled: 120, completed: 108, passRate: 94, duration: '2 hours' },
  { id: 3, course_id: 'TRN-003', title: 'ISO 13485:2016 Awareness', type: 'online', status: 'active', enrolled: 150, completed: 142, passRate: 99, duration: '3 hours' },
  { id: 4, course_id: 'TRN-004', title: 'Cleanroom Gowning Procedure', type: 'practical', status: 'active', enrolled: 30, completed: 28, passRate: 100, duration: '1 hour' },
  { id: 5, course_id: 'TRN-005', title: 'CAPA Root Cause Analysis — 5 Why', type: 'classroom', status: 'draft', enrolled: 0, completed: 0, passRate: 0, duration: '6 hours' },
];

export const audits = [
  { id: 1, audit_id: 'AUD-2026-001', title: 'Internal Audit — Document Control System', type: 'Internal', status: 'in_progress', lead: 'Dr. Sarah Chen', startDate: '2026-03-01', endDate: '2026-03-15', findings: 4, observations: 7 },
  { id: 2, audit_id: 'AUD-2026-002', title: 'Supplier Audit — Reagent Manufacturer ABC', type: 'Supplier', status: 'scheduled', lead: 'Michael Park', startDate: '2026-03-20', endDate: '2026-03-22', findings: 0, observations: 0 },
  { id: 3, audit_id: 'AUD-2026-003', title: 'FDA Pre-Submission Audit Readiness', type: 'Regulatory', status: 'planning', lead: 'James Miller', startDate: '2026-04-01', endDate: '2026-04-05', findings: 0, observations: 0 },
  { id: 4, audit_id: 'AUD-2026-004', title: 'ISO 13485 Surveillance Audit — TÜV SÜD', type: 'External', status: 'completed', lead: 'Dr. Sarah Chen', startDate: '2026-02-01', endDate: '2026-02-03', findings: 2, observations: 5 },
];

export const suppliers = [
  { id: 1, supplier_id: 'SUP-001', name: 'BioReagent Corp', category: 'Critical Raw Material', status: 'approved', score: 92, lastAudit: '2026-01-15', nextAudit: '2027-01-15', location: 'San Diego, CA' },
  { id: 2, supplier_id: 'SUP-002', name: 'PackTech Solutions', category: 'Packaging', status: 'approved', score: 88, lastAudit: '2025-11-20', nextAudit: '2026-11-20', location: 'Chicago, IL' },
  { id: 3, supplier_id: 'SUP-003', name: 'MicroChip Diagnostics', category: 'Component', status: 'conditional', score: 71, lastAudit: '2026-02-01', nextAudit: '2026-08-01', location: 'Shenzhen, CN' },
  { id: 4, supplier_id: 'SUP-004', name: 'CleanChem Industries', category: 'Chemical', status: 'under_review', score: 65, lastAudit: '2025-09-10', nextAudit: '2026-03-10', location: 'Mumbai, IN' },
];

export const riskAssessments = [
  { id: 1, risk_id: 'RISK-001', title: 'False Negative Risk — Sensitivity Assay', severity: 5, probability: 3, rpn: 15, status: 'mitigated', category: 'Clinical', controls: 3 },
  { id: 2, risk_id: 'RISK-002', title: 'Cross-Contamination in Sample Processing', severity: 4, probability: 2, rpn: 8, status: 'open', category: 'Manufacturing', controls: 2 },
  { id: 3, risk_id: 'RISK-003', title: 'Cybersecurity — Patient Data Breach', severity: 5, probability: 2, rpn: 10, status: 'mitigated', category: 'Software', controls: 5 },
  { id: 4, risk_id: 'RISK-004', title: 'Supply Chain Disruption — Single Source Reagent', severity: 4, probability: 4, rpn: 16, status: 'open', category: 'Supply Chain', controls: 1 },
];

export const equipment = [
  { id: 1, equipment_id: 'EQ-001', name: 'PCR Thermal Cycler — Bio-Rad CFX96', type: 'Analytical', status: 'active', location: 'Lab A-201', lastCalibration: '2026-02-01', nextCalibration: '2026-05-01', calibrationStatus: 'current' },
  { id: 2, equipment_id: 'EQ-002', name: 'Microplate Reader — Tecan Infinite M200', type: 'Analytical', status: 'active', location: 'Lab A-203', lastCalibration: '2025-12-15', nextCalibration: '2026-03-15', calibrationStatus: 'due_soon' },
  { id: 3, equipment_id: 'EQ-003', name: 'Laminar Flow Hood — Baker SterilGARD', type: 'Cleanroom', status: 'maintenance', location: 'Cleanroom B-101', lastCalibration: '2026-01-10', nextCalibration: '2026-04-10', calibrationStatus: 'current' },
  { id: 4, equipment_id: 'EQ-004', name: 'Temperature Logger — Kaye ValProbe', type: 'Monitoring', status: 'active', location: 'Storage C-301', lastCalibration: '2025-11-01', nextCalibration: '2026-02-01', calibrationStatus: 'overdue' },
];

export const batchRecords = [
  { id: 1, batch_id: 'BAT-2026-001', product: 'COVID-19 Rapid Antigen Test Kit', lot: 'LOT-2026-A-001', status: 'in_progress', startDate: '2026-03-01', yield: 94.2, units: 50000, step: 'Final QC' },
  { id: 2, batch_id: 'BAT-2026-002', product: 'HbA1c Assay Reagent Pack', lot: 'LOT-2026-B-002', status: 'completed', startDate: '2026-02-20', yield: 97.8, units: 25000, step: 'Released' },
  { id: 3, batch_id: 'BAT-2026-003', product: 'Troponin I Immunoassay', lot: 'LOT-2026-C-003', status: 'review', startDate: '2026-02-25', yield: 91.5, units: 15000, step: 'QA Review' },
];

export const managementReviews = [
  { id: 1, review_id: 'MR-2026-Q1', title: 'Q1 2026 Management Review', status: 'scheduled', date: '2026-03-28', topics: ['Quality Objectives', 'CAPA Effectiveness', 'Customer Feedback', 'Audit Results', 'Risk Assessment Update'] },
  { id: 2, review_id: 'MR-2025-Q4', title: 'Q4 2025 Management Review', status: 'completed', date: '2025-12-20', topics: ['Annual Quality Summary', 'Supplier Performance', 'Training Compliance', 'Regulatory Updates'] },
];

export const dmrs = [
  { id: 1, dmr_number: 'DMR-2026-0001', device_name: 'COVID-19 Rapid Antigen Test', device_class: 'II', status: 'active', completeness: 85, sections: { design: 12, manufacturing: 8, testing: 6, regulatory: 4 } },
  { id: 2, dmr_number: 'DMR-2026-0002', device_name: 'HbA1c Point-of-Care Analyzer', device_class: 'II', status: 'draft', completeness: 42, sections: { design: 5, manufacturing: 2, testing: 1, regulatory: 0 } },
];

export const correspondence = [
  { id: 1, correspondence_number: 'COR-2026-0001', subject: 'FDA 510(k) Pre-Submission Feedback', type: 'FDA', direction: 'INBOUND', status: 'action_required', priority: 'HIGH', sender: 'FDA CDRH', recipient: 'Dr. Sarah Chen', date: '2026-02-28', responseDeadline: '2026-03-14', isOverdue: false },
  { id: 2, correspondence_number: 'COR-2026-0002', subject: 'TÜV SÜD — ISO 13485 Audit Schedule', type: 'NOTIFIED_BODY', direction: 'INBOUND', status: 'acknowledged', priority: 'MEDIUM', sender: 'TÜV SÜD', recipient: 'James Miller', date: '2026-02-25', responseDeadline: '2026-03-10', isOverdue: false },
  { id: 3, correspondence_number: 'COR-2026-0003', subject: 'Reagent Supplier Qualification Renewal', type: 'SUPPLIER', direction: 'OUTBOUND', status: 'sent', priority: 'LOW', sender: 'Michael Park', recipient: 'BioReagent Corp', date: '2026-03-01', responseDeadline: null, isOverdue: false },
  { id: 4, correspondence_number: 'COR-2026-0004', subject: 'EU IVDR Technical Documentation Request', type: 'REGULATORY', direction: 'INBOUND', status: 'open', priority: 'URGENT', sender: 'EU Competent Authority', recipient: 'Dr. Sarah Chen', date: '2026-02-20', responseDeadline: '2026-03-01', isOverdue: true },
];

export const validationDocs = [
  { id: 1, protocol_id: 'VAL-IQ-001', title: 'Installation Qualification — PCR System', type: 'IQ', status: 'completed', equipment: 'Bio-Rad CFX96', department: 'Lab', completeness: 100, date: '2026-01-15' },
  { id: 2, protocol_id: 'VAL-OQ-001', title: 'Operational Qualification — Microplate Reader', type: 'OQ', status: 'in_progress', equipment: 'Tecan Infinite M200', department: 'Lab', completeness: 65, date: '2026-02-20' },
  { id: 3, protocol_id: 'VAL-PQ-001', title: 'Performance Qualification — LIMS v3.2', type: 'PQ', status: 'draft', equipment: 'LIMS Software', department: 'IT', completeness: 20, date: '2026-03-01' },
  { id: 4, protocol_id: 'VAL-IQ-002', title: 'Installation Qualification — Laminar Flow Hood', type: 'IQ', status: 'completed', equipment: 'Baker SterilGARD', department: 'Cleanroom', completeness: 100, date: '2025-12-01' },
];

export const periodicReviews = [
  { id: 1, document: 'Quality Manual', documentId: 'DOC-2026-0001', lastReview: '2025-08-28', dueDate: '2026-08-28', status: 'current', reviewer: 'Dr. Sarah Chen' },
  { id: 2, document: 'CAPA Management Procedure', documentId: 'DOC-2026-0003', lastReview: '2025-08-15', dueDate: '2026-03-15', status: 'due_soon', reviewer: 'Dr. Sarah Chen' },
  { id: 3, document: 'Equipment Calibration SOP', documentId: 'DOC-2026-0006', lastReview: '2025-02-25', dueDate: '2026-02-25', status: 'overdue', reviewer: 'Lisa Wang' },
];

export const controlledCopies = [
  { id: 1, copyId: 'CC-001', document: 'Quality Manual v3.2', recipient: 'Production Floor A', department: 'Production', issueDate: '2026-02-28', status: 'issued' },
  { id: 2, copyId: 'CC-002', document: 'Cleanroom Gowning SOP v2.0', recipient: 'Cleanroom B-101', department: 'Engineering', issueDate: '2026-01-15', status: 'issued' },
  { id: 3, copyId: 'CC-003', document: 'Design Control Procedure v1.5', recipient: 'R&D Lab', department: 'R&D', issueDate: '2025-11-01', status: 'superseded' },
];

export const documentLabels = [
  { id: 1, format: 'Standard', size: 'A4', description: 'Full document label with all info' },
  { id: 2, format: 'Compact', size: '2x3 in', description: 'Essential info only' },
  { id: 3, format: 'Regulatory', size: '3x4 in', description: 'With compliance markings' },
];

export const users = [
  { id: 1, name: 'Dr. Sarah Chen', role: 'Quality Director', department: 'Quality', email: 'sarah.chen@littu.com', status: 'active' },
  { id: 2, name: 'James Miller', role: 'R&D Manager', department: 'R&D', email: 'james.miller@littu.com', status: 'active' },
  { id: 3, name: 'Emily Rodriguez', role: 'Training Coordinator', department: 'HR', email: 'emily.rodriguez@littu.com', status: 'active' },
  { id: 4, name: 'Michael Park', role: 'Supply Chain Lead', department: 'Supply Chain', email: 'michael.park@littu.com', status: 'active' },
  { id: 5, name: 'Lisa Wang', role: 'Validation Engineer', department: 'Engineering', email: 'lisa.wang@littu.com', status: 'active' },
  { id: 6, name: 'Robert Kim', role: 'Production Supervisor', department: 'Production', email: 'robert.kim@littu.com', status: 'active' },
];
