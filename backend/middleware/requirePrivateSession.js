import { verifySessionToken } from "../services/sessionToken.js";

export const PRIVATE_SESSION_COOKIE = "wedding_private_session";

export function requirePrivateSession(req, res, next) {
  const token = req.cookies?.[PRIVATE_SESSION_COOKIE];
  if (!token || !verifySessionToken(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
