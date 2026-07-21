"use server";

import { cookies } from "next/headers";
import { pool } from "../lib/db";
const jwt = require("jsonwebtoken");




export async function addLink(text, url) {
    try{
      
      const cookieStore = await cookies()
      const token = cookieStore.get("session")?.value
    
       const decoded = jwt.verify(token,process.env.JWT_SECRET)
       const userid = decoded.userId
  
  
       const linkCount = await pool.query(
          "SELECT COUNT(*) FROM links WHERE user_id = $1",
          [userid]
        );
  
        const countlink = Number(linkCount.rows[0].count)
  
        if (countlink >= 5) {
          return {
            message: "You have reached the maximum limit of 5 links.",
            success: false,
          }
        } else{
          const result = await pool.query(
      "INSERT INTO links (text, url, user_id) VALUES ($1, $2, $3) RETURNING *",
      [text.trim(), url.trim(), userid]
    );
  
    return result.rows[0];
    } 
       
    
    } catch(err){
       console.error("Error adding link:", err);

    return {
      success: false,
      message: "Failed to add link.",
    }
        }
}
    

export async function updateLink(text, url, id, user_id) {
  const result = await pool.query(
    "UPDATE links SET text=$1, url=$2 WHERE id=$3 AND user_id=$4 RETURNING *",
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