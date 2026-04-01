// pages/Dashboard.jsx
// ─── Overview: stats, children list, activity bars ────────────────────

import { COLORS, ACTIVITIES, S } from "../constants";

export default function Dashboard({ children, presentCount }) {
    return (
        <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>
                Good morning! 👋 Here is today's overview
            </h2>

            {/* ── Stat cards ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
                {[
                    { label: "Total Children", value: children.length, icon: "👶", color: COLORS.sky },
                    { label: "Present Today", value: presentCount, icon: "✅", color: COLORS.mint },
                    { label: "Absent", value: children.length - presentCount, icon: "❌", color: COLORS.coral },
                    { label: "Groups", value: 3, icon: "🏫", color: COLORS.lemon },
                ].map(s => (
                    <div key={s.label} style={{ background: s.color, borderRadius: 16, padding: 20, color: "#fff" }}>
                        <div style={{ fontSize: 32 }}>{s.icon}</div>
                        <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.1 }}>{s.value}</div>
                        <div style={{ fontSize: 13, opacity: 0.9, fontWeight: 600 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* ── Bottom two cards ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

                {/* Children list */}
                <div style={S.card}>
                    <h3 style={{ marginBottom: 14, fontSize: 15, fontWeight: 800 }}>👶 Children Today</h3>
                    {children.map(c => (
                        <div key={c.id} style={{ display: "flex", alignItems: "center", padding: "8px 0", borderBottom: "1px solid " + COLORS.border }}>
                            <div style={{ width: 36, height: 36, borderRadius: "50%", background: c.present ? COLORS.mint : COLORS.border, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 12, color: "#fff", fontWeight: 800, fontSize: 14 }}>
                                {c.name.charAt(0)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                                <div style={{ fontSize: 12, color: COLORS.muted }}>{c.group} — Age {c.age}</div>
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: c.present ? COLORS.mint : COLORS.coral }}>
                                {c.present ? "In" : "Out"}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Activity bars */}
                <div style={S.card}>
                    <h3 style={{ marginBottom: 14, fontSize: 15, fontWeight: 800 }}>🎨 Activity Log Today</h3>
                    {ACTIVITIES.map(a => {
                        const count = children.filter(c => c.activities.includes(a)).length;
                        return (
                            <div key={a} style={{ marginBottom: 10 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                                    <span>{a}</span>
                                    <span style={{ color: COLORS.muted }}>{count}/{children.length}</span>
                                </div>
                                <div style={{ height: 8, borderRadius: 6, background: COLORS.border }}>
                                    <div style={{ height: 8, borderRadius: 6, background: COLORS.mint, width: (children.length ? (count / children.length) * 100 : 0) + "%", transition: "width 0.5s" }} />
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}