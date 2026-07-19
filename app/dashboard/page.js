
 
import { cookies } from 'next/headers'
import Link from 'next/link'
 import jwt from 'jsonwebtoken'
import { getLinksByUserId } from '../lib/db'
import EditLink from './EditLink'
import AddLink from './AddLink'

const page = async() => {
  

    const cookieStore = await cookies()

   const token = cookieStore.get("session")?.value

   const decoded = jwt.verify(token,process.env.JWT_SECRET)
   const userid = decoded.userId

    const links = await getLinksByUserId(userid)
    console.log(links)
    
  
  
  
  return (
    <>
 <div className="min-h-screen bg-zinc-100">
  <div className="mx-auto max-w-6xl px-6 py-10">

    {/* Header */}
    <div className="mb-8 flex items-center justify-between">
      <div className='flex items-center'>

    <Link href='/'> <img loading='eager' src='https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg' alt='logo' className='h-7 transition-transform duration-300 group-hover:scale-105 ' /> </Link>
      </div>
     <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-zinc-500 mt-1">
          Manage all your links from one place.
        </p>
      </div>
    </div>

    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

      {/* Add Link */}
      <section className="rounded-3xl bg-white p-8 shadow-sm h-fit">
        <AddLink />

      </section>

      {/* Links */}
      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Your Links
          </h2>

          <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-600">
            {
              links.length === 1 ? (
                <div>

                  1 Link
                </div>

              ):(
                <div>

                  {links.length} Links
                  
                </div>
                  )
            }
          </span>
        </div>

        <div className="space-y-4">



               <EditLink links={links} userid={userid}/>




        </div>

      </section>

    </div>

  </div>
</div>
    </>
  )
}

export default page