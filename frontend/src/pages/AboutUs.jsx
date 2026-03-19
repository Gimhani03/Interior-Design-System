import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Sofa, Grid3X3, Box, Shield } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import Navbar from '../components/Navbar';
import './AboutUs.css';

const AboutUs = () => {
  const navigate = useNavigate();
  // Auth state for button logic
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [role, setRole] = React.useState(null);
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  // Navigation logic for Get Started/CTA
  const handleGetStarted = () => {
    if (isAuthenticated) {
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/login');
    }
  };

  const features = [
    { icon: <Sofa size={28} style={{ color: '#8B7355' }} />, title: 'Premium Furniture Catalog', desc: 'Explore our curated catalog with detailed specs, ratings, pricing, and filter by room type or style.' },
    { icon: <Grid3X3 size={28} style={{ color: '#A0826D' }} />, title: 'Smart 2D Designer', desc: 'Drag & drop with snap-to-grid, boundary checks, sample layouts, and real-time resizing handles.' },
    { icon: <Box size={28} style={{ color: '#C9A882' }} />, title: 'Advanced 3D Viewer', desc: 'Interactive 3D rendering with preset finishes, adjustable shadows, collision detection, and orbit controls.' },
    { icon: <Shield size={28} style={{ color: '#8B7355' }} />, title: 'Save & Export', desc: 'Persistent design storage, high-quality PNG exports, and seamless project management across sessions.' },
  ];

  const testimonials = [
    { name: 'Sarah M.', rating: 5, text: 'Interior Design System made designing my living room incredibly easy. The 3D view is amazing!', avatar: 'S' },
    { name: 'James T.', rating: 5, text: 'I tried multiple room planners but this one has the best furniture catalog and 2D tools.', avatar: 'J' },
    { name: 'Priya K.', rating: 4, text: 'The drag-and-drop interface is intuitive. My bedroom layout turned out perfect.', avatar: 'P' },
  ];

  return (
    <>
      <Navbar />
      <div className="about-page" style={{ paddingTop: '70px' }}>
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-hero-text">
            <span className="about-badge">
              Room Planner & Furniture Catalog
            </span>
            <h1 className="about-title">
              Design Your Perfect Space in <span className="about-highlight">2D & 3D</span>
            </h1>
            <p className="about-description">
              Browse premium furniture, plan with smart 2D tools, customize with preset finishes, and visualize in stunning 3D with adjustable lighting — all in one seamless platform.
            </p>
            <div className="about-buttons">
              <button onClick={handleGetStarted} className="about-btn-primary">
                Get Started Free <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div className="about-hero-image">
            <div className="about-image-wrapper">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&auto=format&fit=crop"
                alt="Modern room design"
                className="about-image"
              />
            </div>
            <div className="about-rating-card">
              <div className="about-stars">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="star-filled" />)}
              </div>
              <span className="about-rating-text">4.8 / 5 — 2,400+ users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="about-features">
        <div className="about-section-content">
          <div className="about-section-header">
            <h2 className="about-section-title">Everything You Need to Design Your Space</h2>
            <p className="about-section-subtitle">From browsing furniture to placing it in a life-like 3D room, we have all the tools.</p>
          </div>
          <div className="about-features-grid">
            {features.map((f, i) => (
              <div key={i} className="about-feature-card">
                <div className="about-feature-icon">{f.icon}</div>
                <h3 className="about-feature-title">{f.title}</h3>
                <p className="about-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="about-how-it-works">
        <div className="about-section-content">
          <div className="about-section-header">
            <h2 className="about-section-title">How It Works</h2>
          </div>
          <div className="about-steps-grid">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up for free with email verification. Access your personalized dashboard and design workspace.' },
              { step: '02', title: 'Browse Furniture Catalog', desc: 'Explore our premium furniture collection filtered by room type, style, and category with detailed specs and pricing.' },
              { step: '03', title: 'Design in 2D', desc: 'Use our intuitive drag-and-drop designer with snap-to-grid, sample layouts, and real-time resizing to plan your space.' },
              { step: '04', title: 'Visualize in 3D', desc: 'View your design in stunning 3D with interactive controls, adjustable shadows, preset finishes, and collision detection.' },
              { step: '05', title: 'Customize & Export', desc: 'Apply colors to all furniture, adjust lighting, save your designs, and export high-quality images of your perfect space.' },
            ].map((item, i) => (
              <div key={i} className="about-step-card">
                <div className="about-step-number">{item.step}</div>
                <h3 className="about-step-title">{item.title}</h3>
                <p className="about-step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="about-testimonials">
        <div className="about-section-content">
          <div className="about-section-header">
            <h2 className="about-section-title">What Our Users Say</h2>
          </div>
          <div className="about-testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="about-testimonial-card">
                <div className="about-testimonial-stars">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} className="star-filled" />)}
                </div>
                <p className="about-testimonial-text">"{t.text}"</p>
                <div className="about-testimonial-author">
                  <div className="about-testimonial-avatar">{t.avatar}</div>
                  <span className="about-testimonial-name">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta-content">
          <h2 className="about-cta-title">Ready to Design Your Dream Room?</h2>
          <p className="about-cta-text">Join thousands of users who trust us for their interior design projects.</p>
          <button onClick={handleGetStarted} className="about-cta-button">
            Start Designing Now <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <div className="about-footer-content">
          <div className="about-footer-brand">Interior Design System</div>
          <div className="about-footer-links">
            <button onClick={() => navigate('/profile')} className="about-footer-link">Profile</button>
            <button onClick={() => navigate('/login')} className="about-footer-link">Login</button>
          </div>
          <p className="about-footer-copyright">© 2026 Interior Design System. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default AboutUs;
