"use client"
import React, { useState } from 'react'

import { createHandle } from './actions'

const Handle =  () => {
  const [handle, sethandle] = useState("")

  
  
  return (
    <div>
       {/* Claim Handle */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#19352B]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#19352B]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#78927F]" />
                  Your profile
                </div>

                <h2 className="text-xl font-semibold tracking-tight text-[#19352B]">
                  Claim your handle
                </h2>

                <p className="mt-1.5 text-sm leading-6 text-[#647168]">
                  Choose the username people will use to find your profile.
                </p>
              </div>

              {/* Handle Input */}
              <div className="flex w-full max-w-xl flex-col gap-2 sm:flex-row">
                <div className="flex flex-1 items-center overflow-hidden rounded-xl border border-[#C9D3CA] bg-[#FDFCFA] shadow-sm focus-within:border-[#19352B] focus-within:ring-4 focus-within:ring-[#19352B]/5">
                  <span className="whitespace-nowrap pl-4 text-sm font-medium text-[#89958C]">
                    linktree.com/
                  </span>

                  <input
                  value={handle}
                  onChange={(e)=> sethandle(e.target.value)}
                    type="text"
                    placeholder="yourhandle"
                    className="min-w-0 flex-1 bg-transparent px-2 py-3.5 text-sm font-medium text-[#19352B] outline-none placeholder:text-[#A7B0A9]"
                  />
                </div>

                <button className="rounded-xl bg-[#19352B] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#27483A] active:translate-y-0">
                  Claim handle
                </button>
              </div>
            </div>
    </div>
  )
}

export default Handle