import mysql from "mysql2/promise";

function parseMysqlUrl(url) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: Number(parsed.port || 3306),
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password || ""),
    database: (parsed.pathname || "").replace(/^\//, "") || "defaultdb",
  };
}

export function createPool(databaseUrl) {
  const cfg = parseMysqlUrl(databaseUrl);
  return mysql.createPool({
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    password: cfg.password,
    database: cfg.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false },
  });
}

// ✅ Ping using pool (reuses existing connections)
export async function pingDatabase(pool) {
  const conn = await pool.getConnection();
  try {
    await conn.query("SELECT 1");
    console.log("DB keep-alive ping OK");
  } finally {
    conn.release();
  }
}

export async function ensureDatabaseAndTables(databaseUrl) {
  const cfg = parseMysqlUrl(databaseUrl);
  const conn = await mysql.createConnection({
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    password: cfg.password,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${cfg.database}\`;`);
    await conn.query(`USE \`${cfg.database}\`;`);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS rsvps (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        attending ENUM('Joyfully Accept', 'Regretfully Decline') NOT NULL,
        message TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  } finally {
    await conn.end();
  }
}