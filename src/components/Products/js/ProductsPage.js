import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from '../../Products/js/CategoryFilter';
import "../css/Product.css";

export function ProductsPage() {
  const [products, setProducts] = useState([]);  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [visibleProducts, setVisibleProducts] = useState(8);

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

  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  
  const loadMore = () => setVisibleProducts((prev) => prev + 8);

  return (
    <div className="product-page">
      <main className="main-content">
        <div className="content-wrapper">
          <div className="content-layout">

            <aside className="sidebar">
              <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onToggleCategory={(c)=> setSelectedCategories(prev =>
                  prev.includes(c) ? prev.filter(x=>x!==c) : [...prev,c]
                )}
              />
            </aside>

            
            <div className="products-section">

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
