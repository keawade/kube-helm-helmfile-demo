import { default as postgresPromise } from "pg-promise";

if (!process.env.DATABASE_CONNECTION_STRING) {
  console.error(
    "Environment variable 'DATABASE_CONNECTION_STRING' is not defined!"
  );
}

export const db = postgresPromise()(process.env.DATABASE_CONNECTION_STRING!);

export const initDb = async () => {
  console.log(
    `Connecting to Postgres at '${process.env.DATABASE_CONNECTION_STRING}'.`
  );

  try {
    // This is sloppy but it's good enough for the k8s demo lol
    await db.any(
      "CREATE TABLE IF NOT EXISTS history (id SERIAL, name varchar(50) NOT NULL, timestamp TIMESTAMP, PRIMARY KEY (id));"
    );
  } catch {
    // Swallow error
  }
};
