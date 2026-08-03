import { Suspense } from 'react'
import Generate from './GeneratePage'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { getUserById } from '../app/lib/db'
import { cookies } from 'next/headers'


export default async function Page() {
   const cookieStore =await cookies()
   const token = cookieStore.get("session")?.value

   if(!token){
    redirect('/login')
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET)

   const user = await getUserById(decoded.userId)

  //  if(user?.handle){
  //   redirect('/dashboard')
  //  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Generate />
    </Suspense>
  )
}