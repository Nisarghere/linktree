"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ArrowLeft } from "lucide-react";

const page = () => {

  const router = useRouter()

  const [user, setuser] = useState(null)
  const [loading, setloading] = useState(true)






  useEffect(() => {
    async function getData() {
      const response = await fetch('/api/profile')

      if (response.ok) {
        const user = await response.json()
        // console.log(user)
        setuser(user)
        setloading(false)
      } else {
        return;
      }
    }
    getData()
  }, [])

  if (loading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center bg-[#0f1115]'>
        <div className='h-8 w-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin' />

      </div>
    )
  }
  if (!user) return null

  const initial = user.name?.charAt(0)?.toUpperCase() || '?'


  async function handleLogout() {
    const response = await fetch('/api/logout', ({
      method: 'POST'
    }))

    if (response.ok) {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F8F5] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white border border-zinc-200 shadow-xl">

        {/* Header */}
        <div className="relative h-48 bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-300">
          
            <Link
              href="/"
              className="inline-flex absolute left-8 top-8 h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm hover:bg-zinc-50 hover:border-emerald-500 transition"
            >
              <ArrowLeft size={18} />
            </Link>
          
          <button
            className="absolute right-8 top-8 rounded-full bg-white/90 px-5 py-2 text-sm font-medium text-emerald-700 hover:bg-white transition"
          >
            Manage Handles
          </button>

          {/* Avatar */}
          <div className="absolute left-10 bottom-0 translate-y-1/2">
            <div className="h-32 w-32 rounded-full bg-white border-[6px] border-white shadow-lg flex items-center justify-center">
              <span className="text-5xl font-bold text-emerald-600">
                {initial}
              </span>
            </div>
          </div>

        </div>

        {/* Content */}
        <div className="pt-20 px-10 pb-10">

          <div className="flex items-center justify-between flex-wrap gap-6">

            <div>
              <h1 className="text-3xl font-bold text-zinc-900">
                {user.name}
              </h1>

              <p className="mt-2 text-zinc-500 underline">
                @{user.handle}
              </p>
            </div>

            {/* <button
              className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-medium hover:bg-emerald-700 transition"
            >
              Edit Profile
            </button> */}

          </div>

          {/* Stats */}


          {/* Information */}
          <div className="mt-10 rounded-2xl border border-zinc-200">

            <div className="flex justify-between border-b border-zinc-200 px-6 py-5">
              <span className="text-zinc-500">Display Name</span>
              <span className="font-medium text-zinc-900">{user.name}</span>
            </div>

            <div className="flex justify-between border-b border-zinc-200 px-6 py-5">
              <span className="text-zinc-500">Email</span>
              <span className="font-medium text-zinc-900">{user.email}</span>
            </div>

            <div className="flex justify-between px-6 py-5">
              <span className="text-zinc-500">Handle</span>
              <span className="font-medium text-emerald-600">
                @{user.handle}
              </span>
            </div>

          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-10 w-full rounded-2xl border border-red-200 bg-red-50 py-4 font-semibold text-red-600 transition hover:bg-red-100"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  )
}

export default page