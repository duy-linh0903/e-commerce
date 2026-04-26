import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AccountPage.css';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('profile');
  const [form, setForm] = useState({ name: user?.name || '', phone: '', address: '' });
  const [saved, setSaved] = useState(false);

  if (!user) { navigate('/login'); return null; }

  const handleSave = (e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="account-page">
      <div className="container">
        <h1 className="page-title">Tài khoản của tôi</h1>
        <div className="account-layout">
          {/* Sidebar */}
          <aside className="account-sidebar card">
            <div className="account-avatar">{user.name[0]}</div>
            <p className="account-name">{user.name}</p>
            <p className="account-email text-sm text-gray">{user.email}</p>
            <nav className="account-nav">
              {[['profile', '👤', 'Thông tin cá nhân'], ['security', '🔒', 'Bảo mật'], ['orders', '📦', 'Đơn hàng']].map(([key, icon, label]) => (
                <button key={key} className={`account-nav-item${tab === key ? ' active' : ''}`} onClick={() => key === 'orders' ? navigate('/orders') : setTab(key)}>
                  <span>{icon}</span> {label}
                </button>
              ))}
              <button className="account-nav-item text-danger" onClick={() => { logout(); navigate('/'); }}>
                <span>🚪</span> Đăng xuất
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="account-content">
            {tab === 'profile' && (
              <div className="card">
                <div className="card-header"><span className="font-semibold">Thông tin cá nhân</span></div>
                <div className="card-body">
                  {saved && <div className="alert-success">✅ Lưu thành công!</div>}
                  <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">Họ và tên</label>
                        <input className="form-control" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input className="form-control" value={user.email} disabled style={{ opacity: .6 }} />
                        <span className="form-hint">Email không thể thay đổi</span>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Số điện thoại</label>
                        <input className="form-control" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="09xxxxxxxx" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Địa chỉ</label>
                        <input className="form-control" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="Địa chỉ của bạn" />
                      </div>
                    </div>
                    <div><button type="submit" className="btn btn-primary">Lưu thay đổi</button></div>
                  </form>
                </div>
              </div>
            )}

            {tab === 'security' && (
              <div className="card">
                <div className="card-header"><span className="font-semibold">Đổi mật khẩu</span></div>
                <div className="card-body">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
                    {['Mật khẩu hiện tại', 'Mật khẩu mới', 'Xác nhận mật khẩu mới'].map(label => (
                      <div key={label} className="form-group">
                        <label className="form-label">{label}</label>
                        <input type="password" className="form-control" placeholder="••••••••" />
                      </div>
                    ))}
                    <div><button className="btn btn-primary" onClick={() => alert('Demo: Chưa kết nối backend')}>Đổi mật khẩu</button></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
