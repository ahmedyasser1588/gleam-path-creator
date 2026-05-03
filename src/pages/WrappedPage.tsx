import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Heart, MessageCircle, Sparkles, Clock, Zap, Users,
  TrendingUp, Calendar, HelpCircle, Crown, ArrowRight,
  CheckCircle2, XCircle, Trophy, Flame, Star,
  Phone, MapPin, Infinity as InfinityIcon, Car,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ---------------------------------- DATA ---------------------------------- */

const QUIZ = [
  {
    q: "تتوقعي عملنا كام رساله في السنه دي سوا ؟",
    options: ["75,300","89,420", "160,718", "210,500"],
    answer: 2,
    hint: "من اول يوم 3 خمسه 2025 لحد 3 خمسه 2026",
  },
  {
    q: "Who sent more media (Photos & Videos & Links)?",
    options: ["Ahmed", "Esraa", "Equal"],
    answer: 0,
    hint: "من اول يوم 3 خمسه 2025 لحد 3 خمسه 2026",
  },
  {
    q: "خمني اكتر يوم اتكلمنا فيه علي مدار السنه طب؟",
    options: ["14-01-2026", "10-04-2026", "16-06-2025", "30-04-2025"],
    answer: 2,
    hint: "من اول يوم 3 خمسه 2025 لحد 3 خمسه 2026",
  },
  {
    q: "مين قال للتاني (بحبك -بعشقك -بموت فيك ) اكتر؟",
    options: ["Ahmed", "Esraa", "Equal"],
    answer: 0,
    hint: "ملحوظه احنا الاتنين قايلين لبعض اكتر من 700 مره",
  },
  {
    q: "تتوقعي اي اكتر يوم بنتكلم فيه واتس ",
    options: ["Friday", "Saturday", "Sunday", "thursday"],
    answer: 1,
    hint: "",
  },
];

const EMOJIS: { e: string; n: number }[] = [
  { e: "♥", n: 8143 },
  { e: "😂", n: 5081 },
  { e: "🫂", n: 2403 },
  { e: "😘", n: 2006 },
  { e: "😚", n: 486 },
  { e: "🥰", n: 156 },
  { e: "😍", n: 110 },
  { e: "✨", n: 106 },
  
];

/* -------------------------------- HELPERS --------------------------------- */

const fireConfetti = () => {
  const end = Date.now() + 1200;
  const colors = ["#f5c0d4", "#e8a87c", "#d4af37", "#ffd9e8"];
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
};

const useCountUp = (target: number, duration = 1600, start = true) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
};

/* --------------------------------- QUIZ ----------------------------------- */

const Quiz = ({ onFinish }: { onFinish: (score: number) => void }) => {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const q = QUIZ[idx];
  const isLast = idx === QUIZ.length - 1;

  const handlePick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (isLast) onFinish(i === q.answer ? score + 1 : score);
      else {
        setIdx((x) => x + 1);
        setPicked(null);
      }
    }, 1400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* gold orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, #d4af37, transparent 65%)" }} />
        <div className="absolute bottom-0 -right-20 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, #f5a3c7, transparent 65%)" }} />
      </div>

      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl"
      >
        <div className="rounded-3xl p-1"
          style={{ background: "linear-gradient(135deg, #d4af37, #f5a3c7, #d4af37)" }}>
          <div className="rounded-3xl bg-[#0e0a14]/95 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-200/80 font-body">
                Question {idx + 1} / {QUIZ.length}
              </span>
              <div className="flex gap-1.5">
                {QUIZ.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${
                    i < idx ? "w-6 bg-amber-300" : i === idx ? "w-10 bg-amber-200" : "w-6 bg-white/15"
                  }`} />
                ))}
              </div>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl text-amber-50 leading-tight mb-2">
              {q.q}
            </h2>
            <p className="text-rose-200/60 text-sm mb-8 italic">{q.hint}</p>

            <div className="grid gap-3">
              {q.options.map((opt, i) => {
                const isCorrect = picked !== null && i === q.answer;
                const isWrong = picked === i && i !== q.answer;
                return (
                  <motion.button
                    key={i}
                    whileHover={picked === null ? { scale: 1.02, x: 4 } : {}}
                    whileTap={picked === null ? { scale: 0.98 } : {}}
                    onClick={() => handlePick(i)}
                    disabled={picked !== null}
                    className={`relative text-left px-5 py-4 rounded-2xl border transition-all flex items-center justify-between group ${
                      isCorrect ? "border-emerald-300/70 bg-emerald-400/15 text-emerald-100"
                      : isWrong ? "border-rose-400/70 bg-rose-400/15 text-rose-100"
                      : "border-amber-200/20 bg-white/5 text-amber-50 hover:border-amber-200/50 hover:bg-white/10"
                    }`}
                  >
                    <span className="font-body text-sm sm:text-base">{opt}</span>
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-300" />}
                    {isWrong && <XCircle className="w-5 h-5 text-rose-300" />}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ------------------------------ DASHBOARD UI ------------------------------ */

const Stat = ({ icon: Icon, label, value, suffix, delay = 0, accent = "rose" }: any) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const v = useCountUp(value, 1800, inView);
  const accents: any = {
    rose: "from-rose-400/30 to-pink-300/10",
    gold: "from-amber-300/30 to-yellow-200/10",
    plum: "from-fuchsia-400/30 to-purple-300/10",
  };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative rounded-3xl p-6 sm:p-7 overflow-hidden border border-amber-200/15 bg-white/[0.03] backdrop-blur-xl hover:border-amber-200/40 transition-all group"
    >
      <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-50 bg-gradient-to-br ${accents[accent]} group-hover:opacity-80 transition-opacity`} />
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-300/20 to-rose-300/20 border border-amber-200/30">
            <Icon className="w-5 h-5 text-amber-200" />
          </div>
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-amber-100/60 font-body">{label}</span>
        </div>
        <div className="font-display text-3xl sm:text-5xl text-amber-50 tabular-nums">
          {v.toLocaleString()}{suffix && <span className="text-amber-300/80 text-2xl sm:text-3xl ml-1">{suffix}</span>}
        </div>
      </div>
    </motion.div>
  );
};

const Section = ({ title, subtitle, icon: Icon, children }: any) => (
  <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-8 sm:mb-10"
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-amber-300" />
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-amber-200/70 font-body">{subtitle}</span>
      </div>
      <h2 className="font-display text-3xl sm:text-5xl bg-gradient-to-r from-amber-100 via-rose-200 to-amber-200 bg-clip-text text-transparent">
        {title}
      </h2>
    </motion.div>
    {children}
  </section>
);

/* --------------------------- LOVE COUNTER BARS --------------------------- */

const LoveBars = () => {
  const max = 1000;
  return (
    <div className="rounded-3xl p-6 sm:p-10 border border-amber-200/15 bg-white/[0.03] backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-5 h-5 text-rose-300 fill-rose-300" />
        <h3 className="font-display text-xl sm:text-2xl text-amber-50">"I love you" — Spoken into existence</h3>
      </div>
      {[
        { name: "Ahmed", value: 900, color: "from-amber-400 to-rose-400" },
        { name: "Esraa", value: 780, color: "from-rose-400 to-fuchsia-400" },
      ].map((p, i) => (
        <div key={p.name} className="mb-6 last:mb-0">
          <div className="flex justify-between items-baseline mb-2">
            <span className="font-display text-lg text-amber-100">{p.name}</span>
            <span className="font-display text-2xl sm:text-3xl text-amber-50 tabular-nums">{p.value}</span>
          </div>
          <div className="h-3 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(p.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.2 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full rounded-full bg-gradient-to-r ${p.color} shadow-[0_0_20px_rgba(244,114,182,0.5)]`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

/* ----------------------------- EMOJI ARCHIVE ----------------------------- */

const EmojiCloud = () => {
  const max = Math.max(...EMOJIS.map((x) => x.n));
  return (
    <div className="rounded-3xl p-6 sm:p-10 border border-amber-200/15 bg-white/[0.03] backdrop-blur-xl">
      <div className="flex flex-wrap gap-4 sm:gap-6 items-end justify-center">
        {EMOJIS.map((x, i) => {
          const scale = 0.7 + (x.n / max) * 1.8;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05, type: "spring" }}
              whileHover={{ scale: scale * 1.15, rotate: 5 }}
              className="flex flex-col items-center group cursor-default"
            >
              <span style={{ fontSize: `${scale * 1.8}rem`, lineHeight: 1 }}
                className="drop-shadow-[0_4px_20px_rgba(212,175,55,0.4)]">{x.e}</span>
              <span className="text-[10px] sm:text-xs text-amber-200/60 font-body tabular-nums mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {x.n.toLocaleString()}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* ----------------------------- COMMUTE JOURNEY ---------------------------- */

const CommuteSection = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.25 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const minutes = useCountUp(42876, 2200, inView);
  const hours = useCountUp(715, 1800, inView);

  return (
    <div ref={ref} className="rounded-3xl p-6 sm:p-10 border border-amber-200/15 bg-white/[0.03] backdrop-blur-xl relative overflow-hidden">
      {/* ambient glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, #d4af37, transparent 65%)" }} />

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 relative">
        <div className="rounded-2xl p-5 border border-amber-200/15 bg-white/[0.03] text-center">
          <Phone className="w-6 h-6 text-amber-300 mx-auto mb-2" />
          <div className="text-[10px] uppercase tracking-[0.25em] text-amber-100/60 mb-1">Total Minutes</div>
          <div className="font-display text-3xl sm:text-4xl text-amber-50 tabular-nums">{minutes.toLocaleString()}</div>
        </div>
        <div className="rounded-2xl p-5 border border-amber-200/15 bg-white/[0.03] text-center">
          <Clock className="w-6 h-6 text-amber-300 mx-auto mb-2" />
          <div className="text-[10px] uppercase tracking-[0.25em] text-amber-100/60 mb-1">Total Hours</div>
          <div className="font-display text-3xl sm:text-4xl text-amber-50 tabular-nums">{hours.toLocaleString()}<span className="text-amber-300/70 text-lg ml-1">h</span></div>
        </div>
        <div className="rounded-2xl p-5 border border-amber-300/40 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.18), rgba(245,163,199,0.12))" }}>
          <InfinityIcon className="w-6 h-6 text-amber-200 mx-auto mb-2" />
          <div className="text-[10px] uppercase tracking-[0.25em] text-amber-100/70 mb-1">Achievement</div>
          <div className="font-display text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-rose-200">
            30 Days Non-Stop
          </div>
        </div>
      </div>

      {/* The Commute Path */}
      <div className="relative h-48 sm:h-56 mb-6">
        <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="goldPath" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f5d97e" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#f5a3c7" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dashed path */}
          <motion.path
            d="M 80 100 Q 250 20, 400 100 T 720 100"
            fill="none"
            stroke="url(#goldPath)"
            strokeWidth="3"
            strokeDasharray="8 8"
            filter="url(#goldGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Endpoint dots */}
          <circle cx="80" cy="100" r="8" fill="#d4af37" filter="url(#goldGlow)" />
          <circle cx="720" cy="100" r="8" fill="#f5a3c7" filter="url(#goldGlow)" />
        </svg>

        {/* Animated heart car along path */}
        {inView && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            initial={{ left: "10%" }}
            animate={{ left: ["10%", "90%", "10%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 blur-lg bg-amber-300/60 rounded-full" />
              <div className="relative w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #f5d97e, #d4af37)" }}>
                <Heart className="w-5 h-5 text-rose-50 fill-rose-300" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Endpoints with tooltip */}
        {[
          { label: "New Cairo", side: "left-[6%]" },
          { label: "Sheikh Zayed", side: "right-[6%]" },
        ].map((p) => (
          <div key={p.label} className={`absolute top-1/2 ${p.side} -translate-y-1/2 group`}>
            <div className="flex flex-col items-center cursor-pointer">
              <MapPin className="w-7 h-7 text-amber-200 drop-shadow-[0_0_10px_rgba(212,175,55,0.7)]" />
              <span className="font-display text-sm sm:text-base text-amber-100 mt-1 whitespace-nowrap">{p.label}</span>
            </div>
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="px-3 py-2 rounded-xl bg-[#0e0a14] border border-amber-200/40 text-amber-100 text-xs whitespace-nowrap shadow-xl">
                715 Hours of laughter and stories
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-amber-100/70 font-body italic text-sm sm:text-base max-w-2xl mx-auto">
        "All these minutes are like commuting from <span className="text-amber-200">New Cairo</span> to <span className="text-rose-200">Sheikh Zayed</span> every day for a whole year, back and forth!"
      </p>
    </div>
  );
};

/* -------------------------------- DASHBOARD ------------------------------- */

const Dashboard = ({ score }: { score: number }) => {
  useEffect(() => { fireConfetti(); }, []);
  return (
    <div className="min-h-screen pb-24">
      {/* HERO */}
      <section className="relative px-4 pt-24 pb-16 sm:pt-32 sm:pb-24 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-25"
            style={{ background: "radial-gradient(circle, #d4af37, transparent 60%)" }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200/30 bg-amber-300/10 mb-6">
            <Trophy className="w-4 h-4 text-amber-300" />
            <span className="text-xs uppercase tracking-[0.25em] text-amber-200 font-body">
              You scored {score}/{QUIZ.length}
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl mb-4 leading-[1.05]">
            <span className="bg-gradient-to-br from-amber-200 via-rose-200 to-amber-300 bg-clip-text text-transparent">
              The Year of Us
            </span>
          </h1>
          <p className="text-base sm:text-lg text-amber-100/70 font-body max-w-xl mx-auto leading-relaxed">
            One year. Every message, every emoji, every 10 PM Call —
            wrapped into a single Page, just for You.
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200/50 mt-4">
            03 May 2025 — 03 May 2026
          </p>
        </motion.div>
      </section>

      {/* VOLUME */}
      <Section title="The Volume" subtitle="How much we Chat?" icon={MessageCircle}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <Stat icon={MessageCircle} label="Total Messages" value={160718} accent="rose" />
          <Stat icon={Sparkles} label="Total Words" value={982711} delay={0.1} accent="gold" />
          <Stat icon={Flame} label="Days of Chatting" value={365} suffix="/ 365" delay={0.2} accent="plum" />
        </div>
        <p className="text-center text-amber-200/60 font-body italic text-sm mt-6">
          Zero downtime. Not a single day went silent. ✨
        </p>
          <p className="text-center text-amber-200/60 font-body italic text-sm mt-6">
          we are close about Million Word!. ✨
        </p>
      </Section>

      {/* DYNAMIC DUO */}
      <Section title="The Dynamic Numbers" subtitle="Behavioral analysis" icon={Users}>
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Split */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-6 sm:p-8 border border-amber-200/15 bg-white/[0.03] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <Crown className="w-5 h-5 text-amber-300" />
              <h3 className="font-display text-xl text-amber-50">Message Split</h3>
            </div>
            <div className="flex h-12 rounded-full overflow-hidden border border-amber-200/20">
              <motion.div initial={{ width: 0 }} whileInView={{ width: "58%" }} viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-gradient-to-r from-rose-400 to-fuchsia-400 flex items-center justify-center text-white font-display text-sm">
                Esraa 58%
              </motion.div>
              <motion.div initial={{ width: 0 }} whileInView={{ width: "42%" }} viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="bg-gradient-to-r from-amber-400 to-yellow-300 flex items-center justify-center text-[#0e0a14] font-display text-sm">
                Ahmed 42%
              </motion.div>
            </div>
            <p className="text-amber-100/60 text-sm mt-5 leading-relaxed font-body">
              I am sends a fewer messages — but each one carries <span className="text-amber-200">more weight & words</span>.
            </p>
          </motion.div>

          {/* The Spark */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl p-6 sm:p-8 border border-amber-200/15 bg-white/[0.03] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <Sparkles className="w-5 h-5 text-rose-300" />
              <h3 className="font-display text-xl text-amber-50">The Spark</h3>
            </div>
            <p className="font-display text-3xl text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-amber-200 mb-3">
              Esraa
            </p>
            <p className="text-amber-100/70 font-body text-sm leading-relaxed">
You are the one who always <span className="text-rose-200">starts our conversations.</span> You never let us stay silent and you always make our chat alive again</p>
          </motion.div>

          {/* Curiosity Gap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 rounded-3xl p-6 sm:p-8 border border-amber-200/15 bg-white/[0.03] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-5 h-5 text-amber-300" />
              <h3 className="font-display text-xl text-amber-50">who ask more?</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "Esraa", q: 2889, c: "from-rose-400 to-fuchsia-400" },
                { name: "Ahmed", q: 1685, c: "from-amber-400 to-yellow-300" },
              ].map((p) => (
                <div key={p.name}>
                  <div className="text-xs uppercase tracking-[0.25em] text-amber-100/50 mb-1">{p.name} asked</div>
                  <div className="font-display text-3xl sm:text-4xl text-amber-50 tabular-nums mb-2">
                    {p.q.toLocaleString()}<span className="text-amber-300/70 text-base ml-2">questions</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${(p.q / 3000) * 100}%` }}
                      viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${p.c}`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* TIME & SPEED */}
      <Section title="Time & Speed" subtitle="When the magic happened" icon={Clock}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-7 border border-amber-200/15 bg-white/[0.03] backdrop-blur-xl text-center">
            <Clock className="w-8 h-8 text-amber-300 mx-auto mb-3" />
            <div className="text-xs uppercase tracking-[0.25em] text-amber-100/60 mb-2">The Golden Hour</div>
            <div className="font-display text-5xl text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-rose-300">
              2:00 AM
            </div>
            <p className="text-amber-100/60 text-sm mt-3 font-body">Peak activity — when the world sleeps, we talk.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl p-7 border border-amber-200/15 bg-white/[0.03] backdrop-blur-xl text-center">
            <Zap className="w-8 h-8 text-amber-300 mx-auto mb-3" />
            <div className="text-xs uppercase tracking-[0.25em] text-amber-100/60 mb-2">Response Velocity</div>
            <div className="font-display text-5xl text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-rose-300">
              56%
            </div>
            <p className="text-amber-100/60 text-sm mt-3 font-body">of replies happen in under 1 minute.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl p-7 border border-amber-200/15 bg-white/[0.03] backdrop-blur-xl text-center">
            <TrendingUp className="w-8 h-8 text-amber-300 mx-auto mb-3" />
            <div className="text-xs uppercase tracking-[0.25em] text-amber-100/60 mb-2">The Flash</div>
            <div className="font-display text-4xl text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-rose-300">
              Ahmed
            </div>
            <p className="text-amber-100/60 text-sm mt-3 font-body">Slightly faster on the trigger ⚡</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 rounded-3xl p-6 sm:p-7 border border-amber-200/15 bg-white/[0.03] backdrop-blur-xl flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Calendar className="w-6 h-6 text-amber-300" />
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-amber-100/60 mb-1">Busiest Day</div>
              <div className="font-display text-xl sm:text-2xl text-amber-50">16 June 2025</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-3xl sm:text-4xl text-amber-50 tabular-nums">1,924</div>
            <div className="text-xs text-amber-200/60">messages in one day</div>
          </div>
        </motion.div>
      </Section>

      {/* LOVE COUNTER */}
      <Section title="The Love Counter" subtitle="Three little words, said often" icon={Heart}>
        <LoveBars />
      </Section>

      {/* EMOJI ARCHIVE */}
      <Section title="The Visual Archive" subtitle="Our emotional fingerprint" icon={Star}>
        <EmojiCloud />
      </Section>

      {/* ROADMAP CONNECTOR */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center -mb-6">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 60 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-px bg-gradient-to-b from-transparent via-amber-300/60 to-amber-300"
        />
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-amber-200/40 bg-[#0e0a14]"
        >
          <Phone className="w-4 h-4 text-amber-300" />
        </motion.div>
      </div>

      {/* COMMUTE / CALLS */}
      <Section title="The Commute of Voices" subtitle="From texts to calls" icon={Phone}>
        <CommuteSection />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center font-display italic text-xl sm:text-2xl mt-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200"
        >
          "42,876 minutes later, and your voice is still my favorite sound."
        </motion.p>
      </Section>

      {/* FOOTER */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center px-4 mt-12">
        <p className="font-display italic text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200">
          "Every message was a heartbeat. Every reply, a promise."
        </p>
        <p className="text-amber-200/50 text-xs uppercase tracking-[0.3em] mt-4">— Makked with love, for Esraa</p>

       
      </motion.div>
    </div>
  );
};

/* ---------------------------------- PAGE ---------------------------------- */

const WrappedPage = () => {
  const [phase, setPhase] = useState<"intro" | "quiz" | "transition" | "dashboard">("intro");
  const [score, setScore] = useState(0);

  return (
    <div
      className="min-h-screen text-amber-50 relative overflow-x-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 20% 0%, hsla(340, 60%, 25%, 0.55), transparent 55%),
          radial-gradient(ellipse at 80% 100%, hsla(45, 70%, 30%, 0.4), transparent 55%),
          linear-gradient(180deg, #0a070f 0%, #14091a 50%, #0a070f 100%)
        `,
      }}
    >
      {/* subtle stars */}
      <div className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, #fff, transparent), radial-gradient(1px 1px at 70% 80%, #fff, transparent), radial-gradient(1px 1px at 40% 60%, #d4af37, transparent), radial-gradient(1px 1px at 90% 20%, #fff, transparent)",
          backgroundSize: "200px 200px",
        }} />

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div key="intro"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative">
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1.2 }}
              className="mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center"
                style={{ background: "conic-gradient(from 0deg, #d4af37, #f5a3c7, #d4af37)" }}>
                <div className="w-[88%] h-[88%] rounded-full bg-[#0e0a14] flex items-center justify-center">
                  <Heart className="w-10 h-10 sm:w-14 sm:h-14 text-rose-300 fill-rose-300" />
                </div>
              </div>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="text-xs sm:text-sm uppercase tracking-[0.4em] text-amber-200/70 mb-4">
              For Esraa, with love
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="font-display text-5xl sm:text-7xl md:text-8xl leading-[1.05] mb-6">
              <span className="bg-gradient-to-br from-amber-200 via-rose-200 to-amber-300 bg-clip-text text-transparent">
                Our Year,<br />In Numbers.
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="text-amber-100/70 font-body max-w-md mx-auto mb-10 leading-relaxed">
              Before we open the page — let's see how well you know us.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
              onClick={() => setPhase("quiz")}
              className="group relative px-8 py-4 rounded-full font-body text-sm uppercase tracking-[0.25em] text-[#0e0a14] overflow-hidden"
              style={{ background: "linear-gradient(135deg, #f5d97e, #d4af37, #f5a3c7)" }}>
              <span className="relative flex items-center gap-2">
                Begin the test <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        )}

        {phase === "quiz" && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Quiz onFinish={(s) => { setScore(s); setPhase("transition"); setTimeout(() => setPhase("dashboard"), 2200); }} />
          </motion.div>
        )}

        {phase === "transition" && (
          <motion.div key="transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center text-center px-4">
            <div>
              <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 1.2 }}
                className="w-32 h-32 mx-auto mb-8 rounded-full"
                style={{ background: "conic-gradient(from 0deg, #d4af37, #f5a3c7, #d4af37)", filter: "blur(2px)" }} />
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="font-display text-3xl sm:text-5xl bg-gradient-to-r from-amber-200 to-rose-200 bg-clip-text text-transparent">
                Opening the vault…
              </motion.h2>
            </div>
          </motion.div>
        )}

        {phase === "dashboard" && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Dashboard score={score} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WrappedPage;
