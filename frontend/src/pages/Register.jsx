import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Konfirmasi password tidak sama.");
      return;
    }
    setSubmitting(true);
    try {
      await register(username, password, name);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mendaftar.");
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
            Akun Baru
          </span>
          <h1 style={{ marginTop: "0.5rem" }}>Daftar</h1>
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
              minLength={3}
            />
          </div>

          <div>
            <label htmlFor="name">Nama Lengkap (opsional)</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="confirm">Ulangi Password</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" disabled={submitting} style={{ marginTop: "0.3rem" }}>
            {submitting ? "Memproses..." : "Daftar"}
          </button>

          <p style={{ textAlign: "center", fontSize: "0.9rem", color: "var(--ink-soft)", marginTop: "0.5rem" }}>
            Sudah punya akun? <Link to="/login">Masuk di sini</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
