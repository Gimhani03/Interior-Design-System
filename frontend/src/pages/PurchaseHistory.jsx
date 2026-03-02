import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./PurchaseHistory.css";

const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const storedPurchases = localStorage.getItem("purchases");

    if (storedPurchases) {
      try {
        const parsed = JSON.parse(storedPurchases);
        setPurchases(parsed.reverse()); // Show latest first
      } catch (error) {
        console.error("Error parsing purchases:", error);
        setPurchases([]);
      }
    }
  }, []);

  return (
    <div className="purchase-history-wrapper">
      <Navbar />

      <div className="purchase-container">
        <h1 className="purchase-title">🛍️ Purchase History</h1>

        {purchases.length === 0 ? (
          <div className="empty-state">
            <p>No purchases yet.</p>
          </div>
        ) : (
          <div className="purchase-grid">
            {purchases.map((item, index) => (
              <div key={index} className="purchase-card">

                {/* Info Only */}
                <div className="purchase-details">
                  <h3>{item.name}</h3>
                  <p><strong>Date:</strong> {item.date}</p>
                  <p>
                    <strong>Price:</strong> Rs.{" "}
                    {item.price?.toLocaleString()}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;