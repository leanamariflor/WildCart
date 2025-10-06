import "../css/ProductCard.css";
export function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₱ {product.price.toFixed(2)}</p>
    </div>
  );
}
