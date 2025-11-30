import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { FaSearch } from "react-icons/fa";
import { CategoryFilter } from '../../Products/js/CategoryFilter';
import Header from '../../Shared/js/Header';
import "../css/Product.css";

export function ProductsPage() {
  const [products, setProducts] = useState([]);  
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [visibleProducts, setVisibleProducts] = useState(8);

  // Sync searchQuery from URL param 'search'
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search') || '';
    setSearchQuery(q);
  }, [location.search]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Products:", data); 
        setProducts(Array.isArray(data) ? data : []); // prevents crash
      })
      .catch(() => console.log("❌ Failed to load products"));
  }, []);


  useEffect(() => {
    import('../../../api/api')
      .then(({ fetchCategories }) => fetchCategories())
      .then(data => setCategories(data))
      .catch(() => console.log("⚠ No category data"));
  }, []);


  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategories.length === 0 || selectedCategories.includes(product.category);
        return matchesSearch && matchesCategory;
      })
    : [];

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'newest':
        return new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0);
      case 'popular':
      default:
        return 0; // Keep original order for popular
    }
  });

  const displayedProducts = sortedProducts.slice(0, visibleProducts);

  // Debug logging
  useEffect(() => {
    console.log("Selected Categories:", selectedCategories);
    console.log("Filtered Products:", filteredProducts.length);
    console.log("Sort By:", sortBy);
  }, [selectedCategories, filteredProducts.length, sortBy]);

  
  const loadMore = () => setVisibleProducts((prev) => prev + 8);

  return (
    <div className="product-page">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <div className="content-layout">

            <aside className="sidebar">
              <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onToggleCategory={(c)=> {
                  console.log("Category clicked:", c);
                  setSelectedCategories(prev =>
                    prev.includes(c) ? prev.filter(x=>x!==c) : [...prev,c]
                  );
                }}
                onClearFilters={() => setSelectedCategories([])}
              />
            </aside>

            
            <div className="products-section">
              
              <div className="products-search-container">
                <input
                  type="text"
                  className="products-search-input"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  className="products-search-button"
                  aria-label="Search"
                ><FaSearch /></button>
              </div>

              <div className="sort-container">
                <div className="sort-wrapper">
                  <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)} className="sort-select">
                    <option value="popular">Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="sort-icon w-4 h-4" />
                </div>
              </div>

              
              <div className="products-grid">
                {displayedProducts.length > 0 ? (
                  displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <p>No products found...</p>
                )}
              </div>

              {visibleProducts < filteredProducts.length && (
                <div className="load-more-container">
                  <button className="load-more-button" onClick={loadMore}>
                    Load more products
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductsPage;
