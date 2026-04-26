import { useState } from 'react';
import { paymentMethods as initMethods } from '../../data/mockData';
import './AdminPage.css';
import './PaymentMethodPage.css';

export default function PaymentMethodPage() {
  const [methods, setMethods] = useState(initMethods);

  const toggle = (id) => setMethods(l => l.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));

  return (
    <div className="admin-page">
      <p className="text-sm text-gray mb-4">Quản lý các phương thức thanh toán hiển thị cho khách hàng.</p>
      <div className="payment-method-list">
        {methods.map(m => (
          <div key={m.id} className="card payment-method-card">
            <div className="pm-icon">{m.icon}</div>
            <div className="pm-info">
              <p className="font-semibold">{m.name}</p>
              <p className="text-sm text-gray">{m.description}</p>
            </div>
            <div className="pm-toggle">
              <span className={`badge ${m.enabled ? 'badge-green' : 'badge-gray'}`}>{m.enabled ? 'Đang hoạt động' : 'Tắt'}</span>
              <label className="toggle-switch">
                <input type="checkbox" checked={m.enabled} onChange={() => toggle(m.id)} />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
