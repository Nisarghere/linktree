'use client'
import Link from 'next/link';
import { Router } from 'next/router';
import React from 'react'



const Navbar = () => {
    

  
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
        <Link  className='bg-[#EFF0EC] py-3 cursor-pointer rounded px-4 font-bold' href='/login'>Log in</Link>
                <Link  className='bg-[#1E2330] py-3 cursor-pointer text-white rounded-full px-4 font-bold' href='/signup'>sign up free</Link>
            </div>
        </div>
    )
}

export default Navbar