import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userName, setUserName] = useState('User');
  const [cardType, setCardType] = useState('unknown');
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // Extract data from location state
  // This captures the 'productName' and 'price' passed from ProductDetails.jsx
  const { productName, price, image } = location.state || { 
    productName: "Premium Furniture", 
    price: 0,
    image: ""
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setUserName(userObj.name || 'User');
    }
  }, []);

  // Visual card type detection
  useEffect(() => {
    if (formData.cardNumber.startsWith('4')) setCardType('visa');
    else if (formData.cardNumber.startsWith('5')) setCardType('mastercard');
    else setCardType('unknown');
  }, [formData.cardNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Save purchase with correct item details to localStorage
      const storedPurchases = localStorage.getItem('purchases');
      let purchases = storedPurchases ? JSON.parse(storedPurchases) : [];

      const newPurchase = {
        id: Math.floor(Math.random() * 100000),
        name: productName,
        price: price,
        date: new Date().toLocaleDateString(),
        image: image
      };

      purchases.push(newPurchase);
      localStorage.setItem('purchases', JSON.stringify(purchases));
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="pay-page">
        <Navbar />
        <div className="pay-container success-center">
          <div className="success-card">
            <div className="success-icon-wrap">
              <CheckCircle size={60} />
            </div>
            <h1 className="pay-title">Payment Confirmed!</h1>
            <p className="pay-subtitle">
              Thank you, {userName}! Your order for <strong>{productName}</strong> is now being processed.
            </p>
            <div className="order-number">Ref: #IDS-{Math.floor(Math.random() * 10000)}</div>
            <button 
              className="pay-submit-btn" 
              onClick={() => navigate('/purchase-history')}
            >
              View Purchase History
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pay-page">
      <Navbar />
      <div className="pay-container">

        {/* Navigation Stepper */}
        <div className="pay-stepper">
          <div className="step completed">1. Cart</div>
          <div className="step-line"></div>
          <div className="step active">2. Payment</div>
          <div className="step-line"></div>
          <div className="step">3. Confirm</div>
        </div>

        <button className="pay-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to Catalog
        </button>

        <div className="pay-grid">

          {/* Payment Form */}
          <div className="pay-card shadow-sm">
            <div className="pay-header">
              <h2 className="section-header">Payment Method</h2>
              <div className="card-logos">
                <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className={cardType === 'visa' ? 'active' : ''} />
                <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className={cardType === 'mastercard' ? 'active' : ''} />
              </div>
            </div>

            <form onSubmit={handlePayment} className="pay-form">
              <div className="pay-input-group">
                <label>Cardholder Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder={userName} 
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="pay-input-group">
                <label>Card Number</label>
                <div className="pay-input-wrapper">
                  <input 
                    type="text" 
                    name="cardNumber"
                    placeholder="4000 1234 5678 9010" 
                    maxLength="16" 
                    onChange={handleInputChange}
                    required 
                  />
                  <CreditCard className="pay-input-icon" size={18} />
                </div>
              </div>

              <div className="pay-form-row">
                <div className="pay-input-group">
                  <label>Expiry Date</label>
                  <input 
                    type="text" 
                    name="expiry"
                    placeholder="MM/YY" 
                    maxLength="5" 
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="pay-input-group">
                  <label>CVV</label>
                  <input 
                    type="password" 
                    name="cvv"
                    placeholder="***" 
                    maxLength="3" 
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="pay-submit-btn" disabled={isProcessing}>
                {isProcessing ? "Processing..." : `Pay Rs. ${price.toLocaleString()}`}
              </button>

              <div className="pay-security-badge">
                <Lock size={12} /> 
                <span>SSL Encrypted Demo</span>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="pay-summary-card">
            <h3 className="pay-summary-title">Order Summary</h3>
            <div className="pay-summary-item">
              <span className="text">Item Name - </span>
              <span className="text-bold">{productName}</span>
            </div>
            <div className="pay-summary-item">
              <span className="text">Shipping - </span>
              <span style={{color: '#10b981', fontWeight: 'bold'}}>Free Delivery</span>
            </div>
            <div className="pay-divider"></div>
            <div className="pay-total-row">
              <span>Grand Total</span>
              <span className="total-price">Rs. {price.toLocaleString()}</span>
            </div>
            <div className="pay-trust-badge">
              <ShieldCheck size={16} /> Verified Purchase
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;