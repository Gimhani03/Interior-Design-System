import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import API from '../services/api'
import { SectionCards } from '@/components/section-cards'
import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import './AdminDashboard.css'

const NAV_ITEMS = [
  {
    url: '/admin-dashboard', label: 'Dashboard',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  },
  {
    url: '/admin/users', label: 'Manage Users',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    url: '/admin/furniture-management', label: 'Manage Furniture',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"/><path d="M2 11v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1Z"/><path d="M8 21v-4"/><path d="M16 21v-4"/></svg>,
  },
  {
    url: '/admin/designs', label: 'Manage Designs',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="6" height="18" rx="1"/><rect x="9" y="3" width="6" height="10" rx="1"/><rect x="16" y="3" width="6" height="6" rx="1"/></svg>,
  },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [furniture, setFurniture] = useState([])
  const [userCount, setUserCount] = useState(0)

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
  const initials = storedUser.name
    ? storedUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD'

  const fetchFurniture = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/furniture')
      setFurniture(res.data)
    } catch (_) {}
  }

  useEffect(() => {
    fetchFurniture()
    const fetchUsers = async () => {
      try {
        const res = await API.get('/users')
        setUserCount(res.data.length)
      } catch (_) {}
    }
    fetchUsers()
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
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
          <SectionCards userCount={userCount} furnitureCount={furniture.length} />
          <ChartAreaInteractive />
          <DataTable data={furniture} onDelete={handleDelete} />
        </div>
      </main>
    </div>
  )
}
