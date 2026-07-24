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

  // Start editing
  function editHandle(link) {
    setEditingLink(link);

    setText(link.text);
    setUrl(link.url);
  }

  // Cancel editing
  function cancelEdit() {
    setEditingLink(null);

    setText("");
    setUrl("");
  }

  // Save changes
  async function saveChanges() {
    if (!text.trim() || !url.trim()) {
      toast("Title or URL is missing!");
      return;
    }

    // Check if nothing changed
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

  // Delete link
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

      <div className="space-y-4">
        {links.map((link, index) => (
          <div
            key={link.id}
            className={`group rounded-2xl border bg-white p-5 transition-all duration-300 ${
              editingLink?.id === link.id
                ? "border-zinc-400 shadow-md"
                : "border-zinc-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
            }`}
          >
            {editingLink?.id === link.id ? (
              /* ================= EDIT MODE ================= */

              <div>
                {/* Edit Header */}
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                      Editing link
                    </p>

                    <h3 className="mt-1 font-semibold text-zinc-900">
                      Update your link
                    </h3>
                  </div>

                  <button
                    onClick={cancelEdit}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                  >
                    ×
                  </button>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">
                      Link title
                    </label>

                    <input
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Link title"
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">
                      URL
                    </label>

                    <input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    onClick={cancelEdit}
                    disabled={loading}
                    className="rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveChanges}
                    disabled={loading}
                    className="rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-300"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            ) : (
              /* ================= NORMAL MODE ================= */

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                {/* Link Information */}
                <div className="flex min-w-0 items-center gap-4">
                  {/* Number */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-sm font-semibold text-zinc-500">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-zinc-900">
                      {link.text}
                    </h3>

                    <p className="mt-1 truncate text-sm text-zinc-500">
                      {link.url}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => editHandle(link)}
                    className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm active:scale-95"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => DeleteLinkfromDb(link)}
                    disabled={deletingId === link.id}
                    className="rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:border-red-200 hover:bg-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
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
