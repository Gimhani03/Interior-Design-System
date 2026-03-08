import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, ArrowLeft, Layers, Maximize, Cpu, BoxSelect } from 'lucide-react';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const Viewer3D = () => {
  const navigate = useNavigate();

  return (
    <div className="db-page" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div className="db-content" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          textAlign: 'center',
          background: 'white',
          padding: '60px 40px',
          borderRadius: '32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
          maxWidth: '600px',
          border: '1px solid #F3EDE6'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #8B7355 0%, #A0826D 100%)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px',
            color: 'white',
            boxShadow: '0 15px 30px rgba(139, 115, 85, 0.3)'
          }}>
            <Box size={48} />
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1F2937', marginBottom: '16px' }}>
            3D Viewer Mode
          </h1>

          <p style={{ fontSize: '18px', color: '#6B7280', lineHeight: '1.6', marginBottom: '40px' }}>
            This workspace is reserved for the <strong>3D Visualization Engine</strong>.
            The 3D developer will integrate the rendering pipeline here to bring your 2D layouts to life in full immersive 3D space.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '40px',
            padding: '20px',
            background: '#F9F7F4',
            borderRadius: '16px'
          }}>
            <div style={{ padding: '12px', textAlign: 'center' }}>
              <Cpu size={24} color="#8B7355" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#8B7355', textTransform: 'uppercase' }}>WebGL Ready</div>
            </div>
            <div style={{ padding: '12px', textAlign: 'center' }}>
              <Layers size={24} color="#8B7355" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#8B7355', textTransform: 'uppercase' }}>Data Linked</div>
            </div>
            <div style={{ padding: '12px', textAlign: 'center' }}>
              <BoxSelect size={24} color="#8B7355" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#8B7355', textTransform: 'uppercase' }}>3D Assets</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button
              className="db-btn-outline"
              onClick={() => navigate('/dashboard')}
              style={{ padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <ArrowLeft size={18} /> Back to Dashboard
            </button>
            <button
              className="db-btn-primary"
              onClick={() => navigate('/my-designs')}
              style={{ padding: '12px 24px', borderRadius: '12px' }}
            >
              Manage 2D Layouts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer3D;
