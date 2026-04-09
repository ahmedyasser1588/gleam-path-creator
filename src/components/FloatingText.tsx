import { motion } from "framer-motion";

interface FloatingTextProps {
  texts: string[];
}

const FloatingText = ({ texts }: FloatingTextProps) => {
  return (
    <div className="relative w-full flex justify-center pointer-events-none h-20 mt-4">
      {texts.map((text, i) => (
        <motion.span
          key={`${text}-${i}`}
          className="absolute font-display text-lg md:text-xl text-accent whitespace-nowrap select-none drop-shadow-lg text-center"
          dir="rtl"
          initial={{ opacity: 0, y: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [0, -30, -60, -100],
            scale: [0.6, 1.1, 1, 0.85],
            rotate: [0, 2, -2, 0],
          }}
          transition={{ duration: 4, times: [0, 0.15, 0.75, 1], ease: "easeOut" }}
        >
          {text}
        </motion.span>
      ))}
    </div>
  );
};

export default FloatingText;
