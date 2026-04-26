import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { paymentMethods, formatPrice } from '../../data/mockData';
import './CheckoutPage.css';

const STEPS = ['Thông tin giao hàng', 'Thanh toán', 'Xác nhận'];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', note: '' });
  const [payMethod, setPayMethod] = useState('COD');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const shipping = subtotal >= 5000000 ? 0 : 30000;
  const total = subtotal + shipping - discount;

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const applyCoupon = () => {
    if (coupon === 'SALE10') { setDiscount(Math.min(subtotal * 0.1, 1000000)); setCouponMsg('Áp dụng thành công: Giảm 10%'); }
    else if (coupon === 'FREESHIP') { setDiscount(30000); setCouponMsg('Áp dụng thành công: Miễn phí ship'); }
    else if (coupon === 'WELCOME50') { setDiscount(50000); setCouponMsg('Áp dụng thành công: Giảm 50,000đ'); }
    else setCouponMsg('Mã giảm giá không hợp lệ');
  };

  const handleOrder = () => {
    clearCart();
    navigate('/orders', { state: { justOrdered: true } });
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const enabledPayMethods = paymentMethods.filter(p => p.enabled);

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Thanh toán</h1>

        {/* Steps */}
        <div className="checkout-steps">
          {STEPS.map((s, i) => (
            <div key={s} className={`step${i <= step ? ' active' : ''}${i < step ? ' done' : ''}`}>
              <div className="step-num">{i < step ? '✓' : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          {/* Form */}
          <div className="checkout-form-area">
            {step === 0 && (
              <div className="card">
                <div className="card-header"><span className="font-semibold">Thông tin giao hàng</span></div>
                <div className="card-body">
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Họ và tên *</label>
                      <input name="name" className="form-control" value={form.name} onChange={handleChange} placeholder="Nguyễn Văn A" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Số điện thoại *</label>
                      <input name="phone" className="form-control" value={form.phone} onChange={handleChange} placeholder="09xxxxxxxx" required />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1/-1' }}>
                      <label className="form-label">Địa chỉ *</label>
                      <input name="address" className="form-control" value={form.address} onChange={handleChange} placeholder="Số nhà, tên đường" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tỉnh/Thành phố *</label>
                      <select name="city" className="form-control" value={form.city} onChange={handleChange} required>
                        <option value="">Chọn tỉnh/thành</option>
                        {['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'Bình Dương'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group" style={{ gridColumn: '1/-1' }}>
                      <label className="form-label">Ghi chú</label>
                      <textarea name="note" className="form-control" rows={3} value={form.note} onChange={handleChange} placeholder="Ghi chú cho đơn hàng (không bắt buộc)" />
                    </div>
                  </div>
                  <button className="btn btn-primary btn-lg mt-4" onClick={() => setStep(1)} disabled={!form.name || !form.phone || !form.address || !form.city}>
                    Tiếp tục →
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="card">
                <div className="card-header"><span className="font-semibold">Phương thức thanh toán</span></div>
                <div className="card-body">
                  <div className="pay-methods">
                    {enabledPayMethods.map(p => (
                      <label key={p.code} className={`pay-method${payMethod === p.code ? ' active' : ''}`}>
                        <input type="radio" name="pay" checked={payMethod === p.code} onChange={() => setPayMethod(p.code)} />
                        <span className="pay-icon">{p.icon}</span>
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-sm text-gray">{p.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="btn btn-secondary" onClick={() => setStep(0)}>← Quay lại</button>
                    <button className="btn btn-primary btn-lg" onClick={() => setStep(2)}>Xem lại đơn →</button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="card">
                <div className="card-header"><span className="font-semibold">Xác nhận đơn hàng</span></div>
                <div className="card-body">
                  <div className="confirm-section">
                    <h4>Thông tin giao hàng</h4>
                    <p><strong>{form.name}</strong> · {form.phone}</p>
                    <p>{form.address}, {form.city}</p>
                    {form.note && <p className="text-gray text-sm">Ghi chú: {form.note}</p>}
                  </div>
                  <div className="confirm-section">
                    <h4>Thanh toán</h4>
                    <p>{enabledPayMethods.find(p => p.code === payMethod)?.name}</p>
                  </div>
                  <div className="confirm-section">
                    <h4>Sản phẩm ({items.length})</h4>
                    {items.map(item => (
                      <div key={item.variantId} className="confirm-item">
                        <span>{item.name} - {item.variant} × {item.qty}</span>
                        <span>{formatPrice(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="btn btn-secondary" onClick={() => setStep(1)}>← Quay lại</button>
                    <button className="btn btn-primary btn-lg" onClick={handleOrder}>✓ Đặt hàng</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="checkout-summary card">
            <div className="card-header"><span className="font-semibold">Đơn hàng ({items.length})</span></div>
            <div className="card-body">
              <div className="summary-items">
                {items.map(item => (
                  <div key={item.variantId} className="summary-product">
                    <img src={item.thumbnail} alt={item.name} />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-sm text-gray">{item.variant} × {item.qty}</p>
                    </div>
                    <span className="font-semibold text-sm">{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="coupon-row">
                <input className="form-control" placeholder="Mã giảm giá" value={coupon} onChange={e => { setCoupon(e.target.value.toUpperCase()); setCouponMsg(''); }} />
                <button className="btn btn-outline btn-sm" onClick={applyCoupon}>Áp dụng</button>
              </div>
              {couponMsg && <p className={`text-sm ${couponMsg.includes('không') ? 'text-danger' : 'text-success'}`}>{couponMsg}</p>}

              <div className="divider" />
              <div className="summary-row"><span>Tạm tính</span><span>{formatPrice(subtotal)}</span></div>
              <div className="summary-row"><span>Vận chuyển</span><span>{shipping === 0 ? <span className="text-success">Miễn phí</span> : formatPrice(shipping)}</span></div>
              {discount > 0 && <div className="summary-row text-success"><span>Giảm giá</span><span>−{formatPrice(discount)}</span></div>}
              <div className="divider" />
              <div className="summary-row summary-total"><span>Tổng cộng</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
