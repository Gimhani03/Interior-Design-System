import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import API from '../services/api'
import DesignThumbnail from '../components/DesignThumbnail'
import { SectionCards } from '@/components/section-cards'
import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import './AdminDashboard.css'
import './Dashboard.css'

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const FolderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
)

const BoxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
)

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const LayoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
  </svg>
)

const recentDesigns = [
  { id: 1, title: 'Living Room Layout', lastEdited: 'Today', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80', tag: 'Living Room' },
  { id: 2, title: 'Bedroom Design', lastEdited: 'Yesterday', image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=400&q=80', tag: 'Bedroom' },
  { id: 3, title: 'Modern Apartment', lastEdited: '4 days ago', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80', tag: 'Apartment' },
]

const quickActionsNoPurchaseHistory = [
  { icon: <PlusIcon />, title: 'New Layout', desc: 'Start designing a room from scratch', btn: 'Create Layout', primary: true, path: '/designer' },
  { icon: <FolderIcon />, title: 'My Designs', desc: 'Browse and manage saved layouts', btn: 'Open Designs', primary: false, path: '/my-designs' },
  { icon: <BoxIcon />, title: '3D Viewer', desc: 'Explore your project in 3D space', btn: 'Launch Viewer', primary: false, path: '/designs' },
]

const NAV_ITEMS = [
  {
    url: '/admin-dashboard', label: 'Dashboard',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>,
  },
  {
    url: '/admin/users', label: 'Manage Users',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  },
  {
    url: '/admin/furniture-management', label: 'Manage Furniture',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4" /><path d="M2 11v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1Z" /><path d="M8 21v-4" /><path d="M16 21v-4" /></svg>,
  },
  {
    url: '/admin/designs', label: 'Designs',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="6" height="18" rx="1" /><rect x="9" y="3" width="6" height="10" rx="1" /><rect x="16" y="3" width="6" height="6" rx="1" /></svg>,
  },
  {
    url: '/admin/manage-designs', label: 'Manage Designs',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
  },
  {
    url: '/admin/catalog', label: 'Catalog',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
  },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [furniture, setFurniture] = useState([])
  const [userCount, setUserCount] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [designs, setDesigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [designIdx, setDesignIdx] = useState(0)

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
  const initials = storedUser.name
    ? storedUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD'

  const fetchFurniture = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/furniture')
      setFurniture(res.data)
    } catch (_) { }
  }

  const fetchDesigns = async () => {
    if (!storedUser.id && !storedUser._id) return;
    try {
      const res = await axios.get(`http://localhost:5001/api/designs/user/${storedUser.id || storedUser._id}`)
      setDesigns(res.data)
    } catch (_) { }
  }

  useEffect(() => {
    fetchFurniture()
    fetchDesigns()
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/admin/stats')
        setUserCount(data.userCount ?? 0)
        setTotalRevenue(data.totalRevenue ?? 0)
      } catch (_) { }
    }
    fetchStats()
    setLoading(false)
  }, [])

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/furniture/${id}`)
    fetchFurniture()
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    navigate('/admin-login')
  }

  return (
    <div className="admin-layout">

      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="admin-sidebar-brand">
            Admin Panel
            <span>Interior Design System</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          <div className="admin-nav-section-label">Navigation</div>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.url}
              to={item.url}
              className={({ isActive }) => `admin-nav-item${isActive ? ' active' : ''}`}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }} title="View Profile">
            <div className="admin-sidebar-avatar">{initials}</div>
            <div className="admin-sidebar-user-info">
              <div className="admin-sidebar-user-name">{storedUser.name || 'Admin'}</div>
              <div className="admin-sidebar-user-email">{storedUser.email || ''}</div>
            </div>
            <button className="admin-sidebar-logout" onClick={e => { e.stopPropagation(); handleLogout() }} title="Log out">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="admin-main">
        <div className="admin-topbar">
          <span className="admin-topbar-title">Dashboard</span>
        </div>

        <div className="admin-content">
          {/* ── Quick Actions (customer features, no Purchase History) ── */}
          <section className="db-section">
            <h2 className="db-section-title">Quick Actions</h2>
            <div className="db-actions-grid">
              {quickActionsNoPurchaseHistory.map((action, i) => (
                <div key={i} className={`db-action-card${action.primary ? ' db-action-card--primary' : ''}`}>
                  <div className="db-action-icon">{action.icon}</div>
                  <div className="db-action-body">
                    <p className="db-action-title">{action.title}</p>
                    <p className="db-action-desc">{action.desc}</p>
                  </div>
                  <button
                    className={action.primary ? 'db-btn-primary' : 'db-btn-outline'}
                    onClick={() => action.path && navigate(action.path)}
                  >
                    {action.btn}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Admin Stats ── */}
          <SectionCards userCount={userCount} furnitureCount={furniture.length} totalRevenue={totalRevenue} />
          <ChartAreaInteractive />

          {/* ── Recent Designs (customer feature) ── */}
          <section className="db-section">
            <div className="db-section-header">
              <h2 className="db-section-title">Recent Designs</h2>
              <div className="db-nav-btns">
                <button
                  className="db-nav-btn"
                  disabled={designIdx === 0}
                  onClick={() => setDesignIdx(i => Math.max(0, i - 1))}
                  aria-label="Previous"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  className="db-nav-btn"
                  disabled={designIdx + 2 >= recentDesigns.length}
                  onClick={() => setDesignIdx(i => Math.min(recentDesigns.length - 2, i + 1))}
                  aria-label="Next"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>

            <div className="db-designs-grid">
              {(() => {
                const rawList = designs.length > 0 ? designs : recentDesigns;
                const seen = new Set();
                const uniqueList = rawList.filter(d => {
                  const name = d.name || d.title;
                  if (seen.has(name)) return false;
                  seen.add(name);
                  return true;
                });
                return uniqueList.slice(designIdx, designIdx + 2);
              })().map(design => (
                <div key={design._id || design.id} className="db-design-card">
                  <div className="db-design-img-wrap" style={{ overflow: 'hidden' }}>
                    <DesignThumbnail
                      designId={design._id || design.id}
                      designData={design._id ? design : null}
                      className="db-design-img"
                    />
                    <span className="db-design-tag">{design.tag || '2D Layout'}</span>
                  </div>
                  <div className="db-design-body">
                    <p className="db-design-title">{design.name || design.title}</p>
                    <p className="db-design-meta">
                      {design.lastEdited ? `Last edited: ${new Date(design.lastEdited).toLocaleDateString()}` : `Last edited: ${design.lastEdited}`}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                      <button className="db-btn-outline db-design-btn" style={{ flex: 1, padding: '8px 0' }} onClick={() => navigate(`/designer?id=${design._id || design.id}`)}>Edit Plan</button>
                      <button
                        className="db-btn-primary db-design-btn"
                        style={{ flex: 1, padding: '8px 0', fontSize: '12px' }}
                        onClick={() => navigate('/viewer', {
                          state: {
                            roomSize: design.roomSize,
                            furniture: design.furniture || [],
                            designId: design._id || null
                          }
                        })}
                      >
                        View in 3D
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="db-stats-card">
                <div className="db-stats-row">
                  <div className="db-stat">
                    <span className="db-stat-value">{designs.length}</span>
                    <span className="db-stat-label">Total Designs</span>
                  </div>
                  <div className="db-stat-divider" />
                  <div className="db-stat">
                    <span className="db-stat-value">{designs.filter(d => d.thumbnail).length}</span>
                    <span className="db-stat-label">Saved Items</span>
                  </div>
                  <div className="db-stat-divider" />
                  <div className="db-stat">
                    <span className="db-stat-value">{designs.length - designs.filter(d => d.thumbnail).length}</span>
                    <span className="db-stat-label">In Progress</span>
                  </div>
                </div>
                <hr className="db-stats-divider" />
                <div className="db-stats-footer">
                  <LayoutIcon />
                  <span>Last edited: <strong>{designs.length > 0 ? (designs[0].name || 'Untitled') : 'None'}</strong></span>
                </div>
              </div>
            </div>
          </section>

          <DataTable data={furniture} onDelete={handleDelete} />
        </div>
      </main>
    </div>
  )
}
