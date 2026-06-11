"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

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

const FORMSPREE = "https://formspree.io/f/xykanzro";

/* ═══════════════════════════════════════════════════════════════
   FIELD PRIMITIVES
   ═══════════════════════════════════════════════════════════════ */

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: C.white,
  border: "1px solid rgba(1,42,140,0.16)",
  borderRadius: 12,
  padding: "14px 16px",
  fontSize: 16,
  color: C.ink,
  outline: "none",
};

const Text = ({
  value,
  onChange,
  onEnter,
  placeholder,
  type = "text",
  autoFocus,
}: {
  value?: string;
  onChange: (v: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
}) => (
  <input
    type={type}
    value={value || ""}
    autoFocus={autoFocus}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onEnter?.();
      }
    }}
    placeholder={placeholder}
    style={inputStyle}
  />
);

const Area = ({
  value,
  onChange,
  placeholder,
}: {
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <textarea
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={4}
    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
  />
);

const Pill = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      fontSize: 14,
      padding: "11px 20px",
      borderRadius: 999,
      border: `1.5px solid ${active ? C.blue : "rgba(1,42,140,0.18)"}`,
      background: active ? C.blue : C.white,
      color: active ? C.cream : C.inkSoft,
      cursor: "pointer",
      transition: "all 0.18s ease",
      fontWeight: active ? 500 : 400,
    }}
  >
    {children}
  </button>
);

const Note = ({ children }: { children: React.ReactNode }) => (
  <p
    className="rounded-xl mt-5"
    style={{ fontSize: 13.5, lineHeight: 1.6, color: C.blueMid, background: C.blueLight, padding: "14px 18px" }}
  >
    {children}
  </p>
);

const SubLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="uppercase mb-2.5 mt-5" style={{ fontSize: 11, letterSpacing: "0.15em", color: C.inkMuted, fontWeight: 600 }}>
    {children}
  </p>
);

/* ═══════════════════════════════════════════════════════════════
   OPTIONS
   ═══════════════════════════════════════════════════════════════ */

const TRANSFERABLE = [
  "Amex Membership Rewards",
  "Chase Ultimate Rewards",
  "Capital One Miles",
  "Citi ThankYou Points",
  "Bilt Rewards",
  "Other",
];

const AIRLINE_MILES = [
  "Alaska Mileage Plan",
  "American AAdvantage",
  "Air Canada Aeroplan",
  "British Airways Executive Club",
  "Flying Blue",
  "KrisFlyer",
  "United MileagePlus",
  "Qatar Privilege Club",
  "Other",
];

/* ═══════════════════════════════════════════════════════════════
   STEP MODEL
   ═══════════════════════════════════════════════════════════════ */

type Kind = "method" | "text" | "number" | "email" | "tel" | "textarea" | "pills" | "points" | "review";

type StepDef = {
  key: string;
  kind: Kind;
  label?: string;
  hint?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  section?: string;
  autoAdvance?: boolean;
};

type Method = "" | "miles" | "cash";

export default function FlightSearchPage() {
  const [method, setMethod] = useState<Method>("");
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [f, setF] = useState<Record<string, string>>({});
  const [points, setPoints] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const togglePoint = (v: string) =>
    setPoints((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));

  /* ── Build the step list dynamically from current answers ── */
  const steps = useMemo<StepDef[]>(() => {
    const s: StepDef[] = [{ key: "__method", kind: "method", section: "Get started" }];

    if (method === "miles") {
      s.push(
        { key: "m_travelers", kind: "number", section: "Travelers", label: "How many travelers?", required: true, placeholder: "e.g. 2" },
        {
          key: "m_cabin",
          kind: "pills",
          section: "Travelers",
          label: "Preferred cabin?",
          options: ["Economy", "Business"],
          hint: "We generally recommend Business Class redemptions, as they often provide substantially better value per point than Economy.",
        },
        { key: "m_out_dep", kind: "text", section: "Outbound", label: "Where are you flying from?", required: true, placeholder: "Departure airport(s) — e.g. KUL, SIN" },
        { key: "m_out_dest", kind: "text", section: "Outbound", label: "Where are you flying to?", required: true, placeholder: "Destination airport(s) — e.g. LHR, LON" },
        { key: "m_out_date", kind: "text", section: "Outbound", label: "When do you want to depart?", required: true, placeholder: "Date or range — e.g. 15 Aug 2026, or 10–20 Aug" },
        { key: "m_round", kind: "pills", section: "Return", label: "Add a return flight?", options: ["Yes", "No"], autoAdvance: true },
      );
      if (f.m_round === "Yes") {
        s.push(
          { key: "m_ret_dep", kind: "text", section: "Return", label: "Return — flying from?", placeholder: "Departure airport(s)" },
          { key: "m_ret_dest", kind: "text", section: "Return", label: "Return — flying to?", placeholder: "Destination airport(s)" },
          { key: "m_ret_date", kind: "text", section: "Return", label: "Return — when?", placeholder: "Date or range" },
        );
      }
      s.push(
        { key: "__points", kind: "points", section: "Points & Miles", label: "Which points or miles do you have?" },
        { key: "m_balances", kind: "text", section: "Points & Miles", label: "Approximate balances?", placeholder: "Recommended — e.g. 120k Amex MR, 80k KrisFlyer" },
        { key: "m_constraints", kind: "textarea", section: "Constraints", label: "Any additional constraints?", placeholder: "Free text…", hint: "e.g. direct flights only · airline preferred · airline/airport to avoid · must depart after / arrive before a time" },
      );
    }

    if (method === "cash") {
      s.push(
        { key: "c_travelers", kind: "number", section: "Travelers", label: "How many travelers?", required: true, placeholder: "e.g. 2" },
        { key: "c_cabin", kind: "pills", section: "Travelers", label: "Which cabin?", options: ["Economy", "Premium Economy", "Business", "First"], autoAdvance: true },
        { key: "c_trip", kind: "pills", section: "Travelers", label: "One way or return?", options: ["One Way", "Return"], autoAdvance: true },
        { key: "c_out_dep", kind: "text", section: "Outbound", label: "Where are you flying from?", required: true, placeholder: "Departure airport(s) — e.g. KUL, SIN" },
        { key: "c_out_dest", kind: "text", section: "Outbound", label: "Where are you flying to?", required: true, placeholder: "Destination airport(s) — e.g. LHR, LON" },
        { key: "c_out_date", kind: "text", section: "Outbound", label: "When do you want to depart?", required: true, placeholder: "Date or range — e.g. 15 Aug 2026, or 10–20 Aug" },
      );
      if (f.c_trip === "Return") {
        s.push(
          { key: "c_ret_dep", kind: "text", section: "Return", label: "Return — flying from?", placeholder: "Departure airport(s)" },
          { key: "c_ret_dest", kind: "text", section: "Return", label: "Return — flying to?", placeholder: "Destination airport(s)" },
          { key: "c_ret_date", kind: "text", section: "Return", label: "Return — when?", placeholder: "Date or range" },
        );
      }
      s.push(
        { key: "c_checked", kind: "text", section: "Baggage", label: "Checked baggage?", placeholder: "e.g. 1 bag per traveler" },
        { key: "c_carry", kind: "text", section: "Baggage", label: "Carry-on baggage?", placeholder: "Excluding personal item — e.g. 1 each" },
        { key: "c_routing", kind: "pills", section: "Preferences", label: "Routing preference?", options: ["Direct only", "Open to layovers", "Prefer direct, but open to layovers"], autoAdvance: true },
        { key: "c_avoid", kind: "text", section: "Preferences", label: "Airlines or layover cities to avoid?", placeholder: "e.g. avoid overnight layovers in DXB" },
        { key: "c_hard", kind: "textarea", section: "Preferences", label: "Any additional hard constraints?", placeholder: "Free text…" },
        {
          key: "c_hasCard",
          kind: "pills",
          section: "Credit card",
          label: "Do you have a travel rewards credit card?",
          options: ["Yes", "No"],
          hint: "Examples: Chase Sapphire · Capital One Venture · Amex Platinum/Gold · airline or hotel cards · Visa Signature/Infinite · World Elite Mastercard",
        },
      );
      if (f.c_hasCard === "Yes") {
        s.push({ key: "c_cards", kind: "text", section: "Credit card", label: "Which card(s)?", placeholder: "e.g. Amex Platinum, Chase Sapphire Reserve" });
      }
    }

    if (method) {
      s.push(
        { key: "name", kind: "text", section: "Your details", label: "What's your name?", required: true, placeholder: "Your name" },
        { key: "email", kind: "email", section: "Your details", label: "Your email?", required: true, placeholder: "you@example.com" },
        { key: "phone", kind: "tel", section: "Your details", label: "Phone / WhatsApp? (optional)", placeholder: "+60…" },
        { key: "__review", kind: "review", section: "Review" },
      );
    }

    return s;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, f.m_round, f.c_trip, f.c_hasCard]);

  const safeStep = Math.min(step, steps.length - 1);
  const current = steps[safeStep];
  const total = steps.length;

  const valueOf = (k: string) => f[k] || "";
  const canAdvance = (() => {
    if (current.kind === "method") return !!method;
    if (current.required) return valueOf(current.key).trim().length > 0;
    return true;
  })();

  const advance = () => {
    if (safeStep < steps.length - 1) {
      setDir(1);
      setStep(safeStep + 1);
    }
  };
  const next = () => {
    if (canAdvance) advance();
  };
  const back = () => {
    setDir(-1);
    setStep(Math.max(0, safeStep - 1));
  };

  const choosePill = (st: StepDef, v: string) => {
    set(st.key)(v);
    if (st.autoAdvance) setTimeout(advance, 140);
  };

  const labelFor = (key: string) => steps.find((s) => s.key === key)?.label || key;

  const handleSubmit = async () => {
    setSending(true);
    setError("");
    const payload: Record<string, string> = {
      _subject: "New Flight Search Intake",
      "Search type": method === "miles" ? "Miles & Points" : "Cash Fare",
    };
    steps.forEach((s) => {
      if (["method", "review", "points"].includes(s.kind)) return;
      const v = valueOf(s.key);
      if (v.trim()) payload[s.label || s.key] = v;
    });
    if (points.length) payload["Points / Miles held"] = points.join(", ");

    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.errors?.[0]?.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  /* ── Render a single question body ── */
  const renderStep = (st: StepDef) => {
    switch (st.kind) {
      case "method":
        return (
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { id: "miles", title: "Miles & Points", desc: "Redeem credit-card points or airline miles." },
              { id: "cash", title: "Cash Fare", desc: "Search paid tickets across airlines." },
            ].map((opt) => {
              const active = method === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => {
                    setMethod(opt.id as Method);
                    setDir(1);
                    setStep(1);
                  }}
                  className="text-left rounded-xl"
                  style={{
                    border: `1.5px solid ${active ? C.blue : "rgba(1,42,140,0.16)"}`,
                    background: active ? C.blueLight : C.white,
                    padding: "22px 22px",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                  }}
                >
                  <span style={{ ...SERIF, fontSize: "1.3rem", color: C.blue, display: "block", marginBottom: 6 }}>{opt.title}</span>
                  <span style={{ fontSize: 13.5, color: C.inkSoft, lineHeight: 1.5 }}>{opt.desc}</span>
                </button>
              );
            })}
          </div>
        );

      case "pills":
        return (
          <>
            <div className="flex flex-wrap gap-2.5">
              {st.options!.map((o) => (
                <Pill key={o} active={valueOf(st.key) === o} onClick={() => choosePill(st, o)}>
                  {o}
                </Pill>
              ))}
            </div>
            {st.key === "c_hasCard" && f.c_hasCard === "Yes" && (
              <Note>
                With a travel rewards card we typically recommend a consultation so we can maximize points earning and
                ensure you receive any travel protections through your card.
              </Note>
            )}
            {st.key === "c_hasCard" && f.c_hasCard === "No" && (
              <Note>Without a travel rewards card, we typically recommend our full-service booking option.</Note>
            )}
          </>
        );

      case "points":
        return (
          <>
            <SubLabel>Transferable credit card points</SubLabel>
            <div className="flex flex-wrap gap-2.5">
              {TRANSFERABLE.map((o) => (
                <Pill key={o} active={points.includes(o)} onClick={() => togglePoint(o)}>
                  {o}
                </Pill>
              ))}
            </div>
            <SubLabel>Airline miles</SubLabel>
            <div className="flex flex-wrap gap-2.5">
              {AIRLINE_MILES.map((o) => (
                <Pill key={o} active={points.includes(o)} onClick={() => togglePoint(o)}>
                  {o}
                </Pill>
              ))}
            </div>
          </>
        );

      case "textarea":
        return <Area value={f[st.key]} onChange={set(st.key)} placeholder={st.placeholder} />;

      case "review":
        return (
          <div>
            <div className="rounded-xl" style={{ border: "1px solid rgba(1,42,140,0.1)", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", background: C.blueLight, fontSize: 13, fontWeight: 600, color: C.blueMid }}>
                Search type: {method === "miles" ? "Miles & Points" : "Cash Fare"}
              </div>
              {steps
                .filter((s) => !["method", "review"].includes(s.kind))
                .map((s) => {
                  const v = s.kind === "points" ? points.join(", ") : valueOf(s.key);
                  if (!v || !v.trim()) return null;
                  return (
                    <div key={s.key} className="flex gap-4" style={{ padding: "11px 16px", borderTop: "1px solid rgba(1,42,140,0.06)", fontSize: 13.5 }}>
                      <span style={{ color: C.inkMuted, flex: "0 0 42%" }}>{s.label}</span>
                      <span style={{ color: C.ink }}>{v}</span>
                    </div>
                  );
                })}
            </div>
            <Note>
              The more flexibility you provide with airports, dates, airlines, and routing, the more options we can find.
              More constraints generally result in fewer options and higher prices.
            </Note>
            {error && (
              <p className="mt-4" style={{ color: "#B00020", fontSize: 13.5 }}>
                {error}
              </p>
            )}
          </div>
        );

      default:
        // text / number / email / tel
        return (
          <Text
            value={f[st.key]}
            onChange={set(st.key)}
            onEnter={next}
            placeholder={st.placeholder}
            type={st.kind === "number" ? "number" : st.kind === "email" ? "email" : st.kind === "tel" ? "tel" : "text"}
            autoFocus
          />
        );
    }
  };

  return (
    <main style={{ background: C.cream, minHeight: "100vh" }}>
      {/* NAV */}
      <nav
        className="flex items-center justify-between h-[72px]"
        style={{ paddingLeft: "clamp(20px, 5vw, 48px)", paddingRight: "clamp(20px, 5vw, 48px)" }}
      >
        <Link href="/" className="flex items-center gap-2.5 shrink-0" style={{ textDecoration: "none" }}>
          <img src="/ilmundo_transp_blue.png" alt="ilmundo" style={{ width: 32, height: 32, objectFit: "contain" }} />
          <span style={{ ...WORDMARK, fontSize: 17, color: C.blue }}>ilmundo</span>
        </Link>
      </nav>

      <section style={{ paddingTop: "clamp(24px, 5vw, 56px)", paddingBottom: "clamp(56px, 10vw, 110px)" }}>
        <div className="mx-auto px-6 sm:px-8" style={{ maxWidth: 640 }}>
          {submitted ? (
            <div
              className="rounded-2xl text-center"
              style={{ background: C.white, padding: "56px 32px", boxShadow: "0 1px 14px rgba(1,42,140,0.06)" }}
            >
              <div
                className="mx-auto mb-6 flex items-center justify-center rounded-full"
                style={{ width: 56, height: 56, background: C.blueLight }}
              >
                <Check size={26} style={{ color: C.blue }} />
              </div>
              <h2 style={{ ...SERIF, fontSize: "2rem", color: C.blue, marginBottom: 12 }}>Request received!</h2>
              <p style={{ fontSize: "0.97rem", lineHeight: 1.7, color: C.inkSoft, maxWidth: 420, margin: "0 auto" }}>
                Thank you — our team will review your trip and get back to you with the best options shortly.
              </p>
              <Link
                href="/"
                className="inline-flex items-center rounded-full mt-8"
                style={{ fontSize: 14, fontWeight: 500, padding: "12px 26px", background: C.blue, color: C.cream, textDecoration: "none" }}
              >
                Back to home
              </Link>
            </div>
          ) : (
            <>
              {/* PROGRESS */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="uppercase" style={{ fontSize: 11, letterSpacing: "0.16em", color: C.inkMuted, fontWeight: 600 }}>
                    {current.section}
                  </span>
                  <span style={{ fontSize: 12, color: C.inkMuted }}>
                    {safeStep + 1} / {total}
                  </span>
                </div>
                <div style={{ height: 4, borderRadius: 999, background: "rgba(1,42,140,0.1)", overflow: "hidden" }}>
                  <motion.div
                    animate={{ width: `${(safeStep / (total - 1)) * 100}%` }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: "100%", background: C.blue }}
                  />
                </div>
              </div>

              {/* QUESTION */}
              <div style={{ minHeight: 240 }}>
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={current.key}
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {current.kind === "method" ? (
                      <h1 className="mb-2" style={{ ...SERIF, fontSize: "clamp(1.9rem, 5vw, 2.6rem)", lineHeight: 1.15, color: C.blue }}>
                        How would you like us to search?
                      </h1>
                    ) : current.kind === "review" ? (
                      <h1 className="mb-2" style={{ ...SERIF, fontSize: "clamp(1.9rem, 5vw, 2.6rem)", lineHeight: 1.15, color: C.blue }}>
                        Review your request
                      </h1>
                    ) : (
                      <h1 className="mb-2" style={{ ...SERIF, fontSize: "clamp(1.7rem, 4.5vw, 2.4rem)", lineHeight: 1.18, color: C.blue }}>
                        {current.label}
                      </h1>
                    )}
                    {current.hint && (
                      <p className="mb-6" style={{ fontSize: 14, color: C.inkMuted, fontStyle: "italic", lineHeight: 1.6, maxWidth: 520 }}>
                        {current.hint}
                      </p>
                    )}
                    {current.kind !== "method" && current.kind !== "review" && !current.hint && <div className="mb-6" />}
                    {current.kind === "method" && <div className="mb-6" />}
                    {current.kind === "review" && <div className="mb-6" />}

                    {renderStep(current)}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* CONTROLS */}
              <div className="flex items-center justify-between mt-10">
                {safeStep > 0 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex items-center gap-1.5"
                    style={{ fontSize: 14, color: C.inkSoft, background: "none", border: "none", cursor: "pointer", padding: "8px 4px" }}
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : (
                  <span />
                )}

                {current.kind === "review" ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={sending}
                    className="inline-flex items-center gap-2 rounded-full"
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      padding: "13px 32px",
                      background: C.blue,
                      color: C.cream,
                      border: "none",
                      cursor: sending ? "default" : "pointer",
                      opacity: sending ? 0.6 : 1,
                    }}
                  >
                    {sending ? "Sending…" : "Submit request"}
                  </button>
                ) : current.kind === "method" ? null : (
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canAdvance}
                    className="inline-flex items-center gap-2 rounded-full"
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      padding: "13px 30px",
                      background: canAdvance ? C.blue : "rgba(1,42,140,0.25)",
                      color: C.cream,
                      border: "none",
                      cursor: canAdvance ? "pointer" : "default",
                      transition: "background 0.2s ease",
                    }}
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
