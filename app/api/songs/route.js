import { NextResponse } from "next/server";
import { pool } from "../../../lib/db"; // Using db utility for PostgreSQL

// Handle GET requests
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM songs");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching songs:", error);
    return NextResponse.error();
  }
}

// Handle POST requests
export async function POST(req) {
  const { songTitle, songPdfLink, artistName, instrumentDescription } =
    await req.json();

  try {
    const result = await pool.query(
      "INSERT INTO songs (songTitle, songPdfLink, artistName, instrumentDescription) VALUES ($1, $2, $3, $4) RETURNING *",
      [songTitle, songPdfLink, artistName, instrumentDescription]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error adding song:", error);
    return NextResponse.error();
  }
}
