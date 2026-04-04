import { useState } from "react";
import { motion } from "framer-motion";
import TimeMachineButton from "@/components/TimeMachineButton";
import { Send, Heart } from "lucide-react";

interface GuestMessage {
  name: string;
  message: string;
  timestamp: Date;
}

const initialMessages: GuestMessage[] = [
  { name: "Sarah", message: "Happy Birthday! Wishing you all the joy in the world! 🎉", timestamp: new Date() },
  { name: "Ahmed", message: "May this year bring you everything you dream of 💫", timestamp: new Date() },
  { name: "Luna", message: "You deserve the world and more! Love you! 💕", timestamp: new Date() },
];

const ConnectionPage = () => {
  const [messages, setMessages] = useState<GuestMessage[]>(initialMessages);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [rsvp, setRsvp] = useState({ name: "", attending: "", note: "" });
  const [rsvpSent, setRsvpSent] = useState(false);

  const sendMessage = () => {
    if (!name.trim() || !msg.trim()) return;
    setMessages([{ name, message: msg, timestamp: new Date() }, ...messages]);
    setName("");
    setMsg("");
  };

  const sendRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvp.name.trim()) return;
    setRsvpSent(true);
    // Webhook notification (commented out)
    // fetch("YOUR_WEBHOOK_URL", { method: "POST", body: JSON.stringify({ type: "rsvp", ...rsvp }) });
  };

  // Notification hook (commented out) — triggers when user reaches this page
  // useEffect(() => {
  //   fetch("YOUR_WEBHOOK_URL", { method: "POST", body: JSON.stringify({ event: "reached_final_page", timestamp: new Date() }) });
  // }, []);

  return (
    <section className="min-h-screen py-24 px-4 bg-hero-gradient">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-body mb-3">Chapter Four</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient-rose mb-4">Stay Connected</h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">Leave your mark on this special day.</p>
        </motion.div>

        {/* Guestbook */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl font-semibold text-foreground text-center mb-6">Guestbook</h3>

          <div className="glass-card p-5 mb-6">
            <div className="flex gap-3 mb-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="flex-1 bg-background/50 rounded-lg px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex gap-3">
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Leave a birthday message..."
                className="flex-1 bg-background/50 rounded-lg px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <motion.button
                onClick={sendMessage}
                className="bg-accent text-accent-foreground px-4 py-2.5 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                className="glass-card p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-3 h-3 text-accent fill-accent" />
                  <span className="text-sm font-body font-semibold text-foreground">{m.name}</span>
                </div>
                <p className="text-sm text-muted-foreground font-body">{m.message}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RSVP */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl font-semibold text-foreground text-center mb-6">RSVP</h3>

          {rsvpSent ? (
            <motion.div
              className="glass-card p-8 text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <Heart className="w-8 h-8 text-accent fill-accent mx-auto mb-3" />
              <p className="font-display text-lg text-foreground">Thank you for your response!</p>
              <p className="text-sm text-muted-foreground mt-1">We can't wait to celebrate with you.</p>
            </motion.div>
          ) : (
            <form onSubmit={sendRsvp} className="glass-card p-6 space-y-4 max-w-md mx-auto">
              <input
                value={rsvp.name}
                onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                placeholder="Your name"
                required
                className="w-full bg-background/50 rounded-lg px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex gap-3">
                {["Attending ✨", "Maybe 🤔", "Can't make it 😢"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setRsvp({ ...rsvp, attending: opt })}
                    className={`flex-1 py-2 rounded-lg text-xs font-body transition-colors ${
                      rsvp.attending === opt
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <textarea
                value={rsvp.note}
                onChange={(e) => setRsvp({ ...rsvp, note: e.target.value })}
                placeholder="Any special notes?"
                rows={2}
                className="w-full bg-background/50 rounded-lg px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <motion.button
                type="submit"
                className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-body text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send RSVP
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Time Machine */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl font-semibold text-foreground mb-6">The Time Machine</h3>
          <div className="flex justify-center">
            <TimeMachineButton url="https://example.com" />
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="text-center pt-12 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-lg text-foreground mb-1">Made with</p>
          <Heart className="w-5 h-5 text-accent fill-accent mx-auto mb-1 animate-float" />
          <p className="text-xs text-muted-foreground font-body">For the most special person</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default ConnectionPage;
