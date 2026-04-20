import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <h1 style={{ fontSize: "4rem", color: "var(--clay)" }}>404</h1>
        <p className="muted" style={{ marginBottom: "2rem" }}>
          Halaman yang Anda cari tidak ditemukan.
        </p>
        <Link to="/" className="btn">Kembali ke Beranda</Link>
      </div>
    </section>
  );
}
