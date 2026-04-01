// pages/Attendance.jsx
// ─── Tap to check in/out + batch buttons ──────────────────────────────

import { COLORS, S } from "../constants";

export default function Attendance({ children, togglePresent, batchCheckIn, batchCheckOut, presentCount }) {
    return (
        <div>
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800 }}>✅ Attendance Tracking</h2>
                <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={batchCheckIn} style={{ background: COLORS.mint, color: "#fff", border: "none", padding: "10px 18px", borderRadius: 12, fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>✅ Check In All</button>
                    <button onClick={batchCheckOut} style={{ background: COLORS.coral, color: "#fff", border: "none", padding: "10px 18px", borderRadius: 12, fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>👋 Check Out All</button>
                </div>
            </div>

            {/* Summary bar */}
            <div style={{ ...S.card, marginBottom: 20, display: "flex", gap: 20, alignItems: "center" }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 38, fontWeight: 900, color: COLORS.mint }}>{presentCount}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted, fontWeight: 700 }}>PRESENT</div>
                </div>
                <div style={{ width: 1, background: COLORS.border, height: 50 }} />
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 38, fontWeight: 900, color: COLORS.coral }}>{children.length - presentCount}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted, fontWeight: 700 }}>ABSENT</div>
                </div>
                <div style={{ flex: 1, paddingLeft: 10 }}>
                    <div style={{ height: 16, borderRadius: 10, background: COLORS.border }}>
                        <div style={{ height: 16, borderRadius: 10, background: COLORS.mint, width: (children.length ? (presentCount / children.length) * 100 : 0) + "%", transition: "width 0.5s" }} />
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 6, fontWeight: 600 }}>
                        {children.length ? Math.round((presentCount / children.length) * 100) : 0}% attendance rate today
                    </div>
                </div>
            </div>

            {/* Children cards */}
            {children.length === 0 ? (
                <div style={{ textAlign: "center", padding: 60, color: COLORS.muted }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>👶</div>
                    <div style={{ fontWeight: 700 }}>No children registered yet!</div>
                    <div style={{ fontSize: 13, marginTop: 6 }}>Go to Register Child to add children first.</div>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14 }}>
                    {children.map(c => (
                        <div key={c.id} onClick={() => togglePresent(c.id)}
                            style={{ background: c.present ? COLORS.mint : "#fff", borderRadius: 14, padding: 18, cursor: "pointer", border: "2px solid " + (c.present ? COLORS.mint : COLORS.border), transition: "all 0.2s" }}>
                            <div style={{ fontSize: 32, marginBottom: 8 }}>{c.present ? "😊" : "😴"}</div>
                            <div style={{ fontWeight: 800, fontSize: 15, color: c.present ? "#fff" : COLORS.text }}>{c.name}</div>
                            <div style={{ fontSize: 12, color: c.present ? "rgba(255,255,255,0.8)" : COLORS.muted, fontWeight: 600 }}>{c.group_name || c.group} — Age {c.age}</div>
                            {c.allergies !== "None" && <div style={{ fontSize: 11, color: c.present ? "rgba(255,255,255,0.8)" : COLORS.coral, marginTop: 4, fontWeight: 700 }}>⚠️ {c.allergies}</div>}
                            <div style={{ marginTop: 10, fontSize: 12, fontWeight: 800, color: c.present ? "#fff" : COLORS.coral }}>
                                {c.present ? "PRESENT — tap to check out" : "ABSENT — tap to check in"}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}