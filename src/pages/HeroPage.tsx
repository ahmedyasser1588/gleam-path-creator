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
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-hero-gradient overflow-hidden">
      
      <FloatingHearts intensity={intensity} />

      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl animate-float" style={{ opacity: 0.3 + intensity * 0.5 }} />
      <div className="absolute bottom-32 right-16 w-40 h-40 rounded-full bg-accent/10 blur-3xl animate-float-slow" style={{ opacity: 0.2 + intensity * 0.6 }} />
      
      {Array.from({ length: Math.floor(3 + intensity * 7) }, (_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-accent animate-sparkle"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p
  className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-body mb-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
>
  🎉 Today is the Day! 🎉
  <br />
  Level 21 Unlocked! 🔓
</motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-gradient-rose mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {isBirthday ? "Happy Birthday! 🎂" : "Happy Birthday"}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground font-body font-light mb-10 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          A year of joy, of shared dreams, and the light you bring to my life, <em className="text-accent font-medium">Happy 21st Eso</em>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
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