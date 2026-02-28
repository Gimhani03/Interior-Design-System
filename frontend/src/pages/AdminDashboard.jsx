import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { Users, Sofa, DollarSign, Activity, Clock } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import Navbar from '../components/Navbar'
import AdminSidebar from '../components/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const activityData = [
  { name: 'Jan', users: 40, sales: 24 },
  { name: 'Feb', users: 30, sales: 13 },
  { name: 'Mar', users: 20, sales: 98 },
  { name: 'Apr', users: 27, sales: 39 },
  { name: 'May', users: 18, sales: 48 },
  { name: 'Jun', users: 23, sales: 38 },
  { name: 'Jul', users: 34, sales: 43 },
]

const recentActivity = [
  { id: 1, action: 'Added new furniture: Modern Sofa', time: '2 hours ago', type: 'furniture' },
  { id: 2, action: 'User registered: Jane Doe', time: '4 hours ago', type: 'user' },
  { id: 3, action: 'Sale completed: $1,200', time: 'Yesterday', type: 'sale' },
  { id: 4, action: 'Password reset: John Smith', time: 'Yesterday', type: 'user' },
]

const activityBadgeVariant = { furniture: 'secondary', user: 'outline', sale: 'success' }

export default function AdminDashboard() {
  const [furnitureCount, setFurnitureCount] = useState(0)
  const [userCount, setUserCount] = useState(0)

  useEffect(() => {
    // #region agent log - stylesheet scan
    let fixedRuleFound = false
    let w56RuleFound = false
    let tailwindRulesCount = 0
    try {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            const text = rule.cssText || ''
            if (text.includes('.fixed') && text.includes('position')) fixedRuleFound = true
            if (text.includes('.w-56') || text.includes('.w-\\[14rem\\]')) w56RuleFound = true
            if (text.includes('.flex') || text.includes('.grid') || text.includes('.ml-')) tailwindRulesCount++
          }
        } catch (_) {}
      }
    } catch (_) {}
    fetch('http://127.0.0.1:7256/ingest/3274ec39-1a8d-478c-82da-5442b28e650e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f7bdaf'},body:JSON.stringify({sessionId:'f7bdaf',location:'AdminDashboard.jsx:stylesheet-scan',message:'Stylesheet rule check',hypothesisId:'B',data:{fixedRuleFound,w56RuleFound,tailwindRulesCount,totalSheets:document.styleSheets.length},timestamp:Date.now()})}).catch(()=>{})
    // #endregion
    // #region agent log
    const rootEl = document.getElementById('root')
    const bodyEl = document.body
    const rootStyle = rootEl ? window.getComputedStyle(rootEl) : {}
    const bodyStyle = window.getComputedStyle(bodyEl)
    const bgVar = getComputedStyle(document.documentElement).getPropertyValue('--background').trim()
    const primaryVar = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
    fetch('http://127.0.0.1:7256/ingest/3274ec39-1a8d-478c-82da-5442b28e650e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f7bdaf'},body:JSON.stringify({sessionId:'f7bdaf',location:'AdminDashboard.jsx:mount',message:'CSS environment check',hypothesisId:'B+C',data:{rootDisplay:rootStyle.display,rootAlignItems:rootStyle.alignItems,rootJustifyContent:rootStyle.justifyContent,bodyDisplay:bodyStyle.display,cssVarBackground:bgVar||'(empty)',cssVarPrimary:primaryVar||'(empty)'},timestamp:Date.now()})}).catch(()=>{})
    // #endregion
    // #region agent log
    const sidebarEl = document.querySelector('aside')
    const mainEl = document.querySelector('[data-main]')
    const sidebarStyle = sidebarEl ? window.getComputedStyle(sidebarEl) : null
    fetch('http://127.0.0.1:7256/ingest/3274ec39-1a8d-478c-82da-5442b28e650e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f7bdaf'},body:JSON.stringify({sessionId:'f7bdaf',location:'AdminDashboard.jsx:sidebar',message:'Sidebar computed style check',hypothesisId:'A+B',data:{sidebarFound:!!sidebarEl,sidebarPosition:sidebarStyle?.position||'N/A',sidebarLeft:sidebarStyle?.left||'N/A',sidebarWidth:sidebarStyle?.width||'N/A',sidebarZIndex:sidebarStyle?.zIndex||'N/A'},timestamp:Date.now()})}).catch(()=>{})
    // #endregion
  }, [])

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [furRes, userRes] = await Promise.all([
          API.get('/furniture'),
          API.get('/users'),
        ])
        setFurnitureCount(furRes.data.length)
        setUserCount(userRes.data.length)
      } catch (_) {}
    }
    fetchCounts()
  }, [])

  const statCards = [
    { title: 'Total Users', value: userCount, icon: Users, desc: 'Registered accounts', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Furniture Items', value: furnitureCount, icon: Sofa, desc: 'Products in catalog', color: 'text-amber-700', bg: 'bg-amber-50' },
    { title: 'Total Sales', value: '$12,340', icon: DollarSign, desc: 'Revenue this month', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AdminSidebar />

      <div className="ml-56 pt-[68px]" data-main>
        <div className="p-6 max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground text-sm mt-1">Welcome back, Admin. Here's what's happening.</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {statCards.map(({ title, value, icon: Icon, desc, color, bg }) => (
              <Card key={title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${bg}`}>
                    <Icon size={22} className={color} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts + Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Line Chart */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity size={16} /> Monthly Activity
                </CardTitle>
                <CardDescription>Users and sales trends over the past 7 months</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={activityData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ece8" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="users" stroke="#3E2723" strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock size={16} /> Recent Activity
                </CardTitle>
                <CardDescription>Latest actions in your system</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4 space-y-0">
                {recentActivity.map((item, i) => (
                  <React.Fragment key={item.id}>
                    <div className="flex flex-col gap-1 py-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-foreground leading-snug">{item.action}</p>
                        <Badge variant={activityBadgeVariant[item.type]} className="shrink-0 text-[10px]">
                          {item.type}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    {i < recentActivity.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
