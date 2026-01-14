import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">

      {}
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-img" />
      </Link>

      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <div className="rating">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>
            ★
          </span>
        ))}
        <span className="rating-text">({product.rating})</span>
      </div>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
