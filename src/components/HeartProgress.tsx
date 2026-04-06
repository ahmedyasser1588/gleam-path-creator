import { motion } from "framer-motion";

interface HeartProgressProps {
  /** 0 = empty, 1 = full */
  progress: number;
}

const HeartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

const HeartProgress = ({ progress }: HeartProgressProps) => {
  const clampedProgress = Math.min(1, Math.max(0, progress));

  return (
    <motion.div
      className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <clipPath id="heartClip">
            <path d={HeartPath} />
          </clipPath>
          <linearGradient id="heartGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>

        {/* Outline */}
        <path
          d={HeartPath}
          fill="none"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth="0.8"
        />

        {/* Fill from bottom */}
        <g clipPath="url(#heartClip)">
          <motion.rect
            x="0"
            width="24"
            height="24"
            fill="url(#heartGradient)"
            initial={{ y: 24 }}
            animate={{ y: 24 - clampedProgress * 24 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </g>

        {/* Glow when full */}
        {clampedProgress >= 1 && (
          <motion.path
            d={HeartPath}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </svg>

      {/* Percentage label */}
      <span className="absolute inset-0 flex items-center justify-center text-xs font-body font-semibold text-primary-foreground drop-shadow-sm select-none pointer-events-none">
        {Math.round(clampedProgress * 100)}%
      </span>
    </motion.div>
  );
};

export default HeartProgress;
