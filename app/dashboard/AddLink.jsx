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

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#19352B] text-xl font-light text-white shadow-sm">
              +
            </div>

            <span className="rounded-full bg-[#F5F3ED] px-3 py-1.5 text-xs font-semibold text-[#718077]">
              {links.length}/5 links
            </span>

          </div>

          <h2 className="mt-6 text-xl font-semibold tracking-tight text-[#19352B]">
            Add New Link
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#78837B]">
            Add a new destination to your profile.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#3E4B43]">
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
              className="w-full rounded-xl border border-[#DDE1DB] bg-[#F7F8F5] px-4 py-3.5 text-sm text-[#19352B] outline-none transition-all duration-200 placeholder:text-[#A2AAA3] hover:border-[#C8D0C8] focus:border-[#78927F] focus:bg-white focus:ring-4 focus:ring-[#78927F]/10"
            />
          </div>

          {/* URL */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#3E4B43]">
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
              className="w-full rounded-xl border border-[#DDE1DB] bg-[#F7F8F5] px-4 py-3.5 text-sm text-[#19352B] outline-none transition-all duration-200 placeholder:text-[#A2AAA3] hover:border-[#C8D0C8] focus:border-[#78927F] focus:bg-white focus:ring-4 focus:ring-[#78927F]/10"
            />
          </div>

          {/* Button */}
          <button
            disabled={limitReached || loading}
            onClick={sendData}
            className="w-full rounded-xl bg-[#19352B] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#27483A] hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-[#E1E5E0] disabled:text-[#9AA39C] disabled:shadow-none"
          >
            {loading
              ? "Adding..."
              : limitReached
                ? "Link Limit Reached"
                : "Add Link"}
          </button>

          {/* Limit */}
          {limitReached && (
            <div className="rounded-xl border border-[#E8CFC1] bg-[#FBF0E9] px-4 py-3">
              <p className="text-sm font-semibold text-[#895A43]">
                You've reached your 5-link limit.
              </p>

              <p className="mt-1 text-xs text-[#9A705A]">
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