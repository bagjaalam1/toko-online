import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productsApi } from "../api/client.js";
import { formatRupiah } from "../utils/format.js";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    productsApi
      .get(id)
      .then(setProduct)
      .catch(() => setError("Produk tidak ditemukan."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="section">
        <div className="container"><p className="muted">Memuat...</p></div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="section">
        <div className="container">
          <p className="muted">{error || "Produk tidak ditemukan."}</p>
          <Link to="/products" className="btn ghost" style={{ marginTop: "1rem" }}>
            Kembali ke Daftar Produk
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <Link to="/products" className="muted" style={{ fontSize: "0.9rem" }}>
          &larr; Kembali ke daftar produk
        </Link>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            marginTop: "1.5rem",
            alignItems: "start"
          }}
        >
          <div
            style={{
              borderRadius: "var(--radius)",
              overflow: "hidden",
              aspectRatio: "1 / 1",
              background: "var(--beige)",
              boxShadow: "var(--shadow)"
            }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--ink-soft)"
                }}
              >
                Tanpa Gambar
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <span
              style={{
                color: "var(--moss-dark)",
                fontSize: "0.75rem",
                letterSpacing: "3px",
                textTransform: "uppercase"
              }}
            >
              {product.category}
            </span>
            <h1 style={{ fontSize: "2.4rem" }}>{product.name}</h1>
            <p
              style={{
                color: "var(--clay-dark)",
                fontSize: "1.6rem",
                fontFamily: "Cormorant Garamond, serif"
              }}
            >
              {formatRupiah(product.price)}
            </p>
            <hr className="divider" style={{ margin: "0.5rem 0" }} />
            <div>
              <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "var(--ink-soft)" }}>
                Deskripsi
              </h4>
              <p style={{ color: "var(--ink)", lineHeight: 1.75 }}>
                {product.description || "Belum ada deskripsi."}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "2rem",
                padding: "1rem 0",
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)"
              }}
            >
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--ink-soft)" }}>Stok Tersedia</span>
                <p style={{ fontSize: "1.1rem", fontWeight: 500 }}>{product.stock} unit</p>
              </div>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--ink-soft)" }}>Kategori</span>
                <p style={{ fontSize: "1.1rem", fontWeight: 500 }}>{product.category}</p>
              </div>
            </div>
            <button
              disabled={product.stock === 0}
              style={{
                marginTop: "0.5rem",
                padding: "0.9rem 1.5rem",
                opacity: product.stock === 0 ? 0.5 : 1,
                cursor: product.stock === 0 ? "not-allowed" : "pointer"
              }}
              onClick={() => alert("Fitur keranjang belum tersedia pada versi ini.")}
            >
              {product.stock === 0 ? "Stok Habis" : "Tambah ke Keranjang"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
