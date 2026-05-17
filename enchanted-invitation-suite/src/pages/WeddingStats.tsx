import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "@/lib/apiBase";
import { Input } from "@/components/ui/input";

type RsvpRow = {
  id: number;
  name: string;
  attending: string;
  message: string | null;
  created_at: string;
};

const fetchOpts: RequestInit = { credentials: "include" };

/* ─── tiny helpers ─── */
const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const avatarHue = (name: string) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
};

/* ─── floral SVG motif ─── */
const Floral = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true" fill="none">
    <g opacity="0.18" stroke="currentColor" strokeWidth="0.8">
      <ellipse cx="100" cy="100" rx="60" ry="20" transform="rotate(0 100 100)" />
      <ellipse cx="100" cy="100" rx="60" ry="20" transform="rotate(30 100 100)" />
      <ellipse cx="100" cy="100" rx="60" ry="20" transform="rotate(60 100 100)" />
      <ellipse cx="100" cy="100" rx="60" ry="20" transform="rotate(90 100 100)" />
      <ellipse cx="100" cy="100" rx="60" ry="20" transform="rotate(120 100 100)" />
      <ellipse cx="100" cy="100" rx="60" ry="20" transform="rotate(150 100 100)" />
    </g>
    <circle cx="100" cy="100" r="10" fill="currentColor" opacity="0.12" />
    <g opacity="0.10" stroke="currentColor" strokeWidth="0.5">
      {[0, 45, 90, 135].map((a) => (
        <line
          key={a}
          x1="100" y1="30" x2="100" y2="170"
          transform={`rotate(${a} 100 100)`}
        />
      ))}
    </g>
  </svg>
);

/* ─── ring / diamond SVG ─── */
const RingsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="11" cy="16" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7" />
    <circle cx="21" cy="16" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7" />
    <path d="M16 11.5 L18 16 L16 20.5 L14 16 Z" fill="currentColor" opacity="0.5" />
  </svg>
);

/* ─── stat card ─── */
const StatCard = ({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent: string;
}) => (
  <div
    style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "1rem",
      padding: "1.5rem 1.25rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "-20px",
        right: "-20px",
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: accent,
        opacity: 0.12,
        filter: "blur(20px)",
      }}
    />
    <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>
      {label}
    </p>
    <p style={{ fontSize: "2.25rem", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1 }}>
      {value}
    </p>
    {sub && (
      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", margin: 0 }}>{sub}</p>
    )}
  </div>
);

/* ─── RSVP row card ─── */
const RsvpCard = ({ row }: { row: RsvpRow }) => {
  const hue = avatarHue(row.name);
  const attending = row.attending?.toLowerCase();
  const isYes = attending === "yes" || attending === "attending";
  const isNo = attending === "no" || attending === "not attending" || attending === "decline";

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        display: "grid",
        gridTemplateColumns: "40px 1fr auto",
        gap: "1rem",
        alignItems: "center",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.09)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)")}
    >
      {/* avatar */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: `hsl(${hue}, 55%, 30%)`,
          border: `1.5px solid hsl(${hue}, 55%, 50%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          fontWeight: 600,
          color: `hsl(${hue}, 55%, 85%)`,
          flexShrink: 0,
          letterSpacing: "0.03em",
        }}
      >
        {initials(row.name)}
      </div>

      {/* name + message */}
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 500, fontSize: "14px", color: "rgba(255,255,255,0.9)", letterSpacing: "0.02em" }}>
          {row.name}
        </p>
        {row.message && (
          <p
            style={{
              margin: "2px 0 0",
              fontSize: "12px",
              color: "rgba(255,255,255,0.4)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={row.message}
          >
            "{row.message}"
          </p>
        )}
        <p style={{ margin: "2px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.04em" }}>
          {fmt(row.created_at)}
        </p>
      </div>

      {/* badge */}
      <div
        style={{
          padding: "4px 12px",
          borderRadius: "999px",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          background: isYes
            ? "rgba(134,239,172,0.15)"
            : isNo
              ? "rgba(252,165,165,0.15)"
              : "rgba(253,230,138,0.15)",
          color: isYes
            ? "#86efac"
            : isNo
              ? "#fca5a5"
              : "#fde68a",
          border: isYes
            ? "1px solid rgba(134,239,172,0.3)"
            : isNo
              ? "1px solid rgba(252,165,165,0.3)"
              : "1px solid rgba(253,230,138,0.3)",
        }}
      >
        {isYes ? "Attending" : isNo ? "Declined" : row.attending}
      </div>
    </div>
  );
};

/* ─── main component ─── */
const WeddingStats = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [rsvps, setRsvps] = useState<RsvpRow[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");

  const loadRsvps = useCallback(async () => {
    setLoadError(null);
    const res = await fetch(apiUrl("/api/private/rsvps"), fetchOpts);
    if (res.status === 401) { setAuthenticated(false); setRsvps([]); return; }
    if (!res.ok) { setLoadError("Could not load RSVPs."); return; }
    const data = (await res.json()) as { rsvps?: RsvpRow[] };
    setRsvps(data.rsvps ?? []);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(apiUrl("/api/auth/session"), fetchOpts);
        const data = (await res.json()) as { authenticated?: boolean };
        if (cancelled) return;
        if (data.authenticated) { setAuthenticated(true); await loadRsvps(); }
      } catch {
        if (!cancelled) setLoadError("Could not reach the server.");
      } finally {
        if (!cancelled) setSessionChecked(true);
      }
    })();
    return () => { cancelled = true; };
  }, [loadRsvps]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setSubmitting(true);
    try {
      const res = await fetch(apiUrl("/api/auth/login"), {
        ...fetchOpts, method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setLoginError(body.error || "Sign-in failed.");
        return;
      }
      setPassword(""); setAuthenticated(true); await loadRsvps();
    } catch { setLoginError("Network error. Is the backend running?"); }
    finally { setSubmitting(false); }
  };

  const handleLogout = async () => {
    await fetch(apiUrl("/api/auth/logout"), { ...fetchOpts, method: "POST" });
    setAuthenticated(false); setRsvps([]);
  };

  /* derived stats */
  const attending = rsvps.filter((r) => {
    const a = r.attending?.toLowerCase();
    return a === "yes" || a === "attending";
  }).length;
  const declined = rsvps.filter((r) => {
    const a = r.attending?.toLowerCase();
    return a === "no" || a === "not attending" || a === "decline";
  }).length;
  const withMessage = rsvps.filter((r) => r.message && r.message.trim()).length;

  const filtered = rsvps.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.message || "").toLowerCase().includes(search.toLowerCase())
  );

  /* ── shared dark romantic background ── */
  const pageBg: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a0e24 0%, #0f1a2e 50%, #1a0e24 100%)",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
  };

  if (!sessionChecked) {
    return (
      <div style={{ ...pageBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", fontSize: "13px" }}>
          Loading…
        </p>
      </div>
    );
  }

  /* ── LOGIN ── */
  if (!authenticated) {
    return (
      <div style={{ ...pageBg, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>

        {/* ambient orbs */}
        <div style={{ position: "fixed", top: "15%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,120,220,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "fixed", bottom: "15%", right: "8%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(100,160,255,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div
          style={{
            width: "100%",
            maxWidth: 400,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "1.5rem",
            padding: "2.5rem 2rem",
            backdropFilter: "blur(20px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Floral
            className="absolute"
            style={{
              position: "absolute", top: -40, right: -40, width: 160, height: 160,
              color: "rgba(200,160,255,1)", pointerEvents: "none",
            } as React.CSSProperties}
          />

          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem", color: "rgba(210,170,255,0.7)" }}>
              <RingsIcon />
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, margin: 0, color: "#fff", letterSpacing: "0.02em" }}>
              Our Wedding
            </h1>
            <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: "0.4rem 0 0" }}>
              Private RSVP Dashboard
            </p>
          </div>

          {/* hidden username for a11y */}
          <input type="text" name="username" autoComplete="username" value="couple" readOnly aria-hidden="true" style={{ display: "none" }} />

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label
                htmlFor="private-password"
                style={{ display: "block", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "0.5rem" }}
              >
                Password
              </label>
              <input
                id="private-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "0.75rem",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(200,160,255,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
              />
            </div>

            {loginError && (
              <p style={{ fontSize: "13px", color: "#fca5a5", textAlign: "center", margin: 0 }} role="alert">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !password.trim()}
              style={{
                padding: "0.8rem",
                borderRadius: "0.75rem",
                border: "none",
                background: submitting || !password.trim()
                  ? "rgba(255,255,255,0.1)"
                  : "linear-gradient(135deg, rgba(180,120,255,0.7), rgba(100,150,255,0.7))",
                color: submitting || !password.trim() ? "rgba(255,255,255,0.3)" : "#fff",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: submitting || !password.trim() ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              {submitting ? "Checking…" : "Enter"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── DASHBOARD ── */
  return (
    <div style={pageBg}>
      {/* ambient orbs */}
      <div style={{ position: "fixed", top: "5%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,100,255,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "10%", right: "-5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(80,130,255,0.10) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "3rem 1.5rem 5rem", position: "relative", zIndex: 1 }}>

        {/* ── header ── */}
        <div style={{ textAlign: "center", marginBottom: "3rem", position: "relative" }}>
          <Floral
            style={{
              position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)",
              width: 120, height: 120, color: "rgba(200,160,255,1)", opacity: 0.6, pointerEvents: "none",
            } as React.CSSProperties}
          />
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem", color: "rgba(210,170,255,0.6)" }}>
            <RingsIcon />
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 600, margin: 0, color: "#fff", letterSpacing: "0.03em" }}>
            RSVP Responses
          </h1>
          <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0.5rem 0 0" }}>
            Private · For the couple only
          </p>

          {/* divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.5rem auto 0", maxWidth: 200 }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.12)" }} />
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px" }}>✦</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.12)" }} />
          </div>
        </div>

        {/* ── stats grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem", marginBottom: "2rem" }}>
          <StatCard label="Total RSVPs" value={rsvps.length} accent="#a78bfa" />
          <StatCard label="Attending" value={attending} sub={rsvps.length ? `${Math.round((attending / rsvps.length) * 100)}%` : "—"} accent="#86efac" />
          <StatCard label="Declined" value={declined} accent="#fca5a5" />
          <StatCard label="Left a message" value={withMessage} accent="#fde68a" />
        </div>

        {/* ── controls ── */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 1, minWidth: 180, position: "relative" }}>
            <span style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", fontSize: "14px", pointerEvents: "none" }}>
              ✦
            </span>
            <input
              type="search"
              placeholder="Search by name or message…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "0.65rem 1rem 0.65rem 2.2rem",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "0.75rem",
                color: "#fff",
                fontSize: "13px",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>

          <button
            onClick={() => void loadRsvps()}
            style={{
              padding: "0.65rem 1.1rem",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "0.75rem",
              color: "rgba(255,255,255,0.7)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)")}
          >
            ↺ Refresh
          </button>

          <button
            onClick={() => void handleLogout()}
            style={{
              padding: "0.65rem 1.1rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "0.75rem",
              color: "rgba(255,255,255,0.4)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,80,80,0.1)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)")}
          >
            Sign out
          </button>
        </div>

        {/* ── list ── */}
        {loadError ? (
          <p style={{ textAlign: "center", color: "#fca5a5", fontSize: "14px", marginTop: "3rem" }}>{loadError}</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "rgba(255,255,255,0.2)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✦</div>
            <p style={{ fontSize: "14px", letterSpacing: "0.06em" }}>
              {rsvps.length === 0 ? "No RSVPs yet. Check back soon." : "No results for that search."}
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {filtered.map((row) => (
              <RsvpCard key={row.id} row={row} />
            ))}
          </div>
        )}

        {/* ── footer ── */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "0 auto 1.5rem", maxWidth: 200 }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "10px" }}>✦</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
          </div>
          <Link
            to="/"
            style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
          >
            ← Back to invitation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeddingStats;