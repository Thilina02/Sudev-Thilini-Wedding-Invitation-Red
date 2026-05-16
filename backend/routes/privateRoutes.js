import { Router } from "express";
import { requirePrivateSession } from "../middleware/requirePrivateSession.js";
import { listRsvpsController } from "../controllers/privateController.js";

export function createPrivateRouter(pool) {
  const router = Router();
  router.get("/rsvps", requirePrivateSession, listRsvpsController(pool));
  return router;
}
