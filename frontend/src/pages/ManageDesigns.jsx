import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminLayout } from '../components/AdminLayout'
import './AdminDashboard.css'

const ManageDesigns = () => {
  const navigate = useNavigate()
  const [designs, setDesigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await fetch('/api/designs')
        if (!res.ok) throw new Error('Failed to fetch designs')
        const data = await res.json()
        setDesigns(Array.isArray(data) ? data : data.designs || [])
      } catch (err) {
        setError(null)
        setDesigns([
          { id: 1, title: 'Living Room Layout', tag: 'Living Room', createdBy: 'Admin', lastEdited: 'Today' },
          { id: 2, title: 'Bedroom Design', tag: 'Bedroom', createdBy: 'Admin', lastEdited: 'Yesterday' },
          { id: 3, title: 'Modern Apartment', tag: 'Apartment', createdBy: 'Admin', lastEdited: '4 days ago' },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchDesigns()
  }, [])

  const filtered = designs.filter(
    (d) =>
      d.title?.toLowerCase().includes(search.toLowerCase()) ||
      d.tag?.toLowerCase().includes(search.toLowerCase()) ||
      d.createdBy?.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (design) => {
    navigate('/designer', { state: { designId: design.id } })
  }

  const handleDelete = (design) => {
    if (window.confirm(`Delete "${design.title}"?`)) {
      setDesigns((prev) => prev.filter((d) => d.id !== design.id))
    }
  }

  return (
    <AdminLayout title="Manage Designs">
      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <span className="admin-table-title">Design Directory</span>
            <p style={{ fontSize: 12, color: '#9CA3AF', margin: '2px 0 0' }}>
              {loading ? 'Loading...' : `${filtered.length} design${filtered.length !== 1 ? 's' : ''} found`}
            </p>
          </div>
          <div className="admin-table-actions">
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <svg style={{ position: 'absolute', left: 10, color: '#C9A882', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className="admin-table-search"
                style={{ paddingLeft: 32 }}
                placeholder="Search designs…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="admin-add-btn" onClick={() => navigate('/designer')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New Design
            </button>
          </div>
        </div>

        <div className="admin-table-wrap">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#9CA3AF', fontSize: 14 }}>Loading designs…</div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#EF4444', fontSize: 14 }}>{error}</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#9CA3AF', fontSize: 14 }}>No designs found.</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Created By</th>
                  <th>Last Edited</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((design) => (
                  <tr key={design._id || design.id}>
                    <td style={{ fontWeight: 500 }}>{design.title}</td>
                    <td>
                      <span className="admin-cat-badge">{design.tag || '—'}</span>
                    </td>
                    <td style={{ color: '#6B7280', fontSize: 13 }}>{design.createdBy || '—'}</td>
                    <td style={{ color: '#6B7280', fontSize: 13 }}>{design.lastEdited || '—'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <button className="admin-action-btn edit" onClick={() => handleEdit(design)}>Edit</button>
                        <button className="admin-action-btn delete" onClick={() => handleDelete(design)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default ManageDesigns
