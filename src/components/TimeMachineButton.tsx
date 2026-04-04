import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface TimeMachineButtonProps {
  url: string;
  label?: string;
}

const TimeMachineButton = ({ url, label = "Visit Last Year's Memories" }: TimeMachineButtonProps) => {
  const [warping, setWarping] = useState(false);

  const handleClick = () => {
    setWarping(true);
    setTimeout(() => {
      window.open(url, "_blank");
      setWarping(false);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {warping && (
          <motion.div
            className="fixed inset-0 z-[100] bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 1 }}
              animate={{ scale: 20, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeIn" }}
            >
              <div className="w-2 h-2 rounded-full bg-accent" />
            </motion.div>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 bg-accent/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  height: `${Math.random() * 100 + 50}px`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 2] }}
                transition={{ duration: 1.2, delay: Math.random() * 0.5 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        className="glass-card px-8 py-4 font-display text-lg text-foreground animate-glow-pulse flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="w-5 h-5 text-accent" />
        {label}
        <Sparkles className="w-5 h-5 text-accent" />
      </motion.button>
    </>
  );
};

export default TimeMachineButton;
