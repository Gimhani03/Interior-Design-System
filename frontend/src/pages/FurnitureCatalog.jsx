import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FurnitureCard from '../components/FurnitureCard';
import Navbar from '../components/Navbar';
import './FurnitureCatalog.css';

const FurnitureCatalog = () => {
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5001/api/furniture');
        setFurnitureItems(res.data);
      } catch (err) {
        console.error("Error fetching furniture data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFurniture();
  }, []);

  const filteredAndSortedItems = furnitureItems
    .filter(item => {
      if (!item || !item.name) return false;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const priceA = a.price ? parseInt(String(a.price).replace(/,/g, '')) : 0;
      const priceB = b.price ? parseInt(String(b.price).replace(/,/g, '')) : 0;
      if (sortBy === "priceLow") return priceA - priceB;
      if (sortBy === "priceHigh") return priceB - priceA;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const categories = ["All", "Living Room", "Bedroom", "Dining Room", "Office", "Kitchen", "Storage"];

  return (
    <>
      <Navbar />
      <div className="furniture-catalog-page">
        <div className="furniture-catalog-container">
          <h1 className="furniture-catalog-title">Furniture Catalog</h1>
          <p className="furniture-catalog-desc">Explore premium assets for your 3D interior design.</p>

          <div style={{ marginBottom: '50px' }}>
            <div className="furniture-catalog-searchbar">
              <input
                type="text"
                placeholder="Search our collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="furniture-catalog-search"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="furniture-catalog-sort"
              >
                <option value="default">Sort by: Default</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            <div className="furniture-catalog-categories">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`furniture-catalog-category-btn${selectedCategory === cat ? ' selected' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <p className="furniture-catalog-count">
            {loading ? "Loading furniture..." : `Showing ${filteredAndSortedItems.length} products`}
          </p>

          <div className="furniture-catalog-grid">
            {filteredAndSortedItems.map(item => (
              <FurnitureCard
                key={item._id || item.id}
                item={item}
                onViewDetails={(selected) => navigate(`/product/${selected._id || selected.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FurnitureCatalog;