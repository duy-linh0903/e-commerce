import { useState } from 'react';
import { products as initProducts, categories, formatPrice } from '../../data/mockData';
import './AdminPage.css';

export default function ProductManagementPage() {
  const [productList, setProductList] = useState(initProducts);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', brand: '', categoryId: '', basePrice: '', stock: '', description: '' });

  const filtered = productList.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter ? p.categoryId === Number(catFilter) : true;
    return matchSearch && matchCat;
  });

  const openAdd = () => { setEditing(null); setForm({ name: '', brand: '', categoryId: '', basePrice: '', stock: '', description: '' }); setShowModal(true); };
  const openEdit = (p) => { setEditing(p.id); setForm({ name: p.name, brand: p.brand, categoryId: p.categoryId, basePrice: p.basePrice, stock: p.stock, description: p.description }); setShowModal(true); };
  const handleDelete = (id) => { if (confirm('Xóa sản phẩm này?')) setProductList(l => l.filter(p => p.id !== id)); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      setProductList(l => l.map(p => p.id === editing ? { ...p, ...form, categoryId: Number(form.categoryId), basePrice: Number(form.basePrice), stock: Number(form.stock) } : p));
    } else {
      const newP = { id: Date.now(), ...form, categoryId: Number(form.categoryId), basePrice: Number(form.basePrice), stock: Number(form.stock), thumbnail: `https://placehold.co/400x400?text=${encodeURIComponent(form.name)}`, variants: [], rating: 0, reviewCount: 0, featured: false, images: [] };
      setProductList(l => [newP, ...l]);
    }
    setShowModal(false);
  };

  const getCatName = (id) => categories.find(c => c.id === id)?.name || '—';

  return (
    <div className="admin-page">
      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="search-bar">
          <span className="search-bar-icon">🔍</span>
          <input className="form-control" placeholder="Tìm sản phẩm..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-control" style={{ width: 180 }} value={catFilter} onChange={e => setCatFilter(e.target.value)}>
          <option value="">Tất cả danh mục</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button className="btn btn-primary" onClick={openAdd}>+ Thêm sản phẩm</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>#</th><th>Sản phẩm</th><th>Danh mục</th><th>Thương hiệu</th><th>Giá</th><th>Kho</th><th>Đánh giá</th><th>Thao tác</th></tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td className="text-gray text-sm">{p.id}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={p.thumbnail} alt={p.name} style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover', background: 'var(--gray-100)' }} />
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td>{getCatName(p.categoryId)}</td>
                  <td>{p.brand}</td>
                  <td className="font-semibold">{formatPrice(p.basePrice)}</td>
                  <td>{p.stock}</td>
                  <td>⭐ {p.rating} ({p.reviewCount})</td>
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
        {filtered.length === 0 && <div className="empty-state"><div className="empty-state-icon">📦</div><p>Không có sản phẩm nào</p></div>}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="font-semibold">{editing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</span>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Tên sản phẩm *</label>
                    <input className="form-control" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Thương hiệu *</label>
                    <input className="form-control" value={form.brand} onChange={e => setForm(p => ({ ...p, brand: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Danh mục *</label>
                    <select className="form-control" value={form.categoryId} onChange={e => setForm(p => ({ ...p, categoryId: e.target.value }))} required>
                      <option value="">Chọn danh mục</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Giá cơ bản (VND) *</label>
                    <input className="form-control" type="number" value={form.basePrice} onChange={e => setForm(p => ({ ...p, basePrice: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tồn kho</label>
                    <input className="form-control" type="number" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))} />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1/-1' }}>
                    <label className="form-label">Mô tả</label>
                    <textarea className="form-control" rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary">{editing ? 'Lưu thay đổi' : 'Thêm sản phẩm'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
