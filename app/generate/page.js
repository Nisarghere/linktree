import { Suspense } from 'react'
import Generate from './GeneratePage'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { getUserById } from '../lib/db'


export default async function Page() {
   const cookieStore = cookies()
   const token = cookieStore.get("token")?.value

   if(!token){
    redirect('/login')
   }

   const decoded = jwt.verify("token", process.env.JWT_SECRET)

   const user = await getUserById(decoded.userId)

   if()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Generate />
    </Suspense>
  )
}