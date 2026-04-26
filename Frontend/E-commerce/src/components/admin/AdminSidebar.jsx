import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminSidebar.css';

const NAV = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/products', icon: '📦', label: 'Sản phẩm' },
  { to: '/admin/orders', icon: '🛒', label: 'Đơn hàng' },
  { to: '/admin/customers', icon: '👥', label: 'Khách hàng' },
  { to: '/admin/categories', icon: '🗂️', label: 'Danh mục' },
  { to: '/admin/promotions', icon: '🎟️', label: 'Khuyến mãi' },
  { to: '/admin/reports', icon: '📈', label: 'Báo cáo' },
  { to: '/admin/payment-methods', icon: '💳', label: 'Thanh toán' },
  { to: '/admin/staff', icon: '👔', label: 'Nhân viên' },
];

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <span>🛒</span>
        <div>
          <p className="sidebar-logo-name">TechShop</p>
          <p className="sidebar-logo-role">Admin Panel</p>
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
            <p className="sidebar-user-role text-sm">Administrator</p>
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
