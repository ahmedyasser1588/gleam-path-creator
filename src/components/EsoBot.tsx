import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart, X, Send } from "lucide-react";

interface Message {
  from: "bot" | "user";
  text: string;
}

const responses: Record<string, string[]> = {
  sad: [
    "مين اللي زعّل إيسو بتاعتي؟! 😤 قوليلي وأنا هروح أكلمه!",
    "ماتزعليش يا قلبي، أنا هنا جنبك دايمًا 💕",
  ],
  "miss you": [
    "وأنا وحشتيني أكتر بمليون مرة يا إيسو! 🥺",
    "كل ثانية من غيرك بتبقى زي ساعة 😢💕",
  ],
  "love you": [
    "وأنا بحبك لحد آخر نجمة في السما وأرجع تاني! 💗",
    "أنا بحبك أكتر مما الكلام يقدر يوصف يا إيسو! ❤️‍🔥",
  ],
  happy: [
    "فرحتك فرحتي يا إيسو! 🎉 إيه السبب عشان أفرح معاكي؟",
    "لما بتبقي مبسوطة الدنيا كلها بتنور! 🌞",
  ],
  "good morning": [
    "صباح الورد والفل والياسمين يا أحلى إيسو! 🌸",
    "صباحك سكر يا عمري! يومك يبقى حلو زيك 🍯",
  ],
  "good night": [
    "تصبحي على خير يا أغلى إنسانة 🌙 أحلم بيكي!",
    "نومة هنية يا قلبي، بكرة أحلى بإذن الله 💫",
  ],
  hungry: [
    "طب ما نطلب أكل حلو! أنتِ عايزة إيه يا إيسو؟ 🍕",
    "جعانة؟! يلا نروح المكان اللي بتحبيه 🥘❤️",
  ],
};

const fallbacks = [
  "قوليلي أكتر يا إيسو، أنا سامعك 💕",
  "أنا مش فاهم أوي بس بحبك برضو 😅❤️",
  "إيسو بتاعتي دايمًا في قلبي مهما تقول! 💗",
  "طيب ما تقوليلي حاجة حلوة بقى 🥰",
];

const findResponse = (input: string): string => {
  const lower = input.toLowerCase();
  for (const [keyword, replies] of Object.entries(responses)) {
    if (lower.includes(keyword)) {
      return replies[Math.floor(Math.random() * replies.length)];
    }
  }
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

const EsoBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "أهلًا يا إيسو! 💕 أنا قلب أحمد الرقمي، موجود هنا لما أحمد يبقى مشغول 😄" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text }]);
    setTyping(true);

    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { from: "bot", text: findResponse(text) }]);
    }, delay);
  }, [input]);

  return (
    <>
      {/* Toggle */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <MessageCircleHeart className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-4 right-4 z-[100] w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col"
            style={{ height: 460 }}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", damping: 22 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-secondary text-secondary-foreground">
              <div className="w-9 h-9 rounded-full bg-secondary-foreground/20 flex items-center justify-center text-lg">
                💕
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-bold">Ahmed's Digital Heart</p>
                <p className="text-[10px] opacity-80">Online always for Eso</p>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2" dir="rtl">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm font-body leading-relaxed ${
                      m.from === "user"
                        ? "bg-muted text-foreground rounded-tr-sm"
                        : "bg-primary text-primary-foreground rounded-tl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-end">
                  <div className="bg-primary/60 text-primary-foreground rounded-2xl rounded-tl-sm px-3 py-2 text-xs font-body animate-pulse">
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
                placeholder="اكتبي حاجة يا إيسو..."
                className="flex-1 bg-muted rounded-full px-4 py-2 text-sm font-body text-foreground outline-none placeholder:text-muted-foreground"
                dir="rtl"
              />
              <button
                onClick={send}
                className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center"
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
