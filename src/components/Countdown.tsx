import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: Date;
}

const Countdown = ({ targetDate }: CountdownProps) => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="flex gap-4 md:gap-6 justify-center">
      {units.map((unit) => (
        <motion.div
          key={unit.label}
          className="glass-card px-4 py-5 md:px-6 md:py-7 flex flex-col items-center min-w-[70px] md:min-w-[90px] animate-glow-pulse"
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            key={unit.value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-5xl font-display font-bold text-gradient-rose"
          >
            {String(unit.value).padStart(2, "0")}
          </motion.span>
          <span className="text-xs md:text-sm text-muted-foreground mt-2 font-body uppercase tracking-widest">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default Countdown;
