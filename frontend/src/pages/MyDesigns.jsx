import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import DesignThumbnail from '../components/DesignThumbnail';
import { Trash2, Edit3, Calendar, Maximize2, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import './Dashboard.css'; // Reusing some base styles

const MyDesigns = () => {
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  useEffect(() => {
    const fetchDesigns = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5001/api/designs/user/${user.id || user._id}`);
        setDesigns(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, [navigate]);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setDeleteModal({ show: true, id });
  };

  const confirmDelete = async () => {
    const id = deleteModal.id;
    setDeleteModal({ show: false, id: null });

    try {
      await axios.delete(`http://localhost:5001/api/designs/${id}`);
      setDesigns(designs.filter(d => d._id !== id));
      showToast("Design removed successfully", "success");
    } catch (err) {
      showToast("Failed to delete design", "error");
    }
  };

  return (
    <div className="db-page">
      <Navbar />
      <div className="db-content">
        <header className="db-section-header" style={{ marginBottom: '10px' }}>
          <div>
            <h1 className="db-hero-title" style={{ color: '#1e293b', fontSize: '32px' }}>My Saved Layouts</h1>
            <p className="db-hero-sub" style={{ color: '#64748b', fontSize: '15px' }}>Manage and continue working on your interior designs.</p>
          </div>
          <button
            className="db-hero-btn"
            onClick={() => navigate('/designer')}
            style={{
              background: '#8B7355',
              color: '#fff',
              boxShadow: '0 4px 12px rgba(139, 115, 85, 0.2)'
            }}
          >
            + Create New
          </button>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', color: '#8B7355', fontWeight: '500' }}>
            <div className="loading-spinner"></div>
            Loading your gallery...
          </div>
        ) : designs.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '100px 40px',
            background: 'white',
            borderRadius: '24px',
            border: '2px dashed #E5E7EB',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{ padding: '20px', background: '#F9F7F4', borderRadius: '50%' }}>
              <Maximize2 size={48} color="#8B7355" />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1F2937' }}>No designs found</h3>
            <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '400px', margin: '0 auto' }}>
              Your creative journey starts here! Click the button above to create your first interior masterpiece.
            </p>
            <button className="db-btn-primary" onClick={() => navigate('/designer')} style={{ padding: '12px 32px' }}>
              Start Designing
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 340px))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {designs.map(design => (
              <div
                key={design._id}
                className="db-design-card"
                onClick={() => navigate(`/designer?id=${design._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="db-design-img-wrap" style={{ height: '220px', background: '#fff', borderBottom: '1px solid #F3EDE6', overflow: 'hidden' }}>
                  <DesignThumbnail
                    designId={design._id}
                    designData={design} // Pass full data to avoid extra fetches
                    className="db-design-img"
                  />
                  <div className="db-design-tag">2D Layout</div>
                </div>
                <div className="db-design-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h3 className="db-design-title" style={{ fontSize: '17px' }}>{design.name}</h3>
                    <button
                      onClick={(e) => handleDelete(design._id, e)}
                      className="delete-btn-hover"
                      style={{
                        color: '#9CA3AF',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '8px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="db-design-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} />
                    <span>Edited on {new Date(design.lastEdited).toLocaleDateString()}</span>
                  </div>
                  <button
                    className="db-btn-outline"
                    style={{
                      width: '100%',
                      marginTop: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      borderRadius: '12px'
                    }}
                  >
                    <Edit3 size={16} /> Continue Editing
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CUSTOM CONFIRMATION MODAL */}
      {deleteModal.show && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div style={{
            background: 'white', padding: '32px', borderRadius: '24px',
            width: '400px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
            animation: 'modalSlide 0.3s ease-out', textAlign: 'center'
          }}>
            <div style={{
              background: '#FEF2F2', width: '64px', height: '64px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'
            }}>
              <AlertTriangle size={32} color="#EF4444" />
            </div>
            <h3 style={{ margin: '0 0 10px', fontSize: '22px', fontWeight: '700', color: '#111827' }}>Delete Design?</h3>
            <p style={{ margin: '0 0 28px', color: '#6B7280', fontSize: '15px', lineHeight: '1.6' }}>
              This action cannot be undone. You will lose all furniture placements and room configurations for this design.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setDeleteModal({ show: false, id: null })}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1.5px solid #E5E7EB', background: 'white', color: '#374151', cursor: 'pointer', fontWeight: '600' }}
              >Cancel</button>
              <button
                onClick={confirmDelete}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#EF4444', color: 'white', cursor: 'pointer', fontWeight: '600' }}
              >Delete Permanently</button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM TOAST NOTIFICATION */}
      {toast.show && (
        <div style={{
          position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
          background: toast.type === 'success' ? '#10B981' : '#EF4444',
          color: 'white', padding: '12px 24px', borderRadius: '12px',
          display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10000,
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          animation: 'toastIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span style={{ fontWeight: '600', fontSize: '14px' }}>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default MyDesigns;
