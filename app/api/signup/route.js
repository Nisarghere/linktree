import { createUser } from "@/app/lib/db";
import { Pool } from "pg";

export async function POST(request) {
    console.log('POST route hit')
  const body = await request.json()

  const user = await createUser(
    body.name,
    body.email,
    body.password
  )

  return Response.json({
    message: 'success',
    data: user
  })
}