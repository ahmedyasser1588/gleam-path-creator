import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DreamCollector = () => {
  const [form, setForm] = useState({ wish: "", dream: "", letter: "", name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.wish.trim() && !form.dream.trim() && !form.letter.trim()) return;

    setSubmitting(true);
    try {
      const entries = [];
      if (form.wish.trim()) entries.push({ type: "next_year_wish" as const, content: form.wish.trim(), sender_name: form.name.trim() || null });
      if (form.dream.trim()) entries.push({ type: "lifelong_dream" as const, content: form.dream.trim(), sender_name: form.name.trim() || null });
      if (form.letter.trim()) entries.push({ type: "letter_to_future" as const, content: form.letter.trim(), sender_name: form.name.trim() || null });

      const { error } = await supabase.from("wishes").insert(entries);
      if (error) throw error;

      // Send email notification via edge function
      try {
        await supabase.functions.invoke("send-birthday-notification", {
          body: { wishes: entries, senderName: form.name.trim() || "Someone special" },
        });
      } catch {
        // Email is best-effort, don't block submission
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting wishes:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="font-display text-2xl font-semibold text-foreground text-center mb-2">
        The Dream Collector
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-8 font-body">
        Write your wishes and send them to the stars ✨
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            className="glass-card p-10 max-w-lg mx-auto text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
          >
            {/* Floating hearts animation */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: `${20 + Math.random() * 60}%` }}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -200, opacity: 0 }}
                transition={{ duration: 2 + Math.random(), delay: i * 0.2, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-accent fill-accent" />
              </motion.div>
            ))}
            <Sparkles className="w-10 h-10 text-accent mx-auto mb-4" />
            <h4 className="font-display text-xl font-semibold text-foreground mb-2">
              Message Sent to the Stars ⭐
            </h4>
            <p className="text-sm text-muted-foreground font-body">
              Your wishes have been captured and saved forever. Thank you for sharing your heart.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="glass-card p-6 max-w-lg mx-auto space-y-5"
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1.5 block">
                🌟 Next Year's Wish
              </label>
              <textarea
                value={form.wish}
                onChange={(e) => setForm({ ...form, wish: e.target.value })}
                placeholder="What do you wish for next year?"
                rows={2}
                className="w-full bg-background/50 rounded-lg px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1.5 block">
                💫 Life-long Dream
              </label>
              <textarea
                value={form.dream}
                onChange={(e) => setForm({ ...form, dream: e.target.value })}
                placeholder="What's your biggest dream?"
                rows={2}
                className="w-full bg-background/50 rounded-lg px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1.5 block">
                💌 Letter to Your Future Self
              </label>
              <textarea
                value={form.letter}
                onChange={(e) => setForm({ ...form, letter: e.target.value })}
                placeholder="Write a message to future you..."
                rows={3}
                className="w-full bg-background/50 rounded-lg px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <motion.button
              type="submit"
              disabled={submitting}
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-body text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              {submitting ? "Sending to the stars..." : "Send Your Wishes"}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DreamCollector;
