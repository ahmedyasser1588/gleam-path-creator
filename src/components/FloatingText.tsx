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
        x: Math.random() * 70 + 15,
        y: Math.random() * 60 + 20,
        size: Math.random() * 0.5 + 0.85,
        duration: Math.random() * 3 + 5,
        delay: i * 0.5,
      })),
    [texts]
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {items.map((item, i) => (
        <motion.span
          key={`${item.text}-${i}`}
          className="absolute font-display text-accent whitespace-nowrap select-none drop-shadow-md"
          dir="rtl"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}rem`,
          }}
          initial={{ opacity: 0, scale: 0.5, y: 0 }}
          animate={{
            opacity: [0, 0.9, 0.85, 0],
            y: [0, -60, -120, -200],
            x: [0, 20, -15, 30],
            scale: [0.5, 1.1, 1, 0.8],
            rotate: [0, 3, -3, 5],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: "easeOut",
          }}
        >
          {item.text}
        </motion.span>
      ))}
    </div>
  );
};

export default FloatingText;
