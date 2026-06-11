import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — shared with landing page
   ═══════════════════════════════════════════════════════════════ */

const C = {
  blue: "#012A8C",
  blueMid: "#0A3DAD",
  blueLight: "#E8EEFF",
  cream: "#FFF2E9",
  white: "#FFFFFF",
  ink: "#1A1A1A",
  inkSoft: "#4A4A4A",
  inkMuted: "#888888",
} as const;

const SERIF: React.CSSProperties = {
  fontFamily: "var(--font-serif), var(--font-display), Instrument Serif, serif",
};

const WORDMARK: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeight: 700,
};

const cx = "max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16";

/* ═══════════════════════════════════════════════════════════════
   SERVICE CONTENT — single source of truth for each subpage
   ═══════════════════════════════════════════════════════════════ */

export type ServiceSlug = "antero" | "minda" | "unik" | "kelas";

export const serviceContent: Record<
  ServiceSlug,
  { tag: string; title: string; description: string }
> = {
  antero: {
    tag: "ANTERO",
    title: "Global Impact Programs",
    description:
      "ANTERO is a holistic impact education program aimed at developing students into socially conscious, globally minded yet locally rooted citizens through experiential, project-based learning that investigates the world’s most pressing questions and builds the soft skills, hard skills, character, and future-ready capabilities they need to succeed.",
  },
  minda: {
    tag: "MINDA",
    title: "Mental Health Literacy Education",
    description:
      "MINDA is a mental health literacy program aimed at empowering students to become informed, self-aware, and resilient stewards of their own wellbeing through evidence-informed, skills-based learning that builds the emotional vocabulary, coping tools, help-seeking confidence, and inner agency they need to navigate the pressures of adolescence and beyond.",
  },
  unik: {
    tag: "UNIK",
    title: "College Admissions Consulting",
    description:
      "UNIK is a premium, end-to-end university admissions consultancy aimed at guiding students and families through the full journey of finding and securing a place at the right university through transparent, commission-free, and wholly student-centred counsel that covers everything from school fit strategy and SAT prep to application materials, gap year planning, and personalised learning plans across the US, UK, Australia, Asia, and Europe.",
  },
  kelas: {
    tag: "KELAS",
    title: "Personalized Tutoring",
    description:
      "KELAS is a personalised, high-impact tutoring program aimed at helping students aged 10–15 learn deeply and confidently across all subjects through student-centred, evidence-based pedagogy developed across classrooms in Malaysia and the United States, and adapted for every learner regardless of language background, learning profile, or prior experience.",
  },
};

/* ═══════════════════════════════════════════════════════════════
   SERVICE DETAIL PAGE — reusable layout for every service subpage
   ═══════════════════════════════════════════════════════════════ */

export default function ServiceDetail({ slug }: { slug: ServiceSlug }) {
  const { tag, title, description } = serviceContent[slug];

  return (
    <main style={{ background: C.cream, minHeight: "100vh" }}>
      {/* NAV */}
      <nav
        className="flex items-center justify-between h-[72px]"
        style={{
          paddingLeft: "clamp(20px, 5vw, 48px)",
          paddingRight: "clamp(20px, 5vw, 48px)",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5 shrink-0" style={{ textDecoration: "none" }}>
          <img
            src="/ilmundo_transp_blue.png"
            alt="ilmundo"
            style={{ width: 32, height: 32, objectFit: "contain" }}
          />
          <span style={{ ...WORDMARK, fontSize: 17, color: C.blue }}>ilmundo</span>
        </Link>
        <Link
          href="/#services"
          className="inline-flex items-center rounded-full"
          style={{
            fontSize: 13,
            fontWeight: 500,
            padding: "9px 22px",
            background: C.blue,
            color: C.cream,
            textDecoration: "none",
          }}
        >
          All Services
        </Link>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: "clamp(48px, 9vw, 110px)", paddingBottom: "clamp(56px, 10vw, 120px)" }}>
        <div className={cx}>
          <span
            className="inline-block rounded-full mb-6"
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.16em",
              background: C.blue,
              color: C.cream,
              padding: "5px 14px",
            }}
          >
            {tag}
          </span>

          <h1
            className="mb-7"
            style={{
              ...SERIF,
              fontSize: "clamp(2.4rem, 6vw, 4.25rem)",
              lineHeight: 1.08,
              color: C.blue,
              letterSpacing: "-0.01em",
              maxWidth: 880,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)",
              lineHeight: 1.7,
              color: C.inkSoft,
              fontWeight: 400,
              maxWidth: 760,
            }}
          >
            {description}
          </p>

          <Link
            href="/#cta"
            className="inline-flex items-center rounded-full mt-12"
            style={{
              fontSize: 14,
              fontWeight: 500,
              padding: "13px 28px",
              background: C.blue,
              color: C.cream,
              textDecoration: "none",
            }}
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
