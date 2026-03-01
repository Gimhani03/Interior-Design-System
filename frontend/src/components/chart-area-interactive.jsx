import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"
import '../pages/AdminDashboard.css'

const chartData = [
  { date: "Apr 1", users: 12, sales: 5 },
  { date: "Apr 8", users: 18, sales: 9 },
  { date: "Apr 15", users: 22, sales: 14 },
  { date: "Apr 22", users: 19, sales: 11 },
  { date: "Apr 29", users: 27, sales: 18 },
  { date: "May 6", users: 31, sales: 22 },
  { date: "May 13", users: 24, sales: 16 },
  { date: "May 20", users: 35, sales: 25 },
  { date: "May 27", users: 40, sales: 30 },
  { date: "Jun 3", users: 38, sales: 28 },
  { date: "Jun 10", users: 45, sales: 34 },
  { date: "Jun 17", users: 52, sales: 41 },
  { date: "Jun 24", users: 48, sales: 37 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #F3EDE6', borderRadius: 10, padding: '10px 14px', boxShadow: '0 4px 16px rgba(139,115,85,0.12)', fontSize: 12 }}>
      <p style={{ fontWeight: 600, color: '#1F2937', marginBottom: 6 }}>{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B7280', marginBottom: 2 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
          {p.name}: <strong style={{ color: '#1F2937' }}>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) setTimeRange("30d")
  }, [isMobile])

  const count = timeRange === "7d" ? 3 : timeRange === "30d" ? 5 : chartData.length
  const filteredData = chartData.slice(-count)

  return (
    <div className="admin-chart-card">
      <div className="admin-chart-header">
        <div>
          <h3 className="admin-chart-title">Monthly Activity</h3>
          <p className="admin-chart-sub">New users and sales over time</p>
        </div>
        <div className="admin-chart-toggle-group" style={{ display: isMobile ? 'none' : 'flex' }}>
          {[["90d", "3 months"], ["30d", "30 days"], ["7d", "7 days"]].map(([val, label]) => (
            <button
              key={val}
              className={`admin-chart-toggle-btn${timeRange === val ? ' active' : ''}`}
              onClick={() => setTimeRange(val)}
            >
              {label}
            </button>
          ))}
        </div>
        {isMobile && (
          <select className="admin-chart-select" value={timeRange} onChange={e => setTimeRange(e.target.value)}>
            <option value="90d">Last 3 months</option>
            <option value="30d">Last 30 days</option>
            <option value="7d">Last 7 days</option>
          </select>
        )}
      </div>
      <div className="admin-chart-body">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={filteredData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B7355" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B7355" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C9A882" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#C9A882" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#F3EDE6" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 11, fill: '#A0826D' }} />
            <Tooltip content={<CustomTooltip />} />
            <Area dataKey="sales" name="Sales" type="natural" fill="url(#fillSales)" stroke="#C9A882" strokeWidth={2} stackId="a" />
            <Area dataKey="users" name="New Users" type="natural" fill="url(#fillUsers)" stroke="#8B7355" strokeWidth={2} stackId="a" />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 12 }}>
          {[{ color: '#8B7355', label: 'New Users' }, { color: '#C9A882', label: 'Sales' }].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B7280' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: 'inline-block' }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
