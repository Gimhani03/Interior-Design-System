import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import Navbar from '../components/Navbar';
import './FurnitureManagement.css';

const FurnitureManagement = () => {
  const [furniture, setFurniture] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    fetchFurniture();
  }, []);

  const fetchFurniture = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/furniture');
      setFurniture(res.data);
    } catch (err) {
      console.error("Error fetching furniture:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently remove this item?")) {
      try {
        await axios.delete(`http://localhost:5001/api/furniture/${id}`);
        fetchFurniture(); 
      } catch (err) {
        console.error("Error deleting item:", err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="furniture-management-wrapper">
        <div className="furniture-management-header">
          <h1>Furniture Management</h1>
          <Link to="/admin/add" className="add-furniture-btn">
            + Add New Furniture
          </Link>
        </div>
        <table className="furniture-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {furniture.map(item => (
              <tr key={item._id}>
                <td>
                  <div className="product-info">
                    <div className="product-img-box">
                      <img src={item.imagePath} alt={item.name} />
                    </div>
                    <b>{item.name}</b>
                  </div>
                </td>
                <td>{item.category}</td>
                <td>Rs. {item.price.toLocaleString()}</td>
                <td>
                  <span className="status-active">● Active</span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="edit-btn" onClick={() => navigate(`/admin/edit/${item._id}`)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(item._id)}
                      onMouseEnter={() => setHoveredId(item._id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FurnitureManagement;