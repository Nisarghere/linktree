import { createUser } from "@/app/lib/db";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const body = await request.json()
  const {name, email,password} = body

  const hash = await bcrypt.hash(password,12)

  const user = await createUser(
    name,
    email,
    hash
  )
const { password: _ , ...safeUser } = user;

  return Response.json({
    message: 'success',
    data: safeUser
  })

}

export async function GET() {
  return Response.json({
    message:'200 OK'
  })
}