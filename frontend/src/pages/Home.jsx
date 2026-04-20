import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { productsApi } from "../api/client.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi
      .list()
      .then((data) => setFeatured(data.slice(0, 4)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section
        style={{
          background: "linear-gradient(135deg, var(--cream-soft) 0%, var(--beige) 100%)",
          padding: "5rem 0 4.5rem"
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "3rem",
            alignItems: "center"
          }}
        >
          <div>
            <span
              style={{
                color: "var(--moss-dark)",
                fontSize: "0.8rem",
                letterSpacing: "4px",
                textTransform: "uppercase"
              }}
            >
              Tumbuh di rumah
            </span>
            <h1 style={{ marginTop: "0.8rem", marginBottom: "1.2rem" }}>
              Hadirkan ketenangan dengan sentuhan hijau.
            </h1>
            <p style={{ color: "var(--ink-soft)", fontSize: "1.05rem", marginBottom: "2rem", maxWidth: "520px" }}>
              Koleksi tanaman hias pilihan, dari monstera yang meneduhkan hingga sukulen mungil
              untuk meja kerja. Setiap tanaman dirawat dengan teliti sebelum sampai ke tangan Anda.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link to="/products" className="btn">
                Lihat Koleksi
              </Link>
              <Link to="/admin" className="btn ghost">
                Masuk Admin
              </Link>
            </div>
          </div>
          <div
            style={{
              aspectRatio: "1 / 1",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              boxShadow: "var(--shadow-hover)"
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1463154545680-d59320fd685d?w=800"
              alt="Tanaman hias"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

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
                Pilihan Kami
              </span>
              <h2 style={{ marginTop: "0.5rem" }}>Produk Unggulan</h2>
            </div>
            <Link to="/products" className="muted">Lihat semua &rarr;</Link>
          </div>

          {loading ? (
            <p className="muted">Memuat...</p>
          ) : featured.length === 0 ? (
            <p className="muted">
              Belum ada produk. Jalankan <code>npm run seed</code> di folder backend atau tambahkan dari halaman Admin.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1.5rem"
              }}
            >
              {featured.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ background: "var(--cream-soft)", padding: "3.5rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2rem"
            }}
          >
            {[
              {
                title: "Pengiriman Aman",
                body: "Dikemas dengan kardus khusus dan penyangga, tanaman sampai dalam kondisi terbaik."
              },
              {
                title: "Kurasi Pilihan",
                body: "Hanya tanaman sehat yang kami jual, telah melalui proses aklimatisasi."
              },
              {
                title: "Panduan Perawatan",
                body: "Setiap produk disertai panduan perawatan sederhana agar tanaman tumbuh subur."
              }
            ].map((item) => (
              <div key={item.title} style={{ borderLeft: "2px solid var(--clay)", paddingLeft: "1.2rem" }}>
                <h3 style={{ marginBottom: "0.5rem" }}>{item.title}</h3>
                <p className="muted" style={{ fontSize: "0.95rem" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
