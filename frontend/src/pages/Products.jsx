import { useEffect, useState } from "react";
import { productsApi, categoriesApi } from "../api/client.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (activeCategory) params.category = activeCategory;
      if (search) params.search = search;
      const data = await productsApi.list(params);
      setProducts(data);
    } catch (err) {
      setError("Gagal memuat produk. Pastikan backend berjalan di port 5000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    categoriesApi.list().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [activeCategory, search]);

  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span
            style={{
              color: "var(--moss-dark)",
              fontSize: "0.75rem",
              letterSpacing: "3px",
              textTransform: "uppercase"
            }}
          >
            Koleksi Lengkap
          </span>
          <h1 style={{ marginTop: "0.5rem" }}>Daftar Produk</h1>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem"
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              className={activeCategory === "" ? "" : "ghost"}
              onClick={() => setActiveCategory("")}
            >
              Semua
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={activeCategory === cat ? "" : "ghost"}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "280px" }}
          />
        </div>

        {error && (
          <div
            style={{
              background: "#f5e6dc",
              color: "var(--terracotta)",
              padding: "1rem",
              borderRadius: "var(--radius)",
              marginBottom: "1.5rem"
            }}
          >
            {error}
          </div>
        )}

        {loading ? (
          <p className="muted">Memuat produk...</p>
        ) : products.length === 0 ? (
          <p className="muted">Tidak ada produk yang cocok dengan kriteria pencarian.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.5rem"
            }}
          >
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
