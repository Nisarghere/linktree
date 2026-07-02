import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


export async function createLinktree(user_id, handle, pic, links) {

  for (const link of links) {
    if (!link?.url || !link?.text) continue;

    await pool.query(
      "INSERT INTO links (user_id, handle, url, text, pic) VALUES ($1, $2, $3, $4, $5)",
      [user_id, handle, link.url.trim(), link.text.trim(), pic]
    );
  }
}

export async function getLinksByUserId(userId) {
  const res = await pool.query(
    "SELECT * FROM links WHERE user_id = $1",
    [userId]
  );

  return res.rows;
}


export async function createUser(name, email, password) {
  const results = await pool.query(
    `INSERT INTO userdata(name,email,password)
     VALUES($1,$2,$3)
     RETURNING *`,
    [name, email, password]
  )

  return results.rows[0]
}




export default async function findUser(email, password){
  const results = await pool.query('select * from userdata where email=$1 and password=$2', [email,password])
  
}