// pages/Users.jsx
// ─── Admin page to manage users (add caregivers, view all users) ──────

import { useState, useEffect, useCallback } from "react";
// Removed 'S' from imports as it was unused
import { COLORS } from "../constants";
import axios from "axios";

const API = "http://localhost:5000";

export default function Users({ notify, user }) {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // FIXED: Wrapped fetchUsers in useCallback to stabilize the function
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/auth/users`);
      setUsers(res.data);
    } catch (err) {
      notify("Failed to load users!", COLORS.coral);
    }
  }, [notify]); // notify is a stable prop, so this is safe

  // FIXED: Added fetchUsers to the dependency array
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addCaregiver = async () => {
    if (!form.name || !form.email || !form.password) {
      notify("Please fill in all fields!", COLORS.coral);
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/auth/add-caregiver`, form);
      await fetchUsers();
      notify("✅ Caregiver account created!");
      setForm({ name: "", email: "", password: "" });
      setShowModal(false);
    } catch (err) {
      notify(err.response?.data?.error || "Failed to add caregiver!", COLORS.coral);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id, name) => {
    if (id === user.id) { 
      notify("You cannot delete your own account!", COLORS.coral); 
      return; 
    }
    try {
      await axios.delete(`${API}/auth/users/${id}`);
      await fetchUsers();
      notify("🗑️ " + name + " removed!");
    } catch (err) {
      notify("Failed to delete user!", COLORS.coral);
    }
  };

  const roleColor = (role) => role === "admin" ? COLORS.coral : role === "caregiver" ? COLORS.sky : COLORS.lavender;

  const admins     = users.filter(u => u.role === "admin");
  const caregivers = users.filter(u => u.role === "caregiver");
  const parents    = users.filter(u => u.role === "parent");

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>👥 User Management</h2>
          <p style={{ color: COLORS.muted, fontSize: 14 }}>Manage all system users and their roles</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ background: COLORS.sky, color: "#fff", border: "none", padding: "10px 20px", borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
          + Add Caregiver
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Admins",     count: admins.length,     color: COLORS.coral,    icon: "👑" },
          { label: "Caregivers", count: caregivers.length, color: COLORS.sky,      icon: "👩‍🍼" },
          { label: "Parents",    count: parents.length,    color: COLORS.lavender, icon: "👨‍👩‍👧" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid " + COLORS.border, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: s.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.count}</div>
              <div style={{ fontSize: 12, color: COLORS.muted, fontWeight: 700, textTransform: "uppercase" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid " + COLORS.border, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: COLORS.bg }}>
              {["User", "Email", "Role", "Joined", "Action"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 800, fontSize: 12, color: COLORS.muted, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 40, textAlign: "center", color: COLORS.muted, fontWeight: 700 }}>No users found</td>
              </tr>
            ) : (
              users.map((u, i) => (
                <tr key={u.id} style={{ borderTop: "1px solid " + COLORS.border, background: i % 2 === 0 ? "#fff" : "#FAFFFE" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: roleColor(u.role), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 14 }}>
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 700 }}>{u.name}</span>
                      {u.id === user.id && <span style={{ fontSize: 11, background: COLORS.mint + "20", color: COLORS.mint, padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>You</span>}
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", color: COLORS.muted }}>{u.email}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ background: roleColor(u.role) + "20", color: roleColor(u.role), padding: "4px 12px", borderRadius: 20, fontWeight: 800, fontSize: 12, textTransform: "uppercase" }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", color: COLORS.muted, fontSize: 13 }}>
                    {u.created_at ? new Date(u.created_at).toLocaleDateString("en-KE") : "—"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {u.id !== user.id && u.role !== "admin" ? (
                      <button onClick={() => deleteUser(u.id, u.name)} style={{ padding: "6px 14px", background: COLORS.coral + "15", color: COLORS.coral, border: "1px solid " + COLORS.coral, borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                        🗑️ Remove
                      </button>
                    ) : (
                      <span style={{ fontSize: 12, color: COLORS.muted }}>—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Caregiver Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>👩‍🍼 Add Caregiver</h3>
            <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20 }}>Create a new caregiver account for a staff member</p>
            {[
              { label: "Full Name *",       key: "name",    type: "text",     placeholder: "e.g. Jane Wanjiru" },
              { label: "Email Address *",   key: "email",    type: "email",    placeholder: "e.g. jane@littlehaven.com" },
              { label: "Password *",        key: "password", type: "password", placeholder: "Create a password" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, display: "block", marginBottom: 4 }}>{f.label}</label>
                <input
                  type={f.type}
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "2px solid " + COLORS.border, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: 12, borderRadius: 12, border: "2px solid " + COLORS.border, background: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
              <button onClick={addCaregiver} disabled={loading} style={{ flex: 1, padding: 12, borderRadius: 12, border: "none", background: COLORS.sky, color: "#fff", fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}