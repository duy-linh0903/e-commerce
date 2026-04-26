import { useState } from 'react';
import { orders as initOrders, ORDER_STATUS_LABEL, ORDER_STATUS_COLOR, formatPrice } from '../../data/mockData';
import './AdminPage.css';
import './OrderManagementPage.css';

const STATUSES = ['all', 'pending', 'confirmed', 'shipping', 'delivered', 'cancelled'];

export default function OrderManagementPage() {
  const [orderList, setOrderList] = useState(initOrders);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = orderList.filter(o => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchSearch = o.id.includes(search) || o.customerName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const updateStatus = (orderId, newStatus) => {
    setOrderList(l => l.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    setSelected(prev => prev ? { ...prev, status: newStatus } : null);
  };

  return (
    <div className="admin-page">
      {/* Filter tabs */}
      <div className="status-tabs">
        {STATUSES.map(s => (
          <button key={s} className={`tab-btn${statusFilter === s ? ' active' : ''}`} onClick={() => setStatusFilter(s)}>
            {s === 'all' ? 'Tất cả' : ORDER_STATUS_LABEL[s]}
            <span className="tab-count">{s === 'all' ? orderList.length : orderList.filter(o => o.status === s).length}</span>
          </button>
        ))}
      </div>

      <div className="admin-toolbar">
        <div className="search-bar">
          <span className="search-bar-icon">🔍</span>
          <input className="form-control" placeholder="Tìm mã đơn, tên khách..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>Mã đơn</th><th>Khách hàng</th><th>Ngày đặt</th><th>Sản phẩm</th><th>Tổng tiền</th><th>Thanh toán</th><th>Trạng thái</th><th>Thao tác</th></tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td className="font-semibold text-primary">#{o.id}</td>
                  <td>
                    <p className="font-medium">{o.customerName}</p>
                    <p className="text-sm text-gray">{o.customerPhone}</p>
                  </td>
                  <td className="text-gray">{o.date}</td>
                  <td className="text-sm">{o.items.length} sản phẩm</td>
                  <td className="font-semibold">{formatPrice(o.total)}</td>
                  <td>
                    <span className={`badge ${o.paymentStatus === 'paid' ? 'badge-green' : 'badge-yellow'}`}>
                      {o.paymentStatus === 'paid' ? 'Đã TT' : 'Chưa TT'} · {o.paymentMethod}
                    </span>
                  </td>
                  <td>
                    <span className="badge" style={{ background: ORDER_STATUS_COLOR[o.status] + '22', color: ORDER_STATUS_COLOR[o.status] }}>
                      {ORDER_STATUS_LABEL[o.status]}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-secondary" onClick={() => setSelected(o)}>Chi tiết</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="empty-state"><div className="empty-state-icon">🛒</div><p>Không có đơn hàng</p></div>}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="font-semibold">Chi tiết đơn #{selected.id}</span>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="order-detail-grid">
                <div>
                  <p className="detail-section-title">Khách hàng</p>
                  <p className="font-semibold">{selected.customerName}</p>
                  <p className="text-sm text-gray">{selected.customerPhone} · {selected.customerEmail}</p>
                  <p className="text-sm text-gray">{selected.shippingAddress}</p>
                </div>
                <div>
                  <p className="detail-section-title">Thanh toán</p>
                  <p>{selected.paymentMethod}</p>
                  <span className={`badge ${selected.paymentStatus === 'paid' ? 'badge-green' : 'badge-yellow'}`}>
                    {selected.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </span>
                </div>
              </div>

              <p className="detail-section-title mt-4">Sản phẩm</p>
              {selected.items.map((item, i) => (
                <div key={i} className="modal-order-item">
                  <span className="flex-1">{item.name} - {item.variant}</span>
                  <span className="text-gray">x{item.qty}</span>
                  <span className="font-semibold">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}

              <div className="modal-order-totals">
                <div className="modal-total-row"><span>Tạm tính</span><span>{formatPrice(selected.subtotal)}</span></div>
                {selected.discount > 0 && <div className="modal-total-row text-success"><span>Giảm giá</span><span>−{formatPrice(selected.discount)}</span></div>}
                <div className="modal-total-row"><span>Phí ship</span><span>{selected.shippingFee === 0 ? 'Miễn phí' : formatPrice(selected.shippingFee)}</span></div>
                <div className="modal-total-row modal-total-final"><span>Tổng cộng</span><span>{formatPrice(selected.total)}</span></div>
              </div>

              <p className="detail-section-title mt-4">Cập nhật trạng thái</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {Object.entries(ORDER_STATUS_LABEL).map(([key, label]) => (
                  <button key={key} className={`btn btn-sm ${selected.status === key ? 'btn-primary' : 'btn-secondary'}`} onClick={() => updateStatus(selected.id, key)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
