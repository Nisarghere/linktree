import { pool } from "@/app/lib/db";

const AddLink=async()=>{
    const result = await pool.query("insert into links values(text=$1, url=$2 , userid=$3) ") 
}