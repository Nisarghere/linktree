'use client'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const page = () => {
  const [text, settext] = useState('')
  const router = useRouter()


  function createtree(){

    router.push(`/generate?handle=${text}`)

  }
  
  return (
    <div >
      <Navbar/>

      <main>
        <section className='bg-yellow-300 min-h-[100vh] grid grid-cols-2'>
          <div className='flex flex-col justify-center ml-[10vw] gap-4'>
            <h2 className='text-[#254F1A] text-7xl font-extrabold'>A link in bio<br></br> built for you.</h2>
            <p className='text-[#254F1A]'>Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
            <div className='flex gap-2'>
              <input
              value={text}
              onChange={(e)=> settext(e.target.value)}
              className='bg-white focus:outline-yellow-300 font-semibold text-[#757575] px-4 py-4 rounded' type="text" placeholder='linktr.ee/'/>
              <button onClick={()=> createtree()} className='px-10 py-4 bg-[#254F1A] rounded-full font-semibold text-white '>Claim your tree</button>
            </div>

          </div>

          <div className='flex flex-col justify-center items-center gap-4'>
            <video autoPlay loop muted className="w-full max-w-[600px] h-auto mt-20">
              <source
                src="https://assets.production.linktr.ee/static/curate/customise_your_linktree.webm"
                type="video/webm"
              />
              <source
                src="https://assets.production.linktr.ee/static/curate/customise_your_linktree.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </section>



        <section className='bg-red-300 min-h-[100vh]'>


        </section>
      </main>
    </div>
  )
}

export default page