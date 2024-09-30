"use client";
import { useState, useEffect } from "react";
import AddSongForm from "./components/AddSongForm";
import SongDisplay from "./components/SongDisplay";

export default function Home() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/api/songs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSongs(data);
        console.log("data", data);
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  }, []);

  function addSong(newSong) {
    fetch("/api/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSong),
    })
      .then((response) => response.json())
      .then((addedSong) => {
        setSongs([...songs, addedSong]);
      })
      .catch((error) => console.error("Error adding song:", error));
  }

  return (
    <div className="grid place-items-center pt-8">
      <h2 className="text-2xl py-8">Add song here:</h2>
      <AddSongForm addSong={addSong} />
      <h2 className="text-2xl py-8">Current song list:</h2>
      <ul className="w-1/3 mb-8">
        {songs.map((song) => (
          <li key={song.id} className="p-1">
            <SongDisplay song={song} />
          </li>
        ))}
      </ul>
    </div>
  );
}
