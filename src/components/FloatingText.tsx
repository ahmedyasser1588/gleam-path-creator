import { motion } from "framer-motion";

interface FloatingTextProps {
  texts: string[];
}

const FloatingText = ({ texts }: FloatingTextProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      {texts.map((text, i) => (
        <motion.span
          key={`${text}-${i}`}
          className="font-display text-2xl md:text-3xl text-accent whitespace-nowrap select-none drop-shadow-lg text-center px-4"
          dir="rtl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.1, 1, 0.8] }}
          transition={{ duration: 4, times: [0, 0.15, 0.8, 1], ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      ))}
    </div>
  );
};

export default FloatingText;
