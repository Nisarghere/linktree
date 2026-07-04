import Link from 'next/link';
import React from 'react'

export default function Features() {
  const features = [
    {
      title: "Custom Profile",
      description:
        "Create your own personalized profile with a unique handle that you can share anywhere.",
      icon: "👤",
    },
    {
      title: "Unlimited Links",
      description:
        "Add, edit, and organize all your important links in one place.",
      icon: "🔗",
    },
    {
      title: "Secure Authentication",
      description:
        "Your account is protected with secure login and encrypted passwords.",
      icon: "🔒",
    },
    {
      title: "Responsive Design",
      description:
        "Your profile looks great on desktops, tablets, and mobile devices.",
      icon: "📱",
    },
    {
      title: "Easy Dashboard",
      description:
        "Manage your profile and links from a clean, intuitive dashboard.",
      icon: "⚡",
    },
    {
      title: "More Coming Soon",
      description:
        "Themes, analytics, QR codes, custom domains, and many more exciting features.",
      icon: "🚀",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-200 ">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-30 text-center ">
        <h1 className="text-5xl font-bold text-gray-900">
          Everything You Need in
          <span className="text-violet-600"> One Link</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Create your personal link page, organize all your important links,
          and share them with a single URL.
        </p>

        
        <Link href='/generate' className="mt-10 inline-block rounded-full bg-violet-600 px-8 py-3 text-white font-semibold hover:bg-violet-700 transition"> Get Started</Link>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Platform?
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white p-8 shadow-sm border hover:shadow-lg transition"
            >
              <div className="text-4xl">{feature.icon}</div>

              <h3 className="mt-5 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Get Started in 3 Easy Steps
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl">1️⃣</div>
              <h3 className="font-semibold text-xl mt-4">Create an Account</h3>
              <p className="text-gray-600 mt-2">
                Sign up securely in just a few seconds.
              </p>
            </div>

            <div>
              <div className="text-5xl">2️⃣</div>
              <h3 className="font-semibold text-xl mt-4">Add Your Links</h3>
              <p className="text-gray-600 mt-2">
                Organize all your social and important links.
              </p>
            </div>

            <div>
              <div className="text-5xl">3️⃣</div>
              <h3 className="font-semibold text-xl mt-4">Share Anywhere</h3>
              <p className="text-gray-600 mt-2">
                Use one simple URL across all your social platforms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}