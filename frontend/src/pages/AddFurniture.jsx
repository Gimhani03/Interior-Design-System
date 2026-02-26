import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AddFurniture = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: 'chair',
    category: 'Living Room',
    price: '',
    description: '',
    material: '',
    modelPath: '/assets/models/',
    imagePath: '/assets/images/',
    dimensions: { width: '', depth: '', height: '' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('dim_')) {
      const dimName = name.split('_')[1];
      setFormData({ ...formData, dimensions: { ...formData.dimensions, [dimName]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalData = {
        ...formData,
        price: Number(formData.price),
        dimensions: {
          width: Number(formData.dimensions.width),
          depth: Number(formData.dimensions.depth),
          height: Number(formData.dimensions.height)
        }
      };
      await axios.post('http://localhost:5001/api/furniture', finalData);
      alert("✅ Furniture added successfully!");
      navigate('/furniture-catalog');
    } catch (err) {
      alert("❌ Error: Check if all fields are filled correctly.");
    }
  };

  // Enhanced Styling for Highlight
  const containerStyle = {
    maxWidth: '950px',
    margin: '50px auto',
    padding: '50px',
    background: '#ffffff',
    borderRadius: '30px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)', // Deep shadow to pop from background
    border: '1px solid #f0f0f0'
  };

  const inputStyle = { 
    padding: '16px', 
    borderRadius: '12px', 
    border: '1.5px solid #e0e0e0', 
    fontSize: '18px', // Increased font
    width: '100%',
    boxSizing: 'border-box',
    outlineColor: '#3E2723'
  };

  const labelStyle = { 
    fontWeight: '800', 
    marginBottom: '10px', 
    color: '#3E2723', 
    fontSize: '17px', 
    display: 'block',
    letterSpacing: '0.5px'
  };

  return (
    <>
      <Navbar />
      <div style={{ background: '#fcfcfc', minHeight: '100vh', padding: '20px' }}>
        <div style={containerStyle}>
          <h1 style={{ color: '#3E2723', marginBottom: '40px', fontSize: '36px', fontWeight: '900', textAlign: 'center' }}>
            Add New Furniture Asset
          </h1>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                <label style={labelStyle}>Product Name</label>
                <input name="name" placeholder="e.g. Classic Armchair" onChange={handleChange} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <select name="category" onChange={handleChange} style={inputStyle}>
                  <option>Living Room</option>
                  <option>Bedroom</option>
                  <option>Dining Room</option>
                  <option>Office</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                <label style={labelStyle}>Price (Rs.)</label>
                <input name="price" type="number" placeholder="45,000" onChange={handleChange} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Material / Finish</label>
                <input name="material" placeholder="Solid Teak / Velvet" onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Detailed Description</label>
              <textarea name="description" rows="4" placeholder="Describe the material, comfort, and style..." onChange={handleChange} style={{ ...inputStyle, resize: 'none' }} required />
            </div>

            <div>
              <label style={labelStyle}>Product Dimensions (cm)</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <input name="dim_width" type="number" placeholder="Width" onChange={handleChange} style={inputStyle} />
                <input name="dim_depth" type="number" placeholder="Depth" onChange={handleChange} style={inputStyle} />
                <input name="dim_height" type="number" placeholder="Height" onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div style={{ background: '#f8f8f8', padding: '25px', borderRadius: '15px' }}>
               <h4 style={{ margin: '0 0 15px 0', color: '#795548' }}>Asset Configuration</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={labelStyle}>3D Model Path (.glb)</label>
                    <input name="modelPath" defaultValue="/assets/models/" onChange={handleChange} style={{ ...inputStyle, background: '#fff' }} required />
                  </div>
                  <div>
                    <label style={labelStyle}>Image Path (.png)</label>
                    <input name="imagePath" defaultValue="/assets/images/" onChange={handleChange} style={{ ...inputStyle, background: '#fff' }} required />
                  </div>
               </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px',marginBottom: '20px' }}>
              <button type="submit" style={{ flex: 1, padding: '20px', background: '#3E2723', color: '#fff', border: 'none', borderRadius: '15px', fontSize: '20px', fontWeight: '800', cursor: 'pointer', transition: '0.3s' }}>
                Publish Product
              </button>
              <button type="button" onClick={() => navigate('/admin/furniture-catalog')} style={{ flex: 1, padding: '20px', background: '#fff', color: '#3E2723', border: '2.5px solid #3E2723', borderRadius: '15px', fontSize: '20px', fontWeight: '800', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default AddFurniture;