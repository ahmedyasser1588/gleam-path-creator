import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Heart, MessageCircle, Sparkles, Clock, Zap, Users,
  TrendingUp, Calendar, HelpCircle, Crown, ArrowRight,
  CheckCircle2, XCircle, Trophy, Flame, Star,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ---------------------------------- DATA ---------------------------------- */

const QUIZ = [
  {
    q: "How many messages did we exchange this year?",
    options: ["89,420", "160,718", "210,500", "75,300"],
    answer: 1,
    hint: "More than a hundred thousand whispers ✨",
  },
  {
    q: "Who sent more media (Photos & Videos)?",
    options: ["Ahmed", "Esraa", "Equal", "Neither"],
    answer: 1,
    hint: "She kept the camera roll alive 📸",
  },
  {
    q: "What was our busiest day — with 1,924 messages?",
    options: ["14-02-2026", "10-04-2026", "16-06-2025", "01-01-2026"],
    answer: 2,
    hint: "A summer day to remember ☀️",
  },
  {
    q: "How many times did Ahmed say 'I love you' vs Esraa?",
    options: ["780 vs 900", "1000 vs 850", "900 vs 780", "650 vs 720"],
    answer: 2,
    hint: "Both above 700 ❤️",
  },
  {
    q: "Which day of the week is our peak chatting day?",
    options: ["Friday", "Saturday", "Sunday", "Wednesday"],
    answer: 1,
    hint: "Weekend energy 💬",
  },
];

const EMOJIS: { e: string; n: number }[] = [
  { e: "❤️", n: 4153 },
  { e: "😂", n: 3556 },
  { e: "🫂", n: 1620 },
  { e: "🫠", n: 1525 },
  { e: "😚", n: 1056 },
  { e: "🥳", n: 950 },
  { e: "🫣", n: 783 },
  { e: "🫶", n: 486 },
  { e: "🥰", n: 143 },
  { e: "😍", n: 95 },
  { e: "✅", n: 56 },
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
              The Vault of Us
            </span>
          </h1>
          <p className="text-base sm:text-lg text-amber-100/70 font-body max-w-xl mx-auto leading-relaxed">
            One year. Every message, every emoji, every silent 2 AM whisper —
            wrapped into a single golden archive, just for Esraa.
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200/50 mt-4">
            03 May 2025 — 03 May 2026
          </p>
        </motion.div>
      </section>

      {/* VOLUME */}
      <Section title="The Volume" subtitle="How much we said" icon={MessageCircle}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <Stat icon={MessageCircle} label="Total Messages" value={160718} accent="rose" />
          <Stat icon={Sparkles} label="Total Words" value={982711} delay={0.1} accent="gold" />
          <Stat icon={Flame} label="Days of Chatting" value={365} suffix="/ 365" delay={0.2} accent="plum" />
        </div>
        <p className="text-center text-amber-200/60 font-body italic text-sm mt-6">
          Zero downtime. Not a single day went silent. ✨
        </p>
      </Section>

      {/* DYNAMIC DUO */}
      <Section title="The Dynamic Duo" subtitle="Behavioral analysis" icon={Users}>
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
              Ahmed sends fewer messages — but each one carries <span className="text-amber-200">more weight & words</span>.
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
              The primary <span className="text-rose-200">initiator</span> — the one who breaks every silence and rekindles the chat.
            </p>
          </motion.div>

          {/* Curiosity Gap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 rounded-3xl p-6 sm:p-8 border border-amber-200/15 bg-white/[0.03] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-5 h-5 text-amber-300" />
              <h3 className="font-display text-xl text-amber-50">The Curiosity Gap</h3>
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

      {/* FOOTER */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center px-4 mt-12">
        <p className="font-display italic text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200">
          "Every message was a heartbeat. Every reply, a promise."
        </p>
        <p className="text-amber-200/50 text-xs uppercase tracking-[0.3em] mt-4">— Wrapped with love, for Esraa</p>

        <Link to="/" className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-full border border-amber-200/30 bg-amber-300/10 text-amber-100 hover:bg-amber-300/20 transition-all font-body text-sm">
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back home
        </Link>
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
                Our Year,<br />Wrapped.
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="text-amber-100/70 font-body max-w-md mx-auto mb-10 leading-relaxed">
              Before we open the vault — let's see how well you remember us.
              A 5-question memory test awaits.
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
