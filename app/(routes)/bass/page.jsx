import { pool } from "@/lib/db";
import SongDisplay from "@/app/components/SongDisplay";

// async function to fetch data server-side
export default async function BassPage() {
  // Fetch bass songs directly from the database
  const songs = await fetchBassSongs();

  return (
    <div className="grid place-items-center pt-8">
      <h1 className="text-3xl font-bold mb-8">Bass Songs</h1>
      <ul className="w-2/3 mb-8">
        {songs.map((song) => (
          <li key={song.id} className="p-1">
            <SongDisplay song={song} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Function to fetch bass songs from the database
async function fetchBassSongs() {
  try {
    const result = await pool.query(
      "SELECT * FROM songs WHERE LOWER(instrument) LIKE '%bass%'"
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching bass songs:", error);
    return [];
  }
}
