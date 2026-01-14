import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { products } from "../data/Products";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const [color, setColor] = useState("Black");
  const [storage, setStorage] = useState("128GB");

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor: color,
      selectedStorage: storage,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (!product) {
    return <div className="pd-page"><div className="pd-container">Loading...</div></div>;
  }

  return (
    <div className="pd-page">
      <div className="pd-container">

        {/* LEFT - IMAGE */}
        <div className="pd-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* RIGHT - INFO */}
        <div className="pd-info">
          <h1>{product.name}</h1>

          <p className="pd-price">₹{product.price.toLocaleString()}</p>

          <div className="rating">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>
                ★
              </span>
            ))}
            <span className="rating-text">({product.rating})</span>
          </div>

          <p className="pd-desc">
            {product.description || "Experience the power of Apple performance, premium design, stunning display, advanced camera and all-day battery life."}
          </p>

          {/* Highlights */}
          <ul className="pd-highlights">
            <li>✔ A-series powerful processor</li>
            <li>✔ Pro-grade camera system</li>
            <li>✔ Face ID security</li>
            <li>✔ Super Retina Display</li>
            <li>✔ All-day battery life</li>
          </ul>

          {/* Color */}
          <div className="pd-option">
            <h4>Choose Color</h4>
            <div className="pd-buttons">
              {["Black", "Silver", "Blue", "Gold"].map(c => (
                <button
                  key={c}
                  className={color === c ? "active" : ""}
                  onClick={() => setColor(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Storage */}
          <div className="pd-option">
            <h4>Storage</h4>
            <div className="pd-buttons">
              {["64GB", "128GB", "256GB", "512GB"].map(s => (
                <button
                  key={s}
                  className={storage === s ? "active" : ""}
                  onClick={() => setStorage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="pd-actions">
            <button className="add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          {/* Trust badges */}
          <div className="pd-trust">
            <span>🚚 Free Delivery</span>
            <span>🔁 7-Day Replacement</span>
            <span>🛡 1 Year Warranty</span>
          </div>
        </div>
      </div>
    </div>
  );
}
