import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import VirtualCake from "@/components/VirtualCake";
import ScratchCard from "@/components/ScratchCard";
import Envelope from "@/components/Envelope";
import DreamCollector from "@/components/DreamCollector";
import TimeMachineButton from "@/components/TimeMachineButton";
import { Heart, Sparkles, PartyPopper } from "lucide-react";

const envelopes = [
  { title: "Open When You're Happy", message: "I just want you to know — your happiness is the most beautiful thing in the world. Keep shining! 🌟", condition: "For your happiest moments", isUnlocked: true },
  { title: "Open When You Miss Me", message: "Close your eyes. Take a deep breath. I'm always with you, even when we're apart. 💕", condition: "When distance feels too much", isUnlocked: true },
  { title: "Open On Your Next Adventure", message: "Go explore! Take pictures! Eat weird food! Life is too short for boring stories. 🗺️", condition: "Before your next trip", isUnlocked: false },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, type: "spring", stiffness: 50 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const AnimatedHeading = ({ children }: { children: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const letters = children.split("");

  return (
    <motion.h3
      ref={ref}
      className="font-display text-2xl font-semibold text-foreground mb-6 flex justify-center flex-wrap"
    >
      {letters.map((l, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, scale: 0.5 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: i * 0.04, duration: 0.4, type: "spring" }}
          className={l === " " ? "w-2" : ""}
        >
          {l}
        </motion.span>
      ))}
    </motion.h3>
  );
};

const CelebrationPage = () => {
  return (
    <section className="min-h-screen py-24 px-4 bg-hero-gradient relative overflow-hidden">
      {/* Background animated confetti-like particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0, 0.5, 0],
            rotate: [0, 360],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          {i % 3 === 0 ? (
            <Heart className="w-3 h-3 text-accent/30 fill-accent/20" />
          ) : i % 3 === 1 ? (
            <Sparkles className="w-3 h-3 text-primary/40" />
          ) : (
            <PartyPopper className="w-3 h-3 text-accent/30" />
          )}
        </motion.div>
      ))}

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/15 blur-3xl"
        animate={{ x: [0, 50, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
        animate={{ x: [0, -50, 0], scale: [1.2, 1, 1.2] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-body mb-3"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Chapter Three
          </motion.p>

          {/* Big animated title */}
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-gradient-rose mb-4"
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
          >
            🎉 Let's Celebrate 🎉
          </motion.h2>
          <motion.p
            className="text-muted-foreground font-body max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Make a wish and blow out the candles!
          </motion.p>
        </motion.div>

        {/* Virtual Cake with entrance animation */}
        <motion.div
          className="flex justify-center mb-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            transition={{ duration: 0.5 }}
          >
            <VirtualCake />
          </motion.div>
        </motion.div>

        {/* Dream Collector */}
        <motion.div
          className="mb-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <DreamCollector />
        </motion.div>

        {/* Scratch Card */}
        <motion.div
          className="text-center mb-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatedHeading>A Special Surprise</AnimatedHeading>
          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.02 }}
          >
            <ScratchCard message="🎁 You are loved more than you know! Here's a virtual hug from everyone who adores you. 💖" />
          </motion.div>
        </motion.div>

        {/* Open When Envelopes */}
        <motion.div
          className="mb-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatedHeading>Open When...</AnimatedHeading>
          <motion.div
            className="grid gap-4 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {envelopes.map((env, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40, rotateY: -20 },
                  visible: { opacity: 1, y: 0, rotateY: 0, transition: { duration: 0.6, type: "spring" } },
                }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Envelope {...env} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Time Machine */}
        <motion.div
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatedHeading>The Time Machine</AnimatedHeading>
          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
            transition={{ duration: 0.4 }}
          >
            <TimeMachineButton url="https://ahmedyasser1588.github.io/Brith-Day-Esraa/" />
          </motion.div>
        </motion.div>

        {/* Footer with heartbeat */}
        <motion.footer
          className="text-center pt-12 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.p
            className="font-display text-lg text-foreground mb-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Made with
          </motion.p>
          <motion.div
            animate={{ scale: [1, 1.3, 1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          >
            <Heart className="w-5 h-5 text-accent fill-accent mx-auto mb-1" />
          </motion.div>
          <p className="text-xs text-muted-foreground font-body">For the most special person</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default CelebrationPage;
