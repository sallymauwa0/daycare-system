// components/Notification.jsx
// ─── The little popup that appears at top-right when you do an action ───

export default function Notification({ notification }) {
    if (!notification) return null;
    return (
        <div style={{
            position: "fixed", top: 20, right: 20, zIndex: 9999,
            background: notification.color, color: "#fff",
            padding: "12px 22px", borderRadius: 14,
            fontWeight: 700, fontSize: 15,
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            animation: "slideIn 0.3s ease",
        }}>
            {notification.msg}
            <style>{`@keyframes slideIn { from { transform: translateX(80px); opacity:0 } to { transform: translateX(0); opacity:1 } }`}</style>
        </div>
    );
}