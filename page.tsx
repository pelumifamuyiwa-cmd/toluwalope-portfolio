"use client";
import { useState, useEffect, useRef } from "react";

function useInView(t = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0, x = 0, y = 28 }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : `translate(${x}px,${y}px)`, transition: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

function Counter({ end, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, vis] = useInView();
  useEffect(() => {
    if (!vis) return;
    let v = 0;
    const t = setInterval(() => { v += end / 45; if (v >= end) { setVal(end); clearInterval(t); } else setVal(Math.floor(v)); }, 28);
    return () => clearInterval(t);
  }, [vis]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const PROJECTS = [
  { n: "AI Order Summary Agent", cat: "AI AUTOMATION", desc: "Autonomous n8n pipeline that monitors orders, synthesises intelligent summaries via Claude AI, and dispatches structured reports — zero manual intervention.", tags: ["n8n", "Claude AI", "Email API"], color: "#7c3aed" },
  { n: "Tinuola School Platform", cat: "WEB APPLICATION", desc: "Role-gated academic portal with real-time grade monitoring for parents, teachers, and administrators with granular access control layers.", tags: ["Next.js", "Supabase", "Vercel"], color: "#0891b2" },
  { n: "WhatsApp & Telegram Bots", cat: "CONVERSATIONAL AI", desc: "24/7 intelligent bots handling order intake, automated customer replies, and business communication pipelines across messaging platforms.", tags: ["n8n", "WhatsApp API", "Telegram API"], color: "#059669" },
  { n: "Sales CRM System", cat: "CRM", desc: "End-to-end CRM with automated monthly reporting, pipeline visualisation, and analytics — replacing fragmented spreadsheet workflows.", tags: ["Next.js", "Supabase", "n8n"], color: "#d97706" },
  { n: "App Integration Suite", cat: "WORKFLOW AUTOMATION", desc: "Multi-system automation connecting WhatsApp → Sheets → Email, form syncing to databases, and Paystack routing to accounting tools.", tags: ["n8n", "Google Sheets", "Paystack"], color: "#dc2626" },
  { n: "Logistics Tracking Platform", cat: "WEB APPLICATION", desc: "Real-time shipment system unifying admin, 30+ logistics partners, and customers on one platform with live status updates and audit trails.", tags: ["Next.js", "Supabase", "Vercel"], color: "#2563eb" },
  { n: "AI Proposal Generator", cat: "AI AUTOMATION", desc: "Intelligent pipeline that reads client intake forms and autonomously generates fully structured business proposals in seconds.", tags: ["Claude AI", "n8n", "Google Forms"], color: "#7c3aed" },
];

const SERVICES = [
  ["Logistics & Order Tracking", "₦400k – ₦1.2M", "Hot"],
  ["SaaS Platform Development", "₦2M – ₦6M+", "Enterprise"],
  ["AI Automation & Agents", "₦400k – ₦1M", "Hot"],
  ["CRM Systems", "₦600k – ₦1.5M", ""],
  ["Chatbot Development", "₦300k – ₦800k", "Hot"],
  ["E-commerce Platforms", "₦400k – ₦1M", ""],
  ["Marketplace Platforms", "₦1.2M – ₦3M", ""],
  ["NGO & Crowdfunding", "₦1M – ₦2.5M", ""],
  ["AI Business Integrations", "₦500k – ₦1.2M", ""],
  ["Admin Dashboards", "₦300k – ₦700k", ""],
  ["Custom Business Platforms", "₦1M – ₦4M+", "Enterprise"],
];

const FAQS = [
  ["What types of projects do you take on?", "I work on AI automation, chatbots, full SaaS platforms, CRM systems, logistics tracking, e-commerce stores, NGO platforms, and more. If it's a digital business challenge, I can solve it."],
  ["How long does a project take?", "Timelines depend on scope. A simple dashboard takes 2–3 weeks. A full platform takes 6–12 weeks. I always provide a clear timeline in the proposal before we begin."],
  ["Do you work with clients outside Nigeria?", "Yes. I work with clients across Africa and beyond. Communication is via WhatsApp or email, and payment is flexible."],
  ["What happens after delivery?", "I offer monthly retainer plans starting at ₦50k/month for bug fixes, updates, and ongoing support. You're never left without help after launch."],
  ["How do I get started?", "Reach out via WhatsApp or email. We'll have a discovery call, I'll send a detailed proposal, and once agreed we kick off within 48 hours."],
];

// ── Premium UI Components ──────────────────────────────

function LogisticsDashboard() {
  const routes = [
    { from: "Lagos", to: "Abuja", rider: "Emeka O.", status: "In Transit", pct: 68, orders: 12, color: "#f59e0b" },
    { from: "Ibadan", to: "Port Harcourt", rider: "Chukwu A.", status: "Delivered", pct: 100, orders: 8, color: "#22c55e" },
    { from: "Kano", to: "Enugu", rider: "Musa I.", status: "Pending Pickup", pct: 15, orders: 5, color: "#6366f1" },
    { from: "Osogbo", to: "Benin", rider: "Tunde F.", status: "Out for Delivery", pct: 85, orders: 9, color: "#3b82f6" },
  ];
  return (
    <div style={{ background: "linear-gradient(160deg,#0d0d14 0%,#111018 100%)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, overflow: "hidden", fontFamily: "inherit" }}>
      {/* Header bar */}
      <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: "#ef4444" }} />
          <div style={{ width: 8, height: 8, borderRadius: 2, background: "#f59e0b" }} />
          <div style={{ width: 8, height: 8, borderRadius: 2, background: "#22c55e" }} />
          <span style={{ fontSize: 11, color: "#374151", marginLeft: 8, fontWeight: 600, letterSpacing: 1 }}>LOGISTICS CONTROL · LIVE</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
          <span style={{ fontSize: 10, color: "#22c55e", fontWeight: 700 }}>34 ACTIVE</span>
        </div>
      </div>
      {/* Metrics row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        {[["1,240", "Total Orders"], ["30", "Partners"], ["97.2%", "On-Time Rate"], ["₦48.2M", "Volume"]].map(([v, l], i) => (
          <div key={i} style={{ padding: "16px 16px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-1px" }}>{v}</div>
            <div style={{ fontSize: 9, color: "#374151", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>
      {/* Routes */}
      <div style={{ padding: "12px 16px" }}>
        {routes.map((r, i) => (
          <div key={i} style={{ padding: "10px 0", borderBottom: i < routes.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: r.color, boxShadow: `0 0 6px ${r.color}88` }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>{r.from}</span>
                <svg width="16" height="8" viewBox="0 0 16 8"><path d="M0 4h13M10 1l3 3-3 3" stroke="#374151" strokeWidth="1.2" fill="none" strokeLinecap="round"/></svg>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>{r.to}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 10, color: "#374151" }}>{r.rider}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: r.color, background: r.color + "15", padding: "3px 8px", borderRadius: 6 }}>{r.status}</span>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 100, height: 3, overflow: "hidden" }}>
              <div style={{ width: `${r.pct}%`, height: "100%", background: `linear-gradient(90deg, ${r.color}88, ${r.color})`, borderRadius: 100, transition: "width 1.5s ease" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationFlow() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(v => (v + 1) % 4), 1800);
    return () => clearInterval(t);
  }, []);
  const nodes = [
    { label: "WhatsApp", sub: "Trigger", color: "#25d366", bg: "#25d36615" },
    { label: "n8n", sub: "Process", color: "#ea4b71", bg: "#ea4b7115" },
    { label: "Claude AI", sub: "Analyse", color: "#cc9b7a", bg: "#cc9b7a15" },
    { label: "Deliver", sub: "Email + Sheets", color: "#6366f1", bg: "#6366f115" },
  ];
  return (
    <div style={{ background: "linear-gradient(160deg,#0d0d14,#111018)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, overflow: "hidden", padding: "20px" }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#374151", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Automation Pipeline · Live</div>
      {/* Flow nodes */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 24 }}>
        {nodes.map((n, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: n.bg, border: `1.5px solid ${n.color}40`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 6, position: "relative", boxShadow: tick === i ? `0 0 20px ${n.color}44` : "none", transition: "box-shadow 0.4s" }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: n.color, opacity: tick === i ? 1 : 0.3, transition: "opacity 0.4s", boxShadow: tick === i ? `0 0 10px ${n.color}` : "none" }} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: tick === i ? "#fff" : "#4b5563", transition: "color 0.4s", textAlign: "center" }}>{n.label}</div>
              <div style={{ fontSize: 9, color: "#1f2937", fontWeight: 500, marginTop: 1 }}>{n.sub}</div>
            </div>
            {i < nodes.length - 1 && (
              <div style={{ width: 24, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="20" height="8" viewBox="0 0 20 8"><path d="M0 4h16M13 1l3 3-3 3" stroke={tick > i ? "#6366f1" : "#1f2937"} strokeWidth="1.5" fill="none" strokeLinecap="round" style={{ transition: "stroke 0.4s" }}/></svg>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Log */}
      <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 12, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.04)" }}>
        {[{ t: "10:42:31", msg: "Order #4821 received via WhatsApp", c: "#25d366" }, { t: "10:42:33", msg: "n8n workflow triggered — processing", c: "#ea4b71" }, { t: "10:42:35", msg: "Claude AI summary generated (0.8s)", c: "#cc9b7a" }, { t: "10:42:36", msg: "Report dispatched to admin@co.com", c: "#6366f1" }].map((l, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "5px 0", opacity: tick >= i ? 1 : 0.2, transition: "opacity 0.4s" }}>
            <span style={{ fontSize: 10, color: "#1f2937", fontFamily: "monospace", flexShrink: 0 }}>{l.t}</span>
            <span style={{ fontSize: 10, color: l.c, fontWeight: 500 }}>●</span>
            <span style={{ fontSize: 10, color: "#4b5563" }}>{l.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlatformShowcase() {
  const [active, setActive] = useState(0);
  const platforms = [
    { name: "CRM System", color: "#d97706", metrics: [["124", "Active Leads"], ["₦8.4M", "Pipeline"], ["78%", "Win Rate"], ["32", "Closed"]] },
    { name: "School Portal", color: "#0891b2", metrics: [["340", "Students"], ["98%", "Attendance"], ["A+", "Top Grade"], ["12", "Classes"]] },
    { name: "NGO Platform", color: "#059669", metrics: [["₦12.6M", "Raised"], ["3,200", "Donors"], ["8", "Campaigns"], ["94%", "Goal Met"]] },
  ];
  const p = platforms[active];
  return (
    <div style={{ background: "linear-gradient(160deg,#0d0d14,#111018)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 6 }}>
        {platforms.map((pl, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ background: active === i ? pl.color + "18" : "transparent", border: `1px solid ${active === i ? pl.color + "40" : "rgba(255,255,255,0.06)"}`, color: active === i ? pl.color : "#374151", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>{pl.name}</button>
        ))}
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {p.metrics.map(([v, l], i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#f1f5f9", letterSpacing: "-1px", lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 9, color: "#374151", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginTop: 5 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: "#4b5563" }}>System operational · Last updated just now</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
    const onM = e => setMouse({ x: e.clientX, y: e.clientY });
    const onS = () => setScrolled(window.scrollY > 50);
    window.addEventListener("mousemove", onM);
    window.addEventListener("scroll", onS);
    return () => { window.removeEventListener("mousemove", onM); window.removeEventListener("scroll", onS); };
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#06060a", color: "#fff", WebkitFontSmoothing: "antialiased", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px;background:#06060a}
        ::-webkit-scrollbar-thumb{background:#1a1a2e;border-radius:4px}
        @keyframes pulse{0%,100%{box-shadow:0 0 5px #22c55e}50%{box-shadow:0 0 14px #22c55e,0 0 28px #22c55e44}}
        @keyframes shimmer{0%,100%{background-position:0%}50%{background-position:100%}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes glow{0%,100%{opacity:.35}50%{opacity:.7}}
        .cta{background:#7c3aed;color:#fff;border:none;padding:13px 28px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 4px 20px rgba(124,58,237,.35);letter-spacing:-.2px}
        .cta:hover{transform:translateY(-2px);box-shadow:0 14px 36px rgba(124,58,237,.55)}
        .ghost{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);color:#9ca3af;padding:13px 28px;border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .2s}
        .ghost:hover{background:rgba(255,255,255,.08);color:#fff}
        .nav-link{color:#4b5563;font-size:13px;font-weight:500;cursor:pointer;background:none;border:none;font-family:inherit;transition:color .2s;padding:6px 4px}
        .nav-link:hover{color:#e5e7eb}
        .proj-card:hover{border-color:rgba(255,255,255,.11)!important;background:rgba(255,255,255,.03)!important;transform:translateY(-2px)}
        .proj-card{transition:all .25s!important}
        .srv-row:hover{background:rgba(124,58,237,.05)!important}
        .srv-row:hover .sn{color:#fff!important}
        .srv-row:hover .sp{color:#a78bfa!important}
      `}</style>

      {/* CURSOR GLOW */}
      <div style={{ position: "fixed", top: mouse.y - 200, left: mouse.x - 200, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,.05) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0, transition: "top .1s,left .1s" }} />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", background: scrolled ? "rgba(6,6,10,.92)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,.05)" : "none", transition: "all .4s", opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(-16px)" }}>
        <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-.5px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Toluwalope<span style={{ color: "#7c3aed" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Work", "Services", "About", "FAQ"].map(n => <button key={n} className="nav-link" onClick={() => go(n.toLowerCase())}>{n}</button>)}
        </div>
        <button className="cta" onClick={() => go("contact")} style={{ padding: "9px 20px", fontSize: 13 }}>Start a Project →</button>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "120px 32px 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.016) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "25%", left: "25%", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,.09) 0%,transparent 65%)", animation: "glow 5s ease infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "18%", width: 400, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.06) 0%,transparent 65%)", animation: "glow 6s ease infinite 1.5s", pointerEvents: "none" }} />

        <div style={{ position: "relative", textAlign: "center", maxWidth: 800 }}>
          <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)", transition: "all .7s ease .1s", display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.18)", borderRadius: 100, padding: "7px 18px", fontSize: 12, color: "#a78bfa", fontWeight: 500, marginBottom: 36, letterSpacing: .3 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite" }} />
            Open to new projects · Osogbo, Nigeria
          </div>

          <h1 style={{ fontSize: "clamp(46px,7vw,80px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-4px", marginBottom: 24, opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(32px)", transition: "all .9s cubic-bezier(.16,1,.3,1) .2s" }}>
            Building systems<br />
            <span style={{ background: "linear-gradient(135deg,#ddd6fe 0%,#a78bfa 30%,#7c3aed 65%,#4f46e5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200%", animation: "shimmer 5s ease infinite" }}>that scale.</span>
          </h1>

          <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 48px", fontWeight: 400, opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)", transition: "all .8s cubic-bezier(.16,1,.3,1) .35s" }}>
            Workflow automation engineer helping startups <span style={{ color: "#c4b5fd", fontWeight: 600 }}>10× revenue</span> through AI-powered platforms, scalable SaaS, and intelligent automation.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)", transition: "all .8s ease .48s" }}>
            <button className="cta" onClick={() => go("contact")} style={{ padding: "15px 38px", fontSize: 15, borderRadius: 11 }}>Start a project →</button>
            <button className="ghost" onClick={() => go("work")}>See my work</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 64, marginTop: 80, opacity: mounted ? 1 : 0, transition: "opacity 1.2s ease 1s", flexWrap: "wrap", justifyContent: "center" }}>
          {[[7, "+", "Projects Delivered"], [100, "%", "Client Satisfaction"], [11, "+", "Services Offered"], [3, "yrs", "Experience"]].map(([v, s, l], i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-2px", color: "#fff", lineHeight: 1 }}><Counter end={v} suffix={s} /></div>
              <div style={{ fontSize: 10, color: "#374151", fontWeight: 600, marginTop: 5, textTransform: "uppercase", letterSpacing: 1.2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE SECTIONS */}
      <div id="work" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 48px" }}>

        {/* Block 1: Automation */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center", padding: "80px 0 100px" }}>
          <Reveal>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#7c3aed", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 18 }}>AI Automation</div>
              <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-2.5px", lineHeight: 1.05, marginBottom: 20 }}>Automate everything.<br />Manually nothing.</h2>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.85, marginBottom: 32 }}>I build intelligent automation pipelines that eliminate repetitive work entirely. AI agents that generate reports, bots that handle orders round the clock, and workflows that connect every tool in your stack.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["n8n Workflows", "Claude AI Agents", "WhatsApp Bots", "Email Automation", "Form Processing"].map(t => (
                  <span key={t} style={{ background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.15)", color: "#a78bfa", fontSize: 11, padding: "5px 12px", borderRadius: 8, fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15} x={32} y={0}>
            <AutomationFlow />
          </Reveal>
        </div>

        {/* Block 2: Logistics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center", padding: "0 0 100px" }}>
          <Reveal delay={0.1} x={-32} y={0}>
            <LogisticsDashboard />
          </Reveal>
          <Reveal delay={0.2}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#2563eb", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 18 }}>Tracking Systems</div>
              <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-2.5px", lineHeight: 1.05, marginBottom: 20 }}>Real-time visibility.<br />Every shipment.</h2>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.85, marginBottom: 32 }}>Connect your admin, 30+ logistics partners, and customers on one unified platform. Live status tracking, delivery confirmations, and full audit trails — replacing WhatsApp chaos entirely.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Live Tracking", "30+ Partners", "Customer Portal", "Admin Control", "Audit Trails"].map(t => (
                  <span key={t} style={{ background: "rgba(37,99,235,.08)", border: "1px solid rgba(37,99,235,.15)", color: "#60a5fa", fontSize: 11, padding: "5px 12px", borderRadius: 8, fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Block 3: Platforms */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center", padding: "0 0 100px" }}>
          <Reveal>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#059669", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 18 }}>SaaS & Platforms</div>
              <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-2.5px", lineHeight: 1.05, marginBottom: 20 }}>Scalable platforms<br />built to grow.</h2>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.85, marginBottom: 32 }}>From CRM systems and school portals to NGO crowdfunding platforms and marketplaces — I build complete digital infrastructure that powers real businesses at scale.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Next.js", "Supabase", "Vercel", "Paystack", "Role-Based Access"].map(t => (
                  <span key={t} style={{ background: "rgba(5,150,105,.08)", border: "1px solid rgba(5,150,105,.15)", color: "#34d399", fontSize: 11, padding: "5px 12px", borderRadius: 8, fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15} x={32} y={0}>
            <PlatformShowcase />
          </Reveal>
        </div>
      </div>

      {/* ALL PROJECTS */}
      <section style={{ padding: "80px 48px 100px", maxWidth: 1140, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#7c3aed", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 12 }}>Portfolio</div>
              <h2 style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-2.5px" }}>All {PROJECTS.length} projects.</h2>
            </div>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: 14 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={i} delay={i * 0.055}>
              <div className="proj-card" style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 18, padding: 26, height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, boxShadow: `0 0 10px ${p.color}88` }} />
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#374151", letterSpacing: 1.5, textTransform: "uppercase" }}>{p.cat}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 10, letterSpacing: "-.3px", lineHeight: 1.3 }}>{p.n}</div>
                <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.78, marginBottom: 18 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.tags.map(t => <span key={t} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", color: "#6b7280", fontSize: 11, padding: "3px 9px", borderRadius: 6, fontWeight: 500 }}>{t}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "80px 48px 100px", maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#7c3aed", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>Services</div>
            <h2 style={{ fontSize: 46, fontWeight: 900, letterSpacing: "-2.5px", lineHeight: 1.03, marginBottom: 14 }}>What I build.</h2>
            <p style={{ fontSize: 15, color: "#4b5563", maxWidth: 400, lineHeight: 1.75 }}>Complete digital infrastructure — from AI automation to enterprise SaaS.</p>
          </div>
        </Reveal>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.06)" }}>
          {SERVICES.map(([name, price, badge], i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="srv-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "19px 16px", borderBottom: "1px solid rgba(255,255,255,.04)", borderRadius: 8, cursor: "default", transition: "all .2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <span style={{ fontSize: 11, color: "#1f2937", fontWeight: 700, minWidth: 26, fontVariantNumeric: "tabular-nums" }}>{"0" + (i + 1)}</span>
                  <span className="sn" style={{ fontSize: 15, fontWeight: 600, color: "#9ca3af", transition: "color .2s" }}>{name}</span>
                  {badge && <span style={{ fontSize: 9, fontWeight: 800, color: badge === "Hot" ? "#ef4444" : "#f59e0b", background: badge === "Hot" ? "rgba(239,68,68,.1)" : "rgba(245,158,11,.1)", border: `1px solid ${badge === "Hot" ? "rgba(239,68,68,.2)" : "rgba(245,158,11,.2)"}`, padding: "2px 7px", borderRadius: 6, letterSpacing: 1, textTransform: "uppercase" }}>{badge}</span>}
                </div>
                <span className="sp" style={{ fontSize: 13, fontWeight: 700, color: "#374151", transition: "color .2s" }}>{price}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[["Basic", "₦50k/mo", "Bug fixes & minor updates"], ["Standard", "₦100–150k/mo", "Priority support + features"], ["Premium", "₦200–350k/mo", "Full support & fast response"]].map(([tier, price, desc], i) => (
              <div key={i} style={{ background: "linear-gradient(135deg,rgba(124,58,237,.06),rgba(79,70,229,.04))", border: "1px solid rgba(124,58,237,.12)", borderRadius: 16, padding: "22px 20px", transition: "all .25s" }}>
                <div style={{ fontSize: 9, fontWeight: 800, color: "#6b21a8", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Retainer · {tier}</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#a78bfa", letterSpacing: "-1.5px", marginBottom: 8 }}>{price}</div>
                <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "80px 48px 100px", maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 80, alignItems: "center" }}>
          <Reveal>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#7c3aed", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 18 }}>About</div>
              <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-2.5px", lineHeight: 1.06, marginBottom: 22 }}>Building the future of business operations.</h2>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.9, marginBottom: 16 }}>I'm a workflow automation engineer and AI solutions architect based in Osogbo, Nigeria. I design and deliver end-to-end digital infrastructure — from AI agents and chatbots to full SaaS platforms and CRM systems.</p>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.9, marginBottom: 32 }}>I don't just write code — I architect systems that work for you 24/7. Every solution is built to scale, optimised for performance, and designed to generate measurable revenue.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Next.js", "React", "Supabase", "Vercel", "n8n", "Claude AI", "Paystack", "Flutterwave", "GitHub", "WhatsApp API", "Telegram API", "Google Sheets"].map((s, i) => (
                  <span key={i} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", color: "#6b7280", fontSize: 12, padding: "6px 13px", borderRadius: 8, fontWeight: 500 }}>{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ background: "linear-gradient(160deg,#0d0d14,#111018)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#374151", letterSpacing: 2, textTransform: "uppercase" }}>Process</span>
              </div>
              {["Discovery", "Proposal", "Agreement", "Development", "Testing", "Deployment", "Handover", "Support"].map((s, i) => (
                <div key={i} style={{ padding: "13px 20px", borderBottom: i < 7 ? "1px solid rgba(255,255,255,.03)" : "none", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 7, background: "rgba(124,58,237,.12)", border: "1px solid rgba(124,58,237,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#7c3aed", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#6b7280" }}>{s}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 48px 100px", maxWidth: 760, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#7c3aed", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>FAQ</div>
            <h2 style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-2.5px", lineHeight: 1.04 }}>Frequently asked<br />questions.</h2>
          </div>
        </Reveal>
        {FAQS.map(([q, a], i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ borderBottom: "1px solid rgba(255,255,255,.05)", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 4px" }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: openFaq === i ? "#f1f5f9" : "#9ca3af", transition: "color .2s", flex: 1, paddingRight: 24, lineHeight: 1.4 }}>{q}</span>
                <div style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .3s", transform: openFaq === i ? "rotate(45deg)" : "none", background: openFaq === i ? "rgba(124,58,237,.15)" : "transparent" }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke={openFaq === i ? "#a78bfa" : "#374151"} strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
              </div>
              <div style={{ maxHeight: openFaq === i ? 160 : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.16,1,.3,1)" }}>
                <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.85, paddingBottom: 22, paddingRight: 36 }}>{a}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "80px 48px 120px", maxWidth: 820, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: "linear-gradient(135deg,rgba(124,58,237,.07) 0%,rgba(79,70,229,.05) 100%)", border: "1px solid rgba(124,58,237,.13)", borderRadius: 28, padding: "72px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,.12) 0%,transparent 70%)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#7c3aed", letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 20 }}>Get in Touch</div>
              <h2 style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-3px", lineHeight: 1.02, marginBottom: 16 }}>
                Let's build<br />
                <span style={{ background: "linear-gradient(135deg,#ddd6fe,#a78bfa,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>something great.</span>
              </h2>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.78, maxWidth: 380, margin: "0 auto 48px" }}>Ready to automate your operations and scale your revenue? Reach out and let's talk about your next project.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 40, textAlign: "left" }}>
                {[["WhatsApp", "09060473816", "Preferred contact"], ["Email", "elegbeleyetoluwalope\n@gmail.com", "Formal inquiries"], ["Location", "Osogbo, Osun State\nNigeria", "West Africa"]].map(([label, val, sub], i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 14, padding: "18px 18px" }}>
                    <div style={{ fontSize: 9, color: "#374151", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>{label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#e5e7eb", lineHeight: 1.4, whiteSpace: "pre-line" }}>{val}</div>
                    <div style={{ fontSize: 10, color: "#1f2937", marginTop: 4 }}>{sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button className="cta" style={{ padding: "14px 40px", fontSize: 15, borderRadius: 11 }}>Send a message →</button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.05)", padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-.5px" }}>Toluwalope<span style={{ color: "#7c3aed" }}>.</span></span>
        <div style={{ display: "flex", gap: 28 }}>
          {["Work", "Services", "About", "FAQ", "Contact"].map(n => (
            <span key={n} onClick={() => go(n.toLowerCase())} style={{ fontSize: 12, color: "#374151", cursor: "pointer", fontWeight: 500 }}>{n}</span>
          ))}
        </div>
        <span style={{ fontSize: 11, color: "#1f2937" }}>© 2026 · All rights reserved</span>
      </footer>
    </div>
  );
}