import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Heart, Star, MapPin, Sparkles } from "lucide-react";

// ضفنا الـ Interface عشان الصفحة تقبل الـ onNext
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

const TimelineItem = ({ item, index }: { item: typeof milestones[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = item.icon;
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex items-center gap-6 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <div className="glass-card p-5 inline-block">
          <p className="text-xs text-accent font-body uppercase tracking-widest mb-1">{item.date}</p>
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.desc}</p>
        </div>
      </div>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center relative z-10">
        <Icon className="w-4 h-4 text-accent" />
      </div>
      <div className="flex-1" />
    </motion.div>
  );
};

// ضفنا الـ onNext هنا
const JourneyPage = ({ onNext }: JourneyPageProps) => {
  return (
    <section className="min-h-screen py-24 px-4 bg-hero-gradient">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-body mb-3">Chapter Two</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient-rose mb-4">Our Journey</h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">Every moment together has been a masterpiece.</p>
        </motion.div>

        {/* Gallery */}
        <div className="grid grid-cols-3 gap-3 mb-24">
          {galleryImages.map((img) => (
            <motion.div
              key={img.id}
              className={`${img.span} rounded-xl overflow-hidden relative group`}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-full min-h-[120px] bg-gradient-to-br from-primary/40 to-accent/20 flex items-center justify-center">
                <Camera className="w-8 h-8 text-accent/40" />
              </div>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-end p-3">
                <span className="text-xs font-body opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "hsl(0, 0%, 100%)" }}>
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative mb-24">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          <div className="space-y-12">
            {milestones.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* الزرار اللي كان ناقص - Let's Celebrate Button */}
        {/* --------------------------------------------------------- */}
        <motion.div 
          className="flex justify-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={onNext}
            className="group relative px-8 py-4 bg-accent text-accent-foreground rounded-full font-display font-bold text-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Let's Celebrate <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default JourneyPage;