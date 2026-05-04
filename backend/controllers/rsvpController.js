import { createRsvp } from "../services/rsvpService.js";
import { pingDatabase, createPool } from "../services/dbService.js";

export function rsvpController(pool) {
  return async function postRsvp(req, res) {
    try {
      await createRsvp(pool, req.body);
      return res.status(201).json({ ok: true });
    } catch (error) {
      if (error?.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.error("Insert RSVP error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

// ✅ Vercel cron will hit this route every 4 minutes
export function keepAliveController(pool) {
  return async function keepAlive(req, res) {
    try {
      await pingDatabase(pool);
      res.status(200).json({ ok: true, message: "Database is alive" });
    } catch (error) {
      console.error("Keep-alive ping failed:", error);
      res.status(500).json({ error: "Database ping failed" });
    }
  };
}