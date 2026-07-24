import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { pool } from "@/app/lib/db";

export async function POST(request) {
  try {
    const { text, url } = await request.json();

    if (!text || !url) {
      return Response.json(
        { message: "Text and URL are required" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();

    const token = cookieStore.get("session")?.value;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user_id = decoded.userId;

    const result = await pool.query(
      "INSERT INTO links (text, url, user_id) VALUES ($1, $2, $3) RETURNING *",
      [text.trim(), url.trim(), user_id],
    );
    return Response.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    return Response.json({ error: err.message }, { status: 500 });
  }
}
