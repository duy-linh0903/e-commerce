import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">🛒 TechShop</div>
            <p>Nền tảng mua sắm công nghệ uy tín hàng đầu Việt Nam. Cam kết chính hãng, bảo hành đầy đủ.</p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="YouTube">▶️</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Sản phẩm</h4>
            <Link to="/products?category=1">Điện thoại</Link>
            <Link to="/products?category=2">Laptop</Link>
            <Link to="/products?category=4">Tai nghe</Link>
            <Link to="/products?category=5">Đồng hồ thông minh</Link>
            <Link to="/products?category=6">Phụ kiện</Link>
          </div>

          <div className="footer-col">
            <h4>Hỗ trợ</h4>
            <Link to="/support">Trung tâm hỗ trợ</Link>
            <Link to="/orders">Tra cứu đơn hàng</Link>
            <a href="#">Chính sách đổi trả</a>
            <a href="#">Chính sách bảo hành</a>
            <a href="#">Hướng dẫn mua hàng</a>
          </div>

          <div className="footer-col">
            <h4>Liên hệ</h4>
            <p>📍 123 Nguyễn Huệ, Q1, TP.HCM</p>
            <p>📞 1800 1234 (miễn phí)</p>
            <p>✉️ support@techshop.vn</p>
            <p>🕐 8:00 - 22:00 hàng ngày</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 TechShop. All rights reserved.</p>
          <div className="footer-payment">
            <span>💳</span><span>🏦</span><span>📱</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
