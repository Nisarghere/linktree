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
        return links.every(
            (link) =>
                link.url.trim() !== '' &&
                link.text.trim() !== ''
        ) && links.length < 5
    }

    const cancreate = () => {
        return (
            handle?.trim() !== "" &&
            pic?.trim() !== "" &&
            links.every(
                (link) =>
                    link?.url?.trim() &&
                    link?.text?.trim()
            )
        );
    }

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
            <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#e9e8f5]">

                {/* LEFT - FORM */}
                <div className="flex items-center justify-center p-4 sm:p-6 md:p-10">

                    <div className="w-full max-w-2xl">

                        {/* Header */}
                        <div className="mb-6 flex items-center justify-between">

                            <div>
                                <p className="text-sm font-semibold text-[#6d67a5] mb-1">
                                    Create your page
                                </p>

                                <h1 className="text-3xl md:text-4xl font-bold text-[#29264a]">
                                    Build your Linktree
                                </h1>
                            </div>

                            <Link
                                href="/"
                                className="
                                    flex h-10 w-10 items-center justify-center
                                    rounded-full
                                    bg-[#f8f7fc]
                                    text-[#45406f]
                                    shadow-sm
                                    border border-[#dedcf0]
                                    hover:bg-[#45406f]
                                    hover:text-white
                                    transition
                                "
                            >
                                ←
                            </Link>

                        </div>

                        <p className="text-[#716e91] mb-8">
                            Add your handle, links and profile picture to get started.
                        </p>


                        {/* FORM CARD */}
                        <div
                            className="
                                bg-[#fdfcff]
                                border border-[#dedcf0]
                                rounded-3xl
                                shadow-[0_15px_45px_rgba(55,48,110,0.12)]
                                p-5 sm:p-7 md:p-8
                                space-y-8
                            "
                        >

                            {/* STEP 1 */}
                            <div>

                                <div className="flex items-start gap-4 mb-5">

                                    <div
                                        className="
                                            flex h-9 w-9 shrink-0
                                            items-center justify-center
                                            rounded-full
                                            bg-[#514b91]
                                            text-white
                                            font-bold
                                            shadow-sm
                                        "
                                    >
                                        1
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-lg text-[#29264a]">
                                            Claim your handle
                                        </h2>

                                        <p className="text-sm text-[#85819f] mt-1">
                                            Choose the username people will use to find you.
                                        </p>
                                    </div>

                                </div>


                                {!data.handle ? (

                                    <div
                                        className="
                                            flex items-center
                                            bg-[#f4f2fb]
                                            border border-[#dddaf0]
                                            rounded-2xl
                                            overflow-hidden
                                            focus-within:border-[#6b64b1]
                                            focus-within:ring-2
                                            focus-within:ring-[#6b64b1]/10
                                            transition
                                        "
                                    >

                                        <span className="px-4 text-[#817ca3] font-semibold">
                                            @
                                        </span>

                                        <input
                                            value={handle}
                                            onChange={(e) => sethandle(e.target.value)}
                                            placeholder="yourhandle"
                                            className="
                                                bg-transparent
                                                px-2 py-4
                                                w-full
                                                focus:outline-none
                                                text-[#29264a]
                                                placeholder:text-[#aaa7bd]
                                            "
                                        />

                                    </div>

                                ) : (

                                    <button
                                        onClick={Redirecthandle}
                                        className="
                                            flex items-center gap-2
                                            px-5 py-3
                                            rounded-full
                                            bg-[#e6e3f5]
                                            text-[#45406f]
                                            font-semibold
                                            hover:bg-[#d9d5ed]
                                            transition
                                        "
                                    >
                                        <span className="text-[#716ba5]">
                                            @
                                        </span>

                                        {createhandle}

                                        <span className="ml-2">
                                            ↗
                                        </span>
                                    </button>

                                )}

                            </div>


                            {/* DIVIDER */}
                            <div className="h-px bg-[#ebe9f4]" />


                            {/* STEP 2 */}
                            <div>

                                <div className="flex items-start gap-4 mb-5">

                                    <div
                                        className="
                                            flex h-9 w-9 shrink-0
                                            items-center justify-center
                                            rounded-full
                                            bg-[#514b91]
                                            text-white
                                            font-bold
                                            shadow-sm
                                        "
                                    >
                                        2
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-lg text-[#29264a]">
                                            Add your links
                                        </h2>

                                        <p className="text-sm text-[#85819f] mt-1">
                                            Add the websites and social profiles you want to share.
                                        </p>
                                    </div>

                                </div>


                                <div className="space-y-3">

                                    {links.map((link, i) => (

                                        <div
                                            key={i}
                                            className="
                                                group
                                                bg-[#f7f6fc]
                                                border border-[#e3e0f0]
                                                rounded-2xl
                                                p-3
                                                transition
                                                focus-within:border-[#6b64b1]
                                                focus-within:ring-2
                                                focus-within:ring-[#6b64b1]/10
                                            "
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
                                                    className="
                                                        bg-[#fdfcff]
                                                        border border-[#e3e0f0]
                                                        px-4 py-3
                                                        rounded-xl
                                                        w-full
                                                        text-sm
                                                        text-[#29264a]
                                                        placeholder:text-[#aaa7bd]
                                                        focus:outline-none
                                                        focus:border-[#6b64b1]
                                                    "
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
                                                    className="
                                                        bg-[#fdfcff]
                                                        border border-[#e3e0f0]
                                                        px-4 py-3
                                                        rounded-xl
                                                        w-full
                                                        text-sm
                                                        text-[#29264a]
                                                        placeholder:text-[#aaa7bd]
                                                        focus:outline-none
                                                        focus:border-[#6b64b1]
                                                    "
                                                />

                                            </div>

                                        </div>

                                    ))}

                                </div>


                                <button
                                    disabled={!canaddlink()}
                                    onClick={Addlink}
                                    className={`
                                        mt-4
                                        px-5 py-3
                                        rounded-full
                                        font-semibold
                                        text-sm
                                        transition
                                        ${
                                            canaddlink()
                                                ? "bg-[#e6e3f5] text-[#514b91] hover:bg-[#d9d5ed]"
                                                : "bg-[#eeedf3] text-[#aaa8b6] cursor-not-allowed"
                                        }
                                    `}
                                >
                                    + Add another link
                                </button>

                            </div>


                            {/* DIVIDER */}
                            <div className="h-px bg-[#ebe9f4]" />


                            {/* STEP 3 */}
                            <div>

                                <div className="flex items-start gap-4 mb-5">

                                    <div
                                        className="
                                            flex h-9 w-9 shrink-0
                                            items-center justify-center
                                            rounded-full
                                            bg-[#514b91]
                                            text-white
                                            font-bold
                                            shadow-sm
                                        "
                                    >
                                        3
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-lg text-[#29264a]">
                                            Add your profile picture
                                        </h2>

                                        <p className="text-sm text-[#85819f] mt-1">
                                            Give your Linktree a face people can recognize.
                                        </p>
                                    </div>

                                </div>


                                <input
                                    value={pic}
                                    onChange={(e) => setpic(e.target.value)}
                                    placeholder="https://example.com/profile.jpg"
                                    className="
                                        bg-[#f7f6fc]
                                        border border-[#e3e0f0]
                                        px-4 py-4
                                        rounded-2xl
                                        w-full
                                        text-sm
                                        text-[#29264a]
                                        placeholder:text-[#aaa7bd]
                                        focus:outline-none
                                        focus:border-[#6b64b1]
                                        focus:ring-2
                                        focus:ring-[#6b64b1]/10
                                    "
                                />

                            </div>


                            {/* CREATE BUTTON */}
                            <button
                                disabled={!cancreate()}
                                onClick={createtree}
                                className={`
                                    w-full
                                    py-4
                                    rounded-2xl
                                    font-bold
                                    text-base
                                    transition
                                    ${
                                        cancreate()
                                            ? "bg-[#514b91] text-white hover:bg-[#45407d] shadow-lg shadow-[#514b91]/20"
                                            : "bg-[#e8e7ed] text-[#aaa8b3] cursor-not-allowed"
                                    }
                                `}
                            >
                                Create your Linktree
                            </button>

                        </div>


                        {/* FOOTER */}
                        <p className="text-center text-xs text-[#85819f] mt-5">
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

                        {/* Quote / Branding */}
                        <div
                            className="
                                absolute bottom-8 left-8 right-8
                                bg-[#fdfcff]/90
                                backdrop-blur-md
                                border border-white/40
                                rounded-2xl
                                p-5
                                shadow-lg
                            "
                        >

                            <p className="text-lg font-bold text-[#29264a]">
                                One link. Everything you are.
                            </p>

                            <p className="text-sm text-[#716e91] mt-1">
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
        </>
    )
}

export default Generate
 