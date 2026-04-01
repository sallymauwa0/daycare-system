// pages/Activities.jsx
import { useState, useRef } from "react";
import { COLORS, ACTIVITIES, MEALS, S } from "../constants";
import axios from "axios";

const API = "http://localhost:5000";

export default function Activities({ children, toggleActivity, toggleMeal, notify }) {
    const [recording, setRecording] = useState(null); // id of child being recorded
    const [audioURLs, setAudioURLs] = useState({}); // { childId: audioURL }
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);

    const startRecording = async (childId) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = async () => {
                    const base64 = reader.result;
                    // Save to database
                    await axios.put(`${API}/children/${childId}/voice-note`, { voice_note: base64 });
                    // Save locally for playback
                    const url = URL.createObjectURL(blob);
                    setAudioURLs(prev => ({ ...prev, [childId]: url }));
                    notify("🎤 Voice note saved!");
                };
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setRecording(childId);
        } catch (err) {
            notify("❌ Microphone access denied!", COLORS.coral);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(null);
        }
    };

    return (
        <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>🎨 Activities & Meals Logger</h2>
            {children.length === 0 ? (
                <div style={{ textAlign: "center", padding: 60, color: COLORS.muted }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>👶</div>
                    <div style={{ fontWeight: 700 }}>No children registered yet!</div>
                </div>
            ) : (
                <div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
                    {children.map(c => (
                        <div key={c.id} style={S.card}>
                            {/* Child header */}
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                                <div style={{ width: 44, height: 44, borderRadius: "50%", background: COLORS.mint, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, color: "#fff" }}>
                                    {c.name.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 800 }}>{c.name}</div>
                                    <div style={{ fontSize: 12, color: COLORS.muted }}>{c.group_name || c.group} — {c.present ? "✅ Present" : "❌ Absent"}</div>
                                </div>
                                {c.allergies !== "None" && (
                                    <div style={{ marginLeft: "auto", color: COLORS.coral, fontWeight: 700, fontSize: 12 }}>⚠️ {c.allergies}</div>
                                )}
                            </div>

                            {/* Activities */}
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ fontSize: 12, fontWeight: 800, color: COLORS.muted, marginBottom: 8, textTransform: "uppercase" }}>Activities</div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {ACTIVITIES.map(a => (
                                        <button key={a} onClick={() => toggleActivity(c.id, a)}
                                            style={{ padding: "6px 12px", borderRadius: 20, border: "2px solid " + (c.activities.includes(a) ? COLORS.sky : COLORS.border), background: c.activities.includes(a) ? COLORS.sky + "20" : "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", color: c.activities.includes(a) ? COLORS.sky : COLORS.muted, fontFamily: "inherit" }}>
                                            {a}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Meals */}
                            <div style={{ marginBottom: 14 }}>
                                <div style={{ fontSize: 12, fontWeight: 800, color: COLORS.muted, marginBottom: 8, textTransform: "uppercase" }}>Meals</div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {MEALS.map(m => (
                                        <button key={m} onClick={() => toggleMeal(c.id, m)}
                                            style={{ padding: "6px 12px", borderRadius: 20, border: "2px solid " + (c.meals.includes(m) ? COLORS.lemon : COLORS.border), background: c.meals.includes(m) ? COLORS.lemon + "30" : "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", color: c.meals.includes(m) ? "#B8860B" : COLORS.muted, fontFamily: "inherit" }}>
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Voice Note */}
                            <div style={{ borderTop: "1px solid " + COLORS.border, paddingTop: 14 }}>
                                <div style={{ fontSize: 12, fontWeight: 800, color: COLORS.muted, marginBottom: 8, textTransform: "uppercase" }}>🎤 Voice Note</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                                    {recording === c.id ? (
                                        <button onClick={stopRecording}
                                            style={{ padding: "8px 18px", borderRadius: 20, border: "none", background: COLORS.coral, color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
                                            ⏹️ Stop Recording
                                        </button>
                                    ) : (
                                        <button onClick={() => startRecording(c.id)}
                                            style={{ padding: "8px 18px", borderRadius: 20, border: "none", background: COLORS.lavender, color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
                                            🎤 Record Voice Note
                                        </button>
                                    )}

                                    {/* Playback */}
                                    {audioURLs[c.id] && (
                                        <audio controls src={audioURLs[c.id]} style={{ height: 36, borderRadius: 20 }} />
                                    )}

                                    {/* Show saved indicator */}
                                    {c.voice_note && !audioURLs[c.id] && (
                                        <span style={{ fontSize: 12, color: COLORS.mint, fontWeight: 700 }}>✅ Voice note saved</span>
                                    )}
                                </div>

                                {/* Recording indicator */}
                                {recording === c.id && (
                                    <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.coral, animation: "pulse 1s infinite" }} />
                                        <span style={{ fontSize: 12, color: COLORS.coral, fontWeight: 700 }}>Recording...</span>
                                        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
                                    </div>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}