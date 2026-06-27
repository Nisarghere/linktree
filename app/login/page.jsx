"use client"
import React, { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // function async senData(e){
  //   e.preventDefault()
  //   const response= await fetch('/api/login',({
  //     method:'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password
  //       })
  //   }))
  // }

  return (
    <div className="min-h-screen bg-[#E9C91D] flex justify-center items-center px-4">
      
      <div className='w-full max-w-md bg-white rounded-3xl px-6 py-8 shadow-md'>

        {/* Logo */}
        <div className='flex justify-end mb-4'>
          <img
            loading="eager"
            src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg"
            alt="logo"
            className='h-6 w-auto'
          />
        </div>

        {/* Heading */}
        <h1 className='text-2xl font-bold text-red-600 mb-6'>Welcome Back</h1>

        {/* Form */}
        <div className='flex flex-col gap-4'>
          
          <div className='flex flex-col gap-1'>
            <label className='font-semibold text-green-700 text-base'>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email'
              type="email"
              className='rounded-lg border-2 border-blue-300 bg-white px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='font-semibold text-green-700 text-base'>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
              type="password"
              className='rounded-lg border-2 border-blue-300 bg-white px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>

          <button  className='bg-red-500 px-4 py-3 rounded-lg w-full mt-4 cursor-pointer text-yellow-200 hover:text-yellow-500 font-semibold text-lg hover:bg-red-700 transition'>
            Log in
          </button>

          <p className='text-center text-sm text-gray-500 mt-2'>
            Don't have an account?{' '}
            <Link href='/signup' className='text-red-500 font-semibold hover:underline'>
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}