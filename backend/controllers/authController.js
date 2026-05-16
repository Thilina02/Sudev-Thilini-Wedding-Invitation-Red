import { signSessionToken, timingSafeEqualPassword, verifySessionToken } from "../services/sessionToken.js";
import { PRIVATE_SESSION_COOKIE } from "../middleware/requirePrivateSession.js";

function cookieOptions(maxAgeMs) {
  const sameSiteRaw = (process.env.COOKIE_SAME_SITE || "lax").toLowerCase();
  const sameSite = sameSiteRaw === "none" || sameSiteRaw === "strict" || sameSiteRaw === "lax" ? sameSiteRaw : "lax";
  const secure =
    process.env.COOKIE_SECURE === "true" ||
    process.env.COOKIE_SECURE === "1" ||
    sameSite === "none" ||
    process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure,
    sameSite,
    maxAge: maxAgeMs,
    path: "/",
  };
}

export function authLogin(req, res) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(503).json({ error: "Server is not configured for private access." });
  }
  const submitted = req.body?.password;
  if (!timingSafeEqualPassword(submitted, adminPassword)) {
    return res.status(401).json({ error: "Invalid password." });
  }
  try {
    const { token, maxAgeMs } = signSessionToken();
    res.cookie(PRIVATE_SESSION_COOKIE, token, cookieOptions(maxAgeMs));
    return res.json({ ok: true });
  } catch (err) {
    console.error("Session sign error:", err);
    return res.status(503).json({ error: "Could not create session." });
  }
}

export function authLogout(_req, res) {
  res.clearCookie(PRIVATE_SESSION_COOKIE, { path: "/" });
  return res.json({ ok: true });
}

export function authSession(req, res) {
  const token = req.cookies?.[PRIVATE_SESSION_COOKIE];
  const authenticated = Boolean(token && verifySessionToken(token));
  return res.json({ ok: true, authenticated });
}
