import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { orders, ORDER_STATUS_LABEL, ORDER_STATUS_COLOR, formatPrice } from '../../data/mockData';
import './OrderTrackingPage.css';

const TIMELINE_STATUS = ['pending', 'confirmed', 'shipping', 'delivered'];

export default function OrderTrackingPage() {
  const { user } = useAuth();
  const location = useLocation();
  const justOrdered = location.state?.justOrdered;

  const userOrders = user
    ? orders.filter(o => o.customerEmail === user.email)
    : orders.slice(0, 2);

  return (
    <div className="order-tracking-page">
      <div className="container">
        <h1 className="page-title">Đơn hàng của tôi</h1>

        {justOrdered && (
          <div className="order-success-banner">
            ✅ <strong>Đặt hàng thành công!</strong> Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất có thể.
          </div>
        )}

        {userOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <p className="empty-state-text">Bạn chưa có đơn hàng nào</p>
          </div>
        ) : (
          <div className="orders-list">
            {userOrders.map(order => (
              <div key={order.id} className="order-card card">
                <div className="order-card-header">
                  <div>
                    <span className="order-id">#{order.id}</span>
                    <span className="text-sm text-gray"> · {order.date}</span>
                  </div>
                  <span className="badge" style={{ background: ORDER_STATUS_COLOR[order.status] + '22', color: ORDER_STATUS_COLOR[order.status] }}>
                    {ORDER_STATUS_LABEL[order.status]}
                  </span>
                </div>

                {/* Progress bar */}
                {order.status !== 'cancelled' && (
                  <div className="order-progress">
                    {TIMELINE_STATUS.map((s, i) => {
                      const idx = TIMELINE_STATUS.indexOf(order.status);
                      const done = i <= idx;
                      return (
                        <div key={s} className={`progress-step${done ? ' done' : ''}`}>
                          <div className="progress-dot" />
                          <span>{ORDER_STATUS_LABEL[s]}</span>
                          {i < TIMELINE_STATUS.length - 1 && <div className={`progress-line${done && i < idx ? ' done' : ''}`} />}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Items */}
                <div className="order-items">
                  {order.items.map((item, i) => (
                    <div key={i} className="order-item">
                      <span>{item.name} - {item.variant}</span>
                      <span className="text-gray">x{item.qty}</span>
                      <span className="font-semibold">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <div>
                    <span className="text-sm text-gray">{order.paymentMethod} · </span>
                    <span className={`text-sm font-medium ${order.paymentStatus === 'paid' ? 'text-success' : 'text-danger'}`}>
                      {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </span>
                  </div>
                  <div className="order-total">
                    Tổng: <strong>{formatPrice(order.total)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
