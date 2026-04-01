// pages/Login.jsx
import { useState } from "react";
import { COLORS } from "../constants";
import axios from "axios";

const API = "http://localhost:5000";

export default function Login({ onLogin, setPage }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!form.email || !form.password) { setError("Please fill in all fields!"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/auth/login`, form);
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #4ECBA4 0%, #5BB8F5 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito', sans-serif", padding: 20 }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />

      <div style={{ background: "#fff", borderRadius: 24, padding: 40, width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>🏡</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: COLORS.mint, marginBottom: 4 }}>DAYCARE MANAGEMENT SYSTEM</h1>
          <p style={{ color: COLORS.muted, fontSize: 14, fontWeight: 600 }}>Daycare Management System</p>
        </div>

        {/* Form */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, display: "block", marginBottom: 6 }}>EMAIL ADDRESS</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            placeholder="e.g. grace@email.com"
            onKeyDown={e => e.key === "Enter" && login()}
            style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "2px solid " + COLORS.border, fontSize: 14, fontFamily: "inherit", outline: "none" }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, display: "block", marginBottom: 6 }}>PASSWORD</label>
          <input
            type="password"
            value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            placeholder="Enter your password"
            onKeyDown={e => e.key === "Enter" && login()}
            style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "2px solid " + COLORS.border, fontSize: 14, fontFamily: "inherit", outline: "none" }}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: COLORS.coral + "15", border: "1px solid " + COLORS.coral, borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: COLORS.coral, fontWeight: 700 }}>
            ❌ {error}
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={login}
          disabled={loading}
          style={{ width: "100%", padding: 14, background: loading ? COLORS.muted : COLORS.mint, color: "#fff", border: "none", borderRadius: 14, fontWeight: 900, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", marginTop: 8 }}>
          {loading ? "Logging in..." : "Login →"}
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: COLORS.border }} />
          <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>Don't have an account?</span>
          <div style={{ flex: 1, height: 1, background: COLORS.border }} />
        </div>

        {/* Signup Link */}
        <button
          onClick={() => setPage("signup")}
          style={{ width: "100%", padding: 12, background: "#fff", color: COLORS.sky, border: "2px solid " + COLORS.sky, borderRadius: 14, fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
          Create Parent Account
        </button>

        <p style={{ textAlign: "center", fontSize: 11, color: COLORS.muted, marginTop: 20 }}>
          🔒 Your data is secure and encrypted
        </p>
      </div>
    </div>
  );
}