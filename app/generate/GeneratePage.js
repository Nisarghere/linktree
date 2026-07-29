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
        router.push(`/generate/${createhandle.toLowerCase()}`)
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
        return links.every((link) => link.url.trim() !== '' && link.text.trim() !== '') && links.length < 5
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
        console.log(data)

        if (data.success) {
            toast.success('linktree created')
            sethandle('')
            setcreatehandle(handle)
            setpic('')
            setlinks([{ url: '', text: '' }])
        } else {
            toast.error('linktree not created')
        }
    }

    return (
        <>
        ```jsx
<div className="min-h-screen bg-[#eef2e8] grid grid-cols-1 md:grid-cols-2">

    {/* LEFT - FORM */}
    <div className="flex items-center justify-center p-4 sm:p-6 md:p-10">

        <div className="w-full max-w-2xl">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-[#71806a] mb-1">
                        Create your page
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#263326]">
                        Build your Linktree
                    </h1>
                </div>

                <Link
                    href="/"
                    className="flex h-10 w-10 items-center justify-center rounded-full
                    bg-white text-[#263326] shadow-sm
                    hover:bg-[#263326] hover:text-white transition"
                >
                    ←
                </Link>
            </div>

            <p className="text-[#71806a] mb-8">
                Add your handle, links and profile picture to get started.
            </p>


            {/* FORM CARD */}
            <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(38,51,38,0.08)] p-5 sm:p-7 md:p-8 space-y-8">


                {/* STEP 1 */}
                <div>

                    <div className="flex items-start gap-4 mb-5">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center
                            rounded-full bg-[#263326] text-white font-bold">
                            1
                        </div>

                        <div>
                            <h2 className="font-bold text-lg text-[#263326]">
                                Claim your handle
                            </h2>

                            <p className="text-sm text-[#8a9685] mt-1">
                                Choose the username people will use to find you.
                            </p>
                        </div>

                    </div>


                    {!data.handle ? (

                        <div className="flex items-center bg-[#f4f6f1] border border-[#dce3d7]
                            rounded-2xl overflow-hidden focus-within:border-[#263326] transition">

                            <span className="px-4 text-[#8a9685] font-medium">
                                @
                            </span>

                            <input
                                value={handle}
                                onChange={(e) => sethandle(e.target.value)}
                                placeholder="yourhandle"
                                className="bg-transparent px-2 py-4 w-full
                                focus:outline-none text-[#263326]"
                            />

                        </div>

                    ) : (

                        <button
                            onClick={Redirecthandle}
                            className="flex items-center gap-2 px-5 py-3
                            rounded-full bg-[#e7eee2] text-[#263326]
                            font-semibold hover:bg-[#dce7d6] transition"
                        >
                            <span className="text-[#71806a]">@</span>
                            {createhandle}
                            <span className="ml-2">↗</span>
                        </button>

                    )}

                </div>


                {/* DIVIDER */}
                <div className="h-px bg-[#edf0eb]" />


                {/* STEP 2 */}
                <div>

                    <div className="flex items-start gap-4 mb-5">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center
                            rounded-full bg-[#263326] text-white font-bold">
                            2
                        </div>

                        <div>
                            <h2 className="font-bold text-lg text-[#263326]">
                                Add your links
                            </h2>

                            <p className="text-sm text-[#8a9685] mt-1">
                                Add the websites and social profiles you want to share.
                            </p>
                        </div>

                    </div>


                    <div className="space-y-3">

                        {links.map((link, i) => (

                            <div
                                key={i}
                                className="group bg-[#f7f8f5] border border-[#e5e9e1]
                                rounded-2xl p-3 transition
                                focus-within:border-[#263326]"
                            >

                                <div className="flex flex-col sm:flex-row gap-3">

                                    <input
                                        value={link.text}
                                        onChange={(e) =>
                                            updatelink(
                                                i,
                                                "text",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Link title"
                                        className="bg-white border border-[#e5e9e1]
                                        px-4 py-3 rounded-xl w-full
                                        text-sm text-[#263326]
                                        focus:outline-none focus:border-[#263326]"
                                    />

                                    <input
                                        value={link.url}
                                        onChange={(e) =>
                                            updatelink(
                                                i,
                                                "url",
                                                e.target.value
                                            )
                                        }
                                        placeholder="https://example.com"
                                        className="bg-white border border-[#e5e9e1]
                                        px-4 py-3 rounded-xl w-full
                                        text-sm text-[#263326]
                                        focus:outline-none focus:border-[#263326]"
                                    />

                                </div>

                            </div>

                        ))}

                    </div>


                    <button
                        disabled={!canaddlink()}
                        onClick={Addlink}
                        className={`mt-4 px-5 py-3 rounded-full
                        font-semibold text-sm transition
                        ${
                            canaddlink()
                                ? "bg-[#e7eee2] text-[#263326] hover:bg-[#dce7d6]"
                                : "bg-[#f0f1ef] text-[#a4aca0] cursor-not-allowed"
                        }`}
                    >
                        + Add another link
                    </button>

                </div>


                {/* DIVIDER */}
                <div className="h-px bg-[#edf0eb]" />


                {/* STEP 3 */}
                <div>

                    <div className="flex items-start gap-4 mb-5">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center
                            rounded-full bg-[#263326] text-white font-bold">
                            3
                        </div>

                        <div>
                            <h2 className="font-bold text-lg text-[#263326]">
                                Add your profile picture
                            </h2>

                            <p className="text-sm text-[#8a9685] mt-1">
                                Give your Linktree a face people can recognize.
                            </p>
                        </div>

                    </div>


                    <input
                        value={pic}
                        onChange={(e) => setpic(e.target.value)}
                        placeholder="https://example.com/profile.jpg"
                        className="bg-[#f7f8f5] border border-[#e5e9e1]
                        px-4 py-4 rounded-2xl w-full
                        text-sm text-[#263326]
                        focus:outline-none focus:border-[#263326]"
                    />

                </div>


                {/* CREATE BUTTON */}
                <button
                    disabled={!cancreate()}
                    onClick={createtree}
                    className={`w-full py-4 rounded-2xl
                    font-bold text-base transition
                    ${
                        cancreate()
                            ? "bg-[#263326] text-white hover:bg-[#354635] shadow-lg shadow-[#263326]/10"
                            : "bg-[#e4e7e2] text-[#a1a9a0] cursor-not-allowed"
                    }`}
                >
                    Create your Linktree
                </button>

            </div>


            {/* FOOTER */}
            <p className="text-center text-xs text-[#8a9685] mt-5">
                You can edit your links and profile anytime.
            </p>

        </div>

    </div>


    {/* RIGHT - IMAGE */}
    <div className="hidden md:block h-screen sticky top-0 p-4">

        <div className="relative h-full w-full overflow-hidden rounded-[2rem]">

            <img
                className="w-full h-full object-cover"
                src="https://linktr.ee/universal-login/assets/banner-login-desktop-D8selsDi.webp"
                alt="Create your Linktree"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Optional quote / branding */}
            <div className="absolute bottom-8 left-8 right-8
                bg-white/90 backdrop-blur-md
                rounded-2xl p-5">

                <p className="text-lg font-bold text-[#263326]">
                    One link. Everything you are.
                </p>

                <p className="text-sm text-[#71806a] mt-1">
                    Share your world with everyone, in one place.
                </p>

            </div>

        </div>

    </div>


    {/* TOAST */}
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
```

        </>
       
    )
}

export default Generate