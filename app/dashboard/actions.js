"use server"
import { pool } from "../lib/db"

export async function updateLink(text, url, id, userid) {
  const results = await pool.query(
    'UPDATE links SET text=$1, url=$2 WHERE id=$3 AND user_id=$4 RETURNING *',
    [text, url, id, userid]
  )
  return results.rows[0]
}

export async function deleteLink(id, userid){
    const result = await pool.query('DELETE FROM links WHERE id=$1 AND user_id=$2 RETURNING *',[id,userid])
    return result.rows[0]
}