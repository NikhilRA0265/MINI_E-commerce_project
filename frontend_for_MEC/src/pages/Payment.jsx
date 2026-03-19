import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/api";
import { useCart } from "../context/CartContext";

export default function Payment() {
  const [method, setMethod] = useState("card");
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const handlePayment = async () => {
    if (!method) {
      alert("Please select a payment method");
      return;
    }

    try {
      const checkoutInfo = JSON.parse(localStorage.getItem("checkoutInfo"));
      if (!checkoutInfo) {
        alert("Please complete checkout first");
        navigate("/checkout");
        return;
      }

      // Calculate total
      const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

      // Prepare order data
      const orderData = {
        user: checkoutInfo.userId,
        products: cart.map(item => ({
          product: item.id,
          quantity: item.qty,
          price: item.price
        })),
        totalAmount,
        shippingAddress: checkoutInfo.address,
      };

      await createOrder(orderData);

      // Clear cart and navigate
      clearCart();
      localStorage.removeItem("checkoutInfo"); // Clean up
      navigate("/success");
    } catch (error) {
      alert('Error creating order: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2>Select Payment Method</h2>
        <p className="payment-sub">Choose your preferred option</p>

        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={method === "card"}
              onChange={() => setMethod("card")}
            />
            Credit / Debit Card (Visa, MasterCard)
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="upi"
              onChange={() => setMethod("upi")}
            />
            UPI (Google Pay, PhonePe, Paytm)
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="netbanking"
              onChange={() => setMethod("netbanking")}
            />
            Net Banking
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              onChange={() => setMethod("cod")}
            />
            Cash on Delivery
          </label>
        </div>

        <button onClick={handlePayment} className="pay-btn">
          Pay Now
        </button>
      </div>
    </div>
  );
}
