import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../admin/AdminSidebar.css';

const NAV = [
  { to: '/staff/orders', icon: '🛒', label: 'Xử lý đơn hàng' },
  { to: '/staff/support', icon: '💬', label: 'Hỗ trợ khách hàng' },
  { to: '/staff/inventory', icon: '📦', label: 'Quản lý kho' },
];

export default function StaffSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <span>🛒</span>
        <div>
          <p className="sidebar-logo-name">TechShop</p>
          <p className="sidebar-logo-role">Staff Panel</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        {NAV.map(item => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{user?.name?.[0]}</div>
          <div>
            <p className="sidebar-user-name">{user?.name}</p>
            <p className="sidebar-user-role text-sm">Staff</p>
          </div>
        </div>
        <div className="sidebar-actions">
          <button onClick={() => navigate('/')} className="sidebar-btn">🌐 Website</button>
          <button onClick={() => { logout(); navigate('/login'); }} className="sidebar-btn text-danger">🚪 Đăng xuất</button>
        </div>
      </div>
    </aside>
  );
}
