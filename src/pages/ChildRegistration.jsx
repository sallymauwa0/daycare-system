// pages/ChildRegistration.jsx
import { useState, useRef } from "react";
import { COLORS, S } from "../constants";

export default function ChildRegistration({ submitParentRequest, notify, user }) {
    const [form, setForm] = useState({ child_name: "", dob: "", gender: "Female", guardian: "", contact: "", email: "", allergies: "", notes: "" });
    const [done, setDone] = useState(false);
    const submitting = useRef(false); // ← prevents double submission

    const submit = async () => {
        if (!form.child_name || !form.guardian || !form.contact) { notify("Please fill in the required fields (*)", COLORS.coral); return; }
        if (submitting.current) return; // ← block if already submitting
        submitting.current = true;
        await submitParentRequest({
            ...form,
            parent_email: user?.email || form.email,
        });
        setDone(true);
        submitting.current = false;
    };

    const reset = () => {
        setDone(false);
        setForm({ child_name: "", dob: "", gender: "Female", guardian: "", contact: "", email: "", allergies: "", notes: "" });
    };

    return (
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>👶</div>
                <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>Child Registration</h2>
                <p style={{ color: COLORS.muted, fontSize: 14 }}>Fill in the form below. Staff will review and confirm your child's enrollment.</p>
            </div>
            {done ? (
                <div style={{ background: COLORS.mint + "15", border: "2px solid " + COLORS.mint, borderRadius: 20, padding: 36, textAlign: "center" }}>
                    <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: COLORS.mint, marginBottom: 8 }}>Request Submitted!</h3>
                    <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 20 }}>Our staff will review and contact you within 1–2 business days.</p>
                    <button onClick={reset} style={{ background: COLORS.mint, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Register Another Child</button>
                </div>
            ) : (
                <div style={{ background: "#fff", borderRadius: 20, padding: 32, border: "1px solid " + COLORS.border, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        {[
                            { label: "Child Full Name *", key: "child_name", placeholder: "e.g. Amara Njeri", col: "1/-1" },
                            { label: "Date of Birth",     key: "dob",        type: "date", col: "" },
                            { label: "Guardian Name *",   key: "guardian",   placeholder: "e.g. Grace Njeri", col: "" },
                            { label: "Phone Number *",    key: "contact",    placeholder: "e.g. 0712345678", col: "" },
                            { label: "Email Address",     key: "email",      placeholder: "e.g. grace@email.com", col: "" },
                            { label: "Known Allergies",   key: "allergies",  placeholder: "e.g. Peanuts, or None", col: "" },
                        ].map(f => (
                            <div key={f.key} style={{ gridColumn: f.col || "auto" }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, display: "block", marginBottom: 4 }}>{f.label}</label>
                                <input type={f.type || "text"} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder || ""} style={S.input} />
                            </div>
                        ))}
                        <div style={{ gridColumn: "1/-1" }}>
                            <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, display: "block", marginBottom: 4 }}>Gender</label>
                            <div style={{ display: "flex", gap: 10 }}>
                                {["Female", "Male"].map(g => (
                                    <button key={g} onClick={() => setForm(p => ({ ...p, gender: g }))}
                                        style={{ flex: 1, padding: "10px", borderRadius: 10, border: "2px solid " + (form.gender === g ? COLORS.sky : COLORS.border), background: form.gender === g ? COLORS.sky + "20" : "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", color: form.gender === g ? COLORS.sky : COLORS.muted, fontFamily: "inherit" }}>
                                        {g === "Female" ? "👧 Girl" : "👦 Boy"}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div style={{ gridColumn: "1/-1" }}>
                            <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, display: "block", marginBottom: 4 }}>Additional Notes (optional)</label>
                            <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Any special needs or info staff should know..." rows={3} style={{ ...S.input, resize: "vertical" }} />
                        </div>
                    </div>

                    {user?.email && (
                        <div style={{ marginTop: 16, background: COLORS.mint + "15", border: "1px solid " + COLORS.mint, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: COLORS.mint, fontWeight: 700 }}>
                            🔗 This child will be linked to your account: {user.email}
                        </div>
                    )}

                    <button onClick={submit} style={{ width: "100%", marginTop: 16, padding: "14px", background: COLORS.mint, color: "#fff", border: "none", borderRadius: 14, fontWeight: 900, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
                        Submit Registration Request →
                    </button>
                    <p style={{ textAlign: "center", fontSize: 12, color: COLORS.muted, marginTop: 12 }}>🔒 Your information is secure and only used for daycare enrollment.</p>
                </div>
            )}
        </div>
    );
}