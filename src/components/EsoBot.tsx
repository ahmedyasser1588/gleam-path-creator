import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart, X, Send } from "lucide-react";

interface Message {
  from: "bot" | "user";
  text: string;
}

// --- 1. دالة الربط مع Gemini (مخ البوت) ---
const getAhmedResponse = async (userText: string) => {
  // استخدام المفتاح مباشرة لضمان التشغيل الفوري
  const apiKey = "AIzaSyCLxQlqheZhHtAxA7ccp3-ciw7DW4k0Ows"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `تعليمات النظام: أنت "أحمد". شاب مصري، مبرمج، وحبيب "إسراء". 
            تحدث بالعامية المصرية الدافئة فقط. 
            استخدم لزماتك من شات الواتساب: (يا روحي، يا بطل، اوييي، جدااا، هههههه). 
            كن حنوناً جداً ومرحاً وداعماً. 
            إذا اشتكت إسراء من التعب، اسألها بالتفصيل (أكلتي؟ نمتي؟) وواسيها. 
            لا تذكر أبداً أنك ذكاء اصطناعي. هذا الموقع هو هديتك لها لتشعر بوجودك دائمًا.
            الآن رد بأسلوبك الحقيقي على رسالة إسراء دي: "${userText}"`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    
    if (data.candidates && data.candidates[0]) {
      return data.candidates[0].content.parts[0].text;
    }
    return "يا روحي النت هنج بس قلبي معاكي.. قولي تاني؟ ❤️✨";
  } catch (error) {
    console.error("AI Error:", error);
    return "حصلت مشكلة في الربط يا قلبي بس أنا موجود دايماً.. ❤️";
  }
};

// --- 2. الـ Component الأساسي (واجهة الشات) ---
const EsoBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "منورة الدنيا يا قلب أحمد.. قوليلي بتفكري في إيه دلوقتي؟ ❤️✨" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // التمرير التلقائي لآخر رسالة
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text) return;
    
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text }]);
    setTyping(true);

    // نداء الـ AI للحصول على رد أحمد
    const aiReply = await getAhmedResponse(text);
    
    setTyping(false);
    setMessages((prev) => [...prev, { from: "bot", text: aiReply }]);
  }, [input]);

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
                <p className="text-[10px] opacity-80">بيفكر فيكي دلوقتي...</p>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2" dir="rtl">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "bg-muted text-foreground rounded-tr-sm"
                        : "bg-pink-500 text-white rounded-tl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
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

            {/* Input Area */}
            <div className="flex items-center gap-2 px-3 py-2 border-t border-border bg-background">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="قولي أي حاجة في قلبك..."
                className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none"
                dir="rtl"
              />
              <button
                onClick={send}
                className="w-9 h-9 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 transition-colors"
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