// pages/Home.jsx
// ─── Landing page — first thing visitors see ───────────────────────────

import { COLORS, GROUPS } from "../constants";

// ── Cartoon illustration SVGs ──────────────────────────────────────────

function KidsIllustration() {
    return (
        <svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Kid 1 - left */}
            <circle cx="70" cy="90" r="22" fill="#FFD166" />
            <circle cx="70" cy="62" r="16" fill="#FFDBA4" />
            <rect x="54" y="78" width="32" height="28" rx="8" fill="#FF7B6B" />
            <circle cx="63" cy="60" r="3" fill="#1E2D2F" />
            <circle cx="77" cy="60" r="3" fill="#1E2D2F" />
            <path d="M64 67 Q70 72 76 67" stroke="#1E2D2F" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* arms */}
            <rect x="38" y="82" width="18" height="8" rx="4" fill="#FFDBA4" transform="rotate(-20 38 82)" />
            <rect x="84" y="82" width="18" height="8" rx="4" fill="#FFDBA4" transform="rotate(20 84 82)" />
            {/* legs */}
            <rect x="58" y="104" width="10" height="22" rx="5" fill="#5BB8F5" />
            <rect x="72" y="104" width="10" height="22" rx="5" fill="#5BB8F5" />
            {/* book */}
            <rect x="40" y="88" width="20" height="14" rx="3" fill="#4ECBA4" />
            <line x1="50" y1="88" x2="50" y2="102" stroke="#fff" strokeWidth="1.5" />

            {/* Kid 2 - center */}
            <circle cx="160" cy="85" r="24" fill="#9B8EC4" />
            <circle cx="160" cy="55" r="18" fill="#FFDBA4" />
            <rect x="142" y="73" width="36" height="30" rx="9" fill="#4ECBA4" />
            <circle cx="152" cy="53" r="3.5" fill="#1E2D2F" />
            <circle cx="168" cy="53" r="3.5" fill="#1E2D2F" />
            <path d="M153 62 Q160 68 167 62" stroke="#1E2D2F" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* hair */}
            <path d="M142 50 Q160 35 178 50" stroke="#1E2D2F" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* arms */}
            <rect x="122" y="78" width="22" height="9" rx="4.5" fill="#FFDBA4" transform="rotate(-15 122 78)" />
            <rect x="176" y="78" width="22" height="9" rx="4.5" fill="#FFDBA4" transform="rotate(15 176 78)" />
            {/* legs */}
            <rect x="147" y="101" width="12" height="26" rx="6" fill="#FF7B6B" />
            <rect x="161" y="101" width="12" height="26" rx="6" fill="#FF7B6B" />
            {/* ball */}
            <circle cx="110" cy="95" r="12" fill="#FFD166" />
            <path d="M102 90 Q110 85 118 90" stroke="#FF7B6B" strokeWidth="2" fill="none" />

            {/* Kid 3 - right */}
            <circle cx="255" cy="90" r="22" fill="#5BB8F5" />
            <circle cx="255" cy="62" r="16" fill="#FFDBA4" />
            <rect x="239" y="78" width="32" height="28" rx="8" fill="#FFD166" />
            <circle cx="248" cy="60" r="3" fill="#1E2D2F" />
            <circle cx="262" cy="60" r="3" fill="#1E2D2F" />
            <path d="M249 68 Q255 73 261 68" stroke="#1E2D2F" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* pigtails */}
            <circle cx="239" cy="54" r="8" fill="#FF7B6B" opacity="0.7" />
            <circle cx="271" cy="54" r="8" fill="#FF7B6B" opacity="0.7" />
            {/* arms */}
            <rect x="219" y="83" width="22" height="9" rx="4.5" fill="#FFDBA4" transform="rotate(-20 219 83)" />
            <rect x="269" y="83" width="22" height="9" rx="4.5" fill="#FFDBA4" transform="rotate(20 270 83)" />
            {/* legs */}
            <rect x="243" y="104" width="10" height="22" rx="5" fill="#9B8EC4" />
            <rect x="257" y="104" width="10" height="22" rx="5" fill="#9B8EC4" />

            {/* Ground */}
            <ellipse cx="160" cy="135" rx="150" ry="10" fill="rgba(78,203,164,0.15)" />

            {/* Stars / sparkles */}
            <circle cx="20" cy="30" r="3" fill="#FFD166" opacity="0.8" />
            <circle cx="300" cy="20" r="4" fill="#FF7B6B" opacity="0.7" />
            <circle cx="310" cy="100" r="2.5" fill="#5BB8F5" opacity="0.8" />
            <circle cx="15" cy="140" r="3" fill="#9B8EC4" opacity="0.7" />
        </svg>
    );
}

function TeacherIllustration() {
    return (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="40" fill={COLORS.mint + "30"} />
            <circle cx="40" cy="28" r="14" fill="#FFDBA4" />
            <rect x="22" y="42" width="36" height="26" rx="10" fill={COLORS.sky} />
            <circle cx="33" cy="26" r="2.5" fill="#1E2D2F" />
            <circle cx="47" cy="26" r="2.5" fill="#1E2D2F" />
            <path d="M34 34 Q40 39 46 34" stroke="#1E2D2F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <rect x="26" y="15" width="28" height="8" rx="4" fill="#FF7B6B" />
            <rect x="54" y="46" width="14" height="7" rx="3.5" fill="#FFDBA4" />
            <rect x="12" y="46" width="14" height="7" rx="3.5" fill="#FFDBA4" />
        </svg>
    );
}

function DaycareLogoSVG() {
    return (
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* House shape */}
            <rect x="8" y="32" width="56" height="34" rx="6" fill={COLORS.mint} />
            {/* Roof */}
            <polygon points="36,6 4,34 68,34" fill="#3ab88e" />
            {/* Door */}
            <rect x="28" y="46" width="16" height="20" rx="4" fill="#fff" opacity="0.9" />
            {/* Window left */}
            <rect x="12" y="42" width="12" height="10" rx="3" fill="#fff" opacity="0.8" />
            {/* Window right */}
            <rect x="48" y="42" width="12" height="10" rx="3" fill="#fff" opacity="0.8" />
            {/* Heart on door */}
            <path d="M36 52 C36 52 32 49 32 46.5 C32 45 33.5 44 35 45 C35.5 45.3 36 46 36 46 C36 46 36.5 45.3 37 45 C38.5 44 40 45 40 46.5 C40 49 36 52 36 52Z" fill={COLORS.coral} />
            {/* Stars */}
            <circle cx="18" cy="18" r="3" fill={COLORS.lemon} />
            <circle cx="54" cy="14" r="2" fill={COLORS.lemon} opacity="0.8" />
            <circle cx="60" cy="24" r="1.5" fill={COLORS.lemon} opacity="0.6" />
        </svg>
    );
}

// ── Feature cards data ─────────────────────────────────────
const FEATURES = [
    { icon: "📋", title: "Child Registration", desc: "Parents register online. Staff review and approve.", color: COLORS.mint, pg: "child-register" },
    { icon: "✅", title: "Attendance Tracking", desc: "Batch check-in / check-out in seconds.", color: COLORS.sky, pg: "attendance" },
    { icon: "🎨", title: "Activity Logging", desc: "Log meals and activities per child with one click.", color: COLORS.coral, pg: "activities" },
    { icon: "👨‍👩‍👧", title: "Parent Dashboard", desc: "Parents see real-time updates on their child's day.", color: COLORS.lavender, pg: "parent" },
    { icon: "📈", title: "Admin Reports", desc: "Visual charts for data-driven decisions.", color: COLORS.lemon, pg: "reports" },
    { icon: "🛂", title: "Approvals Queue", desc: "Review and approve registration requests.", color: COLORS.coral, pg: "admin-approvals" },
];

const ROLES = [
    { icon: <TeacherIllustration />, role: "Caregivers", color: COLORS.mint, points: ["Log attendance in seconds", "Record activities & meals", "Less paperwork, more childcare"] },
    { icon: "👨‍👩‍👧", role: "Parents", color: COLORS.sky, points: ["Register child online", "See real-time daily updates", "Stay connected every day"] },
    { icon: "🏢", role: "Administrators", color: COLORS.lavender, points: ["Approve registrations", "View reports & charts", "Make data-driven decisions"] },
];

export default function Home({ children, setPage, presentCount }) {
    const groups = ["Sunflower", "Daisy", "Rainbow"];

    return (
        <div>
            {/* ── HERO ─────────────────────────────────────── */}
            <div style={{
                background: "linear-gradient(135deg, #4ECBA4 0%, #5BB8F5 55%, #9B8EC4 100%)",
                minHeight: "93vh", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                textAlign: "center", padding: "40px 24px",
                position: "relative", overflow: "hidden",
            }}>
                {/* Bubble decorations */}
                {[{ s: 200, t: "-60px", l: "-80px", o: .1 }, { s: 130, t: "8%", r: "-40px", o: .2 }, { s: 90, b: "22%", l: "4%", o: .15 }, { s: 220, b: "-80px", r: "-90px", o: .08 }].map((b, i) => (
                    <div key={i} style={{ position: "absolute", width: b.s, height: b.s, borderRadius: "50%", background: `rgba(255,255,255,${b.o})`, top: b.t, bottom: b.b, left: b.l, right: b.r, pointerEvents: "none" }} />
                ))}

                {/* Logo */}
                <div style={{ marginBottom: 16 }}><DaycareLogoSVG /></div>

                <h1 style={{ fontSize: 50, fontWeight: 900, color: "#fff", marginBottom: 16, lineHeight: 1.1, letterSpacing: -2 }}>
                    Daycare Management<br />System
                </h1>
                <p style={{ fontSize: 18, color: "rgba(255,255,255,0.92)", maxWidth: 500, marginBottom: 36, fontWeight: 600, lineHeight: 1.7 }}>
                    A smarter, safer, and simpler way to manage your daycare — from enrollment to daily reports.
                </p>

                {/* CTAs */}
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
                    <button onClick={() => setPage("dashboard")} style={{ padding: "16px 36px", background: "#fff", color: COLORS.mint, border: "none", borderRadius: 50, fontWeight: 900, fontSize: 16, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}>
                        🚀 Get Started
                    </button>
                    <button onClick={() => setPage("child-register")} style={{ padding: "16px 36px", background: "rgba(255,255,255,0.18)", color: "#fff", border: "2px solid rgba(255,255,255,0.55)", borderRadius: 50, fontWeight: 900, fontSize: 16, cursor: "pointer", fontFamily: "inherit" }}>
                        📋 Register My Child
                    </button>
                </div>

                {/* Cartoon illustration */}
                <div style={{ marginBottom: 32 }}><KidsIllustration /></div>

                {/* Live stats */}
                <div style={{ display: "flex", gap: 40, background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "18px 44px", flexWrap: "wrap", justifyContent: "center" }}>
                    {[{ icon: "👶", value: children.length, label: "Children Enrolled" }, { icon: "👩‍🏫", value: groups.length, label: "Active Groups" }, { icon: "✅", value: presentCount, label: "Present Today" }].map(s => (
                        <div key={s.label} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 24 }}>{s.icon}</div>
                            <div style={{ fontSize: 30, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>{s.value}</div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 700 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── FEATURES GRID ────────────────────────────── */}
            <div style={{ background: "#fff", padding: "72px 24px", textAlign: "center" }}>
                <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 8, letterSpacing: -1 }}>Everything you need in one place</h2>
                <p style={{ color: COLORS.muted, fontSize: 15, marginBottom: 48 }}>Built for caregivers, parents, and administrators</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px,1fr))", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
                    {FEATURES.map(f => (
                        <div key={f.title} onClick={() => setPage(f.pg)}
                            style={{ background: COLORS.bg, borderRadius: 20, padding: 26, cursor: "pointer", border: "2px solid transparent", transition: "all 0.2s" }}
                            onMouseEnter={e => { e.currentTarget.style.border = "2px solid " + f.color; e.currentTarget.style.transform = "translateY(-4px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.border = "2px solid transparent"; e.currentTarget.style.transform = "translateY(0)"; }}>
                            <div style={{ width: 54, height: 54, borderRadius: 16, background: f.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 12px" }}>{f.icon}</div>
                            <h3 style={{ fontWeight: 800, marginBottom: 8, fontSize: 15 }}>{f.title}</h3>
                            <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── WHO IS IT FOR ─────────────────────────────── */}
            <div style={{ background: COLORS.bg, padding: "72px 24px", textAlign: "center" }}>
                <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 48, letterSpacing: -1 }}>Built for everyone at the daycare</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 20, maxWidth: 800, margin: "0 auto" }}>
                    {ROLES.map(r => (
                        <div key={r.role} style={{ background: "#fff", borderRadius: 20, padding: 28, textAlign: "left" }}>
                            <div style={{ marginBottom: 12 }}>{typeof r.icon === "string" ? <span style={{ fontSize: 40 }}>{r.icon}</span> : r.icon}</div>
                            <h3 style={{ fontSize: 18, fontWeight: 900, color: r.color, marginBottom: 14 }}>{r.role}</h3>
                            {r.points.map(p => (
                                <div key={p} style={{ fontSize: 13, color: COLORS.muted, marginBottom: 8, display: "flex", gap: 8 }}>
                                    <span style={{ color: r.color, fontWeight: 800 }}>✓</span>{p}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── CTA FOOTER ────────────────────────────────── */}
            <div style={{ background: "linear-gradient(135deg, #1E2D2F, #2E4D52)", padding: "72px 24px", textAlign: "center" }}>
                <h2 style={{ fontSize: 34, fontWeight: 900, color: "#fff", marginBottom: 12, letterSpacing: -1 }}>Ready to get started?</h2>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, marginBottom: 32 }}>Manage your daycare smarter today</p>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                    <button onClick={() => setPage("dashboard")} style={{ padding: "15px 34px", background: COLORS.mint, color: "#fff", border: "none", borderRadius: 50, fontWeight: 900, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>Open Dashboard</button>
                    <button onClick={() => setPage("child-register")} style={{ padding: "15px 34px", background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", borderRadius: 50, fontWeight: 900, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>Register a Child</button>
                </div>
            </div>
        </div>
    );
}