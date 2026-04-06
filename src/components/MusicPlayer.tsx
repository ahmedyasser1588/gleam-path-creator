import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause } from "lucide-react";

const MusicPlayer = () => {
  // 1. قايمة الأغاني (تأكد إن الملفات دي في فولدر public)
  const songs = ["/song1.mp3", "/song2.mp3", "/song3.mp3"];
  
  const [playing, setPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // وظيفة اختيار أغنية عشوائية وتشغيلها
  const playRandomSong = () => {
    if (audioRef.current) {
      // اختيار رقم عشوائي مختلف عن الأغنية الحالية
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (randomIndex === currentSongIndex && songs.length > 1);

      setCurrentSongIndex(randomIndex);
      
      // تحديث المصدر وتشغيل الأغنية الجديدة
      audioRef.current.src = songs[randomIndex];
      audioRef.current.play().catch(err => console.log("المتصفح منع التشغيل التلقائي: ", err));
      setPlaying(true);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (playing) {
        // لو الموسيقى شغالة، بنوقفها
        audioRef.current.pause();
        setPlaying(false);
      } else {
        // لو الموسيقى واقفة، بنختار أغنية عشوائية ونشغلها فوراً
        // إذا كان المتصفح منع التشغيل التلقائي، هنحتاج نشغل العشوائي
        playRandomSong(); 
      }
    }
  };

  return (
    <>
      {/* عنصر الصوت المخفي - onEnded بيختار أغنية تانية تلقائي */}
      <audio 
        ref={audioRef} 
        onEnded={playRandomSong} 
      />

      <motion.button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 glass-card p-4 rounded-full glow-pink shadow-lg"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* دائرة تدور عند التشغيل */}
          <motion.div
            className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30"
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={playing ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
          >
            <div className="w-3 h-3 rounded-full bg-accent" />
          </motion.div>
          
          {/* أيقونات الموسيقى/الإيقاف (تأثير Framer Motion) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {playing ? (
                <motion.div
                  key="pause"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Pause className="w-4 h-4 text-accent" />
                </motion.div>
              ) : (
                <motion.div
                  key="music"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Music className="w-4 h-4 text-accent" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <span className="sr-only">{playing ? "Pause" : "Play"} music</span>
      </motion.button>
    </>
  );
};

export default MusicPlayer;