import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Heart, Star, MapPin } from "lucide-react";

const milestones = [
  { date: "Day 1", title: "The Day We Met", desc: "The beginning of something beautiful.", icon: Heart },
  { date: "Month 3", title: "First Adventure", desc: "When we explored the unknown together.", icon: MapPin },
  { date: "Month 6", title: "Unforgettable Summer", desc: "Sunsets, laughter, and golden memories.", icon: Star },
  { date: "Year 1", title: "A Year of Magic", desc: "365 days of making the impossible possible.", icon: Camera },
];

const journeyVideo = {
  src: "/videos/journey.mp4",
  title: "Our journey in motion",
  description: "A special memory captured on video, showing the moments that shaped our story.",
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

const JourneyPage = () => {
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

        {/* Video section */}
        <div className="mb-24">
          <motion.div
            className="rounded-[2rem] overflow-hidden border border-border bg-muted/30 shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <video className="w-full min-h-[320px] object-cover bg-black" controls>
              <source src={journeyVideo.src} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
            <div className="p-8 bg-background">
              <h3 className="text-3xl font-semibold text-foreground mb-3">{journeyVideo.title}</h3>
              <p className="text-base text-muted-foreground max-w-3xl">{journeyVideo.description}</p>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          <div className="space-y-12">
            {milestones.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyPage;
