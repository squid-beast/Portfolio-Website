import type { CSSProperties, ReactNode } from "react";
import Cursor from "@/components/Cursor";
import Magnet from "@/components/Magnet";
import Scramble from "@/components/Scramble";
import Sky from "@/components/Sky";
import { automations, education, profile, projects, roles, siteUrl, socials } from "@/content/site";

export const metadata = { alternates: { canonical: "/" } };

function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`w-full mx-auto max-w-[76rem] px-6 sm:px-10 lg:px-16 ${className}`}>{children}</div>;
}

function Socials({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-1 ${className}`} aria-label="Elsewhere">
      {socials.map((s) => (
        <li key={s.label}>
          <a href={s.href} className="textlink" target="_blank" rel="noopener noreferrer">
            <Scramble text={s.label} trigger="hover" hoverParent duration={500} suffix="↗" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Act({
  id,
  numeral,
  title,
  className = "",
  children,
}: {
  id: string;
  numeral: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative py-[12vh] overflow-x-clip ${className}`}>
      <Wrap className="relative">
        <span className="numeral drift" data-n={numeral} aria-hidden="true" />
        <div className="rule mb-10" />
        <h2 className="display text-[clamp(3rem,9vw,8rem)]">
          <Scramble text={title} trigger="view" duration={1100} />
        </h2>
        {children}
      </Wrap>
    </section>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  jobTitle: "Software Engineer",
  email: `mailto:${profile.email}`,
  sameAs: socials.map((s) => s.href),
  worksFor: { "@type": "Organization", name: "Mastronardi Produce" },
  alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Sky />
      <Cursor />

      <main id="top">
        {/* morning */}
        <section className="min-h-dvh flex flex-col justify-center py-[12vh]">
          <Wrap>
            <h1 className="display text-[clamp(3.6rem,12vw,11rem)]">
              <Scramble text="Lohith Kumar" as="span" trigger="load" duration={1400} delay={200} />
            </h1>
            <p className="lede mt-8 max-w-[26ch] rise" style={{ "--d": "900ms" } as CSSProperties}>
              By day, enterprise software. By night, my own products, with AI in the loop.
            </p>
            <p className="mt-6 max-w-[46ch] text-fg-2 rise" style={{ "--d": "1000ms" } as CSSProperties}>
              Full-stack engineer. Java, TypeScript, Python. Three years in enterprise systems, three live products,
              AI in production rather than in slides. Open to full-time roles, remote or anywhere in the US.
            </p>
          </Wrap>
        </section>

        {/* day */}
        <Act id="day" numeral="01" title="Day" className="min-h-[80vh]">
          <ul className="mt-12 reveal">
            {roles.map((r) => (
              <li key={r.id} className="grid gap-y-1 sm:grid-cols-[8rem_1fr] sm:gap-x-8 py-5 border-t border-line">
                <span className="label sm:pt-1.5">{r.years}</span>
                <span>
                  <span className="font-medium">{r.company}</span>
                  <span className="text-fg-2"> · {r.line}</span>
                </span>
              </li>
            ))}
          </ul>
        </Act>

        {/* dusk */}
        <section id="dusk" className="min-h-[70vh] flex items-center">
          <Wrap>
            <p className="display text-[clamp(2.4rem,7.5vw,6.5rem)] max-w-[14ch] reveal">
              5:30 pm. Laptop closes. Laptop opens.
            </p>
          </Wrap>
        </section>

        {/* night */}
        <Act id="night" numeral="02" title="Night" className="min-h-dvh">
          <ul className="mt-12">
            {projects.map((p, i) => (
              <li key={p.id} className="scene reveal border-t border-line py-9">
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="block group">
                  <span className="display block text-[clamp(1.9rem,8vw,5.5rem)] break-words">
                    <Scramble text={p.name} trigger="hover" hoverParent duration={700} />
                  </span>
                  <span className="block mt-3 max-w-[40ch] text-fg-2">{p.line}</span>
                  <span className="block mt-3 label">
                    {p.liveLabel} <span aria-hidden="true">↗</span>
                  </span>
                  <span className="stack label block mt-2">{p.stack.join(" · ")}</span>
                </a>
              </li>
            ))}
          </ul>
        </Act>

        {/* automations */}
        <Act id="automations" numeral="03" title="Automations">
          <ul className="mt-12 reveal">
            {automations.map((line) => (
              <li key={line} className="py-5 border-t border-line">
                <span className="block max-w-[60ch]">{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 reveal">
            <a href={profile.links.blog} className="btn" target="_blank" rel="noopener noreferrer">
              How I build these <span aria-hidden="true">↗</span>
            </a>
          </p>
        </Act>

        {/* before dawn */}
        <section id="contact" className="relative pt-[12vh] pb-[14vh] overflow-x-clip">
          <Wrap className="w-full">
            <div className="rule mb-10" />
            <h2 className="display text-[clamp(3rem,10vw,9rem)]">
              <Scramble text="Write to me." trigger="view" duration={1200} />
            </h2>
            <div className="mt-10 reveal">
              <Magnet>
                <span className="ping">
                  <a href={`mailto:${profile.email}`} className="btn btn-primary normal-case tracking-normal">
                    {profile.email}
                  </a>
                </span>
              </Magnet>
              <Socials className="mt-8" />
            </div>
          </Wrap>
        </section>
      </main>
    </>
  );
}
