import { Link } from "react-router-dom";
import { formatRupiah } from "../utils/format.js";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product._id}`}
      style={{
        background: "var(--cream-soft)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.25s ease",
        boxShadow: "var(--shadow)",
        color: "var(--ink)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "var(--shadow-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow)";
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "4 / 3",
          overflow: "hidden",
          background: "var(--beige)"
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block"
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--ink-soft)",
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.1rem"
            }}
          >
            Tanpa Gambar
          </div>
        )}
      </div>
      <div style={{ padding: "1.1rem 1.2rem 1.3rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <span
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "var(--moss-dark)"
          }}
        >
          {product.category}
        </span>
        <h3 style={{ fontSize: "1.2rem" }}>{product.name}</h3>
        <p style={{ fontSize: "1rem", color: "var(--clay-dark)", fontWeight: 500 }}>
          {formatRupiah(product.price)}
        </p>
      </div>
    </Link>
  );
}
