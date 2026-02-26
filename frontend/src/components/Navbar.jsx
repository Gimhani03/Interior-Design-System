import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Pen, LayoutDashboard, Info } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    navigate('/about');
  };

  let navItems = [];
  if (isAuthenticated) {
    navItems = role === 'admin'
      ? [
          { path: '/admin-dashboard', label: 'Home', icon: <LayoutDashboard size={20} /> },
          { path: '/about', label: 'About Us', icon: <Info size={20} /> },
          { path: '/catalog', label: 'Catalog', icon: <BookOpen size={20} /> },
        ]
      : [
          { path: '/dashboard', label: 'Home', icon: <Home size={20} /> },
          { path: '/about', label: 'About Us', icon: <Info size={20} /> },
          { path: '/catalog', label: 'Catalog', icon: <BookOpen size={20} /> },
        ];
  } else {
    navItems = [
      { path: '/about', label: 'About Us', icon: <Info size={20} /> },
      { path: '/catalog', label: 'Catalog', icon: <BookOpen size={20} /> },
    ];
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 onClick={() => navigate(role === 'admin' ? '/admin-dashboard' : '/dashboard')}>
          Interior Design System
        </h2>
      </div>
      <div className="navbar-center">
        {navItems.map((item, index) => (
          <button
            key={`${item.path}-${index}`}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <div className="navbar-right">
        {isAuthenticated ? (
          <ProfileDropdown onLogout={handleLogout} />
        ) : (
          <button className="login-button" onClick={handleLoginClick}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
