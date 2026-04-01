// pages/RegisterChild.jsx
// ─── Admin view: table of all children + modal to add a new child ─────

import { useState } from "react";
import { COLORS, GROUPS, S } from "../constants";

export default function RegisterChild({ children, addChild, deleteChild, notify }) {
    const [showModal, setShowModal] = useState(false);
    // NEW: Loading state to prevent double registration
    const [loading, setLoading] = useState(false);
    const [newChild, setNewChild] = useState({ name: "", age: "", guardian: "", contact: "", group_name: "Sunflower", allergies: "" });

    const register = async () => {
        // Validation check
        if (!newChild.name || !newChild.guardian) { 
            notify("Please fill name and guardian!", COLORS.coral); 
            return; 
        }

        // REDUNDANCY GUARD: Stop if already processing
        if (loading) return;

        setLoading(true); // Disable the UI
        try {
            await addChild({ ...newChild, age: parseInt(newChild.age) || 2 });
            setNewChild({ name: "", age: "", guardian: "", contact: "", group_name: "Sunflower", allergies: "" });
            setShowModal(false);
            notify("Child registered successfully!", COLORS.mint);
        } catch (error) {
            notify("Error registering child. Please try again.", COLORS.coral);
        } finally {
            setLoading(false); // Re-enable the UI
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            await deleteChild(id);
            notify(`${name} has been removed.`, COLORS.coral);
        }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800 }}>📝 Register Child (Admin)</h2>
                <button onClick={() => setShowModal(true)} style={{ background: COLORS.mint, color: "#fff", border: "none", padding: "10px 20px", borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                    + Add Child
                </button>
            </div>

            {/* Children Table */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid " + COLORS.border, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <thead>
                        <tr style={{ background: COLORS.bg }}>
                            {["Name", "Age", "Group", "Guardian", "Contact", "Allergies", "Status", "Action"].map(h => (
                                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 800, fontSize: 12, color: COLORS.muted, textTransform: "uppercase" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {children.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{ padding: 40, textAlign: "center", color: COLORS.muted, fontWeight: 700 }}>
                                    No children registered yet. Click "+ Add Child" to add one!
                                </td>
                            </tr>
                        ) : (
                            children.map((c, i) => (
                                <tr key={c.id || i} style={{ borderTop: "1px solid " + COLORS.border, background: i % 2 === 0 ? "#fff" : "#FAFFFE" }}>
                                    <td style={{ padding: "12px 16px", fontWeight: 700 }}>{c.name}</td>
                                    <td style={{ padding: "12px 16px" }}>{c.age} yrs</td>
                                    <td style={{ padding: "12px 16px" }}>
                                        <span style={{ background: COLORS.sky + "30", color: COLORS.sky, padding: "3px 10px", borderRadius: 20, fontWeight: 700, fontSize: 12 }}>
                                            {c.group_name || c.group}
                                        </span>
                                    </td>
                                    <td style={{ padding: "12px 16px" }}>{c.guardian}</td>
                                    <td style={{ padding: "12px 16px", color: COLORS.muted }}>{c.contact}</td>
                                    <td style={{ padding: "12px 16px" }}>
                                        {c.allergies && c.allergies !== "None" ? <span style={{ color: COLORS.coral, fontWeight: 700 }}>⚠️ {c.allergies}</span> : <span style={{ color: COLORS.muted }}>None</span>}
                                    </td>
                                    <td style={{ padding: "12px 16px" }}>
                                        <span style={{ background: c.present ? COLORS.mint + "20" : COLORS.coral + "20", color: c.present ? COLORS.mint : COLORS.coral, padding: "3px 10px", borderRadius: 20, fontWeight: 700, fontSize: 12 }}>
                                            {c.present ? "Present" : "Absent"}
                                        </span>
                                    </td>
                                    <td style={{ padding: "12px 16px" }}>
                                        <button
                                            onClick={() => handleDelete(c.id, c.name)}
                                            style={{ background: COLORS.coral, color: "#fff", border: "none", padding: "6px 14px", borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add New Child Modal */}
            {showModal && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                    <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
                        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>👶 Add New Child</h3>
                        {[
                            { label: "Child Full Name *", key: "name", placeholder: "e.g. Amara Njeri" },
                            { label: "Age (years)", key: "age", placeholder: "e.g. 3" },
                            { label: "Guardian Name *", key: "guardian", placeholder: "e.g. Grace Njeri" },
                            { label: "Guardian Contact", key: "contact", placeholder: "e.g. 0712345678" },
                            { label: "Known Allergies", key: "allergies", placeholder: "e.g. Peanuts, or None" },
                        ].map(f => (
                            <div key={f.key} style={{ marginBottom: 14 }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, display: "block", marginBottom: 4 }}>{f.label}</label>
                                <input 
                                    value={newChild[f.key]} 
                                    onChange={e => setNewChild(p => ({ ...p, [f.key]: e.target.value }))} 
                                    placeholder={f.placeholder} 
                                    style={S.input} 
                                    disabled={loading} // Disable inputs during registration
                                />
                            </div>
                        ))}
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, display: "block", marginBottom: 4 }}>Group</label>
                            <select 
                                value={newChild.group_name} 
                                onChange={e => setNewChild(p => ({ ...p, group_name: e.target.value }))} 
                                style={S.input}
                                disabled={loading}
                            >
                                {GROUPS.map(g => <option key={g}>{g}</option>)}
                            </select>
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                            <button 
                                onClick={() => setShowModal(false)} 
                                disabled={loading}
                                style={{ flex: 1, padding: 12, borderRadius: 12, border: "2px solid " + COLORS.border, background: "#fff", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={register} 
                                disabled={loading} 
                                style={{ 
                                    flex: 1, padding: 12, borderRadius: 12, border: "none", 
                                    background: loading ? COLORS.muted : COLORS.mint, 
                                    color: "#fff", fontWeight: 800, 
                                    cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" 
                                }}
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}