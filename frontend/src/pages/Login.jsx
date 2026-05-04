import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const expired = new URLSearchParams(location.search).get("expired");
  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Gagal masuk.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "440px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span
            style={{
              color: "var(--moss-dark)",
              fontSize: "0.75rem",
              letterSpacing: "3px",
              textTransform: "uppercase"
            }}
          >
            Akses Admin
          </span>
          <h1 style={{ marginTop: "0.5rem" }}>Masuk</h1>
        </div>

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
          {expired && (
            <div
              style={{
                background: "#f5e6dc",
                color: "var(--terracotta)",
                padding: "0.7rem 1rem",
                borderRadius: "8px",
                fontSize: "0.9rem"
              }}
            >
              Sesi berakhir. Silakan masuk kembali.
            </div>
          )}
          {error && (
            <div
              style={{
                background: "#f5e6dc",
                color: "var(--terracotta)",
                padding: "0.7rem 1rem",
                borderRadius: "8px",
                fontSize: "0.9rem"
              }}
            >
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={submitting} style={{ marginTop: "0.3rem" }}>
            {submitting ? "Memproses..." : "Masuk"}
          </button>

          <p style={{ textAlign: "center", fontSize: "0.9rem", color: "var(--ink-soft)", marginTop: "0.5rem" }}>
            Belum punya akun? <Link to="/register">Daftar di sini</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
