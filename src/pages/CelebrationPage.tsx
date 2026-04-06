import { motion } from "framer-motion";
import VirtualCake from "@/components/VirtualCake";
import ScratchCard from "@/components/ScratchCard";
import Envelope from "@/components/Envelope";
import DreamCollector from "@/components/DreamCollector";
import TimeMachineButton from "@/components/TimeMachineButton";
import { Gift, Heart } from "lucide-react";


const envelopes = [
  { title: "Open When You're Happy", message: "I just want you to know — your happiness is the most beautiful thing in the world. Keep shining! 🌟", condition: "For your happiest moments", isUnlocked: true },
  { title: "Open When You Miss Me", message: "Close your eyes. Take a deep breath. I'm always with you, even when we're apart. 💕", condition: "When distance feels too much", isUnlocked: true },
  { title: "Open On Your Next Adventure", message: "Go explore! Take pictures! Eat weird food! Life is too short for boring stories. 🗺️", condition: "Before your next trip", isUnlocked: false },
];

const CelebrationPage = () => {
  return (
    <section className="min-h-screen py-24 px-4 bg-hero-gradient">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-body mb-3">Chapter Three</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient-rose mb-4">Let's Celebrate</h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">Make a wish and blow out the candles!</p>
        </motion.div>

        {/* Virtual Cake */}
        <motion.div
          className="flex justify-center mb-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <VirtualCake />
        </motion.div>

        {/* Dream Collector */}
        <div className="mb-20">
          <DreamCollector />
        </div>

        {/* Scratch Card */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl font-semibold text-foreground mb-6">A Special Surprise</h3>
          <div className="flex justify-center">
            <ScratchCard message="🎁 You are loved more than you know! Here's a virtual hug from everyone who adores you. 💖" />
          </div>
        </motion.div>

        {/* Open When Envelopes */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl font-semibold text-foreground text-center mb-8">Open When...</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {envelopes.map((env, i) => (
              <Envelope key={i} {...env} />
            ))}
          </div>
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

export default CelebrationPage;
