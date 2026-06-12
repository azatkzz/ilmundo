"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  BookOpen,
  Heart,
  Globe,
  Star,
  Shield,
  Sparkles,
  ShieldCheck,
  Lightbulb,
  Sprout,
  Menu,
  X,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════ */

const C = {
  blue: "#012A8C",
  blueMid: "#0A3DAD",
  blueLight: "#E8EEFF",
  cream: "#FFF2E9",
  black: "#0D0D0D",
  white: "#FFFFFF",
  ink: "#1A1A1A",
  inkSoft: "#4A4A4A",
  inkMuted: "#888888",
} as const;

const WORDMARK: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeight: 700,
};

const SERIF: React.CSSProperties = {
  fontFamily: "var(--font-serif), var(--font-display), Instrument Serif, serif",
};

/* ═══════════════════════════════════════════════════════════════
   ANIMATION
   ═══════════════════════════════════════════════════════════════ */

const ease = [0.22, 1, 0.36, 1] as const;

const fadeIn = {
  hidden: { opacity: 0, y: 48 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease, delay: d },
  }),
};

const fadeInScale = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease, delay: d },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* ═══════════════════════════════════════════════════════════════
   GLOBE GRID — subtle watermark, used sparingly
   ═══════════════════════════════════════════════════════════════ */

const GlobeGrid = ({
  size = 500,
  opacity = 0.06,
  color = C.cream,
  className = "",
  style = {},
}: {
  size?: number;
  opacity?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    aria-hidden="true"
    className={className}
    style={{ position: "absolute", pointerEvents: "none", opacity, ...style }}
  >
    <circle cx="100" cy="100" r="90" stroke={color} strokeWidth="1" />
    <ellipse cx="100" cy="100" rx="90" ry="25" stroke={color} strokeWidth="0.6" />
    <ellipse cx="100" cy="100" rx="90" ry="52" stroke={color} strokeWidth="0.6" />
    <ellipse cx="100" cy="100" rx="90" ry="75" stroke={color} strokeWidth="0.6" />
    <line x1="10" y1="100" x2="190" y2="100" stroke={color} strokeWidth="0.6" />
    <ellipse cx="100" cy="100" rx="25" ry="90" stroke={color} strokeWidth="0.6" />
    <ellipse cx="100" cy="100" rx="52" ry="90" stroke={color} strokeWidth="0.6" />
    <ellipse cx="100" cy="100" rx="75" ry="90" stroke={color} strokeWidth="0.6" />
    <line x1="100" y1="10" x2="100" y2="190" stroke={color} strokeWidth="0.6" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   LABEL — tiny uppercase section label
   ═══════════════════════════════════════════════════════════════ */

const Label = ({ children, color = C.inkMuted }: { children: React.ReactNode; color?: string }) => (
  <p
    className="uppercase mb-6"
    style={{ color, fontSize: 11, letterSpacing: "0.18em", fontWeight: 500 }}
  >
    {children}
  </p>
);

/* ═══════════════════════════════════════════════════════════════
   CONTAINER — consistent max-width + padding
   ═══════════════════════════════════════════════════════════════ */

const cx = "max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16";

/* ═══════════════════════════════════════════════════════════════
   1 · NAVBAR
   ═══════════════════════════════════════════════════════════════ */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Story", href: "#founder" },
    { label: "Values", href: "#values" },
    { label: "Contact", href: "#cta" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between h-[72px]"
        style={{
          paddingLeft: "clamp(20px, 5vw, 48px)",
          paddingRight: "clamp(20px, 5vw, 48px)",
          background: scrolled ? "rgba(255,242,233,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.04)" : "1px solid transparent",
          transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <a href="#" className="flex items-center gap-2.5 shrink-0 relative">
          <div className="relative" style={{ width: 32, height: 32 }}>
            <img
              src="/Ilmundo_transp_beige.png"
              alt="ilmundo"
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500"
              style={{ opacity: scrolled ? 0 : 1 }}
            />
            <img
              src="/ilmundo_transp_blue.png"
              alt="ilmundo"
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500"
              style={{ opacity: scrolled ? 1 : 0 }}
            />
          </div>
          <span
            style={{
              ...WORDMARK,
              fontSize: 17,
              color: scrolled ? C.blue : C.cream,
              transition: "color 0.5s ease",
            }}
          >
            ilmundo
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="transition-colors duration-200"
              style={{
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: "0.01em",
                color: scrolled ? C.inkSoft : "rgba(255,242,233,0.65)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = scrolled ? C.blue : C.cream;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = scrolled ? C.inkSoft : "rgba(255,242,233,0.65)";
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#cta"
          className="hidden lg:inline-flex items-center rounded-full transition-all duration-200"
          style={{
            fontSize: 13,
            fontWeight: 500,
            padding: "9px 22px",
            background: scrolled ? C.blue : C.cream,
            color: scrolled ? C.cream : C.blue,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = scrolled ? C.blueMid : C.white;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = scrolled ? C.blue : C.cream;
          }}
        >
          Get Started
        </a>

        <button
          className="lg:hidden inline-flex items-center justify-center"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          style={{ color: scrolled ? C.ink : C.cream, transition: "color 0.5s ease", width: 44, height: 44, margin: -10 }}
        >
          <Menu size={24} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-10"
            style={{ background: C.blue }}
          >
            <button
              className="absolute top-4 right-4 inline-flex items-center justify-center"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              style={{ color: C.cream, width: 44, height: 44 }}
            >
              <X size={26} />
            </button>
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.1, duration: 0.4 }}
                style={{
                  ...SERIF,
                  fontStyle: "italic",
                  fontSize: "clamp(2rem, 6vw, 3rem)",
                  color: C.cream,
                }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#cta"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="rounded-full mt-4"
              style={{ fontWeight: 500, fontSize: 15, background: C.cream, color: C.blue, padding: "14px 40px" }}
            >
              Get Started
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   2 · HERO
   ═══════════════════════════════════════════════════════════════ */

const Hero = () => {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const klY = useTransform(scrollY, [0, 500], [0, 80]);
  const klOpacity = useTransform(scrollY, [0, 350], isMobile ? [0.3, 0.1] : [0.9, 0.5]);

  return (
    <section
      className="relative overflow-hidden flex items-end min-h-svh"
      style={{ background: C.blue, paddingTop: 72 }}
    >
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[min(100vw,360px)] sm:w-[min(90vw,580px)] max-h-[85vh] pointer-events-none z-0"
        style={{
          y: klY,
          opacity: klOpacity,
          WebkitMaskImage:
            "radial-gradient(circle at 70% 40%, black 0%, black 55%, transparent 85%)",
          maskImage:
            "radial-gradient(circle at 70% 40%, black 0%, black 55%, transparent 85%)",
        }}
      >
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <img
            src="/Kuala_Lumpur.png"
            alt="Kuala Lumpur skyline"
            className="w-full h-full object-contain object-right"
          />
        </motion.div>
      </motion.div>

      <div className={`${cx} relative z-10 w-full pb-14 pt-20 sm:pb-28 sm:pt-32 lg:pb-36`}>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0 }}
        className="uppercase mb-6 sm:mb-8"
        style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,242,233,0.4)", fontWeight: 400 }}
      >
        Education Consultancy · Malaysia
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.08 }}
        style={{
          ...SERIF,
          fontStyle: "italic",
          fontSize: "clamp(2.75rem, 10vw, 6.5rem)",
          lineHeight: 1.02,
          letterSpacing: "-0.025em",
          color: C.cream,
        }}
        className="mb-6 sm:mb-8 max-w-[700px]"
      >
        Discover A World
        <br />
        of Knowledge.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.16 }}
        className="mb-10 sm:mb-12 max-w-[440px]"
        style={{ fontWeight: 300, fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)", lineHeight: 1.7, color: "rgba(255,242,233,0.65)" }}
      >
        Premium education consulting rooted in Malaysian values, shaped by a global perspective.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.24 }}
        className="flex flex-col sm:flex-row flex-wrap gap-3 mb-14 sm:mb-20"
      >
        <motion.a
          href="#services"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full inline-flex items-center justify-center"
          style={{ fontWeight: 500, fontSize: 14, background: C.cream, color: C.blue, padding: "14px 30px" }}
        >
          Explore Services
        </motion.a>
        <motion.a
          href="#founder"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full inline-flex items-center justify-center gap-2"
          style={{ fontWeight: 400, fontSize: 14, border: "1px solid rgba(255,242,233,0.2)", color: C.cream, padding: "14px 30px" }}
        >
          Meet the Founder <ArrowRight size={15} />
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease, delay: 0.4 }}
        className="flex flex-wrap gap-2.5"
      >
        {["Academic Tuition", "University Admissions", "Global Education Concierge", "8 More Coming Soon"].map((t) => (
          <span
            key={t}
            className="rounded-full"
            style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,242,233,0.45)", border: "1px solid rgba(255,242,233,0.12)", padding: "6px 16px" }}
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   3 · ABOUT
   ═══════════════════════════════════════════════════════════════ */

const About = () => (
  <section id="about" style={{ background: C.cream, scrollMarginTop: 80 }}>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
      className={`${cx} py-20 sm:py-28 md:py-36 lg:py-44`}
    >
      <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-start">
        <motion.div variants={fadeIn}>
          <Label>About</Label>
          <h2
            style={{ ...SERIF, fontStyle: "italic", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", lineHeight: 1.08, color: C.blue, letterSpacing: "-0.02em" }}
          >
            Rooted in Malaysia.
            <br />
            Ready for the world.
          </h2>
        </motion.div>

        <motion.div variants={fadeIn} custom={0.1} className="flex flex-col gap-6">
          <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: C.inkSoft, fontWeight: 400 }}>
            <span style={WORDMARK}>ilmundo</span> is a premium, all-in-one education consultancy
            empowering students in Malaysia and beyond to thrive academically and holistically.
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: C.inkSoft, fontWeight: 400 }}>
            Rooted in Malaysian values and shaped by a global perspective, we deliver bespoke educational
            services and high-touch mentoring tailored to each student. Every decision we make is guided by
            our commitment to each student&apos;s best interest and long-term growth.
          </p>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   4 · SERVICES
   ═══════════════════════════════════════════════════════════════ */

const services = [
  { tag: "ANTERO", name: "Global Impact Programs", desc: "Learn about social issues and develop a global perspective.", href: "/antero" },
  { tag: "MINDA", name: "Mental Health Literacy Education", desc: "Building emotional awareness and mental wellness for students.", href: "/minda" },
  { tag: "UNIK", name: "College Admissions Consulting", desc: "Your unique path to the right university.", href: "/unik" },
  { tag: "KELAS", name: "Personalized Tutoring", desc: "Personalized tutoring that meets every student where they are, taught by Kah Vern.", href: "/kelas" },
];

const upcoming = [
  { name: "Bakat", full: "Talent Accelerator" },
  { name: "Insan", full: "Holistic Wisdom Education" },
  { name: "Bahas", full: "Debate & Public Speaking" },
  { name: "Pintar", full: "Programming & Future-Ready Skills" },
  { name: "Bahasa", full: "Foreign Language Learning Classes" },
  { name: "Ajar", full: "Teacher Training" },
  { name: "Cakna", full: "Workshops & Seminars for Schools" },
  { name: "Destinasi", full: "Career & College Fair Coordination" },
];

const Tooltip = ({ name, full }: { name: string; full: string }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-expanded={show}
        aria-label={`${name} — ${full}`}
        className="rounded-full inline-flex items-center gap-1 transition-all duration-200 cursor-pointer"
        style={{
          fontSize: 12,
          fontWeight: 400,
          color: show ? C.blue : C.inkSoft,
          border: `1px solid ${show ? "rgba(1,42,140,0.35)" : "rgba(1,42,140,0.12)"}`,
          background: show ? "rgba(1,42,140,0.04)" : "transparent",
          padding: "7px 16px",
          minHeight: 32,
        }}
      >
        {name}
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 z-30 rounded-lg whitespace-nowrap pointer-events-none"
            style={{
              background: C.white,
              padding: "8px 14px",
              fontSize: 12,
              fontWeight: 400,
              color: C.ink,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            {full}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Services = () => (
  <section id="services" style={{ background: C.cream, scrollMarginTop: 80 }}>
    <div className={`${cx} pb-8 sm:pb-12`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="rounded-[20px] sm:rounded-[24px] overflow-hidden"
        style={{ background: C.blueLight, padding: "clamp(28px, 6vw, 72px) clamp(20px, 5vw, 56px)" }}
      >
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20">
          <motion.div variants={fadeIn}>
            <Label>Services</Label>
            <h2
              className="mb-5"
              style={{ ...SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.12, color: C.blue, letterSpacing: "-0.01em" }}
            >
              Everything a student needs. Under one roof.
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: C.inkSoft, fontWeight: 400, maxWidth: 380 }}>
              Three services available now. Eight more launching soon — every one built around your student.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3.5">
            {services.map((s, i) => {
              const card = (
                <motion.div
                  variants={fadeInScale}
                  custom={i * 0.08}
                  whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(1,42,140,0.1)" }}
                  className="rounded-2xl flex items-center justify-between gap-3 sm:gap-4"
                  style={{
                    background: C.white,
                    padding: "20px 22px",
                    boxShadow: "0 1px 12px rgba(1,42,140,0.04)",
                    transition: "box-shadow 0.3s ease",
                    cursor: s.href ? "pointer" : "default",
                  }}
                >
                  <div className="min-w-0">
                    <span
                      className="inline-block rounded-full mb-2.5"
                      style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", background: C.blue, color: C.cream, padding: "4px 12px" }}
                    >
                      {s.tag}
                    </span>
                    <h3 className="mb-1" style={{ ...SERIF, fontSize: "clamp(1.05rem, 2.5vw, 1.15rem)", color: C.ink, lineHeight: 1.25 }}>{s.name}</h3>
                    <p style={{ fontSize: "0.825rem", color: C.inkSoft, fontWeight: 400, lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                  <ArrowRight size={18} style={{ color: C.blue, flexShrink: 0, opacity: 0.4 }} />
                </motion.div>
              );
              return s.href ? (
                <Link key={s.tag} href={s.href} style={{ textDecoration: "none" }}>
                  {card}
                </Link>
              ) : (
                <div key={s.tag}>{card}</div>
              );
            })}
          </div>
        </div>

      </motion.div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   5 · FOUNDER
   ═══════════════════════════════════════════════════════════════ */

const Founder = () => (
  <section id="founder" className="relative overflow-hidden" style={{ background: C.cream, scrollMarginTop: 80 }}>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className={`${cx} py-20 sm:py-28 md:py-36 lg:py-44`}
    >
      <div className="grid md:grid-cols-2 gap-10 sm:gap-14 lg:gap-24 items-start">
        <motion.div
          variants={fadeIn}
          className="rounded-[20px] overflow-hidden mx-auto w-full max-w-[380px] md:max-w-none"
          style={{ aspectRatio: "4/5", maxHeight: 560 }}
        >
          <img
            src="/KV.jpeg"
            alt="Kah Vern, founder of ilmundo"
            className="w-full h-full object-cover"
            onError={(e) => {
              const el = e.currentTarget;
              el.style.display = "none";
              el.parentElement!.style.background = C.blue;
              el.parentElement!.innerHTML = `<span style="font-family:var(--font-serif),Instrument Serif,serif;font-style:italic;font-size:4rem;color:${C.cream};opacity:0.5;display:flex;align-items:center;justify-content:center;width:100%;height:100%">KV</span>`;
            }}
          />
        </motion.div>

        <motion.div variants={fadeIn} custom={0.1}>
          <Label>The Founder</Label>
          <h2
            className="mb-8"
            style={{ ...SERIF, fontStyle: "italic", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.12, color: C.blue, letterSpacing: "-0.01em" }}
          >
            A global education,
            <br />
            brought home.
          </h2>

          <div className="flex flex-col gap-5 mb-10">
            {[
              <>Kah Vern founded <span style={WORDMARK}>ilmundo</span> to help students become global citizens while staying rooted in their culture.</>,
              <>At Minerva University, he studied across seven global cities — gaining insight into diverse educational systems and understanding how to bridge global standards with local potential.</>,
              <>With experience teaching in the US at Breakthrough Twin Cities, Think Academy, and DSST Public Schools, Kah Vern worked with multilingual learners, students with disabilities, and students of refugee descent.</>,
              <><span style={WORDMARK}>ilmundo</span> was born to transform education for the 21st century — combining Malaysian values with a global perspective.</>,
            ].map((text, i) => (
              <p key={i} style={{ fontSize: "0.95rem", lineHeight: 1.8, color: C.inkSoft, fontWeight: 400 }}>{text}</p>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <span className="uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: C.inkMuted, fontWeight: 500 }}>
              Studied and lived across
            </span>
            <span style={{ fontSize: 12, color: C.blue, fontWeight: 400, letterSpacing: "0.02em", lineHeight: 1.7 }}>
              San Francisco · Berlin · Buenos Aires · Seoul · Taipei · London · Hyderabad · Kuala Lumpur · Denver · Minneapolis
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   6 · VALUES
   ═══════════════════════════════════════════════════════════════ */

const values = [
  { icon: BookOpen, title: "Passion for Learning", desc: "We believe curiosity is a muscle. We help students build it." },
  { icon: Star, title: "Excellence & Quality", desc: "We hold ourselves to the standard we hold your student\u2019s future." },
  { icon: Heart, title: "Student-Centered Commitment", desc: "Every recommendation starts with your child, not a checklist." },
  { icon: ShieldCheck, title: "Safety & Wellbeing", desc: "A safe environment is the foundation for learning. We protect it fiercely." },
  { icon: Globe, title: "Cultural Roots & Global Perspective", desc: "Malaysian at heart. Ready for any room in the world." },
  { icon: Shield, title: "Integrity & Transparency", desc: "You\u2019ll always know what we\u2019re doing and why." },
  { icon: Lightbulb, title: "Courage & Innovation", desc: "We challenge convention to find better ways of educating and guiding." },
  { icon: Sprout, title: "Humility & Growth Mindset", desc: "We\u2019re always learning too. Growth never stops \u2014 for us or your student." },
  { icon: Sparkles, title: "Positive Social Impact", desc: "Elevating one student ripples outward. We take that seriously." },
];

const Values = () => (
  <section id="values" style={{ background: C.white, scrollMarginTop: 80 }}>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className={`${cx} py-20 sm:py-28 md:py-36 lg:py-44`}
    >
      <motion.div variants={fadeIn} className="text-center mb-12 sm:mb-16 md:mb-20">
        <Label>Our Philosophy</Label>
        <h2 style={{ ...SERIF, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.08, color: C.ink, letterSpacing: "-0.02em" }}>
          Student-first. Always.
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {values.map((v, i) => {
          const Icon = v.icon;
          return (
            <motion.div
              key={v.title}
              variants={fadeInScale}
              custom={i * 0.06}
              className="rounded-2xl transition-all duration-300 group"
              style={{ background: C.cream, padding: "26px 24px", border: "1px solid rgba(1,42,140,0.04)" }}
              whileHover={{ borderColor: "rgba(1,42,140,0.12)", y: -2 }}
            >
              <Icon size={24} strokeWidth={1.5} style={{ color: C.blue }} className="mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              <h3 className="mb-2" style={{ ...SERIF, fontSize: "1.1rem", color: C.ink }}>{v.title}</h3>
              <p style={{ fontSize: "0.825rem", lineHeight: 1.65, color: C.inkSoft, fontWeight: 400 }}>{v.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   7 · MISSION & VISION
   ═══════════════════════════════════════════════════════════════ */

const MissionVision = () => (
  <section className="relative overflow-hidden" style={{ background: C.blue }}>
    <GlobeGrid size={640} opacity={0.04} color={C.cream} style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className={`${cx} relative z-10 py-20 sm:py-28 md:py-36 lg:py-44 grid md:grid-cols-2`}
    >
      <motion.div
        variants={fadeInScale}
        custom={0}
        className="md:pr-16 border-b md:border-b-0 md:border-r pb-10 md:pb-0"
        style={{ borderColor: "rgba(255,242,233,0.1)" }}
      >
        <Label color="rgba(255,242,233,0.35)">Mission</Label>
        <p style={{ ...SERIF, fontStyle: "italic", fontSize: "clamp(1.2rem, 3vw, 1.75rem)", lineHeight: 1.5, color: C.cream }}>
          To place every student&apos;s best interest at the center of education by delivering premium, end-to-end
          academic guidance and mentorship. Rooted in Malaysian values and guided by a global perspective.
        </p>
      </motion.div>

      <motion.div variants={fadeInScale} custom={0.12} className="md:pl-16 pt-10 md:pt-0">
        <Label color="rgba(255,242,233,0.35)">Vision</Label>
        <p style={{ ...SERIF, fontStyle: "italic", fontSize: "clamp(1.2rem, 3vw, 1.75rem)", lineHeight: 1.5, color: C.cream }}>
          To elevate Malaysia&apos;s education ecosystem by pioneering a holistic, student-first model that integrates
          academic excellence, character, and global readiness.
        </p>
      </motion.div>
    </motion.div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   8 · BRAND MOMENT
   ═══════════════════════════════════════════════════════════════ */

const BrandMoment = () => (
  <section className="relative overflow-hidden" style={{ background: C.cream }}>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
      <span style={{ ...SERIF, fontStyle: "italic", fontSize: "clamp(28vw, 36vw, 420px)", color: C.blue, opacity: 0.025, lineHeight: 1 }}>
        iM
      </span>
    </div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInScale}
      custom={0}
      className={`${cx} relative z-10 py-24 sm:py-36 md:py-48 lg:py-56 text-center`}
    >
      <h2 style={{ ...SERIF, fontSize: "clamp(2.5rem, 9vw, 5.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
        <span style={{ color: C.blue }}>ilmu</span>
        <span style={{ color: "rgba(1,42,140,0.2)", margin: "0 0.1em" }}>·</span>
        <span style={{ color: C.blue }}>mundo</span>
      </h2>

      <p className="mt-4 flex items-center justify-center gap-3" style={{ fontWeight: 300, fontSize: "0.8rem", letterSpacing: "0.25em", color: C.inkSoft }}>
        <span><span className="uppercase" style={{ letterSpacing: "0.15em" }}>ilmu</span> <span style={{ fontSize: "0.7rem" }}>(malay: knowledge)</span></span>
        <span>×</span>
        <span><span className="uppercase" style={{ letterSpacing: "0.15em" }}>mundo</span> <span style={{ fontSize: "0.7rem" }}>(spanish: world)</span></span>
      </p>

      <div className="h-8 sm:h-12" aria-hidden="true" />

      <p style={{ ...SERIF, fontStyle: "italic", fontSize: "clamp(1.1rem, 2.6vw, 1.5rem)", color: C.inkSoft, lineHeight: 1.5 }}>
        &ldquo;A world of knowledge — for every student.&rdquo;
      </p>
    </motion.div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   9 · CTA
   ═══════════════════════════════════════════════════════════════ */

const CTA = () => (
  <section id="cta" className="relative overflow-hidden" style={{ background: C.blue, scrollMarginTop: 80 }}>
    <GlobeGrid size={480} opacity={0.04} color={C.cream} style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInScale}
      custom={0}
      className={`${cx} relative z-10 py-20 sm:py-28 md:py-36 lg:py-44 text-center`}
    >
      <h2 className="mb-5" style={{ ...SERIF, fontStyle: "italic", fontSize: "clamp(2rem, 6vw, 4.2rem)", lineHeight: 1.08, color: C.cream }}>
        Let&apos;s find your path.
      </h2>
      <p
        className="mx-auto mb-10 sm:mb-12"
        style={{ fontWeight: 300, fontSize: "clamp(0.95rem, 2.5vw, 1rem)", lineHeight: 1.7, color: "rgba(255,242,233,0.65)", maxWidth: 460 }}
      >
        Start your <span style={WORDMARK}>ilmundo</span> journey today — no commitment,
        just a conversation about what your student needs.
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 max-w-[420px] sm:max-w-none mx-auto">
        <motion.a
          href="https://wa.me/601163068367"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full inline-flex items-center justify-center"
          style={{ fontWeight: 500, fontSize: 14, background: C.cream, color: C.blue, padding: "14px 32px" }}
        >
          Book a Free Consultation
        </motion.a>
        <motion.a
          href="https://wa.me/601163068367"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full inline-flex items-center justify-center gap-2"
          style={{ fontWeight: 400, fontSize: 14, border: "1px solid rgba(255,242,233,0.2)", color: C.cream, padding: "14px 32px" }}
        >
          <MessageCircle size={16} />
          WhatsApp Us
        </motion.a>
      </div>
    </motion.div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   10 · FOOTER
   ═══════════════════════════════════════════════════════════════ */

const footerCols = [
  {
    title: "PRODUCT",
    links: [
      { label: "Antero", href: "/antero" },
      { label: "Minda", href: "/minda" },
      { label: "Unik", href: "/unik" },
      { label: "Kelas", href: "/kelas" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "#about" },
      { label: "Founder", href: "#founder" },
      { label: "Values", href: "#values" },
      { label: "Contact", href: "#cta" },
    ],
  },
  {
    title: "CONNECT",
    links: [
      { label: "WhatsApp +6011-6306-8367", href: "https://wa.me/601163068367" },
      { label: "Telegram @myilmundo", href: "https://t.me/myilmundo" },
    ],
  },
  {
    title: "SOCIAL",
    links: [
      { label: "Facebook", href: "https://facebook.com/myilmundo" },
      { label: "Instagram", href: "https://instagram.com/myilmundo" },
      { label: "TikTok", href: "https://tiktok.com/@myilmundo" },
      { label: "Threads", href: "https://threads.net/@myilmundo" },
      { label: "X", href: "https://x.com/myilmundo" },
      { label: "Xiaohongshu", href: "https://www.xiaohongshu.com/user/profile/myilmundo" },
    ],
  },
];

const Footer = () => (
  <footer style={{ background: C.black }}>
    <div className={cx}>
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-10 sm:py-12"
        style={{ borderBottom: "1px solid rgba(255,242,233,0.06)" }}
      >
        <div className="flex items-center gap-2.5">
          <img src="/Ilmundo_transp_beige.png" alt="ilmundo" style={{ height: 24 }} />
          <span style={{ ...WORDMARK, fontSize: 18, color: C.cream }}>ilmundo</span>
        </div>
        <span style={{ fontSize: 12, color: "rgba(255,242,233,0.3)", fontWeight: 400 }}>
          Discover A World of Knowledge.
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 py-10 sm:py-14">
        {footerCols.map((col) => (
          <div key={col.title}>
            <p className="uppercase mb-5" style={{ fontSize: 10, letterSpacing: "0.18em", color: "rgba(255,242,233,0.3)", fontWeight: 500 }}>
              {col.title}
            </p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="transition-colors duration-200 hover:text-[#FFF2E9]"
                    style={{ fontSize: 13, color: "rgba(255,242,233,0.5)", fontWeight: 400 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center py-6" style={{ borderTop: "1px solid rgba(255,242,233,0.04)" }}>
        <p style={{ fontSize: 11, color: "rgba(255,242,233,0.22)", fontWeight: 400 }}>
          © 2026 <span style={WORDMARK}>ilmundo</span> · Kuala Lumpur, Malaysia
        </p>
      </div>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Founder />
      <Values />
      <MissionVision />
      <BrandMoment />
      <CTA />
      <Footer />
    </main>
  );
}
