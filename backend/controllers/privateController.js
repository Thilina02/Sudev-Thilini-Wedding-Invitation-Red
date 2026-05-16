import { listRsvps } from "../services/rsvpService.js";

export function listRsvpsController(pool) {
  return async function getList(_req, res) {
    try {
      const rsvps = await listRsvps(pool);
      return res.json({ ok: true, rsvps });
    } catch (error) {
      console.error("List RSVPs error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
