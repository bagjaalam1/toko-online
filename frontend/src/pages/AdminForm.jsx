import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { productsApi, categoriesApi } from "../api/client.js";

const emptyForm = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  image: "",
  category: "Indoor"
};

export default function AdminForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    categoriesApi.list().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    productsApi
      .get(id)
      .then((p) =>
        setForm({
          name: p.name,
          description: p.description || "",
          price: p.price,
          stock: p.stock,
          image: p.image || "",
          category: p.category
        })
      )
      .catch(() => setError("Produk tidak ditemukan."))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (isEdit) {
        await productsApi.update(id, form);
      } else {
        await productsApi.create(form);
      }
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="section">
        <div className="container"><p className="muted">Memuat...</p></div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "720px" }}>
        <Link to="/admin" className="muted" style={{ fontSize: "0.9rem" }}>
          &larr; Kembali ke admin
        </Link>
        <h1 style={{ marginTop: "1rem", marginBottom: "2rem" }}>
          {isEdit ? "Edit Produk" : "Tambah Produk Baru"}
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "var(--cream-soft)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem"
          }}
        >
          {error && (
            <div
              style={{
                background: "#f5e6dc",
                color: "var(--terracotta)",
                padding: "0.8rem 1rem",
                borderRadius: "8px"
              }}
            >
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name">Nama Produk</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="category">Kategori</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label htmlFor="price">Harga (Rp)</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="stock">Stok</label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="image">Path atau URL Gambar</label>
            <input
              id="image"
              name="image"
              type="text"
              value={form.image}
              onChange={handleChange}
              placeholder="/images/nama.jpg atau https://..."
            />
          </div>

          <div>
            <label htmlFor="description">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <button type="submit" disabled={saving}>
              {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Simpan Produk"}
            </button>
            <button
              type="button"
              className="ghost"
              onClick={() => navigate("/admin")}
              disabled={saving}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
