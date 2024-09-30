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
    addSong(song);
    setSong(initialState);
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <div className="flex justify-between">
        <label>Title:</label>
        <input
          className="w-80 border border-primary20 rounded-lg"
          type="text"
          name="title"
          value={song.title}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between">
        <label>Instrument:</label>
        <input
          className="w-80 border border-primary20 rounded-lg"
          type="text"
          name="instrument"
          value={song.instrument}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between">
        <label>Artist:</label>
        <input
          className="w-80 border border-primary20 rounded-lg"
          type="text"
          name="artist"
          value={song.artist}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between">
        <label>PDF link:</label>
        <input
          className="w-80 border border-primary20 rounded-lg"
          type="text"
          name="pdf"
          value={song.pdf}
          onChange={handleChange}
        />
      </div>
      <div className="grid place-items-center my-4 border border-primary10 rounded-full">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
