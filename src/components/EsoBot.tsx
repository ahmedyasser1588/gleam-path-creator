import { motion } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";

const EsoBot = () => {
  const openChatLink = () => {
    // الرابط اللي هيفتح لما إسراء تدوس على القلب
    window.open("https://ai-embrace-craft.lovable.app/", "_blank");
  };

  return (
    <motion.button
      onClick={openChatLink}
      className="fixed bottom-6 left-6 z-[999] w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:bg-pink-600 transition-all cursor-pointer border-2 border-white"
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* أيقونة القلب الحنون */}
      <MessageCircleHeart className="w-8 h-8" />
      
      {/* تأثير النبض عشان يلفت نظرها */}
      <span className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-20"></span>
      
      {/* رسالة صغيرة بتظهر فوقه (Tooltip) */}
      <div className="absolute -top-12 right-0 bg-white text-pink-500 text-[10px] font-bold py-1 px-3 rounded-full shadow-md border border-pink-100 whitespace-nowrap animate-bounce">
        كلمي أحمد من هنا يا روحي 💖
      </div>
    </motion.button>
  );
};

export default EsoBot;