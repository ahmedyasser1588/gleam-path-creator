import { useState } from "react";
import { motion } from "framer-motion";
import { Music, Pause } from "lucide-react";

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.button
      onClick={() => setPlaying(!playing)}
      className="fixed bottom-6 right-6 z-50 glass-card p-4 rounded-full glow-pink"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        <motion.div
          className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center"
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
        >
          <div className="w-3 h-3 rounded-full bg-accent" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          {playing ? (
            <Pause className="w-4 h-4 text-accent-foreground" />
          ) : (
            <Music className="w-4 h-4 text-accent-foreground" />
          )}
        </div>
      </div>
      <span className="sr-only">{playing ? "Pause" : "Play"} music</span>
    </motion.button>
  );
};

export default MusicPlayer;
