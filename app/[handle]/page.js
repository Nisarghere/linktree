import { cookies } from "next/headers";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { getHandle, getLinksByUserId, getUserByHandle } from "@/app/lib/db";

import {
  ArrowLeft,
  ChevronLeft,
  ExternalLink,
  Link2,
  Sparkles,
} from "lucide-react";

import { ChevronRight } from "lucide-react";
import { use } from "react";

 
export default async function Page({ params }) {
  const { handle } = await params;

  

 
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userid = decoded.userId;

 
 
  const userResults = await getUserByHandle(handle)
  console.log(userResults)
  

  if (!userResults){
    return(
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        No profile found for @{handle}
      </div>)
  }



  const links =await getLinksByUserId(userResults.id)

  console.log(links)



  

  if (!links || links.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
         @{handle} has not registered any links.
      </div>
    );
  }

  const profilePic = links[0]?.pic;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#00C16A] via-[#21D07A] to-[#B7F5C6]">
      {/* Decorative Blobs */}
      <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute bottom-0 -right-32 h-105 w-105 rounded-full bg-emerald-900/10 blur-3xl" />

      {/* Back Button */}
      <Link
        href="/"
        className="group absolute left-8 top-8 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-md border border-white/50 transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-500 hover:shadow-xl"
      >
        <ArrowLeft
          size={20}
          className="text-zinc-700 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-white"
        />
      </Link>
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-[32px] bg-white/75 backdrop-blur-2xl border border-white/60 shadow-[0_25px_80px_rgba(0,0,0,.18)] px-8 py-10">
            {/* Profile */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* <Handle /> */}
                <div className={`h-32 w-32 rounded-full flex border-[6px] items-center justify-center  border-white shadow-xl bg-slate-300 `}>
                  <span className='text-3xl font-bold text-white'>

                    {userResults.handle.substring(0,1).toUpperCase()}

                  </span>
                </div>
              </div>

              <h1 className="mt-2 text-xl font-bold text-zinc-900">
                @{userResults.handle}
              </h1>

              <p className="mt-2 text-center text-zinc-500">
                Welcome to my little corner of the internet 🌿
              </p>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-zinc-200" />

            {/* Links */}
            <div className="space-y-4">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-md border border-zinc-100 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl"
                >
                  <span className="font-semibold text-zinc-800 group-hover:text-emerald-600">
                    {link.text}
                  </span>

                  <ExternalLink
                    size={18}
                    className="text-zinc-400 transition group-hover:text-emerald-600 group-hover:rotate-12"
                  />
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-10 text-center">
              <p className="text-xs tracking-wide text-zinc-400">Powered by</p>

              <h2 className="mt-1 text-lg font-bold text-zinc-800">
                LinkTree Doppelganger
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
