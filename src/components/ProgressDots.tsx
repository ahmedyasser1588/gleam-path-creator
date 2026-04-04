import { motion } from "framer-motion";

interface ProgressDotsProps {
  daysUntilBirthday: number;
}

const ProgressDots = ({ daysUntilBirthday }: ProgressDotsProps) => {
  const totalDays = 10;

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body">
        10-Day Countdown Progress
      </p>
      <div className="flex gap-2.5 items-center">
        {Array.from({ length: totalDays }, (_, i) => {
          const dayNumber = totalDays - i; // 10, 9, 8... 1
          const isCompleted = daysUntilBirthday < dayNumber;
          const isCurrent = daysUntilBirthday === dayNumber;

          return (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-1.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <motion.div
                className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                  isCompleted
                    ? "bg-accent glow-pink"
                    : isCurrent
                    ? "bg-primary ring-2 ring-accent ring-offset-2 ring-offset-background"
                    : "bg-muted"
                }`}
                animate={
                  isCurrent
                    ? { scale: [1, 1.3, 1] }
                    : isCompleted
                    ? { scale: [1, 1.1, 1] }
                    : {}
                }
                transition={
                  isCurrent
                    ? { duration: 2, repeat: Infinity }
                    : isCompleted
                    ? { duration: 3, repeat: Infinity, delay: i * 0.2 }
                    : {}
                }
              />
              <span className="text-[10px] text-muted-foreground font-body">{dayNumber}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressDots;
