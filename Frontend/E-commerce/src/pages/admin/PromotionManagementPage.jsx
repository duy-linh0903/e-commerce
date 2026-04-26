import { useState } from 'react';
import { promotions as initPromos, PROMOTION_STATUS_LABEL, formatPrice } from '../../data/mockData';
import './AdminPage.css';
import './PromotionManagementPage.css';

const STATUS_BADGE = { active: 'badge-green', expired: 'badge-gray', upcoming: 'badge-blue' };

export default function PromotionManagementPage() {
  const [promoList, setPromoList] = useState(initPromos);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ code: '', type: 'percent', value: '', minOrderValue: '', maxDiscount: '', usageLimit: '', startDate: '', endDate: '', description: '' });

  const openAdd = () => { setEditing(null); setForm({ code: '', type: 'percent', value: '', minOrderValue: '', maxDiscount: '', usageLimit: '', startDate: '', endDate: '', description: '' }); setShowModal(true); };
  const openEdit = (p) => { setEditing(p.id); setForm({ code: p.code, type: p.type, value: p.value, minOrderValue: p.minOrderValue, maxDiscount: p.maxDiscount, usageLimit: p.usageLimit, startDate: p.startDate, endDate: p.endDate, description: p.description }); setShowModal(true); };
  const handleDelete = (id) => { if (confirm('Xóa mã giảm giá này?')) setPromoList(l => l.filter(p => p.id !== id)); };

  const handleSave = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0,10);
    const status = form.endDate < today ? 'expired' : form.startDate > today ? 'upcoming' : 'active';
    if (editing) {
      setPromoList(l => l.map(p => p.id === editing ? { ...p, ...form, value: Number(form.value), minOrderValue: Number(form.minOrderValue), maxDiscount: Number(form.maxDiscount), usageLimit: Number(form.usageLimit), status } : p));
    } else {
      setPromoList(l => [...l, { id: Date.now(), ...form, value: Number(form.value), minOrderValue: Number(form.minOrderValue), maxDiscount: Number(form.maxDiscount), usageLimit: Number(form.usageLimit), usedCount: 0, status }]);
    }
    setShowModal(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-toolbar">
        <span className="text-sm text-gray">Tổng <strong>{promoList.length}</strong> mã</span>
        <button className="btn btn-primary" onClick={openAdd}>+ Tạo mã giảm giá</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Mã</th><th>Loại</th><th>Giá trị</th><th>Đơn tối thiểu</th><th>Đã dùng</th><th>Hiệu lực</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>
              {promoList.map(p => (
                <tr key={p.id}>
                  <td><span className="promo-code-badge">{p.code}</span></td>
                  <td>{p.type === 'percent' ? 'Phần trăm' : 'Cố định'}</td>
                  <td className="font-semibold">{p.type === 'percent' ? `${p.value}%` : formatPrice(p.value)}</td>
                  <td className="text-sm">{formatPrice(p.minOrderValue)}</td>
                  <td className="text-sm">{p.usedCount}/{p.usageLimit}</td>
                  <td className="text-sm text-gray">{p.startDate} → {p.endDate}</td>
                  <td><span className={`badge ${STATUS_BADGE[p.status]}`}>{PROMOTION_STATUS_LABEL[p.status]}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-sm btn-secondary" onClick={() => openEdit(p)}>Sửa</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="font-semibold">{editing ? 'Sửa mã giảm giá' : 'Tạo mã giảm giá mới'}</span>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Mã giảm giá *</label>
                    <input className="form-control" value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} style={{ textTransform: 'uppercase' }} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Loại *</label>
                    <select className="form-control" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                      <option value="percent">Phần trăm (%)</option>
                      <option value="fixed">Cố định (VND)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Giá trị *</label>
                    <input className="form-control" type="number" value={form.value} onChange={e => setForm(p => ({ ...p, value: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Giảm tối đa (VND)</label>
                    <input className="form-control" type="number" value={form.maxDiscount} onChange={e => setForm(p => ({ ...p, maxDiscount: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Đơn tối thiểu (VND)</label>
                    <input className="form-control" type="number" value={form.minOrderValue} onChange={e => setForm(p => ({ ...p, minOrderValue: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Giới hạn sử dụng</label>
                    <input className="form-control" type="number" value={form.usageLimit} onChange={e => setForm(p => ({ ...p, usageLimit: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Ngày bắt đầu *</label>
                    <input className="form-control" type="date" value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Ngày kết thúc *</label>
                    <input className="form-control" type="date" value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} required />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1/-1' }}>
                    <label className="form-label">Mô tả</label>
                    <input className="form-control" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary">{editing ? 'Lưu thay đổi' : 'Tạo mã'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
