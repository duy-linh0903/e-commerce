import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = login(form.email, form.password);
    setLoading(false);
    if (result.ok) {
      const role = result.role;
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'staff') navigate('/staff/orders');
      else navigate('/');
    } else {
      setError(result.message);
    }
  };

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🛒</div>
        <h2 className="auth-title">Đăng nhập</h2>
        <p className="auth-subtitle">Chào mừng trở lại!</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" placeholder="Nhập email của bạn" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <input name="password" type="password" className="form-control" placeholder="Nhập mật khẩu" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-full btn-lg" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="auth-demo">
          <p className="text-sm text-gray">Tài khoản demo:</p>
          <div className="auth-demo-list">
            <span onClick={() => setForm({ email: 'admin@shop.com', password: 'admin123' })}>Admin</span>
            <span onClick={() => setForm({ email: 'dinhvangiang@shop.com', password: 'staff123' })}>Staff</span>
            <span onClick={() => setForm({ email: 'nguyenvanan@gmail.com', password: 'customer123' })}>Customer</span>
          </div>
        </div>

        <p className="auth-footer">
          Chưa có tài khoản? <Link to="/register" className="text-primary font-semibold">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}
