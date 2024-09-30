import { pool } from "@/lib/db";
import SongDisplay from "@/app/components/SongDisplay";

export default async function GuitarPage() {
  const songs = await fetchGuitarSongs();

  return (
    <div className="grid place-items-center pt-8">
      <h1 className="text-3xl font-bold mb-8">Guitar Songs</h1>
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

// SSR function to fetch guitar songs from the database
async function fetchGuitarSongs() {
  try {
    const result = await pool.query(
      "SELECT * FROM songs WHERE LOWER(instrument) LIKE '%guitar%'"
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching guitar songs");
    return [];
  }
}
