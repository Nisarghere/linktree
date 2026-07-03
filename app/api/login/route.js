import { pool } from "@/app/lib/db"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken';


 export  async function POST(request) {
    const req= await request.json()

    const results = await pool.query('select *  from userdata where email=$1',[req.email])

    if (results.rows.length === 0){
        return Response.json(
            {message:'Invalid credentials'},
            {status:401}
        )
    }

    
    const user = results.rows[0]
    const isMatch = await bcrypt.compare( req.password, user.password)
    console.log(isMatch)
    if (!isMatch){
         return Response.json(
            {message:'Invalid credentials'},
            {status:401}    )
    }
    
    
    
    const token = jwt.sign(
        {userId:user.id},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    )
    
    const cookieStore = await cookies()
    cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    })
      return Response.json({ message: 'Login successful' }, { status: 200 })

    }
