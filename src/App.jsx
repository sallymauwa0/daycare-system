import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RegisterChild from "./pages/RegisterChild";
import Attendance from "./pages/Attendance";
import Activities from "./pages/Activities";
import ParentView from "./pages/ParentView";
import Reports from "./pages/Reports";
import ChildRegistration from "./pages/ChildRegistration";
import Approvals from "./pages/Approvals";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import { COLORS } from "./constants";
import axios from "axios";

const API = "http://localhost:5000";

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [children, setChildren] = useState([]);
  const [parentRequests, setParentRequests] = useState([]);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchChildren();
      fetchParentRequests();
      if (user.role === "admin") setPage("dashboard");
      else if (user.role === "caregiver") setPage("dashboard");
      else if (user.role === "parent") setPage("parent");
    }
  }, [user]);

  const fetchChildren = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/children`);
      const parsed = res.data.map(c => ({
        ...c,
        activities: c.activities ? c.activities.split(",").filter(a => a) : [],
        meals: c.meals ? c.meals.split(",").filter(m => m) : [],
        present: c.present === 1 ? true : false,
      }));
      setChildren(parsed);
    } catch (err) {
      console.error("Failed to fetch children:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchParentRequests = async () => {
    try {
      const res = await axios.get(`${API}/parent-requests`);
      setParentRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch parent requests:", err);
    }
  };

  const notify = (msg, color = COLORS.mint) => {
    setNotification({ msg, color });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setChildren([]);
    setParentRequests([]);
    setPage("login");
  };

  const addChild = async (childData) => {
    try {
      await axios.post(`${API}/children`, childData);
      await fetchChildren();
      notify(childData.name + " registered successfully!");
    } catch (err) {
      notify("Failed to add child!", COLORS.coral);
    }
  };

  const deleteChild = async (id) => {
    try {
      await axios.delete(`${API}/children/${id}`);
      await fetchChildren();
      notify("🗑️ Child removed successfully!");
    } catch (err) {
      notify("Failed to delete child!", COLORS.coral);
    }
  };

  const togglePresent = async (id) => {
    const child = children.find(c => c.id === id);
    const newStatus = child.present ? 0 : 1;
    try {
      await axios.put(`${API}/children/${id}/attendance`, { present: newStatus });
      await fetchChildren();
      notify((child.present ? "👋 Checked out: " : "✅ Checked in: ") + child.name);
    } catch (err) {
      notify("Failed to update attendance!", COLORS.coral);
    }
  };

  const batchCheckIn = async () => {
    try {
      await Promise.all(children.map(c => axios.put(`${API}/children/${c.id}/attendance`, { present: 1 })));
      await fetchChildren();
      notify("✅ All children checked in!");
    } catch (err) {
      notify("Failed to check in all!", COLORS.coral);
    }
  };

  const batchCheckOut = async () => {
    try {
      await Promise.all(children.map(c => axios.put(`${API}/children/${c.id}/attendance`, { present: 0 })));
      await fetchChildren();
      notify("👋 All children checked out!", COLORS.coral);
    } catch (err) {
      notify("Failed to check out all!", COLORS.coral);
    }
  };

  const toggleActivity = async (childId, activity) => {
    const child = children.find(c => c.id === childId);
    const has = child.activities.includes(activity);
    const updated = has ? child.activities.filter(a => a !== activity) : [...child.activities, activity];
    try {
      await axios.put(`${API}/children/${childId}/activities`, { activities: updated.join(",") });
      await fetchChildren();
    } catch (err) {
      notify("Failed to update activity!", COLORS.coral);
    }
  };

  const toggleMeal = async (childId, meal) => {
    const child = children.find(c => c.id === childId);
    const has = child.meals.includes(meal);
    const updated = has ? child.meals.filter(m => m !== meal) : [...child.meals, meal];
    try {
      await axios.put(`${API}/children/${childId}/meals`, { meals: updated.join(",") });
      await fetchChildren();
    } catch (err) {
      notify("Failed to update meal!", COLORS.coral);
    }
  };

  const submitParentRequest = async (formData) => {
    try {
      await axios.post(`${API}/parent-requests`, {
        ...formData,
        parent_email: user?.email || formData.email,
      });
      await fetchParentRequests();
      notify("✅ Registration request submitted!");
    } catch (err) {
      notify("Failed to submit request!", COLORS.coral);
    }
  };

  // ─── Approve request — with duplicate guard ────────────────────────
  const approveRequest = async (request) => {
    try {
      const childName = request.child_name || request.name;

      // DUPLICATE GUARD: don't add if child already exists for this parent
      const already = children.find(
        c => c.parent_email === (request.parent_email || request.email) &&
             c.name.trim().toLowerCase() === childName.trim().toLowerCase()
      );
      if (already) {
        await axios.put(`${API}/parent-requests/${request.id}`, { status: "approved" });
        await fetchParentRequests();
        notify("⚠️ Child already registered — request marked approved.");
        return;
      }

      const age = request.dob
        ? Math.floor((new Date() - new Date(request.dob)) / (365.25 * 24 * 60 * 60 * 1000))
        : 3;
      await axios.post(`${API}/children`, {
        name: childName,
        age,
        guardian: request.guardian,
        contact: request.contact,
        email: request.email || "",
        group_name: "Sunflower",
        allergies: request.allergies || "None",
        parent_email: request.parent_email || request.email || "",
      });
      await axios.put(`${API}/parent-requests/${request.id}`, { status: "approved" });
      await fetchChildren();
      await fetchParentRequests();
      notify("✅ " + childName + " approved and added!");
    } catch (err) {
      notify("Failed to approve request!", COLORS.coral);
    }
  };

  const rejectRequest = async (request) => {
    try {
      const childName = request.child_name || request.name;
      await axios.put(`${API}/parent-requests/${request.id}`, { status: "rejected" });
      await fetchParentRequests();
      notify("❌ " + childName + "'s request rejected", COLORS.coral);
    } catch (err) {
      notify("Failed to reject request!", COLORS.coral);
    }
  };

  const presentCount = children.filter(c => c.present).length;

  const myChildren = user?.role === "parent"
    ? children.filter(c => c.parent_email === user.email)
    : children;

  const sharedProps = {
    children: myChildren,
    allChildren: children,
    setChildren, parentRequests, setParentRequests,
    notify, setPage, presentCount, user,
    addChild, deleteChild, togglePresent, batchCheckIn, batchCheckOut,
    toggleActivity, toggleMeal, submitParentRequest,
    approveRequest, rejectRequest, handleLogout,
  };

  if (!user) {
    if (page === "signup") return <Signup onLogin={handleLogin} setPage={setPage} />;
    return <Login onLogin={handleLogin} setPage={setPage} />;
  }

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "'Nunito', sans-serif", background: COLORS.bg }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🏡</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.mint }}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      <Notification notification={notification} />
      <Navbar page={page} setPage={setPage} presentCount={presentCount} total={myChildren.length} user={user} handleLogout={handleLogout} />
      <div style={{ padding: "24px", maxWidth: 1100, margin: "0 auto" }}>
        {page === "home" && <Home {...sharedProps} />}
        {page === "dashboard" && <Dashboard {...sharedProps} />}
        {page === "register" && <RegisterChild {...sharedProps} />}
        {page === "attendance" && <Attendance {...sharedProps} />}
        {page === "activities" && <Activities {...sharedProps} />}
        {page === "parent" && <ParentView {...sharedProps} />}
        {page === "reports" && <Reports {...sharedProps} />}
        {page === "child-register" && <ChildRegistration {...sharedProps} />}
        {page === "admin-approvals" && <Approvals {...sharedProps} />}
        {page === "users" && <Users {...sharedProps} />}
      </div>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } button:hover { opacity: 0.88; } h2,h3 { margin: 0; }`}</style>
    </div>
  );
}