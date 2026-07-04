'use client'
export const dynamic = 'force-dynamic'


import Link from 'next/link';
import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from 'next/navigation'


const Generate = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const [createhandle, setcreatehandle] = useState('')
    const [handle, sethandle] = useState(searchParams.get('handle') || '')
    const [pic, setpic] = useState('')
    const [data, setdata] = useState([])
    const [links, setlinks] = useState([{
        url: "",
        text: ""
    }])

    function Redirecthandle() {
        console.log(createhandle)
        console.log('clicked')
        router.push(`/generate/${createhandle}`)
    }
    function updatelink(index, field, value) {
        const updatedlink = [...links]
        updatedlink[index][field] = value
        setlinks(updatedlink)
    }

    const Addlink = () => {
        const addlink = [...links, {
            url: "",
            text: ""
        }]
        setlinks(addlink)
    }

    const canaddlink = () => {
        return links.every((link) => link.url.trim() !== '' && link.text.trim() !== '')
    }

    const cancreate = () => {
        return (
            handle?.trim() !== "" &&
            pic?.trim() !== "" &&
            links.every(
                (link) => link?.url?.trim() && link?.text?.trim()
            )
        );
    };

    const createtree = async () => {
        const payload = {
            handle,
            pic,
            links
        }
        const resp = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await resp.json()
        setdata(data)
        console.log(data.handle)

        if (data.success) {
            toast.success('linktree created')
            sethandle('')
            setpic('')
            setlinks([{ url: '', text: '' }])
        } else {
            toast.error('linktree not created')
        }
        setcreatehandle(handle)
    }

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

            <div className="flex flex-col justify-center items-center bg-[#225AC0] p-4 md:p-8">              

                <div className="bg-pink-400 p-5 rounded-2xl flex flex-col gap-5 w-full max-w-xl">
                    <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
                        <h2 className="font-bold text-2xl md:text-3xl">
                            Welcome back
                        </h2>

                        <Link
                            href="/"
                            className="px-4 py-1  hover:bg-black bg-black/60 text-white rounded-full w-fit"
                        >
                            /
                        </Link>
                    </div>

                    <p className='text-gray-600'>
                        Create your Linktree
                    </p>

                    <div className='flex justify-between items-center'>

                        <h2 className='font-semibold text-gray-600'>
                            Step 1: Claim Your Handle
                        </h2>

                        {
                            createhandle &&
                            <button
                                onClick={Redirecthandle} className={`px-3 py-2 font-semibold underline rounded-full text-white w-fit bg-black textwhite font-semibold'}`}>
                                @{createhandle}
                            </button>}
                    </div>
                    {
                        !data.handle && (
                            <input
                            value={handle}
                            onChange={(e) => sethandle(e.target.value)}
                            placeholder='Choose a handle'
                            className='bg-white px-5 py-3 rounded-xl w-full focus:outline-pink-400'
                        />
                        )

                    }

                    

                    <h2 className='font-semibold text-gray-600'>
                        Step 2: Add Links
                    </h2>
                    {links.map((link, i) => (
                        <div key={i} className='flex flex-col md:flex-row gap-2'>

                            <input
                                value={link.url}
                                onChange={(e) =>
                                    updatelink(
                                        i,
                                        'url',
                                        e.target.value
                                    )
                                }
                                placeholder='Enter Link'
                                className='bg-white px-3 py-2 rounded-xl w-full focus:outline-pink-400'
                            />

                            <input
                                value={link.text}
                                onChange={(e) =>
                                    updatelink(
                                        i,
                                        'text',
                                        e.target.value
                                    )
                                }
                                placeholder='Enter Link Text'
                                className='bg-white px-3 py-2 rounded-xl focus:outline-pink-400'
                            />

                        </div>
                    ))}



                    <button
                        disabled={!canaddlink()}
                        onClick={Addlink} className={`px-3 py-2 font-semibold rounded-full text-white w-fit ${canaddlink() ? 'bg-blue-600' : 'bg-gray-500'}`}>
                        + Add Link
                    </button>

                    <h2 className='font-semibold text-gray-600'>
                        Step 3: Add Picture
                    </h2>

                    <input
                        value={pic}
                        onChange={(e) => setpic(e.target.value)}
                        placeholder='Picture URL'
                        className="bg-white px-5 py-3 rounded-xl w-full focus:outline-pink-400"
                    />

                    <button
                        disabled={!cancreate()}
                        onClick={createtree}
                        className={`px-4 py-2 rounded-full font-bold text-white w-full md:w-fit mx-auto ${cancreate() ? "bg-black" : "bg-gray-500"}`}>
                        Create your Linktree
                    </button>

                </div>
            </div>

            <div className="hidden md:block h-screen overflow-hidden">
                <img
                    className='w-full h-full object-cover '
                    src='https://linktr.ee/universal-login/assets/banner-login-desktop-D8selsDi.webp'
                    alt='banner'
                />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Generate