"use client"

import { Camera } from 'lucide-react'
import React, { useState } from 'react'

const Handle = () => {
    const [profilepic, setprofilepic] = useState(null)

    const handlepfp = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setprofilepic(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="relative w-fit">


            {
                !profilepic ?
                    (<div className={`h-32 w-32 rounded-full flex border-[6px] items-center justify-center  border-white shadow-xl bg-slate-300 `}>
                        <span className='text-3xl font-bold text-white'>
                            D
                        </span>
                    </div>) : (
                        <img
                            src={profilepic}
                            alt="Profile"
                            className={`h-32 w-32 rounded-full object-cover border-[2px] object-center border-slate-300 shadow-xl `}
                        />
                    )
            }

            {/* <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white" /> */}

            <label className="absolute bottom-2 right-0 cursor-pointer rounded-full bg-white p-2 shadow-md transition hover:scale-105">
                <Camera size={18} className="text-zinc-700" />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handlepfp}
                    className="hidden"
                />
            </label>
        </div>
    )
}

export default Handle