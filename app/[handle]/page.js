import Link from "next/link";
import {
  getLinksByUserId,
  getUserByHandle,
} from "@/app/lib/db";

import {
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

import {
  ArrowLeft,
  ExternalLink,
  Link2,
} from "lucide-react";

export default async function Page({ params }) {
  const { handle } = await params;

  // Find user by handle
  const userResults = await getUserByHandle(handle);

  // Profile not found
  if (!userResults) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E8F1EC] px-5">
        <div className="w-full max-w-md rounded-3xl border border-[#D7E4DC] bg-[#F8FAF9] p-8 text-center shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E3EEE7]">
            <Link2
              size={24}
              className="text-[#3F6F58]"
            />
          </div>

          <h1 className="mt-5 text-xl font-semibold text-[#24382D]">
            Profile not found
          </h1>

          <p className="mt-2 text-sm text-[#718078]">
            We couldn't find a profile for @{handle}
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#3F6F58] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#345D49] hover:shadow-lg"
          >
            <ArrowLeft size={16} />
            Go back
          </Link>
        </div>
      </div>
    );
  }

  // Get user's links
  const links = await getLinksByUserId(userResults.id);

  // No links
  if (!links || links.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E8F1EC] px-5">
        <div className="w-full max-w-md rounded-3xl border border-[#D7E4DC] bg-[#F8FAF9] p-8 text-center shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E3EEE7]">
            <Link2
              size={24}
              className="text-[#3F6F58]"
            />
          </div>

          <h1 className="mt-5 text-xl font-semibold text-[#24382D]">
            No links yet
          </h1>

          <p className="mt-2 text-sm text-[#718078]">
            @{handle} hasn't added any links yet.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#3F6F58] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#345D49] hover:shadow-lg"
          >
            <ArrowLeft size={16} />
            Go back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#E8F1EC]">

      {/* Background Decorations */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-white/50 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#B8D5C2]/40 blur-3xl" />

      {/* Back Button */}

      <Link
        href="/"
        className="group fixed left-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/70 text-[#52685B] shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-x-1 hover:bg-white hover:text-[#3F6F58] hover:shadow-lg sm:left-8 sm:top-8"
      >
        <ArrowLeft
          size={19}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
      </Link>

      {/* Main Content */}

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:px-6">

        {/* Profile Container */}

        <div className="w-full max-w-lg">

          {/* Main Card */}

          <div className="rounded-[2rem] border border-white/80 bg-[#F8FAF9] p-6 shadow-[0_20px_60px_rgba(63,111,88,0.12)] sm:p-8">

            {/* Profile Section */}

            <div className="flex flex-col items-center">

              {/* Avatar */}

              <div className="relative">

                <div className="absolute inset-0 rounded-full bg-[#B8D5C2] blur-xl opacity-60" />

                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#B8D5C2] shadow-md sm:h-28 sm:w-28">

                  <span className="text-3xl font-bold text-white sm:text-4xl">
                    {userResults.handle
                      .substring(0, 1)
                      .toUpperCase()}
                  </span>

                </div>

              </div>

              {/* Username */}

              <h1 className="mt-4 text-xl font-bold tracking-tight text-[#24382D] sm:text-2xl">
                @{userResults.handle}
              </h1>

              {/* Bio */}

              <p className="mt-2 text-center text-sm text-[#718078] sm:text-base">
                Welcome to my little corner of the internet 🌿
              </p>

            </div>

            {/* Links */}

            <div className="mt-7 space-y-3">

              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-14 items-center justify-between rounded-2xl border border-[#E2EBE5] bg-white px-4 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#B8D5C2] hover:shadow-[0_8px_25px_rgba(63,111,88,0.10)] sm:px-5"
                >

                  {/* Left Side */}

                  <div className="flex min-w-0 items-center gap-3">

                    {/* Link Icon */}

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F1EC] text-[#3F6F58] transition-all duration-300 group-hover:bg-[#3F6F58] group-hover:text-white">
                      <Link2 size={17} />
                    </div>

                    {/* Link Text */}

                    <span className="truncate text-sm font-semibold text-[#34483C] transition-colors duration-300 group-hover:text-[#3F6F58] sm:text-base">
                      {link.text}
                    </span>

                  </div>

                  {/* External Link */}

                  <ExternalLink
                    size={17}
                    className="ml-3 shrink-0 text-[#A0AEA5] transition-all duration-300 group-hover:rotate-12 group-hover:text-[#3F6F58]"
                  />

                </a>
              ))}

            </div>

            {/* Social Icons */}

            <div className="mt-7 border-t border-[#E2EBE5] pt-6">

              <div className="flex items-center justify-center gap-5">

                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-[#718078] transition-all duration-300 hover:-translate-y-1 hover:text-[#C45B78]"
                >
                  <FaInstagram size={19} />
                </a>

                <a
                  href="#"
                  aria-label="YouTube"
                  className="text-[#718078] transition-all duration-300 hover:-translate-y-1 hover:text-[#D94A4A]"
                >
                  <FaYoutube size={19} />
                </a>

                <a
                  href="#"
                  aria-label="GitHub"
                  className="text-[#718078] transition-all duration-300 hover:-translate-y-1 hover:text-[#24382D]"
                >
                  <FaGithub size={19} />
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-[#718078] transition-all duration-300 hover:-translate-y-1 hover:text-[#3976A8]"
                >
                  <FaLinkedin size={19} />
                </a>

                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-[#718078] transition-all duration-300 hover:-translate-y-1 hover:text-[#24382D]"
                >
                  <FaTwitter size={19} />
                </a>

              </div>

            </div>

          </div>

          {/* Footer */}

          <p className="mt-5 text-center text-xs text-[#819088]">
            Made with LinkTree
          </p>

        </div>

      </main>

    </div>
  );
}