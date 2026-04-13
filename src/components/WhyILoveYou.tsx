import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const reasons = [
  " علشان بينا مواقف كتيرررر صعب تبقي مع حد غيرك💛",
  "علشان مفيش اجمل منك  ❤️",
  "علشان هتدلعيني بعد الجواز 😘♥️😂",
  "علشان بدوب في عيونك 😘♥️",
  "عشان صوتك أحلى حاجه بسمعها في يومي 🫂♥️ ",
  "عشان بتفهميني من غير ما حتي احتاج أتكلم ♥️♥️🫂",
  "علشان طيبتك ورومانسيتك🫂♥️",
  "علشان ملناش غير بعض😘♥️",
  "علشان مفيش منك اتنين🫂♥️",
  "علشان انتي فعلا تتحبي😘♥️",
  "علشان مبيهونش عليكي تخليني زعلان ر🫂♥️",
  "عشان أنتِ أجمل صدفة في حياتي 😘♥️",
  "علشان باجيلك وانا مضايق من غير ما افكر💖",
  "علشان بتحكيلي كل حاجه♥️😂",
  "علشان خناقتنا مبتاثرش علي علاقتنا♥️🫂",
  "علشان الدنيا من غيرك ملهاش طعم🫂♥️",
  "علشان اول كل حاجه كانت معاكي 🫂♥️",
  "علشان بتتكلمي معايا في اي حاجه وكل حاجه من غير حسابات كتير😘♥️",
  "علشان ولا بزهق ولا بتزهقي مني مهما اتكلمنا ♥️😂",
  "عشان ببساطة… أنتِ أحلى حاجة حصلتلي 💗",
];

const WhyILoveYouCard = () => {
  const [currentReason, setCurrentReason] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [remaining, setRemaining] = useState<number[]>(() =>
    reasons.map((_, i) => i)
  );

  const showReason = useCallback(() => {
    let pool = remaining;
    if (pool.length === 0) {
      pool = reasons.map((_, i) => i);
    }
    const randomIdx = Math.floor(Math.random() * pool.length);
    const chosenReasonIdx = pool[randomIdx];
    const newPool = pool.filter((_, i) => i !== randomIdx);

    setRemaining(newPool);
    setCurrentReason(reasons[chosenReasonIdx]);
    setAnimKey((k) => k + 1);
  }, [remaining]);

  return (
    <motion.div
      className="glass-card p-6 md:p-8 text-center max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Heart className="w-8 h-8 text-accent fill-accent mx-auto mb-3 animate-pulse" />
      <h3 className="font-display text-xl font-bold text-foreground mb-4">
        Why I love u? 💕
      </h3>
      <motion.button
        onClick={showReason}
        className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-2.5 font-body text-sm shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="w-4 h-4" />
        Tell me why ✨
      </motion.button>

      <AnimatePresence mode="wait">
        {currentReason && (
          <motion.div
            key={animKey}
            className="mt-5 rounded-2xl border border-accent/30 bg-accent/10 backdrop-blur-sm px-5 py-4 shadow-sm"
            dir="rtl"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="font-display text-base text-foreground leading-relaxed">
              {currentReason}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WhyILoveYouCard;
