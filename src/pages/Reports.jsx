// pages/Reports.jsx
// ─── Charts: attendance, groups, activities + exportable table ────────

import { COLORS, ACTIVITIES, GROUPS, S } from "../constants";

export default function Reports({ children, presentCount, notify }) {
    const groupCounts = GROUPS.reduce((acc, g) => { acc[g] = children.filter(c => (c.group_name || c.group) === g).length; return acc; }, {});
    const activityStats = ACTIVITIES.map(a => ({ name: a, count: children.filter(c => c.activities.includes(a)).length }));
    const groupColors = [COLORS.sky, COLORS.lavender, COLORS.lemon];

    const exportCSV = () => {
        const headers = ["Name", "Age", "Group", "Guardian", "Contact", "Allergies", "Attendance", "Activities", "Meals"];
        const rows = children.map(c => [
            c.name,
            c.age,
            c.group_name || c.group,
            c.guardian,
            c.contact,
            c.allergies,
            c.present ? "Present" : "Absent",
            c.activities.length > 0 ? c.activities.join(" | ") : "None",
            c.meals.length > 0 ? c.meals.join(" | ") : "None",
        ]);

        const csvContent = [headers, ...rows].map(row => row.map(val => `"${val}"`).join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "daycare_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        notify("📥 Report downloaded as Excel/CSV!", COLORS.lavender);
    };

    const exportPDF = () => {
        const printContent = `
            <html>
            <head>
                <title>Daycare Report</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #4ECDC4; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th { background: #f0fffe; padding: 10px; text-align: left; font-size: 12px; text-transform: uppercase; color: #666; border-bottom: 2px solid #eee; }
                    td { padding: 10px; border-bottom: 1px solid #eee; font-size: 13px; }
                    .present { color: #4ECDC4; font-weight: bold; }
                    .absent { color: #FF6B6B; font-weight: bold; }
                    .footer { margin-top: 20px; font-size: 12px; color: #999; }
                </style>
            </head>
            <body>
                <h1>🏡 Daycare Management System</h1>
                <p>Report generated on: ${new Date().toLocaleDateString()}</p>
                <p>Total Children: ${children.length} | Present: ${presentCount} | Absent: ${children.length - presentCount}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th><th>Age</th><th>Group</th><th>Guardian</th><th>Attendance</th><th>Activities</th><th>Meals</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${children.map(c => `
                            <tr>
                                <td>${c.name}</td>
                                <td>${c.age} yrs</td>
                                <td>${c.group_name || c.group}</td>
                                <td>${c.guardian}</td>
                                <td class="${c.present ? 'present' : 'absent'}">${c.present ? 'Present' : 'Absent'}</td>
                                <td>${c.activities.length > 0 ? c.activities.join(', ') : 'None'}</td>
                                <td>${c.meals.length > 0 ? c.meals.join(', ') : 'None'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="footer">Daycare Management System - Confidential Report</div>
            </body>
            </html>
        `;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
        notify("🖨️ PDF ready to print/save!", COLORS.lavender);
    };

    return (
        <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>📈 Administrative Reports</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

                {/* Attendance */}
                <div style={S.card}>
                    <h3 style={{ fontWeight: 800, marginBottom: 16 }}>📊 Attendance Overview</h3>
                    {[{ label: "Present", count: presentCount, color: COLORS.mint }, { label: "Absent", count: children.length - presentCount, color: COLORS.coral }].map(b => (
                        <div key={b.label} style={{ marginBottom: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, marginBottom: 6 }}>
                                <span>{b.label}</span><span>{b.count} children</span>
                            </div>
                            <div style={{ height: 20, borderRadius: 10, background: COLORS.border }}>
                                <div style={{ height: 20, borderRadius: 10, background: b.color, width: (children.length ? (b.count / children.length) * 100 : 0) + "%", transition: "width 0.6s" }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Groups */}
                <div style={S.card}>
                    <h3 style={{ fontWeight: 800, marginBottom: 16 }}>🏫 Children per Group</h3>
                    {GROUPS.map((g, i) => (
                        <div key={g} style={{ marginBottom: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, marginBottom: 6 }}>
                                <span>{g}</span><span>{groupCounts[g]} children</span>
                            </div>
                            <div style={{ height: 20, borderRadius: 10, background: COLORS.border }}>
                                <div style={{ height: 20, borderRadius: 10, background: groupColors[i], width: (children.length ? (groupCounts[g] / children.length) * 100 : 0) + "%", transition: "width 0.6s" }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Activity participation */}
                <div style={{ ...S.card, gridColumn: "1 / -1" }}>
                    <h3 style={{ fontWeight: 800, marginBottom: 16 }}>🎨 Activity Participation</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                        {activityStats.map(a => (
                            <div key={a.name} style={{ background: COLORS.bg, borderRadius: 12, padding: 16 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{a.name}</div>
                                <div style={{ height: 10, borderRadius: 6, background: COLORS.border, marginBottom: 6 }}>
                                    <div style={{ height: 10, borderRadius: 6, background: COLORS.sky, width: (children.length ? (a.count / children.length) * 100 : 0) + "%", transition: "width 0.5s" }} />
                                </div>
                                <div style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>{a.count} of {children.length} children</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary table */}
                <div style={{ ...S.card, gridColumn: "1 / -1" }}>
                    <h3 style={{ fontWeight: 800, marginBottom: 16 }}>📋 Full Summary Report</h3>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: COLORS.bg }}>
                                {["Child", "Age", "Group", "Attendance", "Activities", "Meals"].map(h => (
                                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 800, color: COLORS.muted, fontSize: 11, textTransform: "uppercase" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {children.map((c, i) => (
                                <tr key={c.id} style={{ borderTop: "1px solid " + COLORS.border, background: i % 2 === 0 ? "#fff" : COLORS.bg }}>
                                    <td style={{ padding: "10px 14px", fontWeight: 700 }}>{c.name}</td>
                                    <td style={{ padding: "10px 14px" }}>{c.age} yrs</td>
                                    <td style={{ padding: "10px 14px" }}>{c.group_name || c.group}</td>
                                    <td style={{ padding: "10px 14px" }}><span style={{ color: c.present ? COLORS.mint : COLORS.coral, fontWeight: 700 }}>{c.present ? "Present" : "Absent"}</span></td>
                                    <td style={{ padding: "10px 14px" }}>{c.activities.length > 0 ? c.activities.length + " logged" : "None"}</td>
                                    <td style={{ padding: "10px 14px" }}>{c.meals.length > 0 ? c.meals.length + " meal(s)" : "None"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Export Buttons */}
                    <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                        <button onClick={exportCSV}
                            style={{ background: COLORS.mint, color: "#fff", border: "none", padding: "10px 20px", borderRadius: 12, fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                            📥 Export to Excel (CSV)
                        </button>
                        <button onClick={exportPDF}
                            style={{ background: COLORS.coral, color: "#fff", border: "none", padding: "10px 20px", borderRadius: 12, fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                            🖨️ Print / Save as PDF
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}