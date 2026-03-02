// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ For navigation
import Navbar from '../components/Navbar'; 
import './Dashboard.css';
import { ChevronRight, Layout, Plus, Folder, Box, CheckCircle, Wallet } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUserName(userObj.name || 'User');
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const recentDesigns = [
    { id: 1, title: "Living Room Layout", lastEdited: "Today", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80" },
    { id: 2, title: "Bedroom Design", lastEdited: "Yesterday", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=400&q=80" },
    { id: 3, title: "Modern Apartment", lastEdited: "4 days ago", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <main className="dashboard-content">
        {/* Welcome Header */}
        <header className="welcome-section">
          <h1>Welcome back, {userName} 👋</h1>
          <p>Here's what's happening with your designs today.</p>
        </header>

        {/* Action Grid */}
        <div className="action-grid">
          <ActionCard 
            icon={<Plus size={20} />} 
            title="Create New Layout" 
            desc="Start designing room" 
            btnText="Create New Layout" 
            variant="primary" 
          />

          {/* ✅ Purchase History navigates to /purchase-history */}
          <ActionCard 
            icon={<Wallet size={20} color="#3b82f6" />} 
            title="Purchase History" 
            desc="View your past purchases" 
            btnText="View Purchase History" 
            onClick={() => navigate('/purchase-history')}
          />

          <ActionCard 
            icon={<Folder size={20} color="#3b82f6" />} 
            title="My Designs" 
            desc="View saved layouts" 
            btnText="View saved layouts" 
          />
          <ActionCard 
            icon={<Box size={20} color="#6366f1" />} 
            title="Open 3D Viewer" 
            desc="View last project" 
            btnText="View saved layouts" 
            showArrow 
          />
        </div>

        {/* Recent Designs */}
        <section className="section-container">
          <div className="section-header">
            <h2>Recent Designs</h2>
            <div className="nav-arrows">
              <button><ChevronRight className="rotate-180" size={16}/></button>
              <button><ChevronRight size={16}/></button>
            </div>
          </div>

          <div className="design-grid">
            {recentDesigns.map((design) => (
              <div key={design.id} className="design-card">
                <img src={design.image} alt={design.title} />
                <div className="design-card-info">
                  <h3>{design.title}</h3>
                  <p>Last edited: {design.lastEdited}</p>
                  <button className="btn-outline">Continue Editing</button>
                </div>
              </div>
            ))}

            {/* Design Capacity Card */}
            <div className="stats-card-highlight">
              <div className="badge-icon"><CheckCircle size={18} /> 12 | 12</div>
              <p className="stats-label text-bold">Total Designs</p>
              <div className="stats-subtext"><Layout size={14} /> Living Room</div>
            </div>
          </div>
        </section>

        {/* Footer Info Area */}
        <footer className="dashboard-footer-stats">
          <div className="tip-box">
            <div className="tip-header"></div>
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-value">12</span>
              <span className="stat-caption">Total Designs</span>
            </div>
            <div className="stat-item border-x">
              <Layout size={24} color="#9ca3af" />
              <span className="stat-caption">Last Edited<br/>Living Room</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">8</span>
              <span className="stat-caption">Saved Items</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

// ✅ Updated ActionCard to accept onClick
const ActionCard = ({ icon, title, desc, btnText, variant, showArrow, onClick }) => (
  <div className={`action-card ${variant === 'primary' ? 'active-card' : ''}`}>
    <div className="action-card-top">
      <div className="icon-wrapper">{icon}</div>
      <div className="action-text">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
    <button
      className={variant === 'primary' ? 'btn-action-primary' : 'btn-action-secondary'}
      onClick={onClick} // ✅ Handle button click
    >
      {btnText} {showArrow && <ChevronRight size={14} />}
    </button>
  </div>
);

export default Dashboard;