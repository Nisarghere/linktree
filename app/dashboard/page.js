import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { getLinksByUserId, getUserById } from "../lib/db";
import EditLink from "./EditLink";
import AddLink from "./AddLink";
import Handle from "./Handle";
import Navbar from "@/components/Navbar";

const MAX_LINKS = 5;

const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect("/login");
  }

  let userid;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userid = decoded.userId;
  } catch {
    redirect("/login");
  }

  const [links, data] = await Promise.all([
    getLinksByUserId(userid),
    getUserById(userid),
  ]);

  if (!data) {
    redirect("/login");
  }

  const remaining = MAX_LINKS - links.length;
  const percentFilled = Math.min((links.length / MAX_LINKS) * 100, 100);

  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#19352B]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#DCE5D9]/40 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#F1D5C4]/30 blur-3xl" />
      </div>

      <Navbar />

      <div className="relative mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-32 lg:px-10">
        {!data.handle && <Handle userid={userid} />}

        <main className="pb-16">
          <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <section className="h-fit rounded-3xl border border-[#DEDCD4] bg-[#FDFCFA] p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7">
              <AddLink links={links} />
            </section>

            <section className="rounded-3xl border border-[#DEDCD4] bg-[#FDFCFA] p-6 shadow-sm sm:p-7">
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
                    {links.length} / {MAX_LINKS}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-xs font-medium text-[#7C887F]">
                    <span>Link capacity</span>

                    <span>
                      {remaining <= 0
                        ? "Maximum reached"
                        : `${remaining} slot${remaining === 1 ? "" : "s"} remaining`}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#E7EAE5]">
                    <div
                      className="h-full rounded-full bg-[#78927F] transition-all duration-500"
                      style={{ width: `${percentFilled}%` }}
                    />
                  </div>
                </div>
              </div>

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

export default Page;