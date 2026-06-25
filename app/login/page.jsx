"use client"
import React, { useState } from 'react'



export default function LoginPage() {

  

  return (
    <div className="min-h-screen bg-[#E9C91D] flex justify-center pt-20 px-4">
      <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        
        <h1 className="text-2xl font-bold text-[#1B4D2E] mb-6">
          Linktree*
        </h1>

        <h2 className="text-4xl font-bold text-[#1B4D2E]">
          Welcome back
        </h2>

        <p className="text-gray-600 mt-3 mb-8">
          Log in to manage your links and profile.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-[#1B4D2E] mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              className="w-full bg-white border-2 border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#1B4D2E]"
            />
          </div>

          <div>
            <label className="block text-[#1B4D2E] mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-white border-2 border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#1B4D2E]"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-[#1B4D2E] font-medium hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1B4D2E] text-white py-4 rounded-full text-lg font-bold hover:scale-[1.02] transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          Don't have an account?
          <span className="text-[#1B4D2E] font-semibold ml-2 cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}