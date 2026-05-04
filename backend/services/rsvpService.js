export async function createRsvp(pool, payload) {
  const { name, attending, message } = payload || {};

  if (!name || !attending) {
    const error = new Error("Missing required fields: name, attending");
    error.statusCode = 400;
    throw error;
  }

  if (attending !== "Joyfully Accept" && attending !== "Regretfully Decline") {
    const error = new Error("Invalid attending value");
    error.statusCode = 400;
    throw error;
  }

  await pool.execute("INSERT INTO rsvps (name, attending, message) VALUES (?, ?, ?)", [
    String(name).trim(),
    attending,
    message ? String(message).trim() : null,
  ]);
}
