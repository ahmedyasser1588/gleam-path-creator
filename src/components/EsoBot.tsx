import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart, X, Send } from "lucide-react";

interface Message {
  from: "bot" | "user";
  text: string;
}

// --- 1. دالة الربط مع Gemini (النسخة المصلحة) ---
const getAhmedResponse = async (userText: string) => {
  const apiKey = "AIzaSyCLxQlqheZhHtAxA7ccp3-ciw7DW4k0Ows"; 
  // التعديل هنا: استخدام v1 بدلاً من v1beta والتأكد من الصيغة
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [
          {
            text: `أنت "أحمد". مبرمج مصري وحبيب "إسراء". تحدث بالعامية المصرية فقط. كن حنوناً وداعماً جداً. ردي على: ${userText}`
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (response.ok && data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Detailed Error:", data); // عشان نشوف لو فيه سبب تاني
      return "يا روحي النت هنج بس قلبي معاكي.. قولي تاني؟ ❤️";
    }
  } catch (error) {
    console.error("Fetch Catch:", error);
    return "فيه مشكلة في الاتصال يا قلبي، أنا جنبك دايماً..";
  }
};

// --- 2. الـ Component الأساسي ---
const EsoBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "منورة الدنيا يا قلب أحمد.. قوليلي بتفكري في إيه دلوقتي؟ ❤️✨" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // التمرير التلقائي لأسفل
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || typing) return;
    
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text }]);
    setTyping(true);

    try {
      const aiReply = await getAhmedResponse(text);
      setMessages((prev) => [...prev, { from: "bot", text: aiReply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: "bot", text: "يا روحي النت هنج شوية، قوليلي تاني؟" }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* الزرار العائم */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <MessageCircleHeart className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* نافذة الشات */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-4 left-4 z-[100] w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-pink-100 bg-white shadow-2xl overflow-hidden flex flex-col"
            style={{ height: 480 }}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-pink-500 text-white">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">👨‍💻</div>
              <div className="flex-1 text-right">
                <p className="font-bold text-sm">أحمد (قلب إيسو)</p>
                <p className="text-[10px] opacity-80">بيفكر فيكي دلوقتي...</p>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-[#fff5f7]" dir="rtl">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}
                  initial={{ opacity: 0, x: m.from === "user" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                      m.from === "user"
                        ? "bg-white text-gray-700 rounded-tr-none border border-pink-50"
                        : "bg-pink-500 text-white rounded-tl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              
              {typing && (
                <div className="flex justify-end">
                  <div className="bg-pink-100 text-pink-600 rounded-2xl px-3 py-2 text-xs animate-pulse">
                    أحمد بيكتبلك... 💭
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input Area */}
            <div className="flex items-center gap-2 px-3 py-3 border-t border-pink-50 bg-white">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="قولي أي حاجة في قلبك..."
                className="flex-1 bg-pink-50/50 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-pink-300 transition-all text-right"
                dir="rtl"
              />
              <button
                onClick={handleSend}
                disabled={typing}
                className={`w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center transition-transform active:scale-90 ${typing ? 'opacity-50' : 'hover:bg-pink-600'}`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EsoBot;