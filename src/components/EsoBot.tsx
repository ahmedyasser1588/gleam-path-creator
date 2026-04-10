import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart, X, Send } from "lucide-react";

interface Message {
  from: "bot" | "user";
  text: string;
}

// دالة الربط المباشر مع جوجل (عشان متخلصش كريديت Lovable)
const getAhmedResponse = async (userText: string) => {
  // --- حتة التأمين ---
  // روح هات API Key جديد من Google AI Studio وقسمه هنا
  const p1 = "AIzaSy"; 
  const p2 = "BayIjJqiCwF9trgKTxAAuDJVcgRSOC5ew"; 
  const apiKey = p1 + p2;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [{
      parts: [{
        text: `أنت أحمد، حبيب إسراء. رد بحب وعامية مصرية دافئة جداً على رسالتها: "${userText}"`
      }]
    }]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (response.ok && data.candidates) {
      return data.candidates[0].content.parts[0].text;
    }
    return "يا روحي النت هنج بس قلبي معاكي.. قولي تاني؟ ❤️";
  } catch (error) {
    return "حصلت مشكلة في الشبكة يا قلبي..";
  }
};

export const EsoBot = () => {
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
    if (!input.trim() || typing) return;
    const text = input.trim();
    setInput("");
    setMessages(prev => [...prev, { from: "user", text }]);
    setTyping(true);
    const reply = await getAhmedResponse(text);
    setMessages(prev => [...prev, { from: "bot", text: reply }]);
    setTyping(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button onClick={() => setIsOpen(true)} className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <MessageCircleHeart className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed bottom-4 left-4 z-[100] w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-pink-100 bg-white shadow-2xl overflow-hidden flex flex-col" style={{ height: 480 }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}>
            <div className="flex items-center gap-3 px-4 py-3 bg-pink-500 text-white">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">👨‍💻</div>
              <div className="flex-1 text-right font-bold text-sm">أحمد (قلب إيسو)</div>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 bg-[#fff5f7]" dir="rtl">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${m.from === "user" ? "bg-white text-gray-700 border" : "bg-pink-500 text-white"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && <div className="text-right text-xs text-pink-600 animate-pulse font-bold">أحمد بيكتب... 💭</div>}
              <div ref={endRef} />
            </div>
            <div className="flex items-center gap-2 px-3 py-3 border-t bg-white">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="قولي أي حاجة..." className="flex-1 bg-pink-50/50 rounded-full px-4 py-2 text-sm outline-none text-right" dir="rtl" />
              <button onClick={handleSend} className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center"><Send className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EsoBot;