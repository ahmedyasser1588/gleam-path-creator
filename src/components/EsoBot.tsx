import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart, X, Send } from "lucide-react";

interface Message {
  from: "bot" | "user";
  text: string;
}

// --- 1. دالة الربط المحسنة مع Gemini ---
const getAhmedResponse = async (userText: string) => {
  // سحب المفتاح من ملف الـ .env
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const systemPrompt = `أنت "أحمد". شاب مصري، مبرمج، وحبيب "إسراء". 
تحدث بالعامية المصرية الدافئة فقط. 
استخدم لزماتك: (يا روحي، يا بطل، اوييي، جدااا، هههههه، يا ست البنات). 
كن حنوناً ومرحاً. إذا اشتكت إسراء من التعب، اسألها (أكلتي؟ نمتي؟) وواسيها. 
ممنوع تقول إنك ذكاء اصطناعي. ده شات حقيقي بينك وبينها.`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: `${systemPrompt}\n\nإسراء بتقولك: ${userText}` }]
      }
    ],
    generationConfig: {
      temperature: 0.9, // زيادة العشوائية عشان الردود متتكررش
      topP: 0.95,
      maxOutputTokens: 200,
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    // تأكد من استلام الرد بشكل صحيح
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Gemini Structure Error:", data);
      return "يا روحي النت هنج بس قلبي معاكي.. قولي تاني؟ ❤️✨";
    }
  } catch (error) {
    console.error("AI Fetch Error:", error);
    return "حصلت مشكلة في الربط يا قلبي بس أنا موجود دايماً.. ❤️";
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

  const send = async () => {
    const text = input.trim();
    if (!text || typing) return; // منع الإرسال المتكرر أثناء التحميل
    
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text }]);
    setTyping(true);

    const aiReply = await getAhmedResponse(text);
    
    setTyping(false);
    setMessages((prev) => [...prev, { from: "bot", text: aiReply }]);
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
          >
            <MessageCircleHeart className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* نافذة الشات */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-4 left-4 z-[100] w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-white shadow-2xl overflow-hidden flex flex-col"
            style={{ height: 460 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-pink-500 text-white">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">👨‍💻</div>
              <div className="flex-1 text-right">
                <p className="font-bold text-sm">أحمد (قلب إيسو)</p>
                <p className="text-[10px] opacity-80">بيفكر فيكي دلوقتي...</p>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-[#fdf2f8]" dir="rtl">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      m.from === "user" ? "bg-white text-gray-800 border" : "bg-pink-500 text-white"
                    }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-end">
                  <div className="bg-pink-100 text-pink-600 rounded-2xl px-3 py-2 text-xs animate-bounce">
                    أحمد بيكتب... 💭
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input Area */}
            <div className="flex items-center gap-2 px-3 py-2 border-t bg-white">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="قولي أي حاجة في قلبك..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none text-right"
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
};

export default EsoBot;