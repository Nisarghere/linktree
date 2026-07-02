"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

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


    async function handleLogout(){
        const response = await fetch('/api/logout',({
            method:'POST'
        }))

        if (response.ok){
            router.push('/login')
        }
    }

    return (
        <div className='w-screen min-h-screen flex items-center justify-center bg-[#0f1115] px-4'>
            <div className='relative w-full max-w-sm'>
                {/* ambient glow */}
                <div className='absolute -inset-x-10 -top-10 h-40 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none' />

                <div className='relative bg-[#161922] border border-white/10 rounded-2xl px-8 py-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]'>
                    <div className='flex justify-between'>

                    <span className='text-xs uppercase tracking-[0.2em] text-emerald-400/80'>
                        Account
                    </span>

                    <button  className='text-xs uppercase tracking-[0.2em] cursor-pointer text-emerald-400/80'>
                        Handles
                    </button>
                    </div>

                    <div className='mt-6 flex flex-col items-center text-center'>
                        <div className='h-20 w-20 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center'>
                            <span className='text-2xl font-semibold text-emerald-300'>
                                {initial}
                            </span>
                        </div>

                        <h1 className='mt-5 text-2xl font-semibold text-white tracking-tight'>
                            {user.name}
                        </h1>
                        <p className='mt-1 text-sm text-white/50'>
                            {user.email}
                        </p>
                    </div>

                    <div className='mt-8 h-px bg-white/10' />

                    <button
                        onClick={handleLogout}
                        className='mt-8 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium tracking-wide
                                   hover:bg-red-500/10 hover:border-red-400/30 hover:text-red-300 transition-colors duration-200'
                    >
                        Log out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default page