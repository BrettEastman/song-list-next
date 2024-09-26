import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM songs");
    return NextResponse.json(result.rows); // Return the result as JSON
  } catch (error) {
    console.error("Error fetching songs:", error);
    return NextResponse.json(
      { error: "Failed to fetch songs" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { title, instrument, artist, pdf } = await req.json();

  try {
    const result = await pool.query(
      "INSERT INTO songs (title, instrument, artist, pdf) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, instrument, artist, pdf]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error adding song:", error);
    return NextResponse.error();
  }
}
