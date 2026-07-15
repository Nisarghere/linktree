"use client"
import React, { useState } from 'react'

const EditLink = ({links}) => {
  const [editlink, seteditlink] = useState(null)

  function editHandle(linkId){
  seteditlink(linkId)
    
  }

  function cancelEdit(){
    seteditlink(null)
  }

  return (
    <>
    {
      links.map((link)=>
       <div className="rounded-2xl border border-zinc-200 p-5 overflow-hidden" key={link.id}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" >

                  {editlink === link.id ?( 
<>

            <div className='flex flex-col justify-end' >
              <div>
                     <h3 className="font-semibold">{link.text}</h3>

                <p className="mt-1 text-sm text-zinc-500 break-all">
                  {link.url}
                </p>
              </div>

            </div>

            <div className='flex flex-col  h-30 '>
              <div className='flex flex-col p-3 gap-3'>

              <input 
                value={undefined}
                 onChange={(e)=> e.target.value}
                className="font-semibold border-1 border-blue-400 p-1 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder={link.text}
                type="text" />

                <input
                value={undefined}
                onChange={(e)=> e.target.value}
                placeholder={link.url}
                className="font-semibold border-1 border-blue-400 p-1 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
                type="text" />
 
              </div>
              <div className='flex  justify-end gap-3'>

              <button 
                // onClick={editHandle}
                className="rounded-xl border px-3 py-2  hover:bg-zinc-100">
                  Save
                </button>

                <button 
                onClick={cancelEdit}
                className="rounded-xl bg-black px-3 py-1 text-white hover:bg-zinc-800">
                  Cancel
                </button>
              </div>

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


              