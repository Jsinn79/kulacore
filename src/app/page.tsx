"use client";

import { useState, type FormEvent } from "react";

/* ─── Mock waitlist submission ─── */
async function submitWaitlist(email: string): Promise<{ ok: boolean }> {
  await new Promise((r) => setTimeout(r, 800));
  // eslint-disable-next-line no-console
  console.log("[mock] waitlist signup:", email);
  return { ok: true };
}

/* ─── SVG icons (inline, no deps) ─── */
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0 -4 -4H5a4 4 0 0 0 -4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0 -3 -3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0 -1.275 1.275L12 21l-1.912 -5.813a2 2 0 0 0 -1.275 -1.275L3 12l5.813 -1.912a2 2 0 0 0 1.275 -1.275L12 3z" />
    </svg>
  );
}

function WaveIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
    </svg>
  );
}

function SunriseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 18a5 5 0 0 0 -10 0" />
      <line x1="12" y1="9" x2="12" y2="2" />
      <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
      <line x1="1" y1="18" x2="3" y2="18" />
      <line x1="21" y1="18" x2="23" y2="18" />
      <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
      <line x1="23" y1="22" x2="1" y2="22" />
      <polyline points="16 5 12 9 8 5" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1 -14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0 -7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0 -7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/* ─── Decorative wave divider ─── */
function WaveDivider({ flip }: { flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 md:h-16">
        <path
          d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z"
          className="fill-ocean-50"
        />
      </svg>
    </div>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-sand-50/80 backdrop-blur-lg border-b border-sand-200/50">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 py-4">
        <a href="#" className="flex items-center gap-2 text-ocean-800 font-semibold text-xl tracking-tight">
          <WaveIcon className="w-6 h-6 text-teal-500" />
          KulaCore
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-mist-600">
          <a href="#features" className="hover:text-ocean-700 transition">Features</a>
          <a href="#classes" className="hover:text-ocean-700 transition">Classes</a>
          <a href="#pricing" className="hover:text-ocean-700 transition">Pricing</a>
          <a href="#waitlist" className="rounded-full bg-ocean-600 px-5 py-2 text-white hover:bg-ocean-700 transition">
            Join Waitlist
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-ocean-700" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-sand-50/95 backdrop-blur-lg border-t border-sand-200/50 px-5 pb-5 flex flex-col gap-4 text-sm font-medium text-mist-600">
          <a href="#features" onClick={() => setOpen(false)} className="py-2">Features</a>
          <a href="#classes" onClick={() => setOpen(false)} className="py-2">Classes</a>
          <a href="#pricing" onClick={() => setOpen(false)} className="py-2">Pricing</a>
          <a href="#waitlist" onClick={() => setOpen(false)} className="rounded-full bg-ocean-600 px-5 py-2 text-white text-center">
            Join Waitlist
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-gradient-to-b from-ocean-50 via-sand-50 to-sand-50">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(45,143,179,0.12),transparent)]" />

      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200 px-4 py-1.5 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-6">
          <SparklesIcon className="w-3.5 h-3.5" /> Coming Soon
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ocean-900 leading-[1.1]">
          Find Your Flow,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-500 to-teal-500">
            Build Your Kula
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-mist-500 max-w-2xl mx-auto leading-relaxed">
          On-demand yoga, a connected community, and intelligent progress tracking — all in one beautifully simple app.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#waitlist"
            className="w-full sm:w-auto rounded-full bg-ocean-600 px-8 py-3.5 text-white font-semibold text-base shadow-lg shadow-ocean-600/25 hover:bg-ocean-700 hover:shadow-ocean-700/30 transition-all"
          >
            Join the Waitlist
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto rounded-full border border-ocean-200 px-8 py-3.5 text-ocean-700 font-semibold text-base hover:bg-ocean-50 transition-all"
          >
            Learn More
          </a>
        </div>
      </div>

      <WaveDivider />
    </section>
  );
}

/* ─── Features ─── */
const features = [
  {
    icon: PlayIcon,
    title: "On-Demand Classes",
    description:
      "Flow on your schedule. Access hundreds of curated classes from world-class instructors — from sunrise vinyasa to moonlit yin.",
  },
  {
    icon: UsersIcon,
    title: "Community Focus",
    description:
      "Your kula awaits. Connect with practitioners worldwide, join live circles, and share your journey in a supportive space.",
  },
  {
    icon: SparklesIcon,
    title: "AI-Guided Progress",
    description:
      "Intelligent insights that learn you. Get personalized recommendations, track milestones, and watch your practice deepen over time.",
  },
];

function Features() {
  return (
    <section id="features" className="bg-ocean-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">Why KulaCore</p>
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-900 tracking-tight">
            Everything your practice needs
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl bg-white/70 backdrop-blur border border-ocean-100 p-8 hover:shadow-lg hover:shadow-ocean-100/40 transition-all"
            >
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-100 to-teal-50 text-ocean-600 group-hover:scale-110 transition-transform">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-ocean-900 mb-3">{f.title}</h3>
              <p className="text-mist-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Featured Classes ─── */
const featuredClasses = [
  {
    icon: SunriseIcon,
    title: "Morning Flow",
    duration: "30 min",
    level: "All Levels",
    featured: true,
    description:
      "Greet the day with gentle intention. This sun-kissed sequence eases you from stillness into strength — a slow unfolding of breath and movement that leaves you centered, awake, and quietly radiant before the world begins.",
  },
  {
    icon: FlameIcon,
    title: "Power Vinyasa",
    duration: "45 min",
    level: "Intermediate",
    featured: false,
    description:
      "Build heat and find your edge. A dynamic, breath-led flow that strengthens body and focus through fluid, challenging sequences.",
  },
  {
    icon: MoonIcon,
    title: "Moonlit Yin",
    duration: "40 min",
    level: "All Levels",
    featured: false,
    description:
      "Surrender into deep stillness. Long-held, floor-based postures release tension from connective tissue as the day softly dissolves.",
  },
  {
    icon: HeartIcon,
    title: "Gentle Restore",
    duration: "35 min",
    level: "Beginner",
    featured: false,
    description:
      "A nurturing practice of supported poses and conscious rest. Perfect for recovery days or whenever your body asks for tenderness.",
  },
];

function FeaturedClasses() {
  return (
    <section id="classes" className="py-20 md:py-28 bg-sand-50">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">On-Demand Classes</p>
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-900 tracking-tight">
            Practice that meets you where you are
          </h2>
          <p className="mt-4 text-mist-500 text-lg max-w-2xl mx-auto">
            From the first light of dawn to the quiet of evening — choose the flow that matches your moment.
          </p>
        </div>

        {/* Morning Flow — Hero Featured Card */}
        <div className="mb-10 rounded-3xl overflow-hidden border border-ocean-200 bg-gradient-to-br from-ocean-50 via-white to-teal-50 shadow-lg shadow-ocean-100/20">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Decorative visual panel */}
            <div className="relative flex items-center justify-center bg-gradient-to-br from-ocean-100/60 via-teal-50/40 to-sand-100/60 p-10 md:p-14 min-h-[260px]">
              {/* Abstract sunrise circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-b from-sand-200/50 via-ocean-200/30 to-teal-100/40 blur-2xl" />
              </div>
              <div className="relative flex flex-col items-center gap-4">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-sand-300/70 to-ocean-300/50 flex items-center justify-center shadow-lg shadow-ocean-200/30">
                  <SunriseIcon className="w-10 h-10 md:w-12 md:h-12 text-ocean-700" />
                </div>
                <span className="rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-bold text-ocean-700 uppercase tracking-wider shadow-sm">
                  ✦ Staff Pick
                </span>
              </div>
            </div>

            {/* Right: Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-700">
                  {featuredClasses[0].duration}
                </span>
                <span className="rounded-full bg-teal-50 border border-teal-200 px-3 py-1 text-xs font-semibold text-teal-700">
                  {featuredClasses[0].level}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-ocean-900 mb-4">
                {featuredClasses[0].title}
              </h3>
              <p className="text-mist-500 leading-relaxed text-base md:text-lg mb-6">
                {featuredClasses[0].description}
              </p>
              <a
                href="#waitlist"
                className="self-start inline-flex items-center gap-2 rounded-full bg-ocean-600 px-6 py-3 text-white font-semibold text-sm shadow-lg shadow-ocean-600/25 hover:bg-ocean-700 transition-all"
              >
                <PlayIcon className="w-4 h-4" />
                Join to Access
              </a>
            </div>
          </div>
        </div>

        {/* Other class cards — 3-column grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredClasses.slice(1).map((c) => (
            <div
              key={c.title}
              className="group rounded-2xl bg-white/70 backdrop-blur border border-ocean-100 p-7 hover:shadow-lg hover:shadow-ocean-100/40 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-ocean-100 to-teal-50 text-ocean-600 group-hover:scale-110 transition-transform">
                  <c.icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-mist-400">{c.duration}</span>
                  <span className="w-1 h-1 rounded-full bg-mist-300" />
                  <span className="text-xs font-medium text-mist-400">{c.level}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-ocean-900 mb-2">{c.title}</h3>
              <p className="text-mist-500 text-sm leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-mist-400 text-sm">
          And hundreds more — new classes added weekly at launch.
        </p>
      </div>
    </section>
  );
}

/* ─── Pricing / Early Bird Offer ─── */
function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-ocean-50">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">Early Bird Offer</p>
        <h2 className="text-3xl md:text-4xl font-bold text-ocean-900 tracking-tight mb-6">
          Start for free. Pay when you&apos;re ready.
        </h2>
        <p className="text-mist-500 text-lg mb-12 max-w-xl mx-auto">
          Secure your founding-member spot today — no credit card required.
        </p>

        <div className="relative mx-auto max-w-sm rounded-3xl border border-ocean-200 bg-white shadow-xl shadow-ocean-100/30 p-8 md:p-10 text-left">
          {/* Badge */}
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-ocean-500 to-teal-500 px-4 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-md">
            Early Bird
          </span>

          <div className="mt-2 mb-6">
            <div className="flex items-end gap-1">
              <span className="text-5xl font-extrabold text-ocean-900">$0</span>
              <span className="text-mist-400 text-lg mb-1">/upfront</span>
            </div>
            <p className="text-mist-500 mt-1 text-sm">Then $14.99/mo after launch — cancel anytime</p>
          </div>

          <ul className="space-y-3 mb-8 text-sm text-mist-600">
            {[
              "Unlimited on-demand classes",
              "Community circles & challenges",
              "AI-powered practice insights",
              "Founding member badge forever",
              "Priority access to new features",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <svg className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#waitlist"
            className="block w-full rounded-full bg-ocean-600 py-3.5 text-center text-white font-semibold shadow-lg shadow-ocean-600/25 hover:bg-ocean-700 transition"
          >
            Claim Your Spot
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Waitlist Form ─── */
function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await submitWaitlist(email);
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="waitlist" className="relative py-20 md:py-28 bg-gradient-to-b from-ocean-50 to-sand-50 overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-teal-100/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-ocean-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-xl px-5 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ocean-900 tracking-tight mb-4">
          Ready to find your flow?
        </h2>
        <p className="text-mist-500 text-lg mb-10">
          Drop your email and be the first to know when KulaCore launches.
        </p>

        {status === "success" ? (
          <div className="rounded-2xl bg-teal-50 border border-teal-200 p-8 text-center">
            <div className="mx-auto mb-3 flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-ocean-900 mb-1">You&apos;re on the list!</h3>
            <p className="text-mist-500 text-sm">We&apos;ll send you an invite as soon as we launch. Namaste 🙏</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 rounded-full border border-ocean-200 bg-white px-5 py-3.5 text-ocean-900 placeholder:text-mist-400 focus:outline-none focus:ring-2 focus:ring-ocean-400/50 focus:border-ocean-400 transition"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-ocean-600 px-7 py-3.5 text-white font-semibold shadow-lg shadow-ocean-600/25 hover:bg-ocean-700 disabled:opacity-60 transition whitespace-nowrap"
            >
              {status === "loading" ? "Joining…" : "Join Waitlist"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-red-500">Something went wrong — please try again.</p>
        )}

        <p className="mt-5 text-xs text-mist-400">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-ocean-950 text-mist-400 py-12">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-white font-semibold text-lg">
          <WaveIcon className="w-5 h-5 text-teal-400" />
          KulaCore
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#classes" className="hover:text-white transition">Classes</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#waitlist" className="hover:text-white transition">Waitlist</a>
        </div>
        <p className="text-xs">&copy; {new Date().getFullYear()} KulaCore. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ─── Page Composition ─── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <FeaturedClasses />
        <Pricing />
        <WaitlistForm />
      </main>
      <Footer />
    </>
  );
}
