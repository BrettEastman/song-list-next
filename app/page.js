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
      <div class="flex flex-col items-center px-2 py-4">
        <h1
          class="text-2xl text-primary10 dark:text-primary80 font-semibold py-8"
          data-testid="cypress-home-h1"
        >
          Home Page
        </h1>
        <div class="w-1/2 text-lg text-primary10 dark:text-primary80">
          <p>
            Brett Eastman is a{" "}
            <a
              href="https://www.bretteastman.dev/"
              target="_blank"
              className="hover:text-primary60 duration-200"
            >
              software engineer
            </a>
            {", "}composer,{" "}
            <a
              href="https://www.brettaustineastman.com/"
              target="_blank"
              className="hover:text-primary60 duration-200"
            >
              musician
            </a>
            , and former music teacher based in San Francisco. As a teacher, his
            mission was to provide students the chance to develop lasting
            musical skills, leaving the student with abilities to provide a
            lifetime of musical enjoyment. His aim was to inspire students to do
            their very best and to find their own deep connection to music.
          </p>
        </div>
      </div>
      {/* <h2 className="text-2xl py-8">
        Add song here:
      </h2> */}
      {/* <AddSongForm addSong={addSong} /> */}
      <h2 className="text-2xl py-8">All songs:</h2>
      {songs.length ? (
        <ul className="w-1/2 mb-8">
          {songs.map((song) => (
            <li
              key={song.id}
              className="p-1"
              data-testid={`cypress-song${song.id}`}
            >
              <SongDisplay song={song} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-songs-message">No songs available</p>
      )}
    </div>
  );
}
