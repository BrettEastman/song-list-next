"use client";
import { useState, useEffect } from "react";
import AddSongForm from "./components/AddSongForm";

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

  return (
    <div className="grid place-items-center pt-8">
      <h2 className="text-2xl py-8">Add song here:</h2>
      <AddSongForm />
      <h2 className="text-2xl py-8">Current song list:</h2>
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
