
import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar.jsx";
import CategoryFilter from "./components/CategoryFilter.jsx";
import ProductList from "./components/ProductList.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // fetch all products
  const fetchProducts = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      setError("Could not load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      setCategories(["all", ...data]);
    } catch (err) {
      console.log("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts("https://dummyjson.com/products");
  }, []);

  // handle search & category filter
  useEffect(() => {
    if (search.trim() === "") {
      if (category === "all") {
        fetchProducts("https://dummyjson.com/products");
      } else {
        fetchProducts(
          `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
        );
      }
    } else {
      fetchProducts(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  return (
    <div className="container">
      <h1>Product Explorer</h1>

      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={setCategory}
        />
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && <ProductList products={products} />}
    </div>
  );
}

export default App;
