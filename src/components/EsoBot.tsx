import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart, X, Send } from "lucide-react";

interface Message {
  from: "bot" | "user";
  text: string;
}

// --- 1. دالة الربط مع Gemini (الإصدار النهائي المصلح) ---
const getAhmedResponse = async (userText: string) => {
  const apiKey = "AIzaSyCLxQlqheZhHtAxA7ccp3-ciw7DW4k0Ows"; 
  // تم تصحيح الرابط بإضافة v1beta والتأكد من الصيغة الصحيحة
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [
          {
            text: `أنت "أحمد"، مبرمج مصري وحبيب "إسراء". تحدث بالعامية المصرية فقط بأسلوب حنون ومرح. استخدم لزمات مثل (يا روحي، يا بطل، اوييي). ردي بحب على رسالة إسراء: "${userText}"`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 250,
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (response.ok && data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("API Error Details:", data);
      return "يا روحي النت هنج بس قلبي معاكي.. قولي تاني؟ ❤️";
    }
  } catch (error) {
    console.error("Connection Error:", error);
    return "فيه مشكلة في الشبكة يا قلبي، أنا جنبك دايماً..";
  }
};

const EsoBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "منورة الدنيا يا قلب أحمد.. قوليلي بتفكري في إيه دلوقتي؟ ❤️✨" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || typing) return;
    
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text }]);
    setTyping(true);

    const aiReply = await getAhmedResponse(text);
    
    setMessages((prev) => [...prev, { from: "bot", text: aiReply }]);
    setTyping(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <MessageCircleHeart className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-4 left-4 z-[100] w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-pink-100 bg-white shadow-2xl overflow-hidden flex flex-col"
            style={{ height: 480 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-pink-500 text-white">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">👨‍💻</div>
              <div className="flex-1 text-right">
                <p className="font-bold text-sm">أحمد (قلب إيسو)</p>
                <p className="text-[10px] opacity-80">بيفكر فيكي دلوقتي...</p>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-[#fff5f7]" dir="rtl">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                      m.from === "user" ? "bg-white text-gray-700 border border-pink-50" : "bg-pink-500 text-white"
                    }`}>
                    {m.text}
                  </div>
                </div>
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

            <div className="flex items-center gap-2 px-3 py-3 border-t bg-white">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="قولي أي حاجة في قلبك..."
                className="flex-1 bg-pink-50/50 rounded-full px-4 py-2 text-sm outline-none text-right"
                dir="rtl"
              />
              <button onClick={handleSend} className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center">
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