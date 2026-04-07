import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
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

const insideJokes = [
  "Remember the coffee incident? ☕",
  "That time we got lost 🗺️",
  "Your legendary dance moves 💃",
  "The pizza debate 🍕",
  "3 AM conversations 🌙",
  "That photo we never posted 📸",
  "The song that plays on repeat 🎵",
  "Your contagious laugh 😄",
];

const titleLetterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -90, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0, scale: 1,
    transition: {
      delay: 0.4 + i * 0.06,
      duration: 0.6,
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  }),
};

const HeroPage = ({ onNext, birthday }: HeroPageProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const { days, isBirthday, dailyMessage, intensity } = useMemo(() => {
    const now = new Date();
    const diff = birthday.getTime() - now.getTime();
    const d = Math.max(0, Math.ceil(diff / 86400000));
    const isB = now >= birthday;
    const msg = d >= 1 && d <= 10 ? DAILY_MESSAGES.find((m) => m.day === d) || null : null;
    const int = isB ? 1 : d > 10 ? 0.1 : 0.2 + (10 - d) * 0.078;
    return { days: d, isBirthday: isB, dailyMessage: msg, intensity: int };
  }, [birthday]);

  const titleText = isBirthday ? "Happy Birthday! 🎂" : "Happy Birthday";
  const titleLetters = titleText.split("");

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-hero-gradient overflow-hidden">
      <FloatingText texts={insideJokes} />
      <FloatingHearts intensity={intensity} />

      {/* Parallax background orbs */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl"
        style={{ y: bgY, opacity: 0.3 + intensity * 0.5 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-40 h-40 rounded-full bg-accent/10 blur-3xl"
        style={{ y: bgY, opacity: 0.2 + intensity * 0.6 }}
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Animated sparkle particles */}
      {Array.from({ length: Math.floor(5 + intensity * 15) }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          <Sparkles className="w-2.5 h-2.5 text-accent/50" />
        </motion.div>
      ))}

      {/* Rotating ring decoration */}
      <motion.div
        className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-dashed border-accent/10 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full border border-dotted border-primary/10 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p
          className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-body mb-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            🎉 Today is the Day! 🎉
          </motion.span>
          <br />
          <motion.span
            className="inline-block"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Level 21 Unlocked! 🔓
          </motion.span>
        </motion.p>

        {/* Letter-by-letter animated title */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-gradient-rose mb-6 flex justify-center flex-wrap perspective-[1000px]"
        >
          {titleLetters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={titleLetterVariants}
              initial="hidden"
              animate="visible"
              className={letter === " " ? "w-4 md:w-6" : "inline-block"}
              whileHover={{ scale: 1.3, rotate: [-5, 5, 0], transition: { duration: 0.3 } }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground font-body font-light mb-10 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          A year of joy, of shared dreams, and the light you bring to my life,{" "}
          <motion.em
            className="text-accent font-medium"
            animate={{ color: ["hsl(350,40%,65%)", "hsl(350,60%,55%)", "hsl(350,40%,65%)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Happy 21st Eso
          </motion.em>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-10"
        >
          <Countdown targetDate={birthday} onComplete={onNext} />
        </motion.div>

        {dailyMessage && (
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.6, type: "spring", stiffness: 100 }}
          >
            <motion.p
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ Today's Secret Card ✨
            </motion.p>
            <div className="flex justify-center">
              <DailyScratchCard day={dailyMessage.day} title={dailyMessage.title} message={dailyMessage.message} />
            </div>
          </motion.div>
        )}

        {days <= 10 && days > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <ProgressDots daysUntilBirthday={days} />
          </motion.div>
        )}
      </motion.div>

      {/* Animated scroll indicator */}
      <motion.button
        onClick={onNext}
        className="absolute bottom-10 text-muted-foreground group"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.3 }}
      >
        <motion.div
          className="absolute -inset-4 rounded-full bg-accent/0 group-hover:bg-accent/10 transition-colors"
        />
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
};

export default HeroPage;
