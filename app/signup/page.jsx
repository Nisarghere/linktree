"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast' // adjust to whatever toast lib you're using on the login page

export default function SignupPage() {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [success, setsuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (success) {
      toast('Account created! Redirecting...')
      const timer = setTimeout(() => {
        router.push('/login')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success, router])

  const sendData = async (e) => {
    e.preventDefault()

    if (isSubmitting) return
    setIsSubmitting(true)

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
      } else {
        const data = await response.json().catch(() => ({}))
        toast(data.message || 'Sign up failed')
      }
    } catch (err) {
      console.log('Request failed', err)
      toast('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
 <>
  <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white border border-amber-100 rounded-2xl p-8 shadow-lg">
      <h1 className="text-3xl font-bold text-slate-800 text-center">
        Create Account
      </h1>

      <p className="text-slate-500 text-center mt-2">
        Join and create your personal link page
      </p>

      <form onSubmit={sendData} className="mt-8 space-y-5">
        <div>
          <label className="block text-slate-700 mb-2 font-medium">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="John Doe"
            required
            className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-700 mb-2 font-medium">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="john@example.com"
            required
            className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-700 mb-2 font-medium">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            required
            minLength={8}
            className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-slate-500 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-amber-600 cursor-pointer hover:text-amber-700 font-semibold"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
</>
 
  );
}