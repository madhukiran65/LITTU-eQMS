import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen bg-eqms-dark">
      <Sidebar />
      <Header />
      <main className="ml-64 pt-14">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
