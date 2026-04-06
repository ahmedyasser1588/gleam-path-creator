import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeartProgress from "@/components/HeartProgress";

interface CountdownProps {
  targetDate: Date;
  onComplete?: () => void;
}

const Countdown = ({ targetDate, onComplete }: CountdownProps) => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isComplete, setIsComplete] = useState(false);

  // Calculate heart progress: fills over the last 10 days
  const TEN_DAYS_MS = 10 * 86400000;
  const now = Date.now();
  const diff = targetDate.getTime() - now;
  const heartProgress = diff <= 0 ? 1 : diff >= TEN_DAYS_MS ? 0 : 1 - diff / TEN_DAYS_MS;

  useEffect(() => {
    const tick = () => {
      const remaining = Math.max(0, targetDate.getTime() - Date.now());
      if (remaining === 0 && !isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
      setTime({
        days: Math.floor(remaining / 86400000),
        hours: Math.floor((remaining % 86400000) / 3600000),
        minutes: Math.floor((remaining % 3600000) / 60000),
        seconds: Math.floor((remaining % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate, isComplete, onComplete]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key="countdown"
            className="flex items-center gap-4 md:gap-6 justify-center"
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
          >
            <HeartProgress progress={heartProgress} />
            <div className="flex gap-3 md:gap-5">
              {units.map((unit) => (
                <motion.div
                  key={unit.label}
                  className="glass-card px-3 py-4 md:px-5 md:py-6 flex flex-col items-center min-w-[60px] md:min-w-[80px] animate-glow-pulse"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span
                    key={unit.value}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl md:text-4xl font-display font-bold text-gradient-rose"
                  >
                    {String(unit.value).padStart(2, "0")}
                  </motion.span>
                  <span className="text-[10px] md:text-xs text-muted-foreground mt-1.5 font-body uppercase tracking-widest">
                    {unit.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="celebrate"
            onClick={onComplete}
            className="relative group"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
          >
            {/* Pulsing glow ring */}
            <motion.div
              className="absolute -inset-3 rounded-full bg-primary/20 blur-xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative glass-card px-10 py-5 md:px-14 md:py-6 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer">
              <span className="text-xl md:text-2xl font-display font-bold text-gradient-rose">
                🎉 Let's Celebrate! 🎉
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Countdown;
