import React from 'react';
import Navbar from '../components/Navbar';
import './Designer.css';

const Designer = () => {
  return (
    <>
      <Navbar />
      <div className="designer-wrapper">
        <div className="designer-container">
          <h1>2D/3D Room Designer</h1>
          <p>Create and visualize your perfect space with our interactive designer tool.</p>
          <div className="coming-soon">
            <span>Coming Soon</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Designer;
