import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { categories } from '../../data/mockData';
import './Navbar.css';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?q=${encodeURIComponent(search.trim())}`);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">🛒 <span>TechShop</span></Link>

          {/* Search */}
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>

          {/* Actions */}
          <div className="navbar-actions">
            <Link to="/cart" className="navbar-cart">
              🛒
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
            {user ? (
              <div className="navbar-user">
                <span className="navbar-user-name">{user.name.split(' ').slice(-1)[0]}</span>
                <div className="navbar-dropdown">
                  {user.role === 'admin' && <Link to="/admin/dashboard">Admin Panel</Link>}
                  {user.role === 'staff' && <Link to="/staff/orders">Staff Panel</Link>}
                  <Link to="/account">Tài khoản</Link>
                  <Link to="/orders">Đơn hàng</Link>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">Đăng nhập</Link>
            )}
            <button className="navbar-toggle" onClick={() => setMenuOpen(p => !p)}>☰</button>
          </div>
        </div>

        {/* Category nav */}
        <nav className={`navbar-cats ${menuOpen ? 'open' : ''}`}>
          <Link to="/products">Tất cả sản phẩm</Link>
          {categories.map(cat => (
            <Link key={cat.id} to={`/products?category=${cat.id}`} onClick={() => setMenuOpen(false)}>
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
