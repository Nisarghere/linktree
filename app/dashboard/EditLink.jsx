"use client";

import React, { useState } from "react";
import { deleteLink, updateLink } from "./actions";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EditLink = ({ links, userid }) => {
  const [editingLink, setEditingLink] = useState(null);

  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const router = useRouter();

  function editHandle(link) {
    setEditingLink(link);
    setText(link.text);
    setUrl(link.url);
  }

  function cancelEdit() {
    setEditingLink(null);
    setText("");
    setUrl("");
  }

  async function saveChanges() {
    if (!text.trim() || !url.trim()) {
      toast("Title or URL is missing!");
      return;
    }

    if (
      editingLink &&
      text.trim() === editingLink.text &&
      url.trim() === editingLink.url
    ) {
      cancelEdit();
      return;
    }

    try {
      setLoading(true);

      await updateLink(text, url, editingLink.id, userid);

      toast("Link has been updated!");

      cancelEdit();

      router.refresh();
    } catch (error) {
      console.error(error);
      toast("Failed to update link");
    } finally {
      setLoading(false);
    }
  }

  async function DeleteLinkfromDb(link) {
    try {
      setDeletingId(link.id);

      await deleteLink(link.id, userid);

      toast("Link has been deleted!");

      router.refresh();
    } catch (error) {
      console.error(error);
      toast("Failed to delete link");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <ToastContainer position="bottom-right" />

      <div className="space-y-3">

        {links.map((link, index) => (

          <div
            key={link.id}
            className={`rounded-2xl border bg-[#FDFCFA] p-4 transition-all duration-300 ${
              editingLink?.id === link.id
                ? "border-[#78927F] shadow-md shadow-[#19352B]/5"
                : "border-[#E0E3DE] hover:-translate-y-0.5 hover:border-[#C8D1C9] hover:shadow-sm"
            }`}
          >

            {editingLink?.id === link.id ? (

              /* ================= EDIT MODE ================= */

              <div>

                <div className="mb-6 flex items-center justify-between">

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#78927F]">
                      Editing link
                    </p>

                    <h3 className="mt-1 font-semibold text-[#19352B]">
                      Update your link
                    </h3>
                  </div>

                  <button
                    onClick={cancelEdit}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#8C968F] transition hover:bg-[#EEF1ED] hover:text-[#19352B]"
                  >
                    ×
                  </button>

                </div>

                <div className="space-y-4">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#3E4B43]">
                      Link title
                    </label>

                    <input
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Link title"
                      className="w-full rounded-xl border border-[#DDE1DB] bg-[#F7F8F5] px-4 py-3 text-sm text-[#19352B] outline-none transition-all duration-200 placeholder:text-[#A2AAA3] focus:border-[#78927F] focus:bg-white focus:ring-4 focus:ring-[#78927F]/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#3E4B43]">
                      URL
                    </label>

                    <input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full rounded-xl border border-[#DDE1DB] bg-[#F7F8F5] px-4 py-3 text-sm text-[#19352B] outline-none transition-all duration-200 placeholder:text-[#A2AAA3] focus:border-[#78927F] focus:bg-white focus:ring-4 focus:ring-[#78927F]/10"
                    />
                  </div>

                </div>

                <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                  <button
                    onClick={cancelEdit}
                    disabled={loading}
                    className="rounded-xl border border-[#DDE1DB] px-5 py-2.5 text-sm font-semibold text-[#647168] transition hover:bg-[#F5F3ED] disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveChanges}
                    disabled={loading}
                    className="rounded-xl bg-[#19352B] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#27483A] active:scale-95 disabled:cursor-not-allowed disabled:bg-[#DDE2DC]"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>

                </div>
              </div>

            ) : (

              /* ================= NORMAL MODE ================= */

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Link Information */}
                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E9EFE8] text-xs font-bold tracking-wide text-[#527060]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0">

                    <h3 className="truncate font-semibold text-[#19352B]">
                      {link.text}
                    </h3>

                    <p className="mt-1 truncate text-sm text-[#89948C]">
                      {link.url}
                    </p>

                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-2">

                  <button
                    onClick={() => editHandle(link)}
                    className="rounded-xl border border-[#DDE1DB] bg-[#FDFCFA] px-4 py-2 text-sm font-semibold text-[#526158] transition-all duration-200 hover:border-[#BFCAC1] hover:bg-[#F5F3ED] active:scale-95"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => DeleteLinkfromDb(link)}
                    disabled={deletingId === link.id}
                    className="rounded-xl border border-[#E8CFC1] bg-[#FBF0E9] px-4 py-2 text-sm font-semibold text-[#9A634B] transition-all duration-200 hover:border-[#DDBBA8] hover:bg-[#F8E7DD] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deletingId === link.id ? "Deleting..." : "Delete"}
                  </button>

                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default EditLink;