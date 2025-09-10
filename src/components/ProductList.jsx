
import React from "react";
import ProductItem from "./ProductItem";

export default function ProductList({ products, favorites, toggleFavorite }) {
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

