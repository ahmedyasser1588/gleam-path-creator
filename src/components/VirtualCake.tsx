import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const VirtualCake = () => {
  const [candlesLit, setCandlesLit] = useState(true);

  const blowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);

    // Confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ["#FFC0CB", "#B76E79", "#FFD700", "#FF69B4", "#FFB6C1"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        className="relative cursor-pointer"
        onClick={blowCandles}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Cake */}
        <div className="relative">
          {/* Candles */}
          <div className="flex justify-center gap-6 mb-1 relative z-10">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <AnimatePresence>
                  {candlesLit && (
                    <motion.div
                      initial={{ scale: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="w-3 h-5 rounded-full bg-gradient-to-t from-amber-400 to-yellow-200 animate-candle-flicker mb-0.5"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  )}
                </AnimatePresence>
                <div className="w-1.5 h-8 bg-rose-gold-light rounded-sm" style={{ background: "hsl(350, 40%, 75%)" }} />
              </div>
            ))}
          </div>

          {/* Top layer */}
          <div className="w-48 h-14 rounded-xl mx-auto relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(350, 100%, 88%), hsl(350, 60%, 80%))" }}>
            <div className="absolute inset-x-0 top-0 h-3 rounded-t-xl" style={{ background: "linear-gradient(90deg, hsl(350, 100%, 92%), hsl(40, 80%, 85%), hsl(350, 100%, 92%))" }} />
          </div>

          {/* Middle layer */}
          <div className="w-56 h-16 rounded-xl mx-auto -mt-1 relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(350, 80%, 82%), hsl(350, 50%, 72%))" }}>
            <div className="absolute inset-x-0 top-0 h-3" style={{ background: "linear-gradient(90deg, hsl(0, 0%, 100%, 0.3), hsl(0, 0%, 100%, 0.1))" }} />
            {/* Decorative dots */}
            <div className="absolute bottom-3 inset-x-0 flex justify-center gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full" style={{ background: "hsl(40, 80%, 80%)" }} />
              ))}
            </div>
          </div>

          {/* Bottom layer */}
          <div className="w-64 h-16 rounded-xl mx-auto -mt-1" style={{ background: "linear-gradient(135deg, hsl(350, 70%, 75%), hsl(350, 40%, 65%))" }}>
            <div className="absolute bottom-3 inset-x-0 flex justify-center gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1.5 h-4 rounded-full" style={{ background: "hsl(350, 100%, 90%)" }} />
              ))}
            </div>
          </div>

          {/* Plate */}
          <div className="w-72 h-5 rounded-full mx-auto -mt-1" style={{ background: "linear-gradient(135deg, hsl(40, 30%, 90%), hsl(40, 20%, 85%))" }} />
        </div>
      </motion.div>

      <p className="text-muted-foreground text-sm font-body">
        {candlesLit ? "✨ Click the cake to blow out the candles!" : "🎉 Happy Birthday! 🎉"}
      </p>

      {!candlesLit && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setCandlesLit(true)}
          className="text-xs text-accent underline"
        >
          Light candles again
        </motion.button>
      )}
    </div>
  );
};

export default VirtualCake;
