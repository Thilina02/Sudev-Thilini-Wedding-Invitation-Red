import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createPool, ensureDatabaseAndTables } from "./services/dbService.js";
import { createRsvpRouter } from "./routes/rsvpRoutes.js";
import { createAuthRouter } from "./routes/authRoutes.js";
import { createPrivateRouter } from "./routes/privateRoutes.js";

const app = express();
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is not set in environment");
  process.exit(1);
}

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// Run once on cold start
ensureDatabaseAndTables(databaseUrl)
  .then(() => console.log("Database & Tables verified"))
  .catch((err) => console.error("Database initialization failed:", err));

const pool = createPool(databaseUrl);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, status: "Server is running" });
});

app.use("/api", createRsvpRouter(pool));
app.use("/api/auth", createAuthRouter());
app.use("/api/private", createPrivateRouter(pool));

// ✅ NO app.listen() here — Vercel handles that
export default app;