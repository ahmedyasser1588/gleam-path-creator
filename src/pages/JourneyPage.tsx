import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Heart, Star, MapPin, MessageCircle } from "lucide-react";

// Updated only the data points as requested
const milestones = [
  { 
    date: "2020", 
    title: "Started Talking", 
    desc: "The beginning of our story and getting to know each other.", 
    icon: MessageCircle 
  },
  { 
    date: "2023", 
    title: "First Meeting", 
    desc: "The day we finally met in person.", 
    icon: MapPin 
  },
  { 
    date: "April 12, 2025", 
    title: "The Best Day ", 
    desc: "The moment we shared our true feelings.", 
    icon: Heart 
  },
  { 
    date: "April 12, 2026", 
    title: "One Year Of Ovr Love", 
    desc: "Celebrating 365 days of love and happiness.", 
    icon: Star 
  },
];

const journeyVideo = {
  previewUrl: "https://drive.google.com/file/d/1xKYEqjOAv2EOmgbnIqD-HL0PgPLGxGCj/preview",
  shareUrl: "https://drive.google.com/file/d/1xKYEqjOAv2EOmgbnIqD-HL0PgPLGxGCj/view?usp=sharing",
  title: "Our journey in video",
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
      className={`flex items-center gap-3 sm:gap-6 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className={`flex-1 min-w-0 ${isLeft ? "text-right" : "text-left"}`}>
        <div className="glass-card p-3 sm:p-5 inline-block max-w-full">
          <p className="text-[10px] sm:text-xs text-accent font-body uppercase tracking-widest mb-1">{item.date}</p>
          <h3 className="font-display text-sm sm:text-lg font-semibold text-foreground mb-1">{item.title}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
        </div>
      </div>
      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/20 flex items-center justify-center relative z-10">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
      </div>
      <div className="flex-1 min-w-0" />
    </motion.div>
  );
};

const JourneyPage = () => {
  return (
    <section className="min-h-screen pt-20 pb-16 sm:py-24 px-4 bg-hero-gradient">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground font-body mb-3">Chapter Two</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient-rose mb-4">Our Journey</h2>
          <p className="text-sm sm:text-base text-muted-foreground font-body max-w-md mx-auto px-2">Every moment together has been a masterpiece.</p>
        </motion.div>

        {/* Video section */}
        <div className="mb-24">
          <motion.div
            className="rounded-[2rem] overflow-hidden border border-border bg-muted/50 shadow-2xl ring-1 ring-white/10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-rose-500/10 via-fuchsia-500/10 to-sky-500/10 p-5 sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_30%)]" />
              <div className="relative max-w-4xl mx-auto text-center">
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent font-body mb-2 sm:mb-3">Memories in video</p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-foreground mb-3 sm:mb-4">{journeyVideo.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-6 sm:leading-7">{journeyVideo.description}</p>
              </div>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                title="Journey video"
                src={journeyVideo.previewUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
            <div className="p-5 sm:p-8 bg-background flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Click below to open the full Drive preview and relive our special moment.</p>
              </div>
              <a
                href={journeyVideo.shareUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-accent px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-background transition hover:bg-accent/90"
              >
                Watch on Google Drive
              </a>
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