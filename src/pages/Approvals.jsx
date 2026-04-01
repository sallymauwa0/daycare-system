// pages/Approvals.jsx
import { COLORS } from "../constants";

export default function Approvals({ parentRequests, approveRequest, rejectRequest }) {
    const pending = parentRequests.filter(r => r.status === "pending").length;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>🛂 Pending Registrations</h2>
                    <p style={{ color: COLORS.muted, fontSize: 14 }}>Review and approve parent-submitted registration requests</p>
                </div>
                <div style={{ background: COLORS.lemon + "40", border: "1px solid " + COLORS.lemon, borderRadius: 12, padding: "8px 16px", fontWeight: 800, fontSize: 14 }}>
                    ⏳ {pending} pending
                </div>
            </div>

            {parentRequests.length === 0 ? (
                <div style={{ textAlign: "center", padding: 60, color: COLORS.muted }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                    <div style={{ fontWeight: 700 }}>No registration requests yet</div>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {parentRequests.map(r => (
                        <div key={r.id} style={{ background: "#fff", borderRadius: 16, padding: 22, border: "1px solid " + (r.status === "approved" ? COLORS.mint : r.status === "rejected" ? COLORS.coral : COLORS.lemon), display: "flex", alignItems: "flex-start", gap: 18 }}>
                            <div style={{ width: 48, height: 48, borderRadius: "50%", background: r.status === "approved" ? COLORS.mint : r.status === "rejected" ? COLORS.coral : COLORS.lemon, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                                {r.status === "approved" ? "✅" : r.status === "rejected" ? "❌" : "⏳"}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                                    <span style={{ fontWeight: 900, fontSize: 16 }}>{r.child_name}</span>
                                    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 20, background: r.status === "approved" ? COLORS.mint + "20" : r.status === "rejected" ? COLORS.coral + "20" : COLORS.lemon + "40", color: r.status === "approved" ? COLORS.mint : r.status === "rejected" ? COLORS.coral : "#B8860B", textTransform: "uppercase" }}>
                                        {r.status}
                                    </span>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, fontSize: 13, color: COLORS.muted }}>
                                    <span>Guardian: <strong style={{ color: COLORS.text }}>{r.guardian}</strong></span>
                                    <span>📞 {r.contact}</span>
                                    {r.email && <span>✉️ {r.email}</span>}
                                    {r.dob && <span>🎂 {r.dob}</span>}
                                    <span>⚧ {r.gender}</span>
                                    <span>⚠️ Allergies: {r.allergies || "None"}</span>
                                </div>
                                {r.notes && <div style={{ marginTop: 8, fontSize: 13, color: COLORS.muted, background: "#F4F9F7", borderRadius: 8, padding: "6px 10px" }}>📝 {r.notes}</div>}
                            </div>
                            {r.status === "pending" && (
                                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                                    <button onClick={() => approveRequest(r)} style={{ padding: "8px 16px", background: COLORS.mint, color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>✅ Approve</button>
                                    <button onClick={() => rejectRequest(r)} style={{ padding: "8px 16px", background: COLORS.coral + "15", color: COLORS.coral, border: "1.5px solid " + COLORS.coral, borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>❌ Reject</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}