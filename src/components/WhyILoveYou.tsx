import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";

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

const WhyILoveYou = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentReason, setCurrentReason] = useState("");
  const [lastIndex, setLastIndex] = useState(-1);

  const showReason = useCallback(() => {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * reasons.length);
    } while (idx === lastIndex && reasons.length > 1);
    setLastIndex(idx);
    setCurrentReason(reasons[idx]);
    setIsOpen(true);
  }, [lastIndex]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={showReason}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-3 font-body text-sm shadow-lg"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Heart className="w-5 h-5 fill-current animate-pulse" />
        <span className="hidden sm:inline">Secret for Eso</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="relative glass-card p-8 max-w-sm w-full text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <Heart className="w-10 h-10 text-accent fill-accent mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                ليكي يا إيسو 💕
              </h3>
              <motion.p
                key={currentReason}
                className="font-body text-foreground/80 text-base leading-relaxed"
                dir="rtl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {currentReason}
              </motion.p>
              <motion.button
                onClick={showReason}
                className="mt-6 text-sm text-accent hover:text-accent/80 font-body transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                سر تاني ✨
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhyILoveYou;
