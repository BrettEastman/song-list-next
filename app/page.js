"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/api/songs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        setSongs(data); // Set the song data to state
        console.log("data", data);
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  }, []);

  return (
    <div>
      <h1>Song List</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";

// export default function Home() {
//   const [songs, setSongs] = useState([]);

//   useEffect(() => {
//     // Fetch songs from the Next.js API
//     fetch("/api/songs")
//       .then((response) => response.json())
//       .then((data) => {
//         setSongs(data);
//         console.log("data", data);
//       })
//       .catch((error) => console.error("Error fetching songs:", error));
//   }, []);

//   return (
//     <div>
//       <h1>Song List</h1>
//       <ul>
//         {songs.map((song) => (
//           <li key={song.id}>{song.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
