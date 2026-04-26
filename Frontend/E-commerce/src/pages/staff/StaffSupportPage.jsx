import { useState } from 'react';
import { supportTickets as initTickets } from '../../data/mockData';
import '../admin/AdminPage.css';

const STATUS_LABEL = { open: 'Chờ xử lý', in_progress: 'Đang xử lý', resolved: 'Đã giải quyết' };
const STATUS_BADGE = { open: 'badge-yellow', in_progress: 'badge-blue', resolved: 'badge-green' };
const PRIORITY_BADGE = { low: 'badge-gray', medium: 'badge-blue', high: 'badge-red' };
const PRIORITY_LABEL = { low: 'Thấp', medium: 'Trung bình', high: 'Cao' };

export default function StaffSupportPage() {
  const [tickets, setTickets] = useState(initTickets);
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState('');

  const handleRespond = () => {
    if (!response.trim()) return;
    setTickets(l => l.map(t => t.id === selected.id ? { ...t, status: 'resolved', response, resolvedAt: new Date().toLocaleString() } : t));
    setSelected(prev => ({ ...prev, status: 'resolved', response }));
    setResponse('');
  };

  return (
    <div className="admin-page">
      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Khách hàng</th><th>Chủ đề</th><th>Đơn hàng</th><th>Ưu tiên</th><th>Ngày tạo</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id}>
                  <td className="font-medium">{t.customerName}</td>
                  <td>{t.subject}</td>
                  <td className="text-sm text-gray">{t.orderId ? `#${t.orderId}` : '—'}</td>
                  <td><span className={`badge ${PRIORITY_BADGE[t.priority]}`}>{PRIORITY_LABEL[t.priority]}</span></td>
                  <td className="text-sm text-gray">{t.createdAt}</td>
                  <td><span className={`badge ${STATUS_BADGE[t.status]}`}>{STATUS_LABEL[t.status]}</span></td>
                  <td><button className="btn btn-sm btn-secondary" onClick={() => { setSelected(t); setResponse(''); }}>Xử lý</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="font-semibold">Xử lý yêu cầu hỗ trợ</span>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius)', padding: 14 }}>
                <p className="font-semibold mb-2">{selected.subject}</p>
                <p className="text-sm text-gray mb-1">Từ: {selected.customerName} {selected.orderId && `· Đơn #${selected.orderId}`}</p>
                <p className="text-sm">{selected.message}</p>
              </div>

              {selected.response ? (
                <div style={{ background: '#d1fae5', borderRadius: 'var(--radius)', padding: 14 }}>
                  <p className="text-sm font-semibold mb-1">Phản hồi đã gửi:</p>
                  <p className="text-sm">{selected.response}</p>
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">Phản hồi *</label>
                  <textarea className="form-control" rows={4} placeholder="Nhập nội dung phản hồi cho khách hàng..." value={response} onChange={e => setResponse(e.target.value)} />
                </div>
              )}
            </div>
            {!selected.response && (
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelected(null)}>Đóng</button>
                <button className="btn btn-primary" onClick={handleRespond} disabled={!response.trim()}>Gửi phản hồi & Đóng ticket</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
