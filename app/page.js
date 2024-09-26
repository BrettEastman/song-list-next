// app/page.js
import { useState, useEffect } from "react";

export default function Home() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fetch songs from the Next.js API
    fetch("/api/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  return (
    <div>
      <h1>Song List</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>{song.songTitle}</li>
        ))}
      </ul>
    </div>
  );
}
