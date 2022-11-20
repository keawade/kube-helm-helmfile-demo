import { default as express, Request } from "express";
import { default as morgan } from "morgan";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan("dev"));

app.get("/healthcheck", async (req, res) => {
  console.log("Reporting that the service is live");
  return res.json({ message: "Service is accepting requests." });
});

app.get("/hello", async (req: Request<{ name?: string }>, res) => {
  const name = req.query?.name ?? "world";
  console.log(`Saying hello to '${name}'`);

  try {
    const { db, initDb } = require("./db");

    await initDb();

    await db.any(
      "INSERT INTO history (name, timestamp) VALUES ($1, CURRENT_TIMESTAMP);",
      name
    );

    return res.json({ message: `Hello, ${name}!` });
  } catch (err) {
    console.error("failed to connect to database", err);
    return res.status(500).json({ message: "Failed to connect to database." });
  }
});

app.get("/history", async (req, res) => {
  try {
    console.log("Getting history");
    const { db, initDb } = require("./db");

    await initDb();

    const data: { id: number; name: string; timestamp: string }[] =
      await db.any("SELECT * FROM history");
    console.log("data", data);

    return res.json({
      data: data.map(({ name, timestamp }) => ({ name, timestamp })),
    });
  } catch (err) {
    console.error("failed to connect to database", err);
    return res.status(500).json({ message: "Failed to connect to database." });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});

process.on("SIGTERM", () => {
  console.warn("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.warn("HTTP server closed");
  });
});
