import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function createLinktree(handle, pic, links) {
  // pic not stored in DB (since your schema doesn't support it yet)

  for (const link of links) {
    if (!link?.url || !link?.text) continue;

    await pool.query(
      "INSERT INTO links (handle, url, text) VALUES ($1, $2, $3)",
      [handle, link.url.trim(), link.text.trim(),pic]
    );
  }
}

export async function getLinksByHandle(handle) {
  const res = await pool.query(
    "SELECT * FROM links WHERE handle = $1",
    [handle]
  );

  return res.rows;
}








// import { Pool } from 'pg'

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// })

// export async function createLinktree(handle, pic, links) {
//   for (const link of links) {
//     await pool.query(
//       'INSERT INTO links (handle, url, text) VALUES ($1, $2, $3)',
//       [handle, link.url, link.text]
//     )
//   }
// }