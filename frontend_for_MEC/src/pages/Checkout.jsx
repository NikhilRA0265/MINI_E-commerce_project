import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/api";

export default function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Check if user is already logged in
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (loggedInUser) {
    // Redirect to payment if logged in
    navigate("/payment");
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!form.name || !form.email || !form.address) {
      alert("Please fill all details");
      return;
    }

    try {
      // Create user
      const userResponse = await createUser({
        name: form.name,
        email: form.email,
        password: 'temp123', // You might want to handle password differently
      });

      // Store user info
      localStorage.setItem("checkoutInfo", JSON.stringify({
        ...form,
        userId: userResponse.data._id
      }));

      // go to payment page
      navigate("/payment");
    } catch (error) {
      // Check if it's a duplicate email error
      if (error.response?.data?.message?.includes('duplicate key error')) {
        alert('An account with this email already exists. Please login instead.');
        navigate('/login');
        return;
      }
      alert('Error creating user: ' + error.response?.data?.message);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h2>Checkout</h2>
        <p className="checkout-sub">Shipping & Contact Information</p>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Full Shipping Address"
            value={form.address}
            onChange={handleChange}
            rows="3"
          />

          <button type="submit">Continue to Payment</button>
        </form>
      </div>
    </div>
  );
}
