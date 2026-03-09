import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DesignThumbnail from '../components/DesignThumbnail'
import './FurnitureCatalog.css'
import './Designs.css'

const CATEGORIES = ['All', 'Living Room', 'Bedroom', 'Dining Room', 'Office', 'Kitchen', 'Apartment']

const SAMPLE_DESIGNS = [
  { id: 1, title: 'Living Room Layout', tag: 'Living Room', lastEdited: 'Today' },
  { id: 2, title: 'Bedroom Design', tag: 'Bedroom', lastEdited: 'Yesterday' },
  { id: 3, title: 'Modern Apartment', tag: 'Apartment', lastEdited: '4 days ago' },
  { id: 4, title: 'Cozy Kitchen', tag: 'Kitchen', lastEdited: '1 week ago' },
  { id: 5, title: 'Home Office', tag: 'Office', lastEdited: '2 weeks ago' },
  { id: 6, title: 'Minimalist Lounge', tag: 'Living Room', lastEdited: '3 weeks ago' },
  { id: 7, title: 'Elegant Dining Space', tag: 'Dining Room', lastEdited: '1 month ago' },
  { id: 8, title: 'Master Suite', tag: 'Bedroom', lastEdited: '5 days ago' },
]

const Designs = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredDesigns = SAMPLE_DESIGNS.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.tag && d.tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || d.tag === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="catalog-page">
      <Navbar />

      {/* Hero */}
      <section className="catalog-hero" style={{ paddingTop: '120px' }}>
        <h1 className="catalog-hero-title">Designs</h1>
        <p className="catalog-hero-sub">
          Browse available designs.
        </p>
      </section>

      {/* Controls */}
      <div className="catalog-controls">
        <div className="catalog-controls-inner">
          <div className="catalog-search-row">
            <div className="catalog-search-wrap">
              <svg className="catalog-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="catalog-search-input"
                placeholder="Search designs..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
          </div>

          <div className="catalog-pills">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`catalog-pill${selectedCategory === cat ? ' active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="catalog-body">
        <p className="catalog-count">
          Showing {filteredDesigns.length} design{filteredDesigns.length !== 1 ? 's' : ''}
        </p>

        <div className="catalog-grid">
          {filteredDesigns.length > 0
            ? filteredDesigns.map(design => (
                <div key={design.id} className="dcard" onClick={() => navigate('/designer', { state: { designId: design.id } })}>
                  <div className="dcard-img-wrap">
                    <DesignThumbnail designId={design.id} className="dcard-img" />
                    <span className="dcard-badge dcard-badge-2d">2D Layout</span>
                  </div>
                  <div className="dcard-body">
                    <h3 className="dcard-title">{design.title}</h3>
                    <p className="dcard-meta">Last edited: {design.lastEdited}</p>
                    <button
                      className="dcard-btn dcard-btn-continue"
                      onClick={e => { e.stopPropagation(); navigate('/designer', { state: { designId: design.id } }) }}
                    >
                      Continue Editing
                    </button>
                  </div>
                </div>
              ))
            : (
                <div className="catalog-empty">
                  <div className="catalog-empty-icon">🎨</div>
                  <h3>No designs found</h3>
                  <p>Try adjusting your search or filter.</p>
                  <button
                    className="catalog-empty-btn"
                    onClick={() => { setSearchTerm(''); setSelectedCategory('All') }}
                  >
                    Clear filters
                  </button>
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default Designs
