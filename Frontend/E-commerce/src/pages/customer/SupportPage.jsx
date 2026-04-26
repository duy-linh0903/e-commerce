import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supportTickets } from '../../data/mockData';
import './SupportPage.css';

const STATUS_MAP = { open: { label: 'Chờ xử lý', cls: 'badge-yellow' }, in_progress: { label: 'Đang xử lý', cls: 'badge-blue' }, resolved: { label: 'Đã giải quyết', cls: 'badge-green' } };

export default function SupportPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState('new');
  const [form, setForm] = useState({ orderId: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const myTickets = user ? supportTickets.filter(t => t.customerEmail === user?.email) : supportTickets;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ orderId: '', subject: '', message: '' });
    setTimeout(() => { setSubmitted(false); setTab('history'); }, 2000);
  };

  return (
    <div className="support-page">
      <div className="container">
        <h1 className="page-title">Hỗ trợ khách hàng</h1>

        <div className="support-tabs">
          <button className={`tab-btn${tab === 'new' ? ' active' : ''}`} onClick={() => setTab('new')}>Gửi yêu cầu mới</button>
          <button className={`tab-btn${tab === 'history' ? ' active' : ''}`} onClick={() => setTab('history')}>Lịch sử hỗ trợ</button>
          <button className={`tab-btn${tab === 'faq' ? ' active' : ''}`} onClick={() => setTab('faq')}>Câu hỏi thường gặp</button>
        </div>

        {tab === 'new' && (
          <div className="card support-card">
            <div className="card-header"><span className="font-semibold">Gửi yêu cầu hỗ trợ</span></div>
            <div className="card-body">
              {submitted && <div className="alert-success">✅ Yêu cầu đã được gửi! Chúng tôi sẽ phản hồi trong 24 giờ.</div>}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Mã đơn hàng (nếu có)</label>
                  <input className="form-control" placeholder="VD: ORD-001" value={form.orderId} onChange={e => setForm(p => ({ ...p, orderId: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Chủ đề *</label>
                  <input className="form-control" placeholder="Mô tả ngắn vấn đề của bạn" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Nội dung chi tiết *</label>
                  <textarea className="form-control" rows={5} placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required />
                </div>
                <div><button type="submit" className="btn btn-primary">Gửi yêu cầu</button></div>
              </form>
            </div>
          </div>
        )}

        {tab === 'history' && (
          <div className="support-history">
            {myTickets.length === 0 ? (
              <div className="empty-state"><div className="empty-state-icon">💬</div><p className="empty-state-text">Chưa có yêu cầu hỗ trợ nào</p></div>
            ) : (
              myTickets.map(ticket => (
                <div key={ticket.id} className="ticket-card card">
                  <div className="ticket-header">
                    <div>
                      <p className="ticket-subject">{ticket.subject}</p>
                      <p className="text-sm text-gray">{ticket.createdAt} {ticket.orderId && `· Đơn #${ticket.orderId}`}</p>
                    </div>
                    <span className={`badge ${STATUS_MAP[ticket.status].cls}`}>{STATUS_MAP[ticket.status].label}</span>
                  </div>
                  <p className="ticket-msg">{ticket.message}</p>
                  {ticket.response && (
                    <div className="ticket-response">
                      <p className="text-sm font-semibold">Phản hồi từ {ticket.assignedTo}:</p>
                      <p className="text-sm">{ticket.response}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'faq' && (
          <div className="faq-list">
            {[
              { q: 'Chính sách đổi trả như thế nào?', a: 'Sản phẩm được đổi trả trong vòng 30 ngày kể từ ngày nhận hàng nếu còn nguyên vẹn, đầy đủ phụ kiện và không có dấu hiệu sử dụng.' },
              { q: 'Sản phẩm có được bảo hành không?', a: 'Tất cả sản phẩm đều được bảo hành theo chính sách hãng, thông thường từ 12-24 tháng tùy sản phẩm.' },
              { q: 'Thời gian giao hàng là bao lâu?', a: 'TP.HCM: 24 giờ. Các tỉnh thành khác: 2-4 ngày làm việc.' },
              { q: 'Tôi có thể thanh toán bằng những hình thức nào?', a: 'Hiện tại hỗ trợ: COD (tiền mặt khi nhận), VNPay, MoMo và Chuyển khoản ngân hàng.' },
              { q: 'Làm sao để theo dõi đơn hàng?', a: 'Bạn có thể theo dõi đơn hàng trong mục "Đơn hàng của tôi" sau khi đăng nhập.' },
            ].map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item card">
      <button className="faq-question" onClick={() => setOpen(p => !p)}>
        <span>{q}</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  );
}
