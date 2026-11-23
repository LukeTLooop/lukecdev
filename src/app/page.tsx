import CopyDiscord from "@/components/CopyDiscord";
import HeroVideo from "@/components/HeroVideo";
import Nav from "@/components/Nav";
import Starfield from "@/components/Starfield";
import SystemCard from "@/components/SystemCard";
import TypedName from "@/components/TypedName";
import { contact, heroVideo, process, record, strengths, systems } from "@/lib/content";

const wrap = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10";

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="flex items-center gap-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.02em]"
    >
      {/* Event-horizon marker: a brand ring around the void */}
      <span aria-hidden="true" className="size-4 shrink-0 rounded-full border-[3px] border-brand" />
      {children}
    </h2>
  );
}

export default function Home() {
  const left = systems.filter((_, i) => i % 2 === 0);
  const right = systems.filter((_, i) => i % 2 === 1);

  return (
    <>
      <Starfield />

      <Nav wrap={wrap} />

      <main id="main">
        {/* Hero */}
        <section id="top" className="relative overflow-hidden pb-24 pt-10 sm:pt-14">
          <div
            aria-hidden="true"
            className="nebula pointer-events-none absolute -right-40 -top-40 -z-10 size-[42rem] rounded-full bg-[radial-gradient(closest-side,rgba(123,76,242,0.28),transparent)]"
          />
          <div className={`${wrap} sd-hero`}>
            <div className="sd-name">
              <TypedName text="Lukeyy" label="Lukeyy, Roblox scripter" />
            </div>
          </div>

          {/* Full-bleed gameplay band: the page break between the name and everything else */}
          <div className="sd-band relative mt-8 h-[26rem] overflow-hidden border-y border-line sm:h-[clamp(24rem,30vw,36rem)] lg:mt-12">
            <HeroVideo src={heroVideo.src} poster={heroVideo.poster} />
            {/* Scrim keeps the overlaid copy readable whatever frame is showing */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-void via-void/75 to-void/10 sm:bg-gradient-to-r sm:from-void/95 sm:via-void/65 sm:to-transparent"
            />
            <div className={`${wrap} relative flex h-full items-end pb-8 sm:items-center sm:pb-0`}>
              <div className="max-w-xl space-y-4">
                <p className="text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug text-star [text-shadow:0_1px_12px_rgba(13,10,28,0.7)]">
                  Roblox scripter building movement, combat and physics systems that feel right the moment
                  a player grabs the controls.
                </p>
                <p className="max-w-[46ch] text-star/80 [text-shadow:0_1px_10px_rgba(13,10,28,0.8)]">
                  I&apos;m Luke, a scripter before anything else. My work has shipped in a project that
                  reached more than 80,000 players.
                </p>
              </div>
            </div>
          </div>

          <div className={`${wrap} mt-8 flex flex-wrap items-center gap-x-6 gap-y-3`}>
            <a
              href="#hire"
              className="inline-flex min-h-12 items-center rounded-full bg-brand-strong px-6 font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              Start a project
            </a>
            <a
              href="#systems"
              className="inline-flex min-h-12 items-center font-semibold text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"
            >
              Watch the systems
            </a>
          </div>
        </section>

        {/* Systems */}
        <section aria-labelledby="systems" className="py-24">
          <div className={wrap}>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <SectionTitle id="systems">Systems I&apos;ve built</SectionTitle>
              <p className="sd-emerge max-w-[44ch] text-dust">
                Every clip is recorded in-engine. Press play to watch one without leaving the page.
              </p>
            </div>

            {/* Two staggered columns, like a flight path. Single column on phones. */}
            <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-x-10">
              <div className="space-y-14">
                {left.map((s) => (
                  <div key={s.id} className="sd-emerge">
                    <SystemCard system={s} />
                  </div>
                ))}
              </div>
              <div className="space-y-14 md:pt-28">
                {right.map((s) => (
                  <div key={s.id} className="sd-emerge">
                    <SystemCard system={s} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section aria-labelledby="process" className="border-y border-line bg-surface/70 py-24 backdrop-blur-[2px]">
          <div className={wrap}>
            <h2
              id="process"
              className="sd-fill-scope outline-text relative font-display text-[clamp(2.75rem,9vw,7.5rem)] font-extrabold leading-none tracking-[-0.03em]"
            >
              How I work
              {/* Solid copy revealed left to right by scroll (scroll-driven browsers only) */}
              <span aria-hidden="true" className="sd-only sd-fill absolute inset-0 text-brand">
                How I work
              </span>
            </h2>
            <div className="sd-steps mt-16">
              <div aria-hidden="true" className="sd-only mb-6 h-0.5 overflow-hidden rounded-full bg-line">
                <div className="sd-steps-bar h-full bg-gradient-to-r from-brand-strong to-brand" />
              </div>
              <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {process.map((step, i) => (
                  <li key={step.title} className="flex flex-col gap-4 bg-surface p-7 lg:min-h-72">
                    <span className="font-display text-sm font-semibold text-brand">Step {i + 1}</span>
                    <h3 className="font-display text-xl font-semibold tracking-[-0.01em]">{step.title}</h3>
                    <p className="text-dust">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* About */}
        <section aria-labelledby="about" className="py-24">
          <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
            <div className="lg:col-span-5">
              <SectionTitle id="about">About me</SectionTitle>
              <div className="sd-emerge mt-8 max-w-[52ch] space-y-5 text-dust">
                <p>
                  I&apos;m Luke, a 20-year-old Roblox developer from the USA. I&apos;ve always loved
                  programming, and I started building on Roblox once I realized it let me make games
                  with mechanics nobody else had.
                </p>
                <p>
                  I take on all kinds of work, but I&apos;m happiest on projects built around an unusual
                  mechanic. That&apos;s where I learn the most, and it&apos;s how I want to leave a mark
                  on the games industry.
                </p>
              </div>

              <div className="sd-emerge">
                <h3 className="mt-12 font-display text-lg font-semibold">What I do best</h3>
                <p className="mt-1 text-sm text-dust">In order of how comfortable I am with each.</p>
                <ol className="mt-5 space-y-3">
                  {strengths.map((s, i) => (
                    <li key={s} className="flex items-baseline gap-4">
                      <span className="font-display text-sm font-semibold text-brand">{i + 1}</span>
                      <span className="text-lg">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pt-2">
              <h3 className="font-display text-lg font-semibold">Track record</h3>
              <ul className="mt-5 border-t border-line">
                {record.map((r) => (
                  <li
                    key={r.name}
                    className="sd-emerge grid gap-2 border-b border-line py-6 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8"
                  >
                    <span className="font-display font-semibold">{r.name}</span>
                    <span className="text-dust">
                      {r.detail}{" "}
                      {r.href && (
                        <a
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
                        >
                          {r.linkLabel}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Hire */}
        <section aria-labelledby="hire" className="relative overflow-hidden pb-28 pt-16">
          <div
            aria-hidden="true"
            className="nebula pointer-events-none absolute -bottom-72 left-1/2 -z-10 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(123,76,242,0.25),transparent)]"
          />
          <div className={wrap}>
            <h2
              id="hire"
              className="font-display text-[clamp(3rem,12vw,10.5rem)] font-extrabold leading-[0.95] tracking-[-0.035em]"
            >
              <span className="sd-swell inline-block">Let&apos;s build it</span>
            </h2>
            <div className="sd-emerge mt-12 grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h3 className="font-display text-lg font-semibold">Pricing</h3>
                <p className="mt-3 max-w-[52ch] text-dust">
                  Every project is priced on its difficulty, the time it takes and the assets it needs. I
                  accept USD and Robux, and we agree on the price together so it&apos;s fair for both sides.
                </p>
              </div>
              <div className="space-y-6 lg:col-span-6">
                <h3 className="font-display text-lg font-semibold">Get in touch</h3>
                <p className="text-dust">
                  Discord is the fastest way to reach me: <span className="text-star">{contact.discord}</span>
                </p>
                <CopyDiscord handle={contact.discord} />
                <p className="text-dust">
                  Prefer email?{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
                  >
                    {contact.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-dust`}>
          <p>© 2026 Lukeyy. Roblox scripter.</p>
          <a href="#top" className="inline-flex min-h-11 items-center rounded-md hover:text-star">
            Back to top
          </a>
        </div>
      </footer>
    </>
  );
}
