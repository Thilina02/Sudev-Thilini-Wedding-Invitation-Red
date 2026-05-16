import crypto from "crypto";

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

function getSigningSecret() {
  const explicit = process.env.SESSION_SECRET;
  if (explicit) return explicit;
  const admin = process.env.ADMIN_PASSWORD;
  if (!admin) {
    throw new Error("Set ADMIN_PASSWORD (and optionally SESSION_SECRET) for private dashboard auth.");
  }
  return crypto.createHash("sha256").update(`${admin}::wedding-session-v1`).digest("hex");
}

let cachedSecret = null;
let secretResolved = false;

function signingSecret() {
  if (secretResolved) return cachedSecret;
  secretResolved = true;
  try {
    cachedSecret = getSigningSecret();
  } catch {
    cachedSecret = null;
  }
  return cachedSecret;
}

export function signSessionToken() {
  const secret = signingSecret();
  if (!secret) {
    throw new Error("Cannot sign session: set ADMIN_PASSWORD or SESSION_SECRET.");
  }
  const exp = Date.now() + TWENTY_FOUR_HOURS_MS;
  const payload = Buffer.from(JSON.stringify({ exp }), "utf8").toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return { token: `${payload}.${sig}`, maxAgeMs: TWENTY_FOUR_HOURS_MS };
}

export function verifySessionToken(token) {
  try {
    const secret = signingSecret();
    if (!secret) return false;
    const raw = String(token);
    const dot = raw.indexOf(".");
    if (dot <= 0) return false;
    const payload = raw.slice(0, dot);
    const sig = raw.slice(dot + 1);
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
    const a = Buffer.from(sig, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    if (!crypto.timingSafeEqual(a, b)) return false;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data.exp !== "number" || data.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

export function timingSafeEqualPassword(submitted, stored) {
  if (typeof submitted !== "string" || typeof stored !== "string") return false;
  const a = Buffer.from(submitted, "utf8");
  const b = Buffer.from(stored, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
