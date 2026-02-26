import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const EditFurniture = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 1. Initialize state to match your MongoDB schema exactly
  const [formData, setFormData] = useState({
    name: '',
    category: 'Living Room',
    price: '',
    description: '',
    material: '',
    modelPath: '',
    imagePath: '',
    dimensions: { width: '', depth: '', height: '' }
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/furniture/${id}`);
        // 2. Spread the fetched data into state to fill all fields
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching item:", err);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // 3. Handle nested dimensions object correctly
    if (name.includes('dim_')) {
      const dimName = name.split('_')[1];
      setFormData({
        ...formData,
        dimensions: { ...formData.dimensions, [dimName]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 4. Ensure numbers are sent as Numbers, not Strings
      const updatedData = {
        ...formData,
        price: Number(formData.price),
        dimensions: {
          width: Number(formData.dimensions?.width),
          depth: Number(formData.dimensions?.depth),
          height: Number(formData.dimensions?.height)
        }
      };
      await axios.put(`http://localhost:5001/api/furniture/${id}`, updatedData);
      alert("✅ Update Successful!");
      navigate('/furniture-catalog');
    } catch (err) {
      alert("❌ Update failed. Check server logs.");
    }
  };

  // UI Styles from your previous successful screens
  const containerStyle = { maxWidth: '950px', margin: '50px auto', padding: '50px', background: '#fff', borderRadius: '30px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' };
  const inputStyle = { padding: '16px', borderRadius: '12px', border: '1.5px solid #e0e0e0', fontSize: '18px', width: '100%', boxSizing: 'border-box' };
  const labelStyle = { fontWeight: '800', marginBottom: '10px', color: '#3E2723', fontSize: '17px', display: 'block' };

  return (
    <>
      <Navbar />
      <div style={{ background: '#fcfcfc', minHeight: '100vh', padding: '20px' }}>
        <div style={containerStyle}>
          <h1 style={{ color: '#3E2723', marginBottom: '40px', fontSize: '36px', fontWeight: '900', textAlign: 'center' }}>
            Edit Furniture Asset
          </h1>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                <label style={labelStyle}>Product Name</label>
                <input name="name" value={formData.name || ''} onChange={handleChange} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <select name="category" value={formData.category || 'Living Room'} onChange={handleChange} style={inputStyle}>
                  <option>Living Room</option>
                  <option>Bedroom</option>
                  <option>Dining Room</option>
                  <option>Office</option>
                  <option>Kitchen</option>
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Dimensions (cm)</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <input name="dim_width" type="number" placeholder="W" value={formData.dimensions?.width || ''} onChange={handleChange} style={inputStyle} />
                <input name="dim_depth" type="number" placeholder="D" value={formData.dimensions?.depth || ''} onChange={handleChange} style={inputStyle} />
                <input name="dim_height" type="number" placeholder="H" value={formData.dimensions?.height || ''} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Description</label>
              <textarea name="description" rows="4" value={formData.description || ''} onChange={handleChange} style={{ ...inputStyle, resize: 'none' }} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                <label style={labelStyle}>Price (Rs.)</label>
                <input name="price" type="number" value={formData.price || ''} onChange={handleChange} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Material</label>
                <input name="material" value={formData.material || ''} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div style={{ background: '#f8f8f8', padding: '25px', borderRadius: '15px' }}>
               <h4 style={{ margin: '0 0 15px 0', color: '#795548' }}>Path Configuration</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={labelStyle}>3D Model Path (.glb)</label>
                    <input name="modelPath" value={formData.modelPath || ''} onChange={handleChange} style={{ ...inputStyle, background: '#fff' }} required />
                  </div>
                  <div>
                    <label style={labelStyle}>Image Path (.png)</label>
                    <input name="imagePath" value={formData.imagePath || ''} onChange={handleChange} style={{ ...inputStyle, background: '#fff' }} required />
                  </div>
               </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <button type="submit" style={{ flex: 2, padding: '20px', background: '#3E2723', color: '#fff', border: 'none', borderRadius: '15px', fontSize: '20px', fontWeight: '800' }}>
                Update Product
              </button>
              <button type="button" onClick={() => navigate('/furniture-catalog')} style={{ flex: 1, padding: '20px', background: '#fff', color: '#3E2723', border: '2.5px solid #3E2723', borderRadius: '15px', fontSize: '20px', fontWeight: '800' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditFurniture;