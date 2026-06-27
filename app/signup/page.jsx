"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


export default function SignupPage() {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [success, setsuccess] = useState(false)
  const router = useRouter()
  const sendData = async (e) => {
    // signup page
    e.preventDefault()
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
      if (response.ok) {
        setsuccess(true)
        setTimeout(() => {
          router.push('/login')

        }, 3000)
      }
      else {
        console.log('Sign up failed')
      }
    } catch (err) {
      console.log('Requet failed', err)
    }

  }

  return (
    <>
      {
        success && alert('Redirecting....')
      }
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white text-center">
            Create Account
          </h1>

          <p className="text-gray-400 text-center mt-2">
            Join and create your personal link page
          </p>

          <form onSubmit={sendData} className="mt-8 space-y-5">
            <div>
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                value={name}
                onChange={(e) => setname(e.target.value)}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button

              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <span className="text-purple-400 cursor-pointer hover:text-purple-300">
              Login
            </span>
          </p>
        </div>
      </div>
    </>

  );
}