'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setuser] = useState(null)
  const [name, setname] = useState('')
  console.log(name)
  const router = useRouter()


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/profile')
      const resp = await result.json()

      if (result.ok) {
        setuser(resp)
        setname(resp.name)
      } else {
        setuser(null)
      }

    }
    fetchData()


  }
    , [])


  async function handleLogout() {
    const result = await fetch('/api/logout', ({
      method: 'POST'
    }))
    const resp = await result.json()
    router.push('/login')
    setuser(null)
    console.log(resp)
  }



  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Dashboard', href: '/dashboard' },
  ]

  return (
    <div className="
    fixed top-5 left-1/2
    w-[92vw] max-w-7xl
    -translate-x-1/2
    rounded-full
    border border-white/40
    bg-white/80
    backdrop-blur-xl
    shadow-[0_12px_40px_rgba(0,0,0,0.08)]
    px-5 py-3
    z-50
    ">

      {/* Top Row */}
      <div className='flex justify-between items-center'>

        {/* Logo */}
        <Link href='/'>

          <img
            loading='eager'
            src='https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg'
            alt='logo'
            className='h-7 transition-transform duration-300 group-hover:scale-105 '
          />
        </Link>

        {/* Desktop Links */}
        <ul className='hidden md:flex gap-2'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="
                      relative
                      rounded-full
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-zinc-600
                      transition-all
                      duration-300
                      hover:bg-zinc-100
                      hover:text-black
                      hover:-translate-y-0.5
                      "
              >
                {link.name}
              </Link>
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
                  className="group relative overflow-hidden rounded-full border border-zinc-200 bg-white/90 px-5 py-2.5 text-sm font-semibold text-zinc-700 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:bg-white hover:shadow-xl active:scale-95"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-100 to-transparent skew-x-12 transition-transform duration-700 group-hover:translate-x-[180%]" />

                  <span className="relative flex items-center gap-2">
                    Log in

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </Link>

                <Link
                  href="/signup"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-black px-6 py-2.5 text-sm font-semibold text-white shadow-xl shadow-zinc-900/25 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-2xl hover:shadow-zinc-900/40 active:scale-95"
                >
                  {/* Shine */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-700 group-hover:translate-x-[180%]" />

                  {/* Glow */}
                  <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="relative z-10 flex items-center gap-2">
                    Sign up free

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 5l7 7-7 7M5 12h15"
                      />
                    </svg>
                  </span>
                </Link>
              </>
            ) : (

              <>
                <Link
                  href="/profile"
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-zinc-200/80 bg-white/90 px-3 py-2 backdrop-blur-md shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-2xl hover:shadow-zinc-300/30 active:scale-[0.98]"
                >
                  {/* Shine Effect */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 transition-transform duration-700 group-hover:translate-x-[180%]" />

                  {/* Avatar */}
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br  from-sky-500 to-cyan-500 shadow-lg shadow-emerald-500/30 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>

                  {/* Name */}
                  <div className="relative flex flex-col">
                    <span className="text-sm font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-black">
                      {name}
                    </span>
                    <span className="text-xs text-zinc-500 transition-colors duration-300 group-hover:text-zinc-700">
                      View Profile
                    </span>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="ml-auto h-4 w-4 text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-zinc-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
                <button
                  onClick={handleLogout}
                  className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-2xl hover:shadow-red-500/40 active:translate-y-0 active:scale-95"
                >
                  {/* Shine Effect */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 transition-transform duration-700 group-hover:translate-x-[180%]" />

                  {/* Glow */}
                  <span className="absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-red-400/40" />

                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H9m4 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
                      />
                    </svg>

                    Log out
                  </span>
                </button>

                {/* <Link
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
                </Link> */}
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