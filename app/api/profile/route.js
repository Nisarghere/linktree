import { pool } from "@/app/lib/db"
// import { jwtDecrypt } from "jose"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'



export async function GET() {

    const cookiStore = await cookies()
    const token = cookiStore.get("session")?.value

    if (!token){
        return Response.json(
            {
                message:'unauthorized'
            },
            
            {
            status:401
            }
)
    }
    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        const body = await pool.query('select id,name,email from userdata where id=$1', [decoded.userId])
    
        return Response.json(body.rows[0])
        
    } catch(err){
        return Response.json(
            {message:'invalid token'},
            {status:401}
        )
    }   














}