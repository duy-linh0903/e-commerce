import { useState } from 'react';
import { categories as initCats } from '../../data/mockData';
import './AdminPage.css';

export default function CategoryManagementPage() {
  const [catList, setCatList] = useState(initCats);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '' });

  const openAdd = () => { setEditing(null); setForm({ name: '', slug: '' }); setShowModal(true); };
  const openEdit = (c) => { setEditing(c.id); setForm({ name: c.name, slug: c.slug }); setShowModal(true); };
  const handleDelete = (id) => { if (confirm('Xóa danh mục này?')) setCatList(l => l.filter(c => c.id !== id)); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      setCatList(l => l.map(c => c.id === editing ? { ...c, ...form } : c));
    } else {
      setCatList(l => [...l, { id: Date.now(), ...form, parentId: null, productCount: 0 }]);
    }
    setShowModal(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-toolbar">
        <span className="text-sm text-gray">Tổng <strong>{catList.length}</strong> danh mục</span>
        <button className="btn btn-primary" onClick={openAdd}>+ Thêm danh mục</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>#</th><th>Tên danh mục</th><th>Slug</th><th>Số sản phẩm</th><th>Thao tác</th></tr></thead>
            <tbody>
              {catList.map(c => (
                <tr key={c.id}>
                  <td className="text-gray">{c.id}</td>
                  <td className="font-medium">{c.name}</td>
                  <td className="text-gray text-sm">{c.slug}</td>
                  <td>{c.productCount}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-sm btn-secondary" onClick={() => openEdit(c)}>Sửa</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Xóa</button>
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
          <div className="modal modal-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="font-semibold">{editing ? 'Sửa danh mục' : 'Thêm danh mục'}</span>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Tên danh mục *</label>
                  <input className="form-control" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value, slug: e.target.value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/\s+/g,'-') }))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Slug</label>
                  <input className="form-control" value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} />
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
