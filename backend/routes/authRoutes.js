import { Router } from "express";
import { authLogin, authLogout, authSession } from "../controllers/authController.js";

export function createAuthRouter() {
  const router = Router();
  router.post("/login", authLogin);
  router.post("/logout", authLogout);
  router.get("/session", authSession);
  return router;
}
