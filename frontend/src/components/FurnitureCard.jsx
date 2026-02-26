import React from 'react';

const FurnitureCard = ({ item, onViewDetails }) => {
  // CRITICAL FIX: If item is undefined or null, skip rendering this card
  if (!item || !item.name) {
    return null; 
  }

  return (
    <div 
      style={{ 
        background: '#fff', borderRadius: '25px', padding: '25px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease',
        cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '15px'
      }}
      onClick={() => onViewDetails(item)}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Image Section */}
      <div style={{ width: '100%', height: '280px', borderRadius: '20px', overflow: 'hidden', background: '#F8F8F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src={item.imagePath || ''} 
          alt={item.name} 
          style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} 
        />
      </div>

      {/* Product Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: '1' }}>
          <h3 style={{ fontSize: '24px', color: '#3E2723', margin: '0 0 5px 0' }}>{item.name}</h3>
          <p style={{ color: '#795548', fontSize: '16px', margin: 0 }}>/ {item.category || 'Uncategorized'}</p>
        </div>
        
        <div style={{ textAlign: 'right' }}>
           <span style={{ fontSize: '24px', fontWeight: '800', color: '#3E2723' }}>
             Rs. {item.price ? Number(item.price).toLocaleString() : '0'}
           </span>
        </div>
      </div>

      {/* Dimensions section with optional chaining */}
      <div style={{ marginTop: '10px', paddingTop: '15px', borderTop: '1px solid #EEE', display: 'flex', gap: '15px', color: '#8D6E63', fontSize: '14px', fontWeight: '600' }}>
        <span>W: {item.dimensions?.width || '0'}cm</span>
        <span>D: {item.dimensions?.depth || '0'}cm</span>
        <span>H: {item.dimensions?.height || '0'}cm</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
        <button style={{ padding: '15px', fontSize: '20px', borderRadius: '12px', border: '1.5px solid #3E2723', background: 'transparent', color: '#3E2723', fontWeight: '700', cursor: 'pointer' }}>
          View Details
        </button>
        <button style={{ padding: '15px', fontSize: '20px', borderRadius: '12px', border: 'none', background: '#3E2723', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default FurnitureCard;