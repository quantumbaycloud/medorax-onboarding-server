import { useEffect, useMemo, useState } from "react";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "https://api.medorax.in").replace(/\/$/, "");

async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.detail || data.message || "Request failed");
  return data;
}

const money = (paise, currency = "INR") => {
  if (paise == null) return "—";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(Number(paise) / 100);
};

function Card({ title, value }) {
  return <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 18 }}><div style={{ color: "#64748b", fontSize: 13 }}>{title}</div><div style={{ fontSize: 28, fontWeight: 800, marginTop: 5 }}>{value}</div></div>;
}

function Login({ onLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setError("");
    try { const data = await api("/api/admin/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }); onLoggedIn(data.admin); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };
  return <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f8fafc", padding: 20 }}>
    <form onSubmit={submit} style={{ width: "100%", maxWidth: 420, background: "white", padding: 30, borderRadius: 18, border: "1px solid #e2e8f0", boxShadow: "0 15px 40px rgba(15,23,42,.08)" }}>
      <h1 style={{ margin: 0, fontSize: 28 }}>Medorax Admin</h1><p style={{ color: "#64748b" }}>Sign in to review onboarding applications.</p>
      <label>Email<input value={email} onChange={e => setEmail(e.target.value)} type="email" required style={input} /></label>
      <label>Password<input value={password} onChange={e => setPassword(e.target.value)} type="password" required style={input} /></label>
      {error && <div style={errorBox}>{error}</div>}
      <button disabled={busy} style={button}>{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  </div>;
}

const input = { display: "block", width: "100%", boxSizing: "border-box", padding: "12px 13px", border: "1px solid #cbd5e1", borderRadius: 10, margin: "7px 0 16px", fontSize: 15 };
const button = { border: 0, borderRadius: 10, padding: "11px 16px", cursor: "pointer", background: "#0f172a", color: "white", fontWeight: 700 };
const errorBox = { background: "#fef2f2", color: "#b91c1c", padding: 10, borderRadius: 9, marginBottom: 14, fontSize: 14 };

function App() {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState({ items: [], total: 0 });
  const [status, setStatus] = useState("pending");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true); setError("");
    try {
      const [s, a] = await Promise.all([
        api("/api/admin/dashboard/stats"),
        api(`/api/admin/applications?status=${encodeURIComponent(status)}&search=${encodeURIComponent(search)}&page=1&pageSize=50`),
      ]);
      setStats(s); setApplications(a);
    } catch (e) { if (e.message.toLowerCase().includes("authentication") || e.message.toLowerCase().includes("session")) setAdmin(null); else setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { api("/api/admin/auth/me").then(setAdmin).catch(() => setAdmin(null)); }, []);
  useEffect(() => { if (admin) load(); }, [admin, status]);

  const open = async (id) => { try { setSelected(await api(`/api/admin/applications/${id}`)); } catch (e) { setError(e.message); } };
  const approve = async () => {
    if (!selected || !window.confirm("Approve this application and generate ERP credentials?")) return;
    try { setSelected(await api(`/api/admin/applications/${selected.application.id}/approve`, { method: "POST" })); await load(); }
    catch (e) { setError(e.message); }
  };
  const reject = async () => {
    if (!selected) return;
    const reason = window.prompt("Enter rejection reason:");
    if (!reason) return;
    try { await api(`/api/admin/applications/${selected.application.id}/reject`, { method: "POST", body: JSON.stringify({ reason }) }); setSelected(null); await load(); }
    catch (e) { setError(e.message); }
  };
  const logout = async () => { await api("/api/admin/auth/logout", { method: "POST" }).catch(() => {}); setAdmin(null); setSelected(null); };
  const filteredTitle = useMemo(() => status === "all" ? "All applications" : `${status[0].toUpperCase()}${status.slice(1)} applications`, [status]);

  if (!admin) return <Login onLoggedIn={setAdmin} />;

  return <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a" }}>
    <header style={{ background: "#0f172a", color: "white", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div><strong style={{ fontSize: 20 }}>Medorax Admin</strong><span style={{ opacity: .65, marginLeft: 12 }}>{admin.fullName} · {admin.role}</span></div>
      <button onClick={logout} style={{ ...button, background: "#334155" }}>Logout</button>
    </header>
    <main style={{ maxWidth: 1400, margin: "0 auto", padding: 24 }}>
      {error && <div style={errorBox}>{error}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(120px,1fr))", gap: 12, marginBottom: 22 }}>
        <Card title="Pending" value={stats?.pending ?? "—"} /><Card title="Approved" value={stats?.approved ?? "—"} /><Card title="Rejected" value={stats?.rejected ?? "—"} /><Card title="Users" value={stats?.users ?? "—"} /><Card title="Payments" value={stats?.verifiedPayments ?? "—"} /><Card title="Documents" value={stats?.documents ?? "—"} />
      </div>
      <section style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: 18, display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", flexWrap: "wrap" }}>
          <div><h2 style={{ margin: 0 }}>{filteredTitle}</h2><small style={{ color: "#64748b" }}>{applications.total} records</small></div>
          <div style={{ display: "flex", gap: 8 }}>
            <select value={status} onChange={e => setStatus(e.target.value)} style={{ ...input, margin: 0, width: 150 }}><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="all">All</option></select>
            <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && load()} placeholder="Search name, email, application" style={{ ...input, margin: 0, width: 280 }} />
            <button onClick={load} style={button}>Search</button>
          </div>
        </div>
        {loading ? <div style={{ padding: 30 }}>Loading…</div> : <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr>{["Application", "Applicant", "Business", "Status", "Submitted", "ERP", "Action"].map(x => <th key={x} style={th}>{x}</th>)}</tr></thead><tbody>{applications.items.map(x => <tr key={x.id}><td style={td}><strong>{x.applicationId}</strong><br/><small>{x.pharmacyId || "Not generated"}</small></td><td style={td}>{x.fullName}<br/><small>{x.email}</small></td><td style={td}>{x.businessName || "—"}<br/><small>{x.businessType || "—"}</small></td><td style={td}><span style={badge(x.status)}>{x.status}</span></td><td style={td}>{x.submittedAt ? new Date(x.submittedAt).toLocaleString() : "—"}</td><td style={td}>{x.erpProvisionStatus}</td><td style={td}><button onClick={() => open(x.id)} style={{ ...button, padding: "8px 12px" }}>Review</button></td></tr>)}</tbody></table></div>}
      </section>

      {selected && <div style={modalBackdrop}><div style={modal}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 15 }}><div><h2 style={{ margin: 0 }}>{selected.application.applicationId}</h2><p style={{ color: "#64748b", marginTop: 5 }}>{selected.user.fullName} · {selected.user.email}</p></div><button onClick={() => setSelected(null)} style={{ ...button, background: "#e2e8f0", color: "#0f172a" }}>Close</button></div>
        <div style={grid2}><Info title="Status" value={selected.application.status} /><Info title="Business" value={`${selected.business?.type || "—"} · ${selected.business?.name || "—"}`} /><Info title="GST" value={selected.business?.gstNumber || "—"} /><Info title="Drug License" value={selected.business?.drugLicenseNumber || "—"} /><Info title="Bank" value={`${selected.bank?.bankName || "—"} · ${selected.bank?.accountNumberMasked || "—"}`} /><Info title="IFSC" value={selected.bank?.ifscCode || "—"} /><Info title="ERP Username" value={selected.application.erpUsername || "—"} /><Info title="License" value={selected.application.licenseKey || "—"} /></div>
        <h3>Locations</h3>{selected.locations.map(x => <div key={x.id} style={item}>{x.formattedAddress || [x.addressLine1, x.city, x.state, x.pincode].filter(Boolean).join(", ") || "Location"}</div>)}
        <h3>Documents</h3>{selected.documents.map(x => <div key={x.id} style={{ ...item, display: "flex", justifyContent: "space-between" }}><span>{x.documentName} · {x.fileName}</span><a href={`${API_BASE}/api/admin/applications/${selected.application.id}/documents/${x.id}/download`} target="_blank" rel="noreferrer" style={{ color: "#2563eb" }}>Download</a></div>)}
        <h3>Payments</h3>{selected.payments.map(x => <div key={x.id} style={item}>{x.paymentId || "Payment"} · {money(x.amountPaise, x.currency)} · {x.status} · {x.signatureVerified ? "Verified" : "Not verified"}</div>)}
        {selected.application.status === "pending" && <div style={{ display: "flex", gap: 10, marginTop: 22 }}><button onClick={approve} style={{ ...button, background: "#15803d" }}>Approve & Generate ERP</button><button onClick={reject} style={{ ...button, background: "#b91c1c" }}>Reject</button></div>}
        {selected.application.status === "approved" && <div style={{ marginTop: 20, padding: 15, background: "#f0fdf4", borderRadius: 12 }}><strong>ERP provisioning: {selected.application.erpProvisionStatus}</strong><div style={{ marginTop: 8 }}>ERP ID: {selected.application.erpExternalId || "Pending"}</div></div>}
        {selected.application.status === "rejected" && <div style={{ marginTop: 20, padding: 15, background: "#fef2f2", borderRadius: 12 }}><strong>Rejection:</strong> {selected.application.rejectionReason}</div>}
      </div></div>}
    </main>
  </div>;
}

function Info({ title, value }) { return <div style={{ background: "#f8fafc", borderRadius: 10, padding: 12 }}><div style={{ color: "#64748b", fontSize: 12 }}>{title}</div><div style={{ marginTop: 4, fontWeight: 650, wordBreak: "break-word" }}>{value}</div></div>; }
const th = { textAlign: "left", padding: 12, fontSize: 12, color: "#64748b", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" };
const td = { padding: 12, borderBottom: "1px solid #f1f5f9", verticalAlign: "top" };
const grid2 = { display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 10, marginTop: 18 };
const item = { background: "#f8fafc", padding: 10, borderRadius: 9, marginBottom: 7, fontSize: 14 };
const modalBackdrop = { position: "fixed", inset: 0, background: "rgba(15,23,42,.55)", display: "grid", placeItems: "center", padding: 20, zIndex: 20 };
const modal = { background: "white", width: "min(1000px, 100%)", maxHeight: "90vh", overflowY: "auto", borderRadius: 18, padding: 24, boxSizing: "border-box" };
const badge = status => ({ display: "inline-block", padding: "4px 8px", borderRadius: 999, fontSize: 12, background: status === "approved" ? "#dcfce7" : status === "rejected" ? "#fee2e2" : "#fef3c7", color: status === "approved" ? "#166534" : status === "rejected" ? "#991b1b" : "#92400e" });

export default App;
