import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart, X, Send } from "lucide-react";

interface Message {
  from: "bot" | "user";
  text: string;
}

// --- 1. دالة الربط مع Gemini ---
const getAhmedResponse = async (userText: string) => {
  // 1. هنا بنجيب المفتاح من الـ .env اللي أنت عملته
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
  
  // 2. بنحط المفتاح في الرابط
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `أنت "أحمد". مبرمج وحبيب "إسراء". رد بالعامية المصرية الدافئة وبأسلوبك من شات الواتساب (يا روحي، يا بطل، اوييي، جدااا، ❤️✨). كن حنوناً وداعماً. لا تذكر أنك ذكاء اصطناعي. رد على: "${userText}"`
          }
        ]
      }
    ],
    generationConfig: { 
      temperature: 0.9, 
      topP: 0.95 
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    
    // تأكد إن الرد راجع صح من جوجل
    if (data.candidates && data.candidates[0]) {
      return data.candidates[0].content.parts[0].text;
    }
    return "يا روحي النت هنج بس قلبي معاكي.. قولي تاني؟ ❤️✨";
  } catch (error) {
    console.error("AI Fetch Error:", error);
    return "حصلت مشكلة في الربط يا قلبي بس أنا موجود دايماً.. ❤️";
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

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text) return;
    
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text }]);
    setTyping(true);

    // نداء الـ AI الحقيقي
    const aiReply = await getAhmedResponse(text);
    
    setTyping(false);
    setMessages((prev) => [...prev, { from: "bot", text: aiReply }]);
  }, [input]);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircleHeart className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-4 left-4 z-[100] w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col"
            style={{ height: 460 }}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-pink-500 text-white">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">👨‍💻</div>
              <div className="flex-1">
                <p className="font-bold text-sm">أحمد (قلب إيسو)</p>
                <p className="text-[10px] opacity-80">Online always for you</p>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2" dir="rtl">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    m.from === "user" ? "bg-muted text-foreground" : "bg-pink-500 text-white"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-end">
                  <div className="bg-pink-100 text-pink-600 rounded-2xl px-3 py-2 text-xs animate-pulse">
                    أحمد بيكتب... 💭
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-2 border-t border-border">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="قولي أي حاجة في قلبك..."
                className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none"
                dir="rtl"
              />
              <button onClick={send} className="w-9 h-9 rounded-full bg-pink-500 text-white flex items-center justify-center">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};export default EsoBot;