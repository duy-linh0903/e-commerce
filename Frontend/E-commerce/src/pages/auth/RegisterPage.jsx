import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Mật khẩu xác nhận không khớp'); return; }
    alert('Đăng ký thành công! (demo - chưa kết nối backend)');
    navigate('/login');
  };

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🛒</div>
        <h2 className="auth-title">Tạo tài khoản</h2>
        <p className="auth-subtitle">Đăng ký để mua sắm dễ dàng hơn</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Họ và tên</label>
            <input name="name" className="form-control" placeholder="Nguyễn Văn A" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" placeholder="email@example.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Số điện thoại</label>
            <input name="phone" className="form-control" placeholder="09xxxxxxxx" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <input name="password" type="password" className="form-control" placeholder="Tối thiểu 6 ký tự" value={form.password} onChange={handleChange} required minLength={6} />
          </div>
          <div className="form-group">
            <label className="form-label">Xác nhận mật khẩu</label>
            <input name="confirm" type="password" className="form-control" placeholder="Nhập lại mật khẩu" value={form.confirm} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-full btn-lg">Đăng ký</button>
        </form>

        <p className="auth-footer">
          Đã có tài khoản? <Link to="/login" className="text-primary font-semibold">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
