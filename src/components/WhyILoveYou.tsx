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
  const [floatingTexts, setFloatingTexts] = useState<string[]>([]);
  const [animKey, setAnimKey] = useState(0);

  const showFloatingReasons = useCallback(() => {
    // Pick 3-5 random unique reasons to float
    const count = Math.floor(Math.random() * 3) + 3;
    const shuffled = [...reasons].sort(() => Math.random() - 0.5);
    setFloatingTexts(shuffled.slice(0, count));
    setAnimKey((k) => k + 1);
  }, []);

  return (
    <>
      {floatingTexts.length > 0 && (
        <FloatingText key={animKey} texts={floatingTexts} />
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
          onClick={showFloatingReasons}
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
