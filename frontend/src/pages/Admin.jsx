import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productsApi } from "../api/client.js";
import { formatRupiah } from "../utils/format.js";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const data = await productsApi.list();
      setProducts(data);
    } catch (err) {
      setError("Gagal memuat produk.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Hapus produk "${name}"?`)) return;
    try {
      await productsApi.remove(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Gagal menghapus produk.");
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2rem"
          }}
        >
          <div>
            <span
              style={{
                color: "var(--moss-dark)",
                fontSize: "0.75rem",
                letterSpacing: "3px",
                textTransform: "uppercase"
              }}
            >
              Kelola Katalog
            </span>
            <h1 style={{ marginTop: "0.5rem" }}>Daftar Produk</h1>
          </div>
          <button onClick={() => navigate("/admin/new")}>Tambah Produk</button>
        </div>

        {error && <p className="muted">{error}</p>}
        {loading ? (
          <p className="muted">Memuat...</p>
        ) : products.length === 0 ? (
          <p className="muted">Belum ada produk. Klik "Tambah Produk" untuk mulai.</p>
        ) : (
          <div
            style={{
              background: "var(--cream-soft)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              overflow: "hidden"
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--beige)", textAlign: "left" }}>
                  <th style={th}>Gambar</th>
                  <th style={th}>Nama</th>
                  <th style={th}>Kategori</th>
                  <th style={th}>Harga</th>
                  <th style={th}>Stok</th>
                  <th style={{ ...th, textAlign: "right" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={td}>
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          background: "var(--beige)"
                        }}
                      >
                        {p.image && (
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        )}
                      </div>
                    </td>
                    <td style={td}>
                      <Link to={`/products/${p._id}`}>{p.name}</Link>
                    </td>
                    <td style={td}>
                      <span style={{ color: "var(--moss-dark)", fontSize: "0.85rem" }}>{p.category}</span>
                    </td>
                    <td style={td}>{formatRupiah(p.price)}</td>
                    <td style={td}>{p.stock}</td>
                    <td style={{ ...td, textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                        <button
                          className="ghost"
                          onClick={() => navigate(`/admin/edit/${p._id}`)}
                          style={{ padding: "0.45rem 0.9rem", fontSize: "0.85rem" }}
                        >
                          Edit
                        </button>
                        <button
                          className="danger"
                          onClick={() => handleDelete(p._id, p.name)}
                          style={{ padding: "0.45rem 0.9rem", fontSize: "0.85rem" }}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

const th = { padding: "0.9rem 1rem", fontWeight: 500, color: "var(--ink-soft)", fontSize: "0.85rem" };
const td = { padding: "0.9rem 1rem", verticalAlign: "middle" };
