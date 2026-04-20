import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "var(--clay-dark)" : "var(--ink-soft)",
    fontWeight: isActive ? 500 : 400,
    padding: "0.5rem 0",
    borderBottom: isActive ? "1px solid var(--clay)" : "1px solid transparent",
    transition: "all 0.2s ease"
  });

  return (
    <header
      style={{
        background: "var(--cream-soft)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.2rem 1.5rem"
        }}
      >
        <Link to="/" style={{ display: "flex", flexDirection: "column", color: "var(--ink)" }}>
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.5rem",
              fontWeight: 500,
              letterSpacing: "1px"
            }}
          >
            Rumah Daun
          </span>
          <span
            style={{
              fontSize: "0.7rem",
              color: "var(--ink-soft)",
              letterSpacing: "3px",
              textTransform: "uppercase"
            }}
          >
            Toko Tanaman Hias
          </span>
        </Link>
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <NavLink to="/" style={linkStyle} end>
            Beranda
          </NavLink>
          <NavLink to="/products" style={linkStyle}>
            Produk
          </NavLink>
          <NavLink to="/admin" style={linkStyle}>
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
