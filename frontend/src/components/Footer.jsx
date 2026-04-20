export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--beige)",
        borderTop: "1px solid var(--border)",
        padding: "2.5rem 0",
        marginTop: "4rem"
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          textAlign: "center"
        }}
      >
        <span
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.3rem",
            color: "var(--ink)"
          }}
        >
          Rumah Daun
        </span>
        <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>
          Tanaman hias untuk rumah dan taman yang hidup.
        </p>
        <p style={{ color: "var(--ink-soft)", fontSize: "0.8rem", marginTop: "0.5rem" }}>
          &copy; {new Date().getFullYear()} Rumah Daun. Tugas Personal Lab Week 6.
        </p>
      </div>
    </footer>
  );
}
