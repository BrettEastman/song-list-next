"use client";
import { useState } from "react";

const initialState = {
  title: "",
  instrument: "",
  artist: "",
  pdf: "",
};

export default function AddSongForm({ addSong }) {
  const [song, setSong] = useState(initialState);

  function handleChange(e) {
    setSong((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // addSong(song);
    console.log("song:", song);
    setSong(initialState);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={song.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Instrument:</label>
        <input
          type="text"
          name="instrument"
          value={song.instrument}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Artist:</label>
        <input
          type="text"
          name="artist"
          value={song.artist}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>PDF link:</label>
        <input
          type="text"
          name="pdf"
          value={song.pdf}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
