"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [menuOpen, setMenuOpen] = useState(false); // desktop avatar dropdown
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const menuRef = useRef(null);
  const router = useRouter();

  // Fetch the current profile once on mount.
  useEffect(() => {
    let cancelled = false;

    async function fetchProfile() {
      try {
        const result = await fetch("/api/profile");
        const resp = await result.json();

        if (cancelled) return;

        if (result.ok) {
          setUser(resp);
          setName(resp.name);
          setHandle(resp.handle);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoadingUser(false);
      }
    }

    fetchProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  // Close the mobile menu whenever auth state changes underneath it
  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  // Close desktop dropdown on outside click / Escape
  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    function onEscape(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function handleLogout() {
    try {
      const result = await fetch("/api/logout", { method: "POST" });
      if (!result.ok) {
        console.error("Logout failed with status", result.status);
        return;
      }
    } catch (err) {
      console.error("Logout request failed:", err);
      return;
    }
    setUser(null);
    setName("");
    setHandle("");
    setMenuOpen(false);
    setIsOpen(false);
    router.push("/login");
    router.refresh();
  }

  return (
    <nav
      aria-label="Main"
      className="
        fixed top-5 left-1/2 w-[92vw] max-w-7xl -translate-x-1/2 z-50
        rounded-full border border-white/40 bg-white/80 backdrop-blur-xl
        shadow-[0_12px_40px_rgba(0,0,0,0.08)] px-5 py-3
      "
    >
      <div className="flex h-11 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <img
            loading="eager"
            src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg"
            alt="Logo"
            className="h-7 transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="
                  rounded-full px-4 py-2 text-sm font-medium text-zinc-600
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:bg-zinc-100 hover:text-black
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400
                "
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          {loadingUser ? (
            <div className="h-11 w-11 animate-pulse rounded-full bg-zinc-200" />
          ) : !user ? (
            <>
              <Link
                href="/login"
                className="
                  group relative overflow-hidden rounded-full border border-zinc-200
                  bg-white/90 px-5 py-2.5 text-sm font-semibold text-zinc-700
                  shadow-sm backdrop-blur-md transition-all duration-300
                  hover:-translate-y-1 hover:border-zinc-300 hover:bg-white hover:shadow-xl
                  active:scale-95
                "
              >
                <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-zinc-100 to-transparent transition-transform duration-700 group-hover:translate-x-[180%]" />
                <span className="relative flex items-center gap-2">
                  Log in
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="/signup"
                className="
                  group relative inline-flex items-center justify-center overflow-hidden
                  rounded-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-black
                  px-6 py-2.5 text-sm font-semibold text-white shadow-xl shadow-zinc-900/25
                  transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]
                  hover:shadow-2xl hover:shadow-zinc-900/40 active:scale-95
                "
              >
                <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[180%]" />
                <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-2">
                  Sign up free
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" wide />
                </span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* Avatar dropdown — click-based, so it works on touch/desktop alike */}
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                  className="
                    flex h-11 w-11 items-center justify-center rounded-full
                    bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-lg
                    transition-transform duration-300 hover:scale-105
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                  "
                >
                  <UserIcon className="h-5 w-5" />
                </button>

                {menuOpen && (
                  <div
                    role="menu"
                    className="
                      absolute right-0 top-full mt-2 min-w-48 overflow-hidden
                      rounded-2xl border border-zinc-200 bg-white shadow-xl
                    "
                  >
                    <div className="border-b border-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-800">
                      {name}
                    </div>
                    <Link
                      href={handle ? `/${handle}` : "/profile"}
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-sky-600 hover:bg-zinc-50"
                    >
                      {handle ? `@${handle}` : "Set up your handle"}
                    </Link>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="
                  group relative inline-flex items-center justify-center overflow-hidden
                  rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600
                  px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25
                  transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]
                  hover:shadow-2xl hover:shadow-red-500/40 active:translate-y-0 active:scale-95
                "
              >
                <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[180%]" />
                <span className="absolute inset-0 rounded-full bg-red-400/40 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-2">
                  <LogoutIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                  Log out
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Hamburger (mobile only) */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className={`block h-0.5 w-6 bg-black transition-all duration-300 ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-black transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-black transition-all duration-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 top-full mt-2 w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-lg md:hidden"
        >
          {user && (
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-zinc-50 px-3 py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 text-white">
                <UserIcon className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-zinc-800">{name}</p>
                {handle && <p className="text-xs font-medium text-sky-600">@{handle}</p>}
              </div>
            </div>
          )}

          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-2 font-medium text-zinc-700 hover:bg-gray-100"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="w-full rounded-lg bg-gray-100 py-2 text-center font-semibold"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="w-full rounded-full bg-black py-2 text-center font-semibold text-white"
                >
                  Sign up free
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600 py-2 text-center font-semibold text-white"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

function ArrowIcon({ className, wide }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      {wide ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 12h15" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      )}
    </svg>
  );
}

function UserIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

function LogoutIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H9m4 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1" />
    </svg>
  );
}

export default Navbar;