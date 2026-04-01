// components/Navbar.jsx
// ─── Top header bar + navigation tabs shown on every page except Home ───

import { COLORS } from "../constants";

const ALL_NAV_ITEMS = [
    { key: "dashboard", label: "📊 Dashboard", roles: ["admin", "caregiver"] },
    { key: "register", label: "📝 Register Child", roles: ["admin"] },
    { key: "attendance", label: "✅ Attendance", roles: ["admin", "caregiver"] },
    { key: "activities", label: "🎨 Activities", roles: ["admin", "caregiver"] },
    { key: "parent", label: "👨‍👩‍👧 Parent View", roles: ["admin", "caregiver","parent"] },
    { key: "reports", label: "📈 Reports", roles: ["admin"] },
    { key: "child-register", label: "📋 Child Registration", roles: ["admin", "parent"] },
    { key: "admin-approvals", label: "🛂 Approvals", roles: ["admin"] },
    { key: "users", label: "👥 Users", roles: ["admin"] },
];

export default function Navbar({ page, setPage, presentCount, total, user, handleLogout }) {
    // Filter nav items based on user role
    const NAV_ITEMS = ALL_NAV_ITEMS.filter(n => user && n.roles.includes(user.role));

    // Role badge color
    const roleBadgeColor = user?.role === "admin" ? COLORS.coral : user?.role === "caregiver" ? COLORS.sky : COLORS.lavender;

    return (
        <>
            {/* ── Header bar ── */}
            <div style={{
                background: "#fff", borderBottom: "3px solid " + COLORS.border,
                padding: "0 24px", display: "flex", alignItems: "center",
                gap: 16, height: 64, boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}>
                {/* Logo + name */}
                <button onClick={() => setPage("dashboard")} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
                }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <rect width="36" height="36" rx="10" fill={COLORS.mint} />
                        <text x="18" y="25" textAnchor="middle" fontSize="20">🏡</text>
                    </svg>
                    <span style={{ fontSize: 17, fontWeight: 900, color: COLORS.mint, letterSpacing: -0.5 }}>
                        LittleHaven
                    </span>
                </button>

                <div style={{ flex: 1 }} />

                {/* Present counter badge */}
                {(user?.role === "admin" || user?.role === "caregiver") && (
                    <div style={{ background: COLORS.mint, color: "#fff", borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 700 }}>
                        👶 {presentCount}/{total} Present
                    </div>
                )}

                {/* Date */}
                <div style={{ fontSize: 13, color: COLORS.muted, fontWeight: 600 }}>
                    📅 {new Date().toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short" })}
                </div>

                {/* User info */}
                {user && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {/* Avatar */}
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: roleBadgeColor, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 15 }}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: COLORS.text }}>{user.name}</div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: roleBadgeColor, textTransform: "uppercase" }}>{user.role}</div>
                        </div>
                        {/* Logout */}
                        <button onClick={handleLogout} style={{ padding: "6px 14px", borderRadius: 10, border: "1.5px solid " + COLORS.coral, background: "#fff", color: COLORS.coral, fontWeight: 800, fontSize: 12, cursor: "pointer", fontFamily: "inherit", marginLeft: 6 }}>
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* ── Nav tabs ── */}
            <div style={{
                display: "flex", gap: 4, padding: "10px 24px",
                background: "#fff", borderBottom: "1px solid " + COLORS.border, flexWrap: "wrap",
            }}>
                {NAV_ITEMS.map(n => (
                    <button key={n.key} onClick={() => setPage(n.key)} style={{
                        padding: "8px 14px", borderRadius: 10, border: "none",
                        cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 12,
                        background: page === n.key ? COLORS.mint : "transparent",
                        color: page === n.key ? "#fff" : COLORS.muted,
                        transition: "all 0.2s",
                    }}>
                        {n.label}
                    </button>
                ))}
            </div>
        </>
    );
}