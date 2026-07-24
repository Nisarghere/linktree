import { cookies } from "next/headers";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { getLinksByUserId } from "../lib/db";
import EditLink from "./EditLink";
import AddLink from "./AddLink";

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
    <div className="min-h-screen bg-zinc-50">
      {/* Subtle background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-zinc-200/40 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-zinc-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group inline-flex items-center">
              <img
                loading="eager"
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg"
                alt="Logo"
                className="h-7 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Dashboard badge */}
            <div className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 shadow-sm sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Dashboard
            </div>
          </div>

          {/* Heading */}
          <div className="mt-10">
            <p className="mb-2 text-sm font-medium text-zinc-500">
              Welcome back
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              Manage your links
            </h1>

            <p className="mt-3 max-w-xl text-zinc-500">
              Create, edit, and organize all your links from one simple
              dashboard.
            </p>
          </div>
        </header>

        {/* Main Grid */}
        <main className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* Add Link Card */}
          <section className="h-fit rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7">
            <AddLink links={links} />
          </section>

          {/* Links Card */}
          <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-7">
            {/* Section Header */}
            <div className="mb-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
                    Your Links
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Manage the links displayed on your profile.
                  </p>
                </div>

                {/* Link Count */}
                <div className="shrink-0 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-600">
                  {links.length} / 5
                </div>
              </div>

              {/* Progress */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs text-zinc-500">
                  <span>Link capacity</span>

                  <span>
                    {links.length >= 5
                      ? "Maximum reached"
                      : `${5 - links.length} slot${
                          5 - links.length === 1 ? "" : "s"
                        } remaining`}
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100">
                  <div
                    className="h-full rounded-full bg-zinc-900 transition-all duration-500"
                    style={{
                      width: `${(links.length / 5) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-4">
              {links.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 px-6 py-12 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm ring-1 ring-zinc-200">
                    +
                  </div>

                  <h3 className="mt-4 font-semibold text-zinc-900">
                    No links yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                    Add your first link using the form on the left to start
                    building your profile.
                  </p>
                </div>
              ) : (
                <EditLink links={links} userid={userid} />
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default page;
