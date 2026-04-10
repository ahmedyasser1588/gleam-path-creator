import React from "react";
import { motion } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";

const EsoBot = () => {
  const handleChatRedirect = () => {
    // اللينك اللي اتفقنا عليه
    window.open("https://ai-embrace-craft.lovable.app/", "_blank");
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999]">
      <motion.button
        onClick={handleChatRedirect}
        className="relative group w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-[0_4px_15px_rgba(236,72,153,0.4)] border-2 border-white cursor-pointer"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* أيقونة القلب */}
        <MessageCircleHeart className="w-8 h-8" />

        {/* تأثير النبض الخارجي */}
        <span className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-20"></span>

        {/* التلميح اللي بيظهر فوقه */}
        <div className="absolute -top-10 left-0 bg-white text-pink-500 text-[10px] font-bold py-1 px-3 rounded-full shadow-md border border-pink-50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          كلمي أحمد هنا يا روحي 💖
        </div>
      </motion.button>
    </div>
  );
};

export default EsoBot;