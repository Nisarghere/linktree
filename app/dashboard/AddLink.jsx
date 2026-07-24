"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { addLink } from "./actions";

const AddLink = ({ links }) => {
  const [Addlink, setAddlink] = useState({
    text: "",
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const limitReached = links.length >= 5;

  const sendData = async () => {
    if (!Addlink.text.trim() || !Addlink.url.trim()) {
      toast("Text and URL are required");
      return;
    }

    if (limitReached) {
      toast("You have reached the maximum limit of 5 links");
      return;
    }

    try {
      setLoading(true);

      await addLink(Addlink.text, Addlink.url);

      toast("Link has been added");

      setAddlink({
        text: "",
        url: "",
      });

      router.refresh();
    } catch (err) {
      console.error(err);
      toast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" />

      <div>
        {/* Header */}
        <div className="mb-7">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-lg text-white shadow-sm">
              +
            </div>

            <span className="text-xs font-medium text-zinc-400">
              {links.length}/5 links
            </span>
          </div>

          <h2 className="mt-5 text-xl font-semibold tracking-tight text-zinc-950">
            Add New Link
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Add a new destination to your profile.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Link title
            </label>

            <input
              value={Addlink.text}
              onChange={(e) =>
                setAddlink({
                  ...Addlink,
                  text: e.target.value,
                })
              }
              type="text"
              placeholder="My Instagram"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
            />
          </div>

          {/* URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              URL
            </label>

            <input
              value={Addlink.url}
              onChange={(e) =>
                setAddlink({
                  ...Addlink,
                  url: e.target.value,
                })
              }
              type="url"
              placeholder="https://example.com"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
            />
          </div>

          {/* Button */}
          <button
            disabled={limitReached || loading}
            onClick={sendData}
            className="group relative w-full overflow-hidden rounded-2xl bg-zinc-950 py-3.5 font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:shadow-none"
          >
            <span className="relative z-10">
              {loading
                ? "Adding..."
                : limitReached
                  ? "Link Limit Reached"
                  : "Add Link"}
            </span>
          </button>

          {/* Limit message */}
          {limitReached && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-sm font-medium text-amber-800">
                You've reached your 5-link limit.
              </p>

              <p className="mt-1 text-xs text-amber-700">
                Delete an existing link to add a new one.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddLink;
