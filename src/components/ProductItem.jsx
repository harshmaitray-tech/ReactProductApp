function ProductItem({ product }) {
  return (
    <div className="card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>
      <span>⭐ {product.rating}</span>
    </div>
  );
}

export default ProductItem;  // << ye bhi zaroori
