import { motion } from "framer-motion";
import Countdown from "@/components/Countdown";
import FloatingText from "@/components/FloatingText";
import { ChevronDown } from "lucide-react";

interface HeroPageProps {
  onNext: () => void;
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

// Set birthday to a future date — adjust as needed
const BIRTHDAY = new Date("2025-08-15T00:00:00");

const HeroPage = ({ onNext }: HeroPageProps) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-hero-gradient overflow-hidden">
      <FloatingText texts={insideJokes} />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="absolute bottom-32 right-16 w-40 h-40 rounded-full bg-accent/10 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-accent animate-sparkle" />
      <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 rounded-full bg-accent animate-sparkle" style={{ animationDelay: "0.5s" }} />

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
          You're Invited
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-gradient-rose mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Happy Birthday
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground font-body font-light mb-12 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          A celebration of love, laughter, and everything that makes you, <em className="text-accent font-medium">you</em>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Countdown targetDate={BIRTHDAY} />
        </motion.div>
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
