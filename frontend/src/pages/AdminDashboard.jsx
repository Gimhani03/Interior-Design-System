import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import API from "../services/api";
import {
  LayoutDashboard,
  Users,
  Sofa,
  FolderTree,
  User,
  DollarSign,
  Settings
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "./AdminDashboard.css";
import Navbar from "../components/Navbar";

const activityData = [
  { name: "Jan", users: 40, sales: 24 },
  { name: "Feb", users: 30, sales: 13 },
  { name: "Mar", users: 20, sales: 98 },
  { name: "Apr", users: 27, sales: 39 },
  { name: "May", users: 18, sales: 48 },
  { name: "Jun", users: 23, sales: 38 },
  { name: "Jul", users: 34, sales: 43 }
];

const recentActivity = [
  { id: 1, action: "Added new furniture: Modern Sofa", time: "2 hours ago" },
  { id: 2, action: "User registered: Jane Doe", time: "4 hours ago" },
  { id: 3, action: "Sale completed: $1,200", time: "Yesterday" },
  { id: 4, action: "Password reset: John Smith", time: "Yesterday" }
];

export default function AdminDashboard() {
  const [furnitureCount, setFurnitureCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  // Fetch furniture count
  const fetchFurnitureCount = async () => {
    try {
      const res = await API.get("/furniture");
      setFurnitureCount(res.data.length);
    } catch (err) {
      setFurnitureCount(0);
    }
  };

  // Fetch user count
  const fetchUserCount = async () => {
    try {
      const res = await API.get("/users");
      setUserCount(res.data.length);
    } catch (err) {
      setUserCount(0);
    }
  };

  useEffect(() => {
    fetchFurnitureCount();
    fetchUserCount();
  }, []);

  return (
    <div className="admin-dashboard" style={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar />
      <aside className="sidebar-pro" style={{ width: '220px', background: '#fff', borderRight: '1px solid #eee', paddingTop: '100px', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 99 }}>
        <nav className="nav-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '2px' }}>
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
      <div style={{ flex: 1, marginLeft: '220px' }}>
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <span className="dashboard-welcome">Welcome, Admin!</span>
        </header>

        <section className="summary-cards">
            <div className="card">
              <User size={32} />
              <div>
                <h2>Users</h2>
                <p>{userCount}</p>
              </div>
            </div>
            <div className="card">
              <Sofa size={32} />
              <div>
                <h2>Furniture</h2>
                <p>{furnitureCount}</p>
              </div>
            </div>
            <div className="card">
              <DollarSign size={32} />
              <div>
                <h2>Sales</h2>
                <p>$12,340</p>
              </div>
            </div>
        </section>

        <section className="dashboard-main">
          <div className="chart-section">
            <h2>Monthly Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="activity-section">
            <h2>Recent Activity</h2>
            <ul className="activity-list">
              {recentActivity.map(item => (
                <li key={item.id}>
                  <span className="activity-action">{item.action}</span>
                  <span className="activity-time">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}