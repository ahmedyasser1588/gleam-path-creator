import { motion } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";

const EsoBot = () => {
  const handleClick = () => {
    // لما تدوس على الزرار، هيفتح الموقع التاني في صفحة جديدة
    window.open("https://ai-embrace-craft.lovable.app/", "_blank");
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg hover:bg-pink-600 transition-all cursor-pointer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="دردش مع أحمد"
    >
      <MessageCircleHeart className="w-7 h-7" />
      
      {/* حركة خفيفة عشان تلفت نظرها إنها تدوس هنا */}
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
      </span>
    </motion.button>
  );
};

export default EsoBot;