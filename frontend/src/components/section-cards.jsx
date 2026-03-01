import '../pages/AdminDashboard.css'

const TrendUpIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
)

export function SectionCards({ userCount = 0, furnitureCount = 0 }) {
  const cards = [
    { label: 'Total Revenue', value: 'Rs. 1,234,000', badge: '+12.5%', footer: 'Trending up this month', sub: 'Revenue for the last 6 months' },
    { label: 'Registered Users', value: userCount.toLocaleString(), badge: '+8%', footer: 'Growing steadily', sub: 'Total active user accounts' },
    { label: 'Furniture Items', value: furnitureCount.toLocaleString(), badge: '+3', footer: 'Catalog expanding', sub: 'Products listed in the system' },
    { label: 'Growth Rate', value: '4.5%', badge: '+4.5%', footer: 'Steady performance', sub: 'Meets growth projections' },
  ]

  return (
    <div className="admin-cards-grid">
      {cards.map(card => (
        <div key={card.label} className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">{card.label}</span>
            <span className="admin-stat-badge"><TrendUpIcon />{card.badge}</span>
          </div>
          <div className="admin-stat-value">{card.value}</div>
          <div className="admin-stat-footer">
            <div className="admin-stat-footer-main">
              {card.footer} <TrendUpIcon />
            </div>
            <div className="admin-stat-footer-sub">{card.sub}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
