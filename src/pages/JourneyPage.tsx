import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Camera, Heart, Star, MapPin, Sparkles } from "lucide-react";

interface JourneyPageProps {
  onNext?: () => void;
}

const milestones = [
  { date: "Day 1", title: "The Day We Met", desc: "The beginning of something beautiful.", icon: Heart },
  { date: "Month 3", title: "First Adventure", desc: "When we explored the unknown together.", icon: MapPin },
  { date: "Month 6", title: "Unforgettable Summer", desc: "Sunsets, laughter, and golden memories.", icon: Star },
  { date: "Year 1", title: "A Year of Magic", desc: "365 days of making the impossible possible.", icon: Camera },
];

const galleryImages = [
  { id: 1, span: "col-span-2 row-span-2", label: "Our favorite moment" },
  { id: 2, span: "col-span-1 row-span-1", label: "That sunset" },
  { id: 3, span: "col-span-1 row-span-1", label: "Laughing together" },
  { id: 4, span: "col-span-1 row-span-2", label: "Adventure time" },
  { id: 5, span: "col-span-1 row-span-1", label: "Cozy days" },
  { id: 6, span: "col-span-1 row-span-1", label: "Making memories" },
];

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: i * 0.05, duration: 0.5, type: "spring", stiffness: 100 }
  }),
};

const TimelineItem = ({ item, index }: { item: typeof milestones[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = item.icon;
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex items-center gap-6 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      initial={{ opacity: 0, x: isLeft ? -80 : 80, rotateY: isLeft ? -15 : 15 }}
      animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 60 }}
    >
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <motion.div
          className="glass-card p-5 inline-block"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 60px hsla(350, 100%, 85%, 0.3)",
            transition: { duration: 0.3 }
          }}
        >
          <p className="text-xs text-accent font-body uppercase tracking-widest mb-1">{item.date}</p>
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.desc}</p>
        </motion.div>
      </div>
      <motion.div
        className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center relative z-10"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-accent/30"
        />
        <Icon className="w-5 h-5 text-accent" />
      </motion.div>
      <div className="flex-1" />
    </motion.div>
  );
};

const AnimatedTitle = ({ text }: { text: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const letters = text.split("");

  return (
    <motion.h2
      ref={ref}
      className="text-4xl md:text-5xl font-display font-bold text-gradient-rose mb-4 flex justify-center flex-wrap"
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={letter === " " ? "w-3" : ""}
        >
          {letter}
        </motion.span>
      ))}
    </motion.h2>
  );
};

const JourneyPage = ({ onNext }: JourneyPageProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={containerRef} className="min-h-screen py-24 px-4 bg-hero-gradient relative overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
        style={{ y: parallaxY1 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        style={{ y: parallaxY2 }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Floating sparkles */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.6, 0],
            rotate: [0, 180, 360],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Sparkles className="w-3 h-3 text-accent/40" />
        </motion.div>
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
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
            Chapter Two
          </motion.p>
          <AnimatedTitle text="Our Journey" />
          <motion.p
            className="text-muted-foreground font-body max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            Every moment together has been a masterpiece.
          </motion.p>
        </motion.div>

        {/* Gallery with staggered reveal */}
        <motion.div
          className="grid grid-cols-3 gap-3 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {galleryImages.map((img) => (
            <motion.div
              key={img.id}
              className={`${img.span} rounded-xl overflow-hidden relative group cursor-pointer`}
              variants={{
                hidden: { opacity: 0, scale: 0.6, rotateZ: -5 },
                visible: { opacity: 1, scale: 1, rotateZ: 0, transition: { duration: 0.6, type: "spring" } },
              }}
              whileHover={{
                scale: 1.05,
                rotateZ: 2,
                zIndex: 10,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-full h-full min-h-[120px] bg-gradient-to-br from-primary/40 to-accent/20 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: img.id * 0.3 }}
                >
                  <Camera className="w-8 h-8 text-accent/40" />
                </motion.div>
              </div>
              <motion.div
                className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-end p-3"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="text-xs font-body text-background">
                  {img.label}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline with animated line */}
        <div className="relative">
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px bg-accent/30 -translate-x-1/2 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="space-y-12">
            {milestones.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Continue button */}
        {onNext && (
          <motion.div
            className="flex justify-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={onNext}
              className="glass-card px-10 py-4 rounded-full border border-accent/30 cursor-pointer group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-accent/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative font-display text-lg font-semibold text-gradient-rose">
                Continue to Celebration →
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default JourneyPage;
