import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, SkipForward, Heart } from "lucide-react";

const MusicPlayer = () => {
  // 1. قايمة الأغاني (تأكد إن الملفات دي في فولدر public)
  const songs = ["/happy brithday to you.m4a", "/3id milad elila.mp3", "/Kol Sana w enta.mp3","/elwala wala.mp3","/elyoum 3id.mp3","/yalla 7alan balan.mp3","/sana 7elwa.mp3","/yalla 7alan balan.mp3"];
  
  const [playing, setPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
//
  // وظيفة تغيير الأغنية بشكل عشوائي (لزرار السهم)
  const changeRandomSong = () => {
    if (audioRef.current) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (randomIndex === currentSongIndex && songs.length > 1);

      setCurrentSongIndex(randomIndex);
      audioRef.current.src = songs[randomIndex];
      audioRef.current.play().catch(err => console.log("Error playing:", err));
      setPlaying(true);
    }
  };

  // وظيفة الزرار الرئيسي: Play/Pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        // لو لسه مفيش أغنية متحملة، بنحمل أول واحدة
        if (!audioRef.current.src) {
          audioRef.current.src = songs[currentSongIndex];
        }
        audioRef.current.play().then(() => setPlaying(true)).catch(() => changeRandomSong());
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} onEnded={changeRandomSong} />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        
        {/* زرار الـ Skip العشوائي (بيظهر فوق الزرار الرئيسي لما الموسيقى تشتغل) */}
        <AnimatePresence>
          {playing && (
            <motion.button
              onClick={changeRandomSong}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-accent hover:bg-white/40 shadow-lg"
            >
              <SkipForward className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* الزرار الرئيسي (نفس الشكل اللي في الصورة بالظبط) */}
        <motion.button
          onClick={togglePlay}
          className="relative glass-card p-4 rounded-full glow-pink shadow-lg border border-white/20 bg-white/10"
          style={{ backdropFilter: 'blur(12px)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* أيقونة القلب الصغيرة اللي على اليمين فوق */}
          <div className="absolute -top-1 -right-1">
            <Heart className="w-4 h-4 text-accent fill-accent animate-pulse" />
          </div>

          <div className="relative">
            {/* الدائرة اللي بتدور */}
            <motion.div
              className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20"
              animate={playing ? { rotate: 360 } : { rotate: 0 }}
              transition={playing ? { duration: 4, repeat: Infinity, ease: "linear" } : {}}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-accent/40" />
            </motion.div>
            
            {/* أيقونة Music أو Pause في النص */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {playing ? (
                  <motion.div key="pause" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Pause className="w-4 h-4 text-accent" />
                  </motion.div>
                ) : (
                  <motion.div key="music" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Music className="w-4 h-4 text-accent" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.button>
      </div>
    </>
  );
};

export default MusicPlayer;