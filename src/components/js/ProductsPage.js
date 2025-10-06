import { useState } from 'react';
import { Search, ShoppingCart, Settings, HelpCircle, ChevronDown } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { products, categories } from '../../data/mockdata';
import favicon from "../../assets/favicon.png";
import "../css/Product.css";

export function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [visibleProducts, setVisibleProducts] = useState(8);

  const handleToggleCategory = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 8);
  };

  return (
    <div className="product-page">
      <header className="product-header">
        <div className="header-container">
          <div className="header-content">
            <div className="logo-container">
              <div className="logo-icon">
                <img src={favicon} alt="WildCart Logo" className="small-logo"/>
              </div>
            </div>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button className="search-button">
                <Search className="w-4 h-4 text-gray-900" />
              </button>
            </div>

            <div className="header-actions">
              <button className="header-button">
                <HelpCircle className="w-6 h-6" />
              </button>
              <button className="header-button">
                Profile
              </button>
              <button className="cart-button">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button className="header-button">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* <div className="breadcrumb">
        <div className="breadcrumb-container">Product Page</div>
      </div> */}

      <main className="main-content">
        <div className="content-wrapper">
          <div className="content-layout">
            <aside className="sidebar">
              <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onToggleCategory={handleToggleCategory}
              />
            </aside>

            <div className="products-section">
              <div className="sort-container">
                <div className="sort-wrapper">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="popular">Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="sort-icon w-4 h-4" />
                </div>
              </div>

              <div className="products-grid">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {visibleProducts < filteredProducts.length && (
                <div className="load-more-container">
                  <button
                    onClick={loadMore}
                    className="load-more-button"
                  >
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
