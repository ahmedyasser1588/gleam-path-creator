import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useMemo } from "react";

interface FloatingHeartsProps {
  intensity: number; // 0.0 to 1.0
}

const FloatingHearts = ({ intensity }: FloatingHeartsProps) => {
  const count = Math.floor(5 + intensity * 25);

  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: Math.random() * 100,
        size: 8 + Math.random() * 16,
        duration: 4 + Math.random() * 8,
        delay: Math.random() * 5,
        opacity: 0.05 + intensity * 0.15,
      })),
    [count, intensity]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{ left: `${h.x}%` }}
          animate={{
            y: [0, -800],
            x: [0, Math.sin(i) * 50],
            opacity: [0, h.opacity, h.opacity, 0],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "easeOut",
          }}
        >
          <Heart
            style={{ width: h.size, height: h.size }}
            className="text-accent/30 fill-accent/20"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
