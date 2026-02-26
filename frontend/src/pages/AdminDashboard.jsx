import React from 'react';
import Navbar from '../components/Navbar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-wrapper">
      <Navbar />
      <div className="admin-dashboard-container">
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin! Manage furniture, users, and view analytics here.</p>
        <div className="admin-dashboard-actions">
          <div className="admin-action-card" onClick={() => window.location.href='/admin/furniture-management'}>
            <span role="img" aria-label="furniture" className="admin-action-icon">🪑</span>
            <h2>Manage Furnitures</h2>
            <p>Add, edit, or remove furniture items.</p>
          </div>
          <div className="admin-action-card" onClick={() => window.location.href='/admin/users'}>
            <span role="img" aria-label="users" className="admin-action-icon">👥</span>
            <h2>Manage Users</h2>
            <p>View, edit, or remove users.</p>
          </div>
          <div className="admin-action-card" onClick={() => window.location.href='/admin/designs'}>
            <span role="img" aria-label="designs" className="admin-action-icon">🎨</span>
            <h2>Manage Designs</h2>
            <p>Oversee and curate design assets.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
