
import Link from "next/link";
import React from "react";

export default function Features() {
  const features = [
    {
      title: "Custom Profile",
      description:
        "Create a personalized profile with your own handle and share everything through one simple link.",
      icon: "✦",
    },
    {
      title: "Manage Your Links",
      description:
        "Add, edit, delete, and organize your important links from one simple dashboard.",
      icon: "↗",
    },
    {
      title: "Secure Authentication",
      description:
        "Keep your account protected with secure authentication and encrypted password storage.",
      icon: "⌘",
    },
    {
      title: "Fully Responsive",
      description:
        "Your profile is designed to look clean and work smoothly across phones, tablets, and desktops.",
      icon: "◫",
    },
    {
      title: "Simple Dashboard",
      description:
        "Manage your profile and links through a clean dashboard built for quick and easy updates.",
      icon: "◈",
    },
    {
      title: "Built to Grow",
      description:
        "More customization options, analytics, QR codes, and other features are planned for the future.",
      icon: "＋",
    },
  ];

  return (
    <main className="bg-[#f8faf9] text-zinc-900">
      <section className="relative overflow-hidden border-b border-zinc-200">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-28 text-center sm:py-36">
          <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
            Everything in one place
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your entire online presence,
            <span className="text-emerald-600"> one link.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">
            Create a personal link page, organize your important links, and
            share everything with a single URL.
          </p>

          <Link
            href="/generate"
            className="mt-9 inline-flex items-center rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/10 transition hover:-translate-y-0.5 hover:bg-zinc-800"
          >
            Create Your Page
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Features
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to share your world
          </h2>

          <p className="mt-4 text-zinc-500">
            A simple toolkit for creating, managing, and sharing your personal
            online presence.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-lg font-semibold text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-lg font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Go from zero to shareable in minutes
            </h2>
          </div>

          <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            <div className="hidden md:block absolute left-[17%] right-[17%] top-6 border-t border-dashed border-zinc-300" />

            {[
              {
                number: "01",
                title: "Create your account",
                description:
                  "Sign up and create your personalized profile in just a few steps.",
              },
              {
                number: "02",
                title: "Add your links",
                description:
                  "Add your social profiles, websites, projects, and anything you want to share.",
              },
              {
                number: "03",
                title: "Share your page",
                description:
                  "Copy your unique profile URL and share it anywhere you want.",
              },
            ].map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-sm font-bold text-emerald-600">
                  {step.number}
                </div>

                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-zinc-900 px-7 py-14 text-center shadow-xl sm:px-12">
          <p className="text-sm font-medium text-emerald-400">
            Ready to get started?
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Put everything behind one link.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-400">
            Create your profile, add your links, and have a simple page ready
            to share.
          </p>

          <Link
            href="/generate"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
          >
            Get Started →
          </Link>
        </div>
      </section>
    </main>
  );
}
