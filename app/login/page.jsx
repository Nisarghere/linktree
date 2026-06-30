"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedin, setisLoggedin] = useState(false)
  const router = useRouter()
  async function sendData(e) {
    e.preventDefault()
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }

    )

    if (response.ok) {
      toast('Login succesful')
      setisLoggedin(true)
      localStorage.setItem("isLoggedIn", "true")
      router.push('/')
    }
    else {
      toast('Login unsuccesful')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-orange-400 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-orange-200 rounded-2xl px-8 py-8 shadow-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            loading="eager"
            src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg"
            alt="logo"
            className="h-8 w-auto"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-red-700 text-center">
          Welcome Back
        </h1>

        <p className="text-orange-700 text-center mt-2">
          Sign in to access your personal link page.
        </p>

        {/* Form */}
        <form className="mt-8 space-y-5">
          <div>
            <label className="block text-red-700 mb-2 font-medium">
              Email
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-lg bg-white border border-orange-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-red-700 mb-2 font-medium">
              Password
            </label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-white border border-orange-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <button
            onClick={sendData}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Log In
          </button>
          <ToastContainer />
        </form>

        <p className="text-center text-orange-700 mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-red-600 font-semibold hover:text-red-700"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}