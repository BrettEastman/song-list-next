import { pool } from "./db.js"; // Add `.js` extension for local modules
import { promises as fs } from "fs";

async function seedDatabase(data) {
  const client = await pool.connect();
  try {
    // Check the currently connected database
    const result = await client.query("SELECT current_database()");
    console.log("Connected to database:", result.rows[0].current_database);
    console.log("result.rows", result.rows);

    for (const song of data) {
      const { songTitle, instrumentDescription, artistName, songPdfLink } =
        song;
      const insertQuery = `INSERT INTO songs (title, instrument, artist, pdf) VALUES ($1, $2, $3, $4)`;
      await client.query(insertQuery, [
        songTitle,
        instrumentDescription,
        artistName,
        songPdfLink,
      ]);
    }
    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.release();
  }
}

const seedDataFromFile = async () => {
  try {
    const data = await fs.readFile("lib/data/songs.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading seed data:", error);
    return []; // Return an empty array in case of error
  }
};

(async () => {
  const data = await seedDataFromFile();
  await seedDatabase(data);
})();
