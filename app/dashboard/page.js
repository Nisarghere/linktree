import { cookies } from "next/headers";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { getLinksByUserId } from "../lib/db";
import EditLink from "./EditLink";
import AddLink from "./AddLink";
import { createHandle } from "./actions";
import Handle from "./Handle";

const page = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userid = decoded.userId;

  const links = await getLinksByUserId(userid);

  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#19352B]">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#DCE5D9]/40 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#F1D5C4]/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="sticky top-4 z-50 pt-4">
          <div className="mx-auto flex h-16 items-center justify-between rounded-2xl border border-[#2C463B]/20 bg-[#19352B] px-5 shadow-xl shadow-[#19352B]/10 sm:px-7">
            {/* Logo */}
            <Link href="/" className="group flex items-center">
              <div className="flex h-10 items-center justify-center rounded-xl bg-[#F5F3ED] px-3 transition-transform duration-200 group-hover:-translate-y-0.5">
                <img
                  loading="eager"
                  src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg"
                  alt="Linktree"
                  className="h-6 w-auto"
                />
              </div>
            </Link>

            {/* Page title */}
            <div className="hidden items-center gap-3 md:flex">
              <span className="h-5 w-px bg-white/15" />

              <span className="text-sm font-medium text-[#C7D2C9]">
                Manage your links
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#A8D5BA]" />

              <span className="text-sm font-medium text-[#F5F3ED]">
                Dashboard
              </span>
            </div>
          </div>
        </header>
        <section className="mb-6 mt-6 overflow-hidden rounded-3xl border border-[#D9DED6] bg-[#E9EFE8] p-6 shadow-sm sm:p-7">
          <Handle />
        </section>
        {/* Main */}
        <main className="pb-16 pt-8 sm:pt-10">
          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
            {/* Add Link */}
            <section className="h-fit rounded-3xl border border-[#DEDCD4] bg-[#FDFCFA] p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7">
              <AddLink links={links} />
            </section>

            {/* Links */}
            <section className="rounded-3xl border border-[#DEDCD4] bg-[#FDFCFA] p-6 shadow-sm sm:p-7">
              {/* Header */}
              <div className="mb-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#78927F]">
                      Profile content
                    </p>

                    <h2 className="text-xl font-semibold tracking-tight text-[#19352B]">
                      Your Links
                    </h2>

                    <p className="mt-1 text-sm text-[#748078]">
                      Manage the links displayed on your profile.
                    </p>
                  </div>

                  <div className="shrink-0 rounded-full border border-[#D9DED6] bg-[#F5F3ED] px-3.5 py-1.5 text-sm font-semibold text-[#526258]">
                    {links.length} / 5
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-xs font-medium text-[#7C887F]">
                    <span>Link capacity</span>

                    <span>
                      {links.length >= 5
                        ? "Maximum reached"
                        : `${5 - links.length} slot${
                            5 - links.length === 1 ? "" : "s"
                          } remaining`}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#E7EAE5]">
                    <div
                      className="h-full rounded-full bg-[#78927F] transition-all duration-500"
                      style={{
                        width: `${(links.length / 5) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Links */}
              <div>
                {links.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#C9D2C9] bg-[#F7F8F5] px-6 py-14 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9EFE8] text-xl font-medium text-[#19352B]">
                      +
                    </div>

                    <h3 className="mt-4 font-semibold text-[#19352B]">
                      No links yet
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#7A857D]">
                      Add your first link using the form on the left to start
                      building your profile.
                    </p>
                  </div>
                ) : (
                  <EditLink links={links} userid={userid} />
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
