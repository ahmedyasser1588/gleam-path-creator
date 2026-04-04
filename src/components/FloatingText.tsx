import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingTextProps {
  texts: string[];
}

const FloatingText = ({ texts }: FloatingTextProps) => {
  const items = useMemo(
    () =>
      texts.map((text, i) => ({
        text,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        size: Math.random() * 0.6 + 0.7,
        duration: Math.random() * 4 + 6,
        delay: i * 0.3,
      })),
    [texts]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item, i) => (
        <motion.span
          key={i}
          className="absolute font-display text-accent/20 whitespace-nowrap select-none"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}rem`,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 20, 0],
            opacity: [0.15, 0.3, 0.15, 0.25, 0.15],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.text}
        </motion.span>
      ))}
    </div>
  );
};

export default FloatingText;
