"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

const HandleCard = ({ handle }) => {
  const [newHandle, setNewHandle] = useState("");
  const [loading, setLoading] = useState(false);

  async function claimHandle() {
    if (!newHandle.trim()) {
      toast("Please enter a handle");
      return;
    }

    try {
      setLoading(true);

      // We will connect your claim-handle API/action here
      console.log("Claiming handle:", newHandle);

      toast("Handle claimed successfully!");
    } catch (error) {
      console.error(error);
      toast("Failed to claim handle");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-7">
      {handle ? (
        /* ================= HANDLE EXISTS ================= */

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-lg font-semibold text-white">
              @
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Your profile
              </p>

              <h2 className="mt-1 truncate text-lg font-semibold text-zinc-950">
                yoursite.com/{handle}
              </h2>
            </div>
          </div>

          <button
            onClick={() => navigator.clipboard.writeText(`yoursite.com/${handle}`)}
            className="shrink-0 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm active:scale-95"
          >
            Copy Link
          </button>
        </div>
      ) : (
        /* ================= CLAIM HANDLE ================= */

        <div>
          {/* Header */}
          <div className="mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-lg font-semibold text-white">
              @
            </div>

            <h2 className="mt-5 text-xl font-semibold tracking-tight text-zinc-950">
              Claim your handle
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
              Choose a unique handle for your profile. This will be the link
              people use to find your page.
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex min-w-0 flex-1 items-center overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 transition-all duration-200 focus-within:border-zinc-900 focus-within:bg-white focus-within:ring-4 focus-within:ring-zinc-900/5">
              <span className="shrink-0 pl-4 text-sm text-zinc-400">
                yoursite.com/
              </span>

              <input
                value={newHandle}
                onChange={(e) => setNewHandle(e.target.value)}
                type="text"
                placeholder="yourname"
                className="min-w-0 w-full bg-transparent px-2 py-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
              />
            </div>

            <button
              onClick={claimHandle}
              disabled={!newHandle.trim() || loading}
              className="shrink-0 rounded-2xl bg-zinc-950 px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:shadow-none"
            >
              {loading ? "Claiming..." : "Claim Handle"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HandleCard;