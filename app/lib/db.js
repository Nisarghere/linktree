import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


export async function createLinktree(user_id, pic, links) {

  for (const link of links) {
    if (!link?.url || !link?.text) continue;

    await pool.query(
      "INSERT INTO links (user_id, url, text, pic) VALUES ($1, $2, $3, $4)",
      [user_id, link.url.trim(), link.text.trim(), pic]
    );
  }
}

export async function createHandle(handle, userId){
  const result = await pool.query('update userdata set handle=$1 where id=$2',[handle, userId])

}

export async function getHandle(userId) {
  const result = await pool.query('select handle from userdata where id=$1', [userId])

return result.rows[0].handle
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




export  async function findUser(email, password){
  const results = await pool.query('select * from userdata where email=$1 and password=$2', [email,password])
  
}


export  async function updateLink(text, url, userid){
  const results = await pool.query('update links set text=$1, url=$2 where user_id=$3', [text, url, userid])
}

 