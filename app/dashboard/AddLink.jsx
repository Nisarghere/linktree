"use client"

import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';


const AddLink = () => {
    const [Addlink, setAddlink] = useState({
        text: "",
        url: ""
    })

         const sendData = async () => {
             const response = await fetch('/api/links', ({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Addlink),
            }))
            // console.log(response)

            if (response.ok){
            toast("Link has been added")
             } else{
                toast("Somethig went wrong")
            }

        }

 

    return (

        <div>
          
            <section>

                <h2 className="text-xl font-semibold mb-6">
                    Add New Link
                </h2>

                <div className="space-y-4">
                    <input
                        value={Addlink.text}
                        onChange={(e) => setAddlink({ ...Addlink, text: e.target.value })}
                        type="text"
                        placeholder="Link title"
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-zinc-200 focus:outline-none"
                    />
                    <input
                        value={Addlink.url}
                        onChange={(e) => setAddlink({ ...Addlink, url: e.target.value })}
                        type="text"
                        placeholder="https://example.com"
                        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-zinc-200 focus:outline-none"
                    />

                    <button
                    onClick={sendData}
                        className="w-full rounded-2xl bg-black py-3 font-medium text-white transition hover:bg-zinc-800"
                    >
                        + Add Link
                    </button>

                </div>

            </section>

        </div >
    )
}

export default AddLink