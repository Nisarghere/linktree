 
import { cookies } from 'next/headers'
import Link from 'next/link'
 import jwt from 'jsonwebtoken'
import { getLinksByUserId } from '../lib/db'

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

        <h2 className="text-xl font-semibold mb-6">
          Add New Link
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="https://example.com"
            className="
              w-full
              rounded-2xl
              border
              border-zinc-200
              bg-zinc-50
              px-4
              py-3
              text-sm
              focus:border-black
              focus:ring-2
              focus:ring-zinc-200
              focus:outline-none
            "
          />

          <input
            type="text"
            placeholder="Button text"
            className="
              w-full
              rounded-2xl
              border
              border-zinc-200
              bg-zinc-50
              px-4
              py-3
              text-sm
              focus:border-black
              focus:ring-2
              focus:ring-zinc-200
              focus:outline-none
            "
          />

          <button
            className="
              w-full
              rounded-2xl
              bg-black
              py-3
              font-medium
              text-white
              transition
              hover:bg-zinc-800
            "
          >
            + Add Link
          </button>

        </div>

      </section>

      {/* Links */}
      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Your Links
          </h2>

          <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-600">
            1 Link
          </span>
        </div>

        <div className="space-y-4">



               {
                 links.map((link)=>(
                   <div className="rounded-2xl border border-zinc-200 p-5" key={link.id}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" >

                  
                   
              <div >
                <h3 className="font-semibold">{link.text}</h3>

                <p className="mt-1 text-sm text-zinc-500 break-all">
                  {link.url}
                </p>
              </div>

              <div className="flex gap-3">

                <button className="rounded-xl border px-4 py-2 hover:bg-zinc-100">
                  Edit
                </button>

                <button className="rounded-xl bg-black px-4 py-2 text-white hover:bg-zinc-800">
                  Delete
                </button>

              </div>
            </div>
                 </div>
                 ))

              }




        </div>

      </section>

    </div>

  </div>
</div>
    </>
  )
}

export default page