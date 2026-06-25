'use client'
import Link from 'next/link';
import React from 'react'



const Navbar = () => {
    async function submitData() {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Google",
      url: "https://google.com",
    }),
  });

  const data = await res.json();
  console.log(data);
}
    return (
        <div className='bg-white absolute flex fixed justify-between w-[80vw] top-10 right-[10vw] rounded-full p-2  '>
            <nav className='flex items-center gap-20'>

                <img loading="eager" src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg" alt="" className='h-10 w-25 ml-3'></img>

                <ul className='flex gap-5 '>
                    <li className='font-sans hover:bg-[#eff0ec] px-3 py-2 rounded cursor-pointer'>Products</li>
                    <li className='font-sans hover:bg-[#eff0ec] px-3 py-2 rounded cursor-pointer'>Templates</li>
                    <li className='font-sans hover:bg-[#eff0ec] px-3 py-2 rounded cursor-pointer'>Marketplace</li>
                    <li className='font-sans hover:bg-[#eff0ec] px-3 py-2 rounded cursor-pointer'>Learn</li>
                    <li className='font-sans hover:bg-[#eff0ec] px-3 py-2 rounded cursor-pointer'>Pricing</li>
                </ul>
            </nav>
            <div className=' flex gap-3'>
                <button onClick={submitData} className='bg-[#EFF0EC] py-3 cursor-pointer rounded px-4 font-bold'>Log in</button>
                <button className='bg-[#1E2330] py-3 cursor-pointer text-white rounded-full px-4 font-bold'>sign up free</button>
        {/* <Link onClick={submitData} className='bg-[#EFF0EC] py-3 cursor-pointer rounded px-4 font-bold' href='/login'></Link> */}
            </div>
        </div>
    )
}

export default Navbar