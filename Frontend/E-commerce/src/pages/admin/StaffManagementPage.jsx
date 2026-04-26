import { useState } from 'react';
import { staffList as initStaff } from '../../data/mockData';
import './AdminPage.css';

export default function StaffManagementPage() {
  const [staffs, setStaffs] = useState(initStaff);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', department: '' });

  const openAdd = () => { setEditing(null); setForm({ name: '', email: '', phone: '', department: '' }); setShowModal(true); };
  const openEdit = (s) => { setEditing(s.id); setForm({ name: s.name, email: s.email, phone: s.phone, department: s.department }); setShowModal(true); };
  const handleDelete = (id) => { if (confirm('Xóa nhân viên này?')) setStaffs(l => l.filter(s => s.id !== id)); };
  const toggleStatus = (id) => setStaffs(l => l.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s));

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      setStaffs(l => l.map(s => s.id === editing ? { ...s, ...form } : s));
    } else {
      setStaffs(l => [...l, { id: Date.now(), ...form, role: 'Staff', joinDate: new Date().toISOString().slice(0,10), status: 'active', avatar: `https://placehold.co/60x60?text=${form.name[0]}` }]);
    }
    setShowModal(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-toolbar">
        <span className="text-sm text-gray">Tổng <strong>{staffs.length}</strong> nhân viên</span>
        <button className="btn btn-primary" onClick={openAdd}>+ Thêm nhân viên</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Nhân viên</th><th>Email</th><th>SĐT</th><th>Phòng ban</th><th>Ngày vào</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>
              {staffs.map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{s.name[0]}</div>
                      <span className="font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td className="text-sm">{s.email}</td>
                  <td className="text-sm">{s.phone}</td>
                  <td>{s.department}</td>
                  <td className="text-gray text-sm">{s.joinDate}</td>
                  <td><span className={`badge ${s.status === 'active' ? 'badge-green' : 'badge-gray'}`}>{s.status === 'active' ? 'Đang làm' : 'Nghỉ việc'}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-sm btn-secondary" onClick={() => openEdit(s)}>Sửa</button>
                      <button className={`btn btn-sm ${s.status === 'active' ? 'btn-outline' : 'btn-success'}`} onClick={() => toggleStatus(s.id)}>
                        {s.status === 'active' ? 'Nghỉ' : 'Kích hoạt'}
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s.id)}>Xóa</button>
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
          <div className="modal modal-md" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="font-semibold">{editing ? 'Sửa nhân viên' : 'Thêm nhân viên mới'}</span>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[['name', 'Họ và tên', 'text'], ['email', 'Email', 'email'], ['phone', 'Số điện thoại', 'text']].map(([key, label, type]) => (
                  <div key={key} className="form-group">
                    <label className="form-label">{label} *</label>
                    <input type={type} className="form-control" value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} required />
                  </div>
                ))}
                <div className="form-group">
                  <label className="form-label">Phòng ban</label>
                  <select className="form-control" value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))}>
                    <option value="">Chọn phòng ban</option>
                    {['Kho hàng', 'Chăm sóc KH', 'Vận hành', 'Marketing'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary">{editing ? 'Lưu' : 'Thêm'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
