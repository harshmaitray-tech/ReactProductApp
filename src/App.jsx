
import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [showFavorites, setShowFavorites] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 15; // 8 products per page
  const totalPages = Math.ceil(100 / limit); // 13 pages

  
  const toggleFavorite = (product) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === product.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
    } else {
      updatedFavorites = [...favorites, product];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      setCategories(["all", ...data]);
    } catch {
      console.log("Failed to load categories");
    }
  };

  // fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `https://dummyjson.com/products?limit=${limit}&skip=${
        (page - 1) * limit
      }`;

      if (search.trim() !== "") {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
          search
        )}&limit=${limit}&skip=${(page - 1) * limit}`;
      } else if (category !== "all") {
        url = `https://dummyjson.com/products/category/${encodeURIComponent(
          category
        )}?limit=${limit}&skip=${(page - 1) * limit}`;
      }

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

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, search, category]);

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      {/* Navbar */}
      <div className="navbar">
        <h1 className="logo">🛍️ Product Explorer</h1>
        <div className="nav-controls">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            categories={categories}
            selected={category}
            onChange={(cat) => {
              setCategory(cat);
              setPage(1); // reset page
            }}
          />
          <button className="view-fav-btn" onClick={() => setShowFavorites(true)}>
      Favorites
      <span className="fav-badge">{favorites.length}</span>
    </button>
          {/* <button className="view-fav-btn" onClick={() => setShowFavorites(true)}>
            Favorites ({favorites.length})
          </button> */}
          <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* Products */}
      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ProductList
          products={products}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage(1)} disabled={page === 1}>
          ⏮ First
        </button>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          ⬅ Prev
        </button>

        {/* page numbers */}
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next ➡
        </button>
        <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>
          Last ⏭
        </button>
      </div>

      {/* Favorites Modal */}
      {showFavorites && (
        <div className="favorites-modal">
          <div className="modal-content">
            <h2>Your Favorites</h2>
            <button className="close-btn" onClick={() => setShowFavorites(false)}>
              X
            </button>
            {favorites.length === 0 ? (
              <p>No favorites added.</p>
            ) : (
              <div className="favorites-grid">
                {favorites.map((fav) => (
                  <div className="fav-card" key={fav.id}>
                    <img src={fav.thumbnail} alt={fav.title} />
                    <p>{fav.title}</p>
                    <button onClick={() => toggleFavorite(fav)}>Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
