import { useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Countdown from "@/components/Countdown";
import FloatingText from "@/components/FloatingText";
import FloatingHearts from "@/components/FloatingHearts";
import DailyScratchCard from "@/components/DailyScratchCard";
import ProgressDots from "@/components/ProgressDots";
import { DAILY_MESSAGES } from "@/lib/birthday-config";

interface HeroPageProps {
  onNext: () => void;
  birthday: Date;
}



const HeroPage = ({ onNext, birthday }: HeroPageProps) => {
  const { days, isBirthday, dailyMessage, intensity } = useMemo(() => {
    const now = new Date();
    const diff = birthday.getTime() - now.getTime();
    const d = Math.max(0, Math.ceil(diff / 86400000));
    const isB = now >= birthday;
    const msg = d >= 1 && d <= 10 ? DAILY_MESSAGES.find((m) => m.day === d) || null : null;
    const int = isB ? 1 : d > 10 ? 0.1 : 0.2 + (10 - d) * 0.078;
    return { days: d, isBirthday: isB, dailyMessage: msg, intensity: int };
  }, [birthday]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-24 bg-hero-gradient overflow-hidden">

      {/* Aurora dreamy background */}
      <div className="aurora" />

      <FloatingHearts intensity={intensity} />

      {/* Soft floating orbs */}
      <div
        className="absolute top-20 left-4 sm:left-10 w-32 sm:w-48 h-32 sm:h-48 rounded-full blur-3xl animate-float pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(345 90% 88% / 0.5), transparent 70%)",
          opacity: 0.4 + intensity * 0.5,
        }}
      />
      <div
        className="absolute bottom-32 right-4 sm:right-16 w-36 sm:w-56 h-36 sm:h-56 rounded-full blur-3xl animate-float-slow pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(290 60% 88% / 0.45), transparent 70%)",
          opacity: 0.35 + intensity * 0.55,
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-24 sm:w-40 h-24 sm:h-40 rounded-full blur-3xl animate-float pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(25 80% 88% / 0.4), transparent 70%)",
          opacity: 0.3 + intensity * 0.4,
          animationDelay: "2s",
        }}
      />

      {Array.from({ length: Math.floor(5 + intensity * 10) }, (_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-accent animate-sparkle pointer-events-none"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${i * 0.3}s`,
            boxShadow: "0 0 8px hsl(345 90% 80%)",
          }}
        />
      ))}

      <motion.div
        className="relative z-10 text-center w-full max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Pretty pill badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-4 py-1.5 rounded-full glass border border-accent/30 backdrop-blur-xl shadow-petal"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-foreground/80 font-body font-medium">
            {isBirthday ? "Today is the Day · Level 21 Unlocked" : "Counting Every Heartbeat"}
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-4 sm:mb-6 leading-[1.05] tracking-tight"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-gradient-rose">Happy Birthday</span>
          <motion.span
            className="block shimmer-text font-display italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-1 sm:mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            my dearest Eso
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-muted-foreground font-body font-light mb-8 sm:mb-10 max-w-md mx-auto px-2 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          A year of joy, of shared dreams, and the light you bring to my life —{" "}
          <em className="text-accent font-medium not-italic">Happy 21st</em> 💕
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-10"
        >
          {/* هنا المهم: ربطنا onComplete بـ onNext عشان الزرار اللي بيظهر لما الوقت يخلص يشتغل لما تدوس عليه بس */}
          <Countdown targetDate={birthday} onComplete={onNext} />
        </motion.div>

        {dailyMessage && (
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, type: "spring" }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body mb-4">
              Today's Secret Card
            </p>
            <div className="flex justify-center">
              <DailyScratchCard day={dailyMessage.day} title={dailyMessage.title} message={dailyMessage.message} />
            </div>
          </motion.div>
        )}

        {days <= 10 && days > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <ProgressDots daysUntilBirthday={days} />
          </motion.div>
        )}
      </motion.div>

      <motion.button
        onClick={onNext}
        className="absolute bottom-10 text-muted-foreground"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
};

export default HeroPage;