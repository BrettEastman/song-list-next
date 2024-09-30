import { pool } from "@/lib/db";
import SongDisplay from "@/app/components/SongDisplay";

export default async function DrumsPage() {
  const songs = await fetchDrumsSongs();

  return (
    <div className="grid place-items-center pt-8">
      <h2 className="text-3xl font-bold mb-8">Drums Songs</h2>
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

// SSR function to fetch drums songs from the database
async function fetchDrumsSongs() {
  try {
    const result = await pool.query(
      "SELECT * FROM songs WHERE LOWER(instrument) LIKE '%drums%'"
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching drums songs");
    return [];
  }
}
