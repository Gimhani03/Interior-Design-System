import React, { useState, useEffect } from 'react';
import LightController from '../components/LightController';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FurnitureViewer from '../components/FurnitureViewer';
import Navbar from '../components/Navbar';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightRotation, setLightRotation] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#3E2723');
  const [intensity, setIntensity] = useState(0.6);
  const [environment, setEnvironment] = useState('city');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/furniture/${id}`);
        setItem(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchItem();
  }, [id]);

  if (loading || !item) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="product-details-page">
        <div className="product-details-container">
          <button 
            onClick={() => navigate(-1)} 
            style={{
              position: 'absolute',
              left: 'calc(50% - 640px)',
              top: '115px',
              zIndex: 2,
              background: '#fff',
              border: '2px solid #795548',
              color: '#795548',
              fontSize: '20px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderRadius: '14px',
              padding: '4px 8px',
              boxShadow: '0 2px 12px rgba(62,39,35,0.10)',
              transition: 'box-shadow 0.2s, border 0.2s',
              cursor: 'pointer',
            }}
            onMouseOver={e => {
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(62,39,35,0.16)';
              e.currentTarget.style.border = '2.5px solid #3E2723';
            }}
            onMouseOut={e => {
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(62,39,35,0.10)';
              e.currentTarget.style.border = '2px solid #795548';
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            
          </button>
          {/* Left Column: 3D Viewer & Controls */}
          <div>
            <div style={{ width: '600px', minWidth: '550px' }}>
              <FurnitureViewer 
                modelPath={item.modelPath} 
                customColor={selectedColor} 
                intensity={intensity}
                environment={environment}
              />
            </div>
            <div style={{ marginTop: '30px', padding: '30px', background: '#FBFBFB', borderRadius: '24px', border: '1px solid #EEE' }}>
              <h4 style={{ color: '#3E2723', margin: '0 0 20px 0', fontSize: '20px', fontWeight: '700' }}>Studio Controls</h4>
              <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '15px', color: '#795548', marginBottom: '12px', fontWeight: '600' }}>Light Intensity</label>
                  <input 
                    type="range" min="0" max="2" step="0.1" 
                    value={intensity} 
                    onChange={(e) => setIntensity(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#3E2723', cursor: 'pointer' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '15px', color: '#795548', marginBottom: '12px', fontWeight: '600' }}>Environment Type</label>
                  <select 
                    value={environment} 
                    onChange={(e) => setEnvironment(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #DDD', fontSize: '16px', outline: 'none' }}
                  >
                    <option value="city">Urban City</option>
                    <option value="apartment">Modern Apartment</option>
                    <option value="studio">Photo Studio</option>
                    <option value="lobby">Hotel Lobby</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information */}
          <div className="product-details-info">
            <span className="product-details-category">{item.category}</span>
            <h1 className="product-details-title">{item.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#FFB300', fontSize: '24px' }}>★★★★★</span>
              <span style={{ color: '#795548', fontWeight: '700', fontSize: '18px' }}>4.8 (124 reviews)</span>
            </div>
            <div className="product-details-price">Rs. {item.price.toLocaleString()}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#2E7D32' }}></div>
              <span style={{ color: '#2E7D32', fontWeight: '700', fontSize: '18px' }}>In Stock</span>
            </div>
            <div>
              <h3 style={{ fontSize: '22px', color: '#3E2723', marginBottom: '12px' }}>Description</h3>
              <p className="product-details-description">
                {item.description || "Crafted with premium materials, this piece offers exceptional comfort and a modern silhouette for any contemporary space."}
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '19px', color: '#3E2723', marginBottom: '15px' }}>Finish Options</h3>
              <div style={{ display: 'flex', gap: '14px' }}>
                {['#3E2723', '#795548', '#A1887F', '#5D4037', '#212121'].map(c => (
                  <div key={c} onClick={() => setSelectedColor(c)} style={{ width: '48px', height: '48px', background: c, borderRadius: '50%', cursor: 'pointer', border: selectedColor === c ? '4px solid #3E2723' : '2px solid #EEE' }} />
                ))}
              </div>
            </div>
            <div className="product-details-dimensions">
              <div style={{ display: 'flex', gap: '40px', padding: '25px 0', borderTop: '1px solid #EEE', borderBottom: '1px solid #EEE' }}>
                <div><span style={{ fontSize: '30px', fontWeight: '800', display: 'block' }}>{item.dimensions?.width}</span><span style={{ color: '#795548', fontSize: '15px' }}>Width (cm)</span></div>
                <div><span style={{ fontSize: '30px', fontWeight: '800', display: 'block' }}>{item.dimensions?.depth}</span><span style={{ color: '#795548', fontSize: '15px' }}>Depth (cm)</span></div>
                <div><span style={{ fontSize: '30px', fontWeight: '800', display: 'block' }}>{item.dimensions?.height}</span><span style={{ color: '#795548', fontSize: '15px' }}>Height (cm)</span></div>
              </div>
            </div>
            <div className="product-details-actions">
              <button className="product-details-btn">Add to Design</button>
              <button className="product-details-btn secondary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;