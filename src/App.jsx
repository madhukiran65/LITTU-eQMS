import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Documents from './pages/documents/Documents';
import DMR from './pages/documents/DMR';
import Correspondence from './pages/documents/Correspondence';
import Validation from './pages/documents/Validation';
import DocumentManagement from './pages/documents/DocumentManagement';
import Labeling from './pages/documents/Labeling';
import Capa from './pages/capa/Capa';
import Deviations from './pages/deviations/Deviations';
import ChangeControls from './pages/change-controls/ChangeControls';
import Complaints from './pages/complaints/Complaints';
import Training from './pages/training/Training';
import Audits from './pages/audits/Audits';
import Suppliers from './pages/suppliers/Suppliers';
import Risk from './pages/risk/Risk';
import Equipment from './pages/equipment/Equipment';
import Production from './pages/production/Production';
import ManagementReview from './pages/management-review/ManagementReview';
import Admin from './pages/admin/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/dmr" element={<DMR />} />
          <Route path="/documents/correspondence" element={<Correspondence />} />
          <Route path="/documents/validation" element={<Validation />} />
          <Route path="/documents/management" element={<DocumentManagement />} />
          <Route path="/documents/labeling" element={<Labeling />} />
          <Route path="/capa" element={<Capa />} />
          <Route path="/deviations" element={<Deviations />} />
          <Route path="/change-controls" element={<ChangeControls />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/training" element={<Training />} />
          <Route path="/audits" element={<Audits />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/risk" element={<Risk />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/production" element={<Production />} />
          <Route path="/management-review" element={<ManagementReview />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
