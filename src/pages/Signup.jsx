// pages/Signup.jsx
import { useState } from "react";
import { COLORS } from "../constants";
import axios from "axios";

const API = "http://localhost:5000";

export default function Signup({ onLogin, setPage }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    if (!form.name || !form.email || !form.password || !form.confirm) { setError("Please fill in all fields!"); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match!"); return; }
    if (form.password.length < 4) { setError("Password must be at least 4 characters!"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/auth/signup`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #5BB8F5 0%, #9B8EC4 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito', sans-serif", padding: 20 }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />

      <div style={{ background: "#fff", borderRadius: 24, padding: 40, width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>👨‍👩‍👧</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: COLORS.sky, marginBottom: 4 }}>Create Account</h1>
          <p style={{ color: COLORS.muted, fontSize: 14, fontWeight: 600 }}>Join DAYCARE MANAGEMENT SYSTEM as a Parent</p>
        </div>

        {/* Fields */}
        {[
          { label: "FULL NAME", key: "name", type: "text", placeholder: "e.g. Grace Njeri" },
          { label: "EMAIL ADDRESS", key: "email", type: "email", placeholder: "e.g. grace@email.com" },
          { label: "PASSWORD", key: "password", type: "password", placeholder: "Create a password" },
          { label: "CONFIRM PASSWORD", key: "confirm", type: "password", placeholder: "Repeat your password" },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, display: "block", marginBottom: 6 }}>{f.label}</label>
            <input
              type={f.type}
              value={form[f.key]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "2px solid " + COLORS.border, fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
          </div>
        ))}

        {/* Error */}
        {error && (
          <div style={{ background: COLORS.coral + "15", border: "1px solid " + COLORS.coral, borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: COLORS.coral, fontWeight: 700 }}>
            ❌ {error}
          </div>
        )}

        {/* Signup Button */}
        <button
          onClick={signup}
          disabled={loading}
          style={{ width: "100%", padding: 14, background: loading ? COLORS.muted : COLORS.sky, color: "#fff", border: "none", borderRadius: 14, fontWeight: 900, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", marginTop: 4 }}>
          {loading ? "Creating Account..." : "Create Account →"}
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: COLORS.border }} />
          <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>Already have an account?</span>
          <div style={{ flex: 1, height: 1, background: COLORS.border }} />
        </div>

        {/* Login Link */}
        <button
          onClick={() => setPage("login")}
          style={{ width: "100%", padding: 12, background: "#fff", color: COLORS.mint, border: "2px solid " + COLORS.mint, borderRadius: 14, fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
          Back to Login
        </button>

        <p style={{ textAlign: "center", fontSize: 11, color: COLORS.muted, marginTop: 20 }}>
          🔒 Your data is secure and encrypted
        </p>
      </div>
    </div>
  );
}