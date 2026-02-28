import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Users, Sofa, FolderTree, Settings } from "lucide-react";
import Navbar from "../components/Navbar";
import "./ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar />
      <aside className="sidebar-pro" style={{ width: '220px', background: '#fff', borderRight: '1px solid #eee', paddingTop: '70px', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 99 }}>
        <div className="sidebar-brand" style={{ padding: '24px', fontWeight: 700, color: '#8B7355', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
          ADMIN DASHBOARD
        </div>
        <nav className="nav-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '24px' }}>
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{ padding: '12px 24px', color: '#6B7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '8px' }}>
            <Users size={18} /> <span>Manage Users</span>
          </NavLink>
          <NavLink to="/admin/furniture-management" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{ padding: '12px 24px', color: '#6B7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '8px' }}>
            <Sofa size={18} /> <span>Manage Furniture</span>
          </NavLink>
          <NavLink to="/admin/designs" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{ padding: '12px 24px', color: '#6B7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '8px' }}>
            <FolderTree size={18} /> <span>Manage Designs</span>
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{ padding: '12px 24px', color: '#6B7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '8px' }}>
            <Settings size={18} /> <span>Settings</span>
          </NavLink>
        </nav>
      </aside>
      <div style={{ flex: 2 }}>
        <div className="manage-users-container">
          <h2>Manage Users</h2>
          {loading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
