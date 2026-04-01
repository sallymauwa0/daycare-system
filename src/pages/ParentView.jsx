// pages/ParentView.jsx
import React from 'react';
import { COLORS, S } from "../constants";

export default function ParentView({ children, user }) {
    // 1. SMART FILTERING 
    // If Admin/Caregiver: Show the full array (all children)
    // If Parent: Show only the child that matches their specific email
    const displayList = (user?.role === "admin" || user?.role === "caregiver")
        ? children
        : children.filter(c => c.parent_email === user?.email);

    // Empty State (if no children match or system is empty)
    if (displayList.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: 60 }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>⏳</div>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: COLORS.mint, marginBottom: 10 }}>
                    {user?.role === "parent" ? "Waiting for Approval" : "No Children Registered"}
                </h2>
                <p style={{ color: COLORS.muted, fontSize: 15, maxWidth: 400, margin: "0 auto" }}>
                    {user?.role === "parent"
                        ? "Your registration is pending. You'll see your child's updates here soon!"
                        : "There are currently no child records to display in the management view."}
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Page Header */}
            <div style={{ marginBottom: 30, borderBottom: "1px solid " + COLORS.border, paddingBottom: 16 }}>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: "#000", margin: 0 }}>
                    {user?.role === "parent" ? "👨‍👩‍👧 My Family Dashboard" : "📂 All Registered Families"}
                </h2>
                {user?.role !== "parent" && (
                    <div style={{ marginTop: 8 }}>
                        <span style={{ fontSize: 11, background: COLORS.sky + "20", color: COLORS.sky, padding: "4px 10px", borderRadius: 20, fontWeight: 800, textTransform: "uppercase" }}>
                            Admin/Caregiver View: {displayList.length} total families
                        </span>
                    </div>
                )}
            </div>

            {/* Loop through the filtered list */}
            {displayList.map((child, index) => (
                <div key={child.id || index} style={{
                    marginBottom: 50,
                    padding: user?.role !== "parent" ? "24px" : "0px",
                    background: user?.role !== "parent" ? "#fff" : "transparent",
                    borderRadius: 24,
                    border: user?.role !== "parent" ? "1px solid " + COLORS.border : "none",
                    boxShadow: user?.role !== "parent" ? "0 4px 12px rgba(0,0,0,0.03)" : "none"
                }}>

                    {/* Parent's Name - Large, Bold, and Black (Matching dashboard title) */}
                    <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, color: "#000" }}>
                        👤 Parent: {child.guardian || "Primary Guardian"}
                    </h2>

                    <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 24 }}>
                        Real-time updates for <strong>{child.name}</strong>
                    </p>

                    {/* Dashboard Grid for this specific family */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

                        {/* Child Profile Card */}
                        <div style={S.card}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                                <div style={{
                                    width: 60, height: 60, borderRadius: "50%",
                                    background: COLORS.mint, display: "flex",
                                    alignItems: "center", justifyContent: "center",
                                    fontSize: 28, fontWeight: 900, color: "#fff"
                                }}>
                                    {child.name.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 900, fontSize: 18 }}>👶 {child.name}</div>
                                    <div style={{ color: COLORS.muted, fontSize: 13 }}>
                                        Age {child.age} — {child.group_name || child.group} Group
                                    </div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: child.present ? COLORS.mint : COLORS.coral, marginTop: 4 }}>
                                        {child.present ? "✅ Currently at daycare" : "❌ Not checked in"}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Sub-section */}
                            <div style={{ background: COLORS.bg, borderRadius: 12, padding: 16 }}>
                                <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.muted, marginBottom: 6 }}>EMERGENCY CONTACT</div>
                                <div style={{ fontSize: 14 }}>📞 {child.contact}</div>
                                <div style={{ fontSize: 14, color: COLORS.muted }}>📧 {child.parent_email}</div>
                            </div>
                        </div>

                        {/* Daily Updates Column */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                            {/* Activities Card */}
                            <div style={S.card}>
                                <div style={{ fontWeight: 800, marginBottom: 10, fontSize: 13, color: COLORS.muted }}>🎨 TODAY'S ACTIVITIES</div>
                                <div style={{ fontSize: 14, color: COLORS.sky, fontWeight: 600 }}>
                                    {child.activities?.length > 0 ? child.activities.join(" • ") : "No activities logged yet"}
                                </div>
                            </div>

                            {/* Meals Card */}
                            <div style={S.card}>
                                <div style={{ fontWeight: 800, marginBottom: 10, fontSize: 13, color: COLORS.muted }}>🍽️ MEALS LOG</div>
                                <div style={{ fontSize: 14, color: "#B8860B", fontWeight: 600 }}>
                                    {child.meals?.length > 0 ? child.meals.join(" • ") : "No meals logged yet"}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}