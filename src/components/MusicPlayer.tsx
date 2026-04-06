import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Music, Pause, SkipForward } from "lucide-react";

const MusicPlayer = () => {
  // 1. قايمة الأغاني (تأكد إن الأسماء دي هي اللي في فولدر public)
  const songs = ["/song1.mp3", "/song2.mp3", "/song3.mp3"];
  
  const [playing, setPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // وظيفة اختيار أغنية عشوائية وتغيرها
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
      audioRef.current.play().catch(err => console.log("خطأ في التشغيل:", err));
      setPlaying(true);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        // لو مفيش أغنية شغالة، ابدأ بالعشوائي
        if (!audioRef.current.src || audioRef.current.paused) {
           playRandomSong();
        } else {
           audioRef.current.play();
           setPlaying(true);
        }
      }
    }
  };

  return (
    <>
      {/* عنصر الصوت المخفي */}
      <audio 
        ref={audioRef} 
        onEnded={playRandomSong} // أول ما الأغنية تخلص يختار واحدة تانية لوحده
      />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-center">
        {/* زرار تغيير الأغنية (اختياري لو عاوزه يقلب يدوي) */}
        {playing && (
          <motion.button
            onClick={playRandomSong}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-accent hover:bg-white/40 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </motion.button>
        )}

        {/* الزرار الرئيسي */}
        <motion.button
          onClick={togglePlay}
          className="glass-card p-4 rounded-full glow-pink shadow-lg relative overflow-hidden"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <motion.div
              className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30"
              animate={playing ? { rotate: 360 } : { rotate: 0 }}
              transition={playing ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
            >
              <div className="w-3 h-3 rounded-full bg-accent" />
            </motion.div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              {playing ? (
                <Pause className="w-4 h-4 text-accent" />
              ) : (
                <Music className="w-4 h-4 text-accent" />
              )}
            </div>
          </div>
        </motion.button>
      </div>
    </>
  );
};

export default MusicPlayer;