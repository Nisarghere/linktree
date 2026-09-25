import React from 'react'

 const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Link<span className="text-emerald-600">Space</span>
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            One link for everything you are.
          </p>
        </div>

        <div className="flex items-center gap-5 text-sm text-zinc-500">
          <a href="#" className="transition hover:text-zinc-900">
            GitHub
          </a>
          <a href="#" className="transition hover:text-zinc-900">
            LinkedIn
          </a>
          <a href="#" className="transition hover:text-zinc-900">
            About
          </a>
        </div>

        <p className="text-xs text-zinc-400">
          © {new Date().getFullYear()} LinkSpace
        </p>
      </div>
    </footer>
  );
};

export default Footer;


 