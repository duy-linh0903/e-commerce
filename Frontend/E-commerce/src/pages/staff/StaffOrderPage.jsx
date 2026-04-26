import { useState } from 'react';
import { orders as initOrders, ORDER_STATUS_LABEL, ORDER_STATUS_COLOR, formatPrice } from '../../data/mockData';
import '../admin/OrderManagementPage.css';
import '../admin/AdminPage.css';

const ALLOWED_TRANSITIONS = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['shipping', 'cancelled'],
  shipping: ['delivered'],
  delivered: [],
  cancelled: [],
};

export default function StaffOrderPage() {
  const [orderList, setOrderList] = useState(initOrders);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = statusFilter === 'all' ? orderList : orderList.filter(o => o.status === statusFilter);

  const updateStatus = (orderId, newStatus) => {
    setOrderList(l => l.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    setSelected(prev => prev ? { ...prev, status: newStatus } : null);
  };

  return (
    <div className="admin-page">
      <div className="status-tabs">
        {['all', 'pending', 'confirmed', 'shipping', 'delivered', 'cancelled'].map(s => (
          <button key={s} className={`tab-btn${statusFilter === s ? ' active' : ''}`} onClick={() => setStatusFilter(s)}>
            {s === 'all' ? 'Tất cả' : ORDER_STATUS_LABEL[s]}
            <span className="tab-count">{s === 'all' ? orderList.length : orderList.filter(o => o.status === s).length}</span>
          </button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Ngày</th><th>Tổng</th><th>Thanh toán</th><th>Trạng thái</th><th>Hành động</th></tr></thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td className="font-semibold text-primary">#{o.id}</td>
                  <td>{o.customerName}<br /><span className="text-sm text-gray">{o.customerPhone}</span></td>
                  <td className="text-gray text-sm">{o.date}</td>
                  <td className="font-semibold">{formatPrice(o.total)}</td>
                  <td><span className={`badge ${o.paymentStatus === 'paid' ? 'badge-green' : 'badge-yellow'}`}>{o.paymentStatus === 'paid' ? 'Đã TT' : 'COD'}</span></td>
                  <td><span className="badge" style={{ background: ORDER_STATUS_COLOR[o.status] + '22', color: ORDER_STATUS_COLOR[o.status] }}>{ORDER_STATUS_LABEL[o.status]}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <button className="btn btn-sm btn-secondary" onClick={() => setSelected(o)}>Chi tiết</button>
                      {ALLOWED_TRANSITIONS[o.status].map(next => (
                        <button key={next} className="btn btn-sm btn-primary" onClick={() => updateStatus(o.id, next)}>
                          → {ORDER_STATUS_LABEL[next]}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal modal-md" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="font-semibold">Chi tiết đơn #{selected.id}</span>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="modal-body">
              <p><strong>{selected.customerName}</strong> · {selected.customerPhone}</p>
              <p className="text-sm text-gray mb-4">{selected.shippingAddress}</p>
              {selected.items.map((item, i) => (
                <div key={i} className="modal-order-item">
                  <span style={{ flex: 1 }}>{item.name} ({item.variant})</span>
                  <span className="text-gray">×{item.qty}</span>
                  <span className="font-semibold">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="modal-order-totals mt-4">
                <div className="modal-total-final"><span>Tổng cộng</span><span>{formatPrice(selected.total)}</span></div>
              </div>
              {selected.notes && <p className="text-sm text-gray mt-2">Ghi chú: {selected.notes}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
