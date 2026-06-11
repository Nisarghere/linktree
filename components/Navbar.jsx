'use client'
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

                Linktree🌲

                <ul className='flex gap-5 '>
                    <li>Products</li>
                    <li>Templates</li>
                    <li>Marketplace</li>
                    <li>Learn</li>
                    <li>Pricing</li>
                </ul>
            </nav>
            <div className=' flex gap-3'>
                <button onClick={submitData} className='bg-[#EFF0EC] py-3 cursor-pointer rounded px-4 font-bold'>Log in</button>
                <button className='bg-[#1E2330] py-3 cursor-pointer text-white rounded-full px-4 font-bold'>sign up free</button>
            </div>

        </div>
    )
}

export default Navbar