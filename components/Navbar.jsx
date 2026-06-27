'use client'
import { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = ['Products', 'Templates', 'Marketplace', 'Learn', 'Pricing']

  return (
    <div className='bg-white flex flex-col fixed w-[90vw] top-5 left-1/2 -translate-x-1/2 rounded-full p-3 z-50 shadow-sm'>
      
      {/* Top Row */}
      <div className='flex justify-between items-center'>
        
        {/* Logo */}
        <img
          loading='eager'
          src='https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg'
          alt='logo'
          className='h-6 w-auto ml-1'
        />

        {/* Desktop Links */}
        <ul className='hidden md:flex gap-2'>
          {navLinks.map((link) => (
            <li
              key={link}
              className='font-sans hover:bg-[#eff0ec] px-3 py-2 rounded cursor-pointer text-sm'
            >
              {link}
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className='hidden md:flex gap-3'>
          <Link className='bg-[#EFF0EC] py-2 cursor-pointer rounded px-4 font-bold text-sm' href='/login'>
            Log in
          </Link>
          <Link className='bg-[#1E2330] py-2 cursor-pointer text-white rounded-full px-4 font-bold text-sm' href='/signup'>
            sign up free
          </Link>
        </div>

        {/* Hamburger Button (mobile only) */}
        <button
          className='md:hidden flex flex-col gap-1.5 p-2'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
    {/* Mobile Menu */}
{isOpen && (
  <div className="absolute top-full left-0 mt-2 w-full rounded-2xl bg-white shadow-lg border border-gray-100 p-4 md:hidden">
    <ul className="flex flex-col gap-2">
      {navLinks.map((link) => (
        <li
          key={link}
          className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          {link}
        </li>
      ))}
    </ul>

    <div className="flex flex-col gap-2 mt-4">
      <Link
        href="/login"
        className="w-full text-center bg-gray-100 py-2 rounded-lg font-semibold"
      >
        Log in
      </Link>

      <Link
        href="/signup"
        className="w-full text-center bg-black text-white py-2 rounded-full font-semibold"
      >
        Sign up free
      </Link>
    </div>
  </div>
)}
    </div>
  )
}

export default Navbar