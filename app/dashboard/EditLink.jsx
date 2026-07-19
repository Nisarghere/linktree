"use client"
import React, { useState } from 'react'
import { deleteLink, updateLink } from './actions'
import { ToastContainer, toast } from 'react-toastify';



const EditLink = ({ links, userid }) => {
  const [editlink, seteditlink] = useState(null)
  const [text, settext] = useState("")
  const [url, seturl] = useState("")

  function editHandle(link) {
    seteditlink(link.id),
    settext(link.text)
    seturl(link.url)

  }

  function cancelEdit() {
    seteditlink(null);
    settext("");
    seturl("");
  }

  async function saveChanges() {
    if (!text.trim() || !url.trim() ){
      
        toast("Title or URL is missing!")
        return

    }

    await updateLink(text, url, editlink, userid);

    toast("Link has been updated!");

    seteditlink(null);
    settext("");
    seturl("");
  }

  async function DeleteLinkfromDb(link){
    await deleteLink(link.id, userid)
    toast("Link has been deleted!")
  }


const getData = async() =>{
  const response = await fetch('/api/links',({
    method:'POST'
  }))
  const data = await  response.json()
  console.log(data)
}

getData()

  return (
    <>
      <ToastContainer />
      {links.map((link) => (
        <div
          key={link.id}
          className={`group rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
      ${editlink === link.id
              ? "border-blue-400 ring-4 ring-blue-100"
              : "border-zinc-200"
            }`}
        >
          {editlink === link.id ? (
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              {/* Current Link */}
              <div className="lg:w-1/3">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Current Link
                </p>

                <h3 className="mt-3 text-xl font-bold text-zinc-900">
                  {link.text}
                </h3>

                <p className="mt-2 break-all text-sm text-zinc-500">
                  {link.url}
                </p>
              </div>

              {/* Edit Form */}
              <div className="flex-1 rounded-2xl bg-zinc-50 p-5">
                <div className="space-y-4">
                  <input
                    value={text}
                    onChange={(e) => settext(e.target.value)}
                    placeholder="Link Title"
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  />

                  <input
                    value={url}
                    onChange={(e) => seturl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={cancelEdit}
                    className="rounded-xl border border-zinc-300 px-5 py-2.5 font-medium text-zinc-600 transition hover:bg-zinc-100"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveChanges}
                    className="rounded-xl bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700 active:scale-95"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Link Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-zinc-900">
                  {link.text}
                </h3>

                <p className="break-all text-sm text-zinc-500">{link.url}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => editHandle(link)}
                  className="rounded-xl border border-zinc-300 px-5 py-2.5 font-medium text-zinc-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                >
                  ✏️ Edit
                </button>

                <button
                onClick={()=> DeleteLinkfromDb(link)}
                className="rounded-xl bg-red-500 px-5 py-2.5 font-medium text-white transition hover:bg-red-600 active:scale-95">
                  🗑 Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default EditLink


