import ProductItem from "./ProductItem.jsx";

function ProductList({ products }) {
  if (!products.length) return <p>No products found.</p>;
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
}

export default ProductList;  // << ye bhi zaroori
