import { Outlet, Navigate } from 'react-router-dom';
import StaffSidebar from '../components/staff/StaffSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

export default function StaffLayout() {
  const { user } = useAuth();
  if (!user || (user.role !== 'staff' && user.role !== 'admin')) return <Navigate to="/login" replace />;

  return (
    <div className="admin-layout">
      <StaffSidebar />
      <div className="admin-main">
        <AdminHeader />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
