"use client"
import React, { useState } from 'react'

const EditLink = ({links}) => {
  const [editlink, seteditlink] = useState(null)

  function editHandle(linkId){
  seteditlink(linkId)
    
  }

  return (
    <>
    {
      links.map((link)=>
       <div className="rounded-2xl border border-zinc-200 p-5" key={link.id}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" >

                  {editlink === link.id ?( <>
                       <div className='flex flex-col' >
                <input 
                value={link.text}
                onChange={(e)=> e.target.value}
                className="font-semibold border-none outline-none appearance-none bg-transparent"
                type="text" />

                <input
                value={link.url}
                onChange={(e)=> e.target.value}

                className="mt-1 text-sm text-zinc-500 break-all border-none outline-none appearance-none bg-transparent"
                type="text" />
 
                
              </div>

              <div className="flex gap-3">

                <button 
                // onClick={editHandle}
                className="rounded-xl border px-4 py-2 hover:bg-zinc-100">
                  Save
                </button>

                <button className="rounded-xl bg-black px-4 py-2 text-white hover:bg-zinc-800">
                  Cancel
                </button>

              </div>

                  </> ) :(
                        <>

              <div >
                <h3 className="font-semibold">{link.text}</h3>

                <p className="mt-1 text-sm text-zinc-500 break-all">
                  {link.url}
                </p>
              </div>

              <div className="flex gap-3">

                <button 
                onClick={()=> editHandle(link.id)}
                className="rounded-xl border px-4 py-2 hover:bg-zinc-100">
                  Edit
                </button>

                <button className="rounded-xl bg-black px-4 py-2 text-white hover:bg-zinc-800">
                  Delete
                </button>

              </div>
                  </>
                  )}
                   
            </div>
            </div>
          


      )
}


    
    
    </>
  )
}

export default EditLink


              