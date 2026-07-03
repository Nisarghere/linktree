'use client'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Lottie from 'lottie-react'
import animationData from '../8e8d0f50-1179-11ee-885f-eb04f2187e0a.json'

const page = () => {
  const [text, settext] = useState('')
  const router = useRouter()

  function createtree() {
    router.push(`/generate?handle=${text}`)
  }

  return (
    <div>
     

      <main>
        {/* Section 1 */}
        <section className='bg-yellow-300 min-h-[100vh] grid grid-cols-1 md:grid-cols-2 md:w-full'>
          
          <div className='flex flex-col justify-center px-6 md:ml-[10vw] gap-4 md:pt-15 pt-28 md:w-full'>
            <h2 className='text-[#254F1A] text-4xl sm:text-5xl md:text-7xl font-extrabold'>
              A link in bio<br /> built for you.
            </h2>
            <p className='text-[#254F1A] text-sm sm:text-base'>
              Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
            </p>
            <div className='flex flex-col sm:flex-row gap-2'>
              <input
                value={text}
                onChange={(e) => settext(e.target.value)}
                className='bg-white focus:outline-yellow-300 font-semibold text-[#757575] px-4 py-4 rounded w-full sm:w-auto'
                type='text'
                placeholder='linktr.ee/'
              />
              <button
                onClick={() => createtree()}
                className='px-6 py-4 bg-[#254F1A] rounded-full font-semibold text-white w-full sm:w-auto'
              >
                Claim your tree
              </button>
            </div>
          </div>

          <div className='flex flex-col justify-center items-center gap-4 px-4 py-8 md:py-0'>
            <video autoPlay loop muted className='w-full max-w-[500px] h-auto'>
              <source
                src='https://assets.production.linktr.ee/static/curate/customise_your_linktree.webm'
                type='video/webm'
              />
              <source
                src='https://assets.production.linktr.ee/static/curate/customise_your_linktree.mp4'
                type='video/mp4'
              />
            </video>
          </div>
        </section>

        {/* Section 2 */}
        <section className='bg-[#780016] min-h-[100vh] grid grid-cols-1 md:grid-cols-2'>
          
          <div className='flex justify-center items-center px-4 py-10 md:py-0'>
            <Lottie animationData={animationData} loop={true} className='w-full max-w-[500px]' />
          </div>

          <div className='flex flex-col justify-center px-6 md:mr-[10vw] gap-4 pb-10 md:pb-0'>
            <h2 className='text-[#e9c0e9] text-3xl sm:text-4xl md:text-5xl font-extrabold'>
              Share your Linktree <br /> anywhere you like!
            </h2>
            <p className='text-white text-sm sm:text-base'>
              Add your unique Linktree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic back to your link in bio.
            </p>
            <div className='flex gap-2'>
              <button
                onClick={() => createtree()}
                className='px-8 py-4 bg-[#e9c0e9] rounded-full font-bold text-black w-full sm:w-auto'
              >
                Get started for free
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default page