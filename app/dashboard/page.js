import React from 'react'

const page = () => {
  
  return (
    <>
  <div className="min-h-screen bg-zinc-100">
  <div className="mx-auto max-w-7xl px-6 py-10">

    <h1 className="text-3xl font-bold mb-8">
      Dashboard
    </h1>

    <div className="grid gap-8 lg:grid-cols-3">

      {/* Profile */}
<section className="rounded-3xl bg-white p-8 shadow">
      
    <div className="flex justify-center">
          <img
            src="https://i.pravatar.cc/200"
            alt="Profile"
            className="h-28 w-28 rounded-full object-cover shadow-md"
          />
        </div>
          <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold text-zinc-900">
            Alex Carter
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            @alexcarter
          </p>
        </div>
        <button className='bg-black transition hover:bg-zinc-800 px-5 py-3 mt-5   w-full rounded-lg text-sm text-white font-bold '>Edit Profile</button>

        
        
</section>

      {/* Add Link */}
      <section className="lg:col-span-2 rounded-3xl bg-white p-8 shadow">

          <h1 className='text-xl bg-black w-fit px-4 py-2 rounded-full text-white  '>
            + Add Links
          </h1>
        <div className='flex mt-4 gap-3 '>

<input
  type="text"
  placeholder="Enter URL"
  className="
    w-full
    rounded-2xl
    border border-zinc-100
    bg-zinc-50
    px-4 py-3
    text-sm
    placeholder:text-zinc-400
    transition
    focus:bg-white
    focus:border-zinc-300
    focus:ring-2
    focus:ring-zinc-200
    focus:outline-none
  "
/>         
<input
  type="text"
  placeholder="Enter Text"
  className="
    w-full
    rounded-2xl
    border border-zinc-100
    bg-zinc-50
    px-4 py-3
    text-sm
    placeholder:text-zinc-400
    transition
    focus:bg-white
    focus:border-zinc-300
    focus:ring-2
    focus:ring-zinc-200
    focus:outline-none
  "
/>         
 
        </div>
        <div className='flex justify-center'>
          <button className=' mt-6 bg-black text-white cursor-pointer hover:bg-black/80 text-xl font-bold  rounded-full h-10 w-10 '> + </button>
        </div>

        <div className='bg-zinc-100 rounded-lg w-full h-40 mt-6'>
          <h2 className='text-center'>Your LinkTree </h2>
           <div className="bg-zinc-400 m-5 rounded-full">
              <div className="mx-auto w-full px-6 py-4 flex justify-between items-center">
                <p className='bg-yellow-400 px-10 py-2 rounded-full'> Linkdin </p>
                <p>https://www.linkedin.com/company/sarkilar</p>
                <div className='flex gap-4'>

                <button className='bg-red-400 text-white rounded-lg p-2'>Edit Link</button>
                <button className='bg-black text-white rounded-lg p-3'>Delete link</button>
                </div>

            </div>

          </div>
           

        </div>

      </section>

    </div>

  </div>
</div>
    </>
  )
}

export default page