import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Heart, Sparkles } from "lucide-react";

interface TypewriterMessageProps {
  title?: string;
  subtitle?: string;
  paragraphs: string[];
  speed?: number;
  startDelay?: number;
}

const TypewriterMessage = ({
  title = "A Message For You",
  subtitle = "Words from my heart to yours",
  paragraphs,
  speed = 38,
  startDelay = 400,
}: TypewriterMessageProps) => {
  const fullText = paragraphs.join("\n\n");
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Start when component scrolls into view
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStarted(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    let timeout: number;
    const start = window.setTimeout(() => {
      const tick = () => {
        i++;
        setDisplayed(fullText.slice(0, i));
        if (i < fullText.length) {
          // small variable delay for natural feel
          const delay = /[\.\!\?،,]/.test(fullText[i - 1]) ? speed * 6 : speed;
          timeout = window.setTimeout(tick, delay);
        } else {
          setDone(true);
        }
      };
      tick();
    }, startDelay);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(timeout);
    };
  }, [started, fullText, speed, startDelay]);

  return (
    <motion.div
      ref={containerRef}
      className="max-w-2xl w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-accent fill-primary/40" />
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-rose">
            {title}
          </h3>
        </div>
        <p className="font-body text-sm sm:text-base text-muted-foreground flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          {subtitle}
          <Sparkles className="w-3.5 h-3.5 text-accent" />
        </p>
      </div>

      {/* Letter */}
      <motion.div
        className="glass-card relative p-6 sm:p-8 md:p-10 text-left shadow-xl border border-accent/20"
        initial={{ scale: 0.97 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
      >
        {/* Decorative hearts */}
        <Heart className="absolute -top-3 -left-3 w-6 h-6 text-accent fill-accent animate-pulse" />
        <Heart className="absolute -bottom-3 -right-3 w-6 h-6 text-accent fill-accent animate-pulse" />

        <p
          dir="rtl"
          className="font-body text-base sm:text-lg leading-loose text-foreground whitespace-pre-wrap min-h-[180px]"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          {displayed}
          {!done && (
            <span
              className="inline-block w-[2px] h-[1.2em] align-middle bg-accent ml-0.5"
              style={{ animation: "blink 1s steps(2) infinite" }}
            />
          )}
        </p>

        {done && (
          <motion.div
            className="mt-6 flex items-center justify-end gap-2 text-accent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-4 h-4 fill-accent" />
            <span className="font-display italic text-sm sm:text-base">
              Yours forever, Ahmed
            </span>
          </motion.div>
        )}
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
};

export default TypewriterMessage;
