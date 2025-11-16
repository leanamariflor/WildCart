import "../css/ProductCard.css";
import { useNavigate } from "react-router-dom";

export function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate("/viewproduct", { state: { product } })}
    >
      <div className="product-image-container">
        <img
           src={product.images[0]} 
          alt={product.name}
          className="product-image"
        />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₱ {product.price.toFixed(2)}</p>
    </div>
  );
}
