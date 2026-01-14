import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from "../components/ProductCard";
import { products } from "../data/Products";

export default function Home() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesStorage = selectedStorage ? product.name.includes(selectedStorage) : true;
    const matchesColor = selectedColor ? product.name.includes(selectedColor) : true;
    return matchesSearch && matchesPrice && matchesStorage && matchesColor;
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* GREETING SECTION */}
      <section className="hero-advanced">
        <div className="hero-content">
          <h1>Welcome back, {user.name}!</h1>
          <p>
            Discover the power of innovation.
            Shop the latest iPhones with premium experience.
          </p>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="features">
        <div className="feature-box">🚚 Free Delivery</div>
        <div className="feature-box">💳 Secure Payments</div>
        <div className="feature-box">📱 100% Apple Products</div>
        <div className="feature-box">⭐ Trusted by Students</div>
      </section>

      {/* SEARCH AND FILTERS */}
      <section className="search-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filters">
          <div className="filter-group">
            <label>Price Range:</label>
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="filter-input"
            />
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="filter-input"
            />
          </div>
          <div className="filter-group">
            <label>Storage:</label>
            <select value={selectedStorage} onChange={(e) => setSelectedStorage(e.target.value)} className="filter-select">
              <option value="">All</option>
              <option value="64GB">64GB</option>
              <option value="128GB">128GB</option>
              <option value="256GB">256GB</option>
              <option value="512GB">512GB</option>
              <option value="1TB">1TB</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Color:</label>
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="filter-select">
              <option value="">All</option>
              <option value="Black">Black</option>
              <option value="Silver">Silver</option>
              <option value="Blue">Blue</option>
              <option value="Gold">Gold</option>
              <option value="White">White</option>
            </select>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="products" id="products">
        <div className="products-header">
          <h2>Latest iPhones ({filteredProducts.length})</h2>
          <p>Choose your next upgrade</p>
        </div>

        <div className="product-grid">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="promo-banner">
        <h2>Why choose i Store?</h2>
        <p>
          A student-built premium iPhone store experience with clean UI, smooth
          performance and modern React architecture.
        </p>
      </section>
    </div>
  );
}
