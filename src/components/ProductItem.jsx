
import React from "react";

export default function ProductItem({ product, favorites, toggleFavorite }) {
  const isFav = favorites.some((fav) => fav.id === product.id);

  return (
    <div className="card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>💲 {product.price}</p>
      <p>⭐ {product.rating}</p>
      <button
        className={`fav-btn ${isFav ? "active" : ""}`}
        onClick={() => toggleFavorite(product)}
      >
        {isFav ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
