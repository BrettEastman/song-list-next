import { pool } from "./db.js";
import { promises as fs } from "fs";
import path from "path";

// Helper to get absolute path that works both locally and in Docker
const getDataPath = () => {
  // Check if we're in Docker (production) or local
  const basePath = process.env.NODE_ENV === "production" ? "/project" : ".";
  return path.join(basePath, "lib", "data", "songs.json");
};

async function seedDatabase(data) {
  const client = await pool.connect();
  try {
    // Log connection success
    const result = await client.query("SELECT current_database()");
    console.log("Connected to database:", result.rows[0].current_database);

    // Create table if it doesn't exist
    await client.query(`
            CREATE TABLE IF NOT EXISTS songs (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                instrument VARCHAR(255) NOT NULL,
                artist VARCHAR(255) NOT NULL,
                pdf VARCHAR(255) NOT NULL
            );
        `);

    // Clear existing data
    await client.query("TRUNCATE TABLE songs RESTART IDENTITY;");

    for (const song of data) {
      const { songTitle, instrumentDescription, artistName, songPdfLink } =
        song;
      const insertQuery = `
                INSERT INTO songs (title, instrument, artist, pdf)
                VALUES ($1, $2, $3, $4)
            `;
      await client.query(insertQuery, [
        songTitle,
        instrumentDescription,
        artistName,
        songPdfLink,
      ]);
      console.log(`Inserted song: ${songTitle}`);
    }
    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error; // Rethrow to handle in caller
  } finally {
    await client.release();
  }
}

const seedDataFromFile = async () => {
  try {
    const dataPath = getDataPath();
    console.log("Reading seed data from:", dataPath);
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading seed data:", error);
    throw error; // Rethrow to handle in caller
  }
};

(async () => {
  try {
    const data = await seedDataFromFile();
    await seedDatabase(data);
    process.exit(0); // Exit successfully
  } catch (error) {
    console.error("Fatal error during seeding:", error);
    process.exit(1); // Exit with error
  }
})();
