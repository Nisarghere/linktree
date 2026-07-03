
import { cookies } from "next/headers";
import Link from "next/link";
import jwt from 'jsonwebtoken'
import { getLinksByUserId } from "@/app/lib/db";



export default async function Page({ params }) {
  const { handle } = await params;

  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userid =decoded.userId

  const links = await getLinksByUserId(userid);

  if (!links || links.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        No profile found for @{handle}
      </div>
    );
  }

  const profilePic = links[0]?.pic;

 

  return (


    <div className="min-h-screen bg-linear-to-b from-blue-600 to-blue-800 flex items-center justify-center px-4">
        <Link href="/generate" className=" absolute  top-5 left-5 text-2xl text-black bg-white px-4 py-2 rounded-full hover:scale-105 duration-300 transition">↩</Link>
       
      <div className="w-full max-w-md flex flex-col items-center">

        {/* Profile */}
        <img
          src={profilePic}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
        />

        <h1 className="text-white text-3xl font-bold mt-4">
          @{handle}
        </h1>

        <p className="text-white/80 mt-2 mb-8 text-center">
          Welcome to my Linktree
        </p>

        {/* Links */}
        <div className="w-full flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-800 font-semibold text-center py-4 px-6 rounded-2xl shadow-md hover:scale-105 hover:shadow-xl transition duration-300"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}