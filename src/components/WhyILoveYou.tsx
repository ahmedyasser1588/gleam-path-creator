import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const reasons = [
  "عشان ضحكتك بتنور الدنيا يا إيسو 💛",
  "عشان قلبك أحلى قلب في الكون كله ❤️",
  "عشان معاكي بحس إني في بيتي 🏡",
  "عشان عينيكي فيهم كل الأمان 🌙",
  "عشان صوتك أحلى موسيقى سمعتها 🎵",
  "عشان بتفهميني من غير ما أتكلم 🤫",
  "عشان حضنك بيشيل كل تعب الدنيا 🤗",
  "عشان معاكي الوقت بيوقف ⏳",
  "عشان كل يوم معاكي هدية من ربنا 🎁",
  "عشان بتخليني أحسن نسخة من نفسي 🌟",
  "عشان حبك خلاني أؤمن بالمعجزات ✨",
  "عشان أنتِ أجمل صدفة في حياتي 🍀",
  "عشان لما بتزعلي قلبي بيتقطع 💔 بس لما بتضحكي بيترقع 💖",
  "عشان طيبة قلبك مالهاش مثيل 🕊️",
  "عشان بتحبيني بعيوبي قبل مميزاتي 💕",
  "عشان أنتِ نور عينيا الاتنين 👀",
  "عشان الدنيا من غيرك ملهاش لون 🎨",
  "عشان كل ذكرى معاكي تحفة فنية 🖼️",
  "عشان ربنا اختارك ليا من فوق سبع سماوات 🌤️",
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
