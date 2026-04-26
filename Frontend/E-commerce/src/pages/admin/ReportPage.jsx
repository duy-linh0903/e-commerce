import { revenueByMonth, dashboardStats, formatPrice } from '../../data/mockData';
import './DashboardPage.css';

export default function ReportPage() {
  const s = dashboardStats;
  const maxRev = Math.max(...revenueByMonth.map(r => r.revenue));
  const totalRevenue = revenueByMonth.reduce((sum, r) => sum + r.revenue, 0);
  const totalOrders = revenueByMonth.reduce((sum, r) => sum + r.orders, 0);

  return (
    <div className="admin-page">
      {/* Summary */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: '#2563eb18' }}>💰</div>
          <div><p className="stat-label">Tổng doanh thu (năm 2024)</p><p className="stat-value">{formatPrice(totalRevenue)}</p></div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: '#10b98118' }}>🛒</div>
          <div><p className="stat-label">Tổng đơn hàng (năm 2024)</p><p className="stat-value">{totalOrders}</p></div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: '#f59e0b18' }}>💡</div>
          <div><p className="stat-label">Doanh thu trung bình / tháng</p><p className="stat-value">{formatPrice(Math.round(totalRevenue / revenueByMonth.length))}</p></div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Bar chart */}
        <div className="card">
          <div className="card-header"><span className="font-semibold">Doanh thu theo tháng</span></div>
          <div className="card-body">
            <div className="rev-chart">
              {revenueByMonth.map(r => (
                <div key={r.month} className="rev-bar-row">
                  <span className="rev-bar-month">{r.month}</span>
                  <div className="rev-bar-track">
                    <div className="rev-bar-fill" style={{ width: (r.revenue / maxRev * 100) + '%' }} />
                  </div>
                  <span className="rev-bar-value">{formatPrice(r.revenue)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orders & Customers */}
        <div className="card">
          <div className="card-header"><span className="font-semibold">Đơn hàng & Khách hàng mới</span></div>
          <div className="card-body">
            <table className="table">
              <thead><tr><th>Tháng</th><th>Đơn hàng</th><th>Khách mới</th><th>TB đơn</th></tr></thead>
              <tbody>
                {revenueByMonth.map(r => (
                  <tr key={r.month}>
                    <td>{r.month}</td>
                    <td className="font-semibold">{r.orders}</td>
                    <td>{r.customers}</td>
                    <td>{formatPrice(Math.round(r.revenue / r.orders))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top products */}
        <div className="card" style={{ gridColumn: '1/-1' }}>
          <div className="card-header"><span className="font-semibold">Top sản phẩm bán chạy</span></div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="table">
              <thead><tr><th>#</th><th>Sản phẩm</th><th>Số lượng bán</th><th>Doanh thu</th></tr></thead>
              <tbody>
                {s.topProducts.map((p, i) => (
                  <tr key={p.productId}>
                    <td><span className="rank-badge">{i+1}</span></td>
                    <td className="font-medium">{p.name}</td>
                    <td>{p.sold} sản phẩm</td>
                    <td className="font-semibold text-primary">{formatPrice(p.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
