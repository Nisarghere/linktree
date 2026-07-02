'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setuser] = useState(null)

  const router =  useRouter()


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/profile')
      const resp = await result.json()
      if (result.ok) {
        setuser(resp)
      } else {
        setuser(null)
      }

    }
    fetchData()


  }
    , [])


    async function handleLogout(){
      const result = await fetch('/api/logout',({
        method:'POST'
      }))
      const resp = await result.json()
      router.push('/login')
      setuser(null)
      console.log(resp)
    }



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

        <div className="hidden md:flex items-center gap-3">
          {
            !user ? (
              <>

                <Link
                  href="/login"
                  className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md"
                >
                  Log in
                </Link>

                <Link
                  href="/signup"
                  className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-xl hover:shadow-zinc-900/30"
                >
                  Sign up free
                </Link>
              </>
            ) : (

              <>
                <button
                  onClick={handleLogout}
                  className=" font-semibold cursor-pointer rounded-full border border-zinc-200 bg-red-400 px-5 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md"
                >
                  Log out
                </button>

                <Link
                  href="/profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md"
                >
                  <svg
                    className="h-5 w-5 text-zinc-700 transition-colors duration-200 hover:text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.7}
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </Link>
              </>
            )
          }
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