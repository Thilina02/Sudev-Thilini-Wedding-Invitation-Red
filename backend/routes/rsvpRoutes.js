import { Router } from "express";
import { rsvpController, keepAliveController } from "../controllers/rsvpController.js";

export function createRsvpRouter(pool) {
  const router = Router();
  router.post("/rsvp", rsvpController(pool));
  router.get("/keep-alive", keepAliveController(pool)); // ✅ cron hits this
  return router;
}