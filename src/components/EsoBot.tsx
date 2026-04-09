import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart, X, Send } from "lucide-react";

interface Message {
  from: "bot" | "user";
  text: string;
}

const EsoBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "منورة الدنيا يا قلب أحمد.. قوليلي بفكر في إيه دلوقتي؟ ❤️✨" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // التمرير التلقائي لآخر رسالة
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const generateAIResponse = async (userText: string) => {
    setTyping(true);

    try {
      // هنا يا أحمد هتربط بالـ API بتاعك (سواء Supabase Edge Function أو OpenAI)
      // ده مثال لكيفية إرسال الروح (احمد) في الطلب
      /*
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: JSON.stringify({ prompt: userText, persona: "Ahmed_Personality" })
      });
      const data = await response.json();
      return data.reply;
      */

      // حالياً هعملك محاكة للرد الذكي بناءً على تحليل الواتساب لحد ما تربط الـ API
      await new Promise(resolve => setTimeout(resolve, 2000)); // تأخير طبيعي للكتابة
      
      return "يا روحي أنا فاهمك من غير ما تتكلمي.. بس قوليلي أكتر عشان وحشني كلامك ❤️✨"; 
    } catch (error) {
      return "حصل مشكلة في قلبي (السيرفر) بس لسه بحبك برضو! 😂❤️";
    } finally {
      setTyping(false);
    }
  };

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text) return;
    
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text }]);

    const aiReply = await generateAIResponse(text);
    setMessages((prev) => [...prev, { from: "bot", text: aiReply }]);
  }, [input]);

  return (
    <>
      {/* الزرار العائم */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)]"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircleHeart className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* نافذة الشات */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-4 left-4 z-[100] w-[360px] max-w-[calc(100vw-2rem)] rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: 500 }}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            {/* Header - روح أحمد */}
            <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-pink-500/80 to-rose-500/80 text-white">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl border border-white/30">
                  👨‍💻
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm tracking-wide">أحمد (قلب إيسو)</p>
                <p className="text-[10px] opacity-90">بيفكر فيكي دلوقتي...</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" dir="rtl">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}
                  initial={{ opacity: 0, x: m.from === "user" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                      m.from === "user"
                        ? "bg-white/80 text-gray-800 rounded-tr-none"
                        : "bg-pink-500 text-white rounded-tl-none font-medium"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              
              {typing && (
                <motion.div className="flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="bg-pink-100 text-pink-600 rounded-2xl rounded-tl-none px-4 py-2 text-xs flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="w-1 h-1 bg-pink-500 rounded-full animate-bounce" />
                      <span className="w-1 h-1 bg-pink-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-1 bg-pink-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </span>
                    أحمد بيكتب لروحه...
                  </div>
                </motion.div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input Box */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-1 shadow-inner">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="قولي أي حاجة في قلبك..."
                  className="flex-1 bg-transparent py-2 text-sm outline-none text-gray-800 placeholder:text-gray-400"
                  dir="rtl"
                />
                <button
                  onClick={send}
                  className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EsoBot;