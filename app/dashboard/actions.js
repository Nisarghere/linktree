"use server";

import { pool } from "../lib/db";

export async function addLink(text, url) {

     const cookieStore = await cookies()
  
     const token = cookieStore.get("session")?.value
  
     const decoded = jwt.verify(token,process.env.JWT_SECRET)
     const userid = decoded.userId
  
  const result = await pool.query(
    "INSERT INTO links (text, url, user_id) VALUES ($1, $2, $3) RETURNING *",
    [text.trim(), url.trim(), userid]
  );

  return result.rows[0];
}

export async function updateLink(text, url, id, userid) {
  const result = await pool.query(
    "UPDATE links SET text=$1, url=$2 WHERE id=$3 AND userid=$4 RETURNING *",
    [text.trim(), url.trim(), id, user_id]
  );

  return result.rows[0];
}

export async function deleteLink(id, userid) {
  const result = await pool.query(
    "DELETE FROM links WHERE id=$1 AND user_id=$2 RETURNING *",
    [id, userid]
  );

  return result.rows[0];
}