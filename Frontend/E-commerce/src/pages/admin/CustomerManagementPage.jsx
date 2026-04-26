import { useState } from 'react';
import { customers as initCustomers, formatPrice } from '../../data/mockData';
import './AdminPage.css';

export default function CustomerManagementPage() {
  const [customerList, setCustomerList] = useState(initCustomers);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = customerList.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const toggleStatus = (id) => setCustomerList(l => l.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c));

  return (
    <div className="admin-page">
      <div className="admin-toolbar">
        <div className="search-bar">
          <span className="search-bar-icon">🔍</span>
          <input className="form-control" placeholder="Tìm tên, email, số điện thoại..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <span className="text-sm text-gray">Tổng: <strong>{customerList.length}</strong> khách hàng</span>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>Khách hàng</th><th>Liên hệ</th><th>Ngày đăng ký</th><th>Đơn hàng</th><th>Tổng chi tiêu</th><th>Trạng thái</th><th>Thao tác</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{c.name[0]}</div>
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm">{c.email}</p>
                    <p className="text-sm text-gray">{c.phone}</p>
                  </td>
                  <td className="text-gray">{c.joinDate}</td>
                  <td>{c.totalOrders} đơn</td>
                  <td className="font-semibold text-primary">{formatPrice(c.totalSpent)}</td>
                  <td>
                    <span className={`badge ${c.status === 'active' ? 'badge-green' : 'badge-gray'}`}>
                      {c.status === 'active' ? 'Đang hoạt động' : 'Ngưng hoạt động'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-sm btn-secondary" onClick={() => setSelected(c)}>Xem</button>
                      <button className={`btn btn-sm ${c.status === 'active' ? 'btn-danger' : 'btn-success'}`} onClick={() => toggleStatus(c.id)}>
                        {c.status === 'active' ? 'Khóa' : 'Mở khóa'}
                      </button>
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
              <span className="font-semibold">Thông tin khách hàng</span>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--primary)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700 }}>{selected.name[0]}</div>
                <div>
                  <p className="font-bold text-xl">{selected.name}</p>
                  <span className={`badge ${selected.status === 'active' ? 'badge-green' : 'badge-gray'}`}>{selected.status === 'active' ? 'Đang hoạt động' : 'Ngưng hoạt động'}</span>
                </div>
              </div>
              {[['📧 Email', selected.email], ['📞 Điện thoại', selected.phone], ['📍 Địa chỉ', selected.address], ['📅 Ngày đăng ký', selected.joinDate], ['🛒 Số đơn hàng', `${selected.totalOrders} đơn`], ['💰 Tổng chi tiêu', formatPrice(selected.totalSpent)]].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', gap: 12 }}>
                  <span style={{ width: 140, color: 'var(--gray-500)', fontSize: 14 }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
