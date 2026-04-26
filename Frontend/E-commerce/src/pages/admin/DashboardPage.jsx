import { Link } from 'react-router-dom';
import { dashboardStats, revenueByMonth, ORDER_STATUS_LABEL, ORDER_STATUS_COLOR, formatPrice } from '../../data/mockData';
import './DashboardPage.css';

function StatCard({ icon, label, value, growth, color }) {
  return (
    <div className="stat-card card">
      <div className="stat-icon" style={{ background: color + '18' }}>{icon}</div>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
        {growth !== undefined && (
          <p className={`stat-growth ${growth >= 0 ? 'positive' : 'negative'}`}>
            {growth >= 0 ? '▲' : '▼'} {Math.abs(growth)}% so với tháng trước
          </p>
        )}
      </div>
    </div>
  );
}

function RevenueBar({ month, revenue, max }) {
  const pct = (revenue / max) * 100;
  return (
    <div className="rev-bar-row">
      <span className="rev-bar-month">{month}</span>
      <div className="rev-bar-track">
        <div className="rev-bar-fill" style={{ width: pct + '%' }} />
      </div>
      <span className="rev-bar-value">{formatPrice(revenue)}</span>
    </div>
  );
}

export default function DashboardPage() {
  const s = dashboardStats;
  const maxRev = Math.max(...revenueByMonth.map(r => r.revenue));

  return (
    <div className="dashboard-page">
      {/* Stats */}
      <div className="stats-grid">
        <StatCard icon="💰" label="Tổng doanh thu" value={formatPrice(s.totalRevenue)} growth={s.revenueGrowth} color="#2563eb" />
        <StatCard icon="🛒" label="Tổng đơn hàng" value={s.totalOrders} growth={s.ordersGrowth} color="#10b981" />
        <StatCard icon="👥" label="Khách hàng" value={s.totalCustomers} growth={s.customersGrowth} color="#f59e0b" />
        <StatCard icon="📦" label="Sản phẩm" value={s.totalProducts} color="#8b5cf6" />
      </div>

      <div className="dashboard-grid">
        {/* Revenue Chart */}
        <div className="card">
          <div className="card-header"><span className="font-semibold">Doanh thu theo tháng</span></div>
          <div className="card-body">
            <div className="rev-chart">
              {revenueByMonth.map(r => <RevenueBar key={r.month} month={r.month} revenue={r.revenue} max={maxRev} />)}
            </div>
          </div>
        </div>

        {/* Top products */}
        <div className="card">
          <div className="card-header">
            <span className="font-semibold">Top sản phẩm bán chạy</span>
            <Link to="/admin/products" className="text-primary text-sm">Xem tất cả</Link>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="table">
              <thead><tr><th>#</th><th>Sản phẩm</th><th>Đã bán</th><th>Doanh thu</th></tr></thead>
              <tbody>
                {s.topProducts.map((p, i) => (
                  <tr key={p.productId}>
                    <td><span className="rank-badge">{i+1}</span></td>
                    <td className="font-medium">{p.name}</td>
                    <td>{p.sold}</td>
                    <td className="text-primary font-semibold">{formatPrice(p.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent orders */}
        <div className="card" style={{ gridColumn: '1/-1' }}>
          <div className="card-header">
            <span className="font-semibold">Đơn hàng gần đây</span>
            <Link to="/admin/orders" className="text-primary text-sm">Xem tất cả</Link>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr><th>Mã đơn</th><th>Khách hàng</th><th>Ngày</th><th>Tổng tiền</th><th>Thanh toán</th><th>Trạng thái</th></tr>
                </thead>
                <tbody>
                  {s.recentOrders.map(o => (
                    <tr key={o.id}>
                      <td className="font-semibold text-primary">#{o.id}</td>
                      <td>{o.customerName}</td>
                      <td className="text-gray">{o.date}</td>
                      <td className="font-semibold">{formatPrice(o.total)}</td>
                      <td>
                        <span className={`badge ${o.paymentStatus === 'paid' ? 'badge-green' : 'badge-yellow'}`}>
                          {o.paymentStatus === 'paid' ? 'Đã TT' : 'Chưa TT'}
                        </span>
                      </td>
                      <td>
                        <span className="badge" style={{ background: ORDER_STATUS_COLOR[o.status] + '22', color: ORDER_STATUS_COLOR[o.status] }}>
                          {ORDER_STATUS_LABEL[o.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
