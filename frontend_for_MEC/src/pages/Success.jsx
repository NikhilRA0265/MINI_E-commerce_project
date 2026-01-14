import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✔</div>

        <h1>Payment Successful</h1>
        <p>Your order has been placed successfully.</p>

        <Link to="/" className="success-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Success;
