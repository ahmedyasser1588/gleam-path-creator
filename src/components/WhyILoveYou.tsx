import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import FloatingText from "./FloatingText";

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
  const [floatingText, setFloatingText] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [remaining, setRemaining] = useState<number[]>(() => {
    return reasons.map((_, i) => i);
  });

  const showFloatingReason = useCallback(() => {
    let pool = remaining;
    // Reset when all reasons have been shown
    if (pool.length === 0) {
      pool = reasons.map((_, i) => i);
    }

    const randomIdx = Math.floor(Math.random() * pool.length);
    const chosenReasonIdx = pool[randomIdx];
    const newPool = pool.filter((_, i) => i !== randomIdx);

    setRemaining(newPool);
    setFloatingText(reasons[chosenReasonIdx]);
    setAnimKey((k) => k + 1);
  }, [remaining]);

  return (
    <>
      {floatingText && (
        <FloatingText key={animKey} texts={[floatingText]} />
      )}

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
          onClick={showFloatingReason}
          className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-2.5 font-body text-sm shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-4 h-4" />
          Tell me why ✨
        </motion.button>
      </motion.div>
    </>
  );
};

export default WhyILoveYouCard;
